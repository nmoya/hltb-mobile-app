function roundToHours(timeInSeconds) {
  const rawHours = timeInSeconds / 3600
  return Math.round(rawHours + 0.5) - 0.5;
}

function fetchAndParse(queryString) {
  return new Promise(function (resolve, reject) {
    fetch("https://www.howlongtobeat.com/api/search", {
      method: "POST",
      headers: {
        "Referer": "https://howlongtobeat.com/",
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "searchType": "games",
        "searchTerms": queryString.split(" "),
        "searchPage": 1,
        "size": 20,
        "searchOptions": {
          "games": {
            "userId": 0,
            "platform": "",
            "sortCategory": "popular",
            "rangeCategory": "main",
            "rangeTime": {
              "min": 0,
              "max": 0
            },
            "gameplay": {
              "perspective": "",
              "flow": "",
              "genre": ""
            },
            "modifier": ""
          },
          "users": {
            "sortCategory": "postcount"
          },
          "filter": "",
          "sort": 0,
          "randomizer": 0
        }
      })
    })
      .then((response) => response.json())
      .then((json) => {
        const games = json.data.map((game, index) => {
          return {
            "id": index,
            "title": game.game_name,
            "img": `https://howlongtobeat.com/games/${game.game_image}`,
            "gameUrl": `https://howlongtobeat.com/game?id=${game.game_id}`,
            "times": [
              {
                "category": "Main Story", "time": `${roundToHours(game.comp_main)}h`
              },
              {
                "category": "Main + Sides", "time": `${roundToHours(game.comp_plus)}h`
              },
              {
                "category": "Completionist", "time": `${roundToHours(game.comp_100)}h`
              },
              {
                "category": "All Styles", "time": `${roundToHours(game.comp_all)}h`
              },
            ]
          }
        })
        resolve(games)
      })
      .catch((error) => {
        console.error(error)
        reject(error)
      })
  })
}

module.exports = {
  fetchAndParse: fetchAndParse,
};
