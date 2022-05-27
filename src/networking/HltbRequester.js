import { HowLongToBeatService } from 'howlongtobeat';

function fetchAndParse(queryString) {
  let hltbService = new HowLongToBeatService();
  return new Promise(function (resolve, reject) {
    hltbService.search(queryString)
      .then(searchResults => {
        const games = searchResults.map((game, index) => {
          return {
            "id": index,
            "title": game.name,
            "img": `https://howlongtobeat.com${game.imageUrl}`,
            "gameUrl": `https://howlongtobeat.com/game?id=${game.id}`,
            "times": game.timeLabels.map((labelDetails) => {
              const field = labelDetails[0];
              const label = labelDetails[1];
              return { "category": label, "time": `${game[field]}h` }
            }),
          }
        });
        resolve(games);
      })
      .catch((error) => {
        reject(error);
      });
  });
}

module.exports = {
  fetchAndParse: fetchAndParse,
};
