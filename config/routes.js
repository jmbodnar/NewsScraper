const scrape = require("../scripts/scrape");

const headlinesController = require("../controllers/headlines");
const notesController = require("../controllers/notes");

module.exports = function(router) {
  router.get("/", (request, response) => {
    response.render("home");
  });

  router.get("/saved", (request, response) => {
    response.render("saved");
  });

  router.get("/api/fetch", (request, response) => {
    headlinesController.fetch((error, docs) => {
      if (!docs || docs.insertedCount === 0) {
        response.json({
          messae: "No new articles today. Check tomorrow."
        });
      } else {
        response.json({
          message: "Added " + docs.insertedCount + " new articles."
        });
      }
    });
  });

  router.get("/api/headlines", (request, response) => {
    let query = {};
    if (request.query.saved) {
      query = request.query;
    }

    headlinesController.get(query, data => {
      response.json(data);
    });
  });

  router.delete("/api/headlines/:id", (request, response) => {
    const query = {};
    query._id = req.params.id;
    headlinesController.delete(query, function(error, data) {
      response.json(data);
    });
  });

  router.patch("/api/headlines", (request, response) => {
    headlinesController.update(request.body, (error, data) => {
      response.json(data);
    });
  });

  router.get("/api/notes/:headline_id?", (request, response) => {
    const query = {};
    if (request.params.headline_id) {
      query._id = request.params.headline_id;
    }

    notesController.get(query, (error, data) => {
      response.json(data);
    });
  });

  router.delete("/api/notes/:id", (request, response) => {
    const query = {};
    query._id = request.params.id;
    notesController.delete(query, (error, data) => {
      response.json(data);
    });
  });

  router.post("/api/notes", (request, response) => {
    notesController.save(request.body, data => {
      response.json(data);
    });
  });
};
