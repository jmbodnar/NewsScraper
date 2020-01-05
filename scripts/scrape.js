const request = require("request");
const cheerio = require("cheerio");

const scrape = function(callback) {
  request("https://www.nytimes.com", (error, response, body) => {
    const $ = cheerio.load(body);

    const articles = [];

    $("h1").each((i, element) => {
      let title = $(this).text();
      articles.push({
        title
      });
    });
    console.log(articles);
    callback(articles);
  });
};

module.exports = scrape;
