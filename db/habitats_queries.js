const { db } = require("./index.js");

const getAllHabitats = (req, res, next) => {
  db.any("SELECT * FROM habitats")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "received all habitats data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleHabitat = (req, res, next) => {
  let habitatId = Number(req.params.id);
  db.one("SELECT * FROM habitats WHERE id=$1", [habitatId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received specific habitat info",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addHabitat = (req, res, next) => {
  db.none("INSERT INTO habitats(category) VALUES(${category})", req.body)
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Added a habitat info'
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = { getAllHabitats, getSingleHabitat, addHabitat };
