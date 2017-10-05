import cheerio from 'react-native-cheerio';

const BASE_URL = 'https://howlongtobeat.com/';

function transformHtml($) {
  const games = []
  $('a')
    .filter((_, aTag) => !$(aTag).attr('class'))
    .each((i, aTag) => {
      const title = aTag.attribs.title;
      const img = BASE_URL + $(aTag).find('img').attr('src');
      const url = BASE_URL + aTag.attribs.href;
      games.push({id: i, title: title, img: img, gameUrl: url, times: []});
  });

  $('.search_list_details_block').each((i, detail) => {
    const game = games[i];
    let currentStat;
    $(detail)
      .find('.search_list_tidbit')
      .each((i, stat) => {
        if (i % 2 === 0) {
          currentStat = {
            category: $(stat).text()
          }
        } else {
          const cssClass = stat.attribs.class;
          currentStat.confidence = parseInt(cssClass.replace('search_list_tidbit center time_', ''));
          currentStat.time = $(stat).text();
          game.times.push(currentStat);
        }
      })
    games[i] = game;
  })
  return games;
}

function fetchAndParse(queryString) {
  return new Promise(function(resolve, reject) {
    const formData = {
      'queryString': queryString,
      't': 'games',
      'sorthead': 'popular',
      'sortd': 'Normal Order',
    };
    let formBody = [];
    for (var property in formData) {
      var encodedKey = encodeURIComponent(property);
      var encodedValue = encodeURIComponent(formData[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");
    fetch('https://howlongtobeat.com/search_main.php?page=1', {
      method: 'POST',
      headers: {
        'Accept': '*/*',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody,
    })
    .then((response) => response.text())
    .then((html) => {
      const $ = cheerio.load(html);
      const result = transformHtml($);
      resolve(result);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

module.exports = {
  fetchAndParse: fetchAndParse,
};
