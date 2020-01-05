const scrape = require("../scripts/scrape");
// date?

const Headline = require("../models/headlines");

module.exports = {
  fetch: function(callback) {
    scrape(function(data) {
      const articles = data;
      for (var i = 0; i < articles.length; i++) {
        articles[i].saved = false;
      }
      Headline.collection.insertMany(
        articles,
        { ordered: false },
        (error, docs) => {
          callback(error, docs);
        }
      );
    });
  },
  delete: function(query, callback) {
    Headline.remove(query, callback);
  },
  get: function(query, callback) {
    Headline.find(query)
      .sort({ _i: -1 })
      .exec(function(err, doc) {
        callback(doc);
      });
  },
  update: function(query, callback) {
    Headline.update(
      { _id: query._id },
      {
        $set: query
      },
      {},
      callback
    );
  }
};
