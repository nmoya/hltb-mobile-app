import cheerio from 'react-native-cheerio';

function isInfiniteGame($, detail) {
  const shortDiv = $(detail).find('.search_list_tidbit_short');
  return shortDiv && shortDiv[0] && shortDiv[0].attribs !== undefined;
}

function transformHtml($) {
  const games = []
  $('a')
    .filter((_, aTag) => !$(aTag).attr('class'))
    .each((i, aTag) => {
      const title = aTag.attribs.title;
      const img_src = $(aTag).find('img').attr('src');
      const href = aTag.attribs.href;
      const img = "https://howlongtobeat.com" + img_src;
      const url = "https://howlongtobeat.com/" + href;
      games.push({id: i, title: title, img: img, gameUrl: url, times: []});
  });

  $('.search_list_details_block').each((i, detail) => {
    const game = games[i];
    let currentStat;
    if (isInfiniteGame($, detail)) {
      // Games like World of Warcraft, Hearthstone, Heroes of the Storm are treated differently.
      // They dont have the regular Main, Main + extras, etc, categories. Instead
      // they are organized under a different structure of divs, one class for the category name
      // and another class for the estimated length.
      const categories = [];
      $(detail)
      .find('.search_list_tidbit_short')
      .each((i, stat) => {
        categories.push(stat.children[0].data);
      });
      $(detail)
      .find('.search_list_tidbit_long')
      .each((i, stat) => {
        const cssClass = stat.attribs.class;
        game.times.push({
          category: categories[i],
          confidence: cssClass.replace('search_list_tidbit_long center time_', ''),
          time: stat.children[0].data
        });
      });
    } else {
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
      });
    }
    games[i] = game;
  });
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
    fetch('https://howlongtobeat.com/search_results.php?page=1', {
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
