const { db } = require("./index.js");

const getAllSpecies = (req, res, next) => {
  db.any("SELECT * FROM species")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received all species data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleSpecies = (req, res, next) => {
  let speciesId = Number(req.params.id);
  db.one("SELECT * FROM species WHERE id=$1", [speciesId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received single species data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addNewSpecies = (req, res, next) => {
  db.none(
    "INSERT INTO species(name, is_mammal) VALUES(${name}, ${is_mammal})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Added a new species"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllSpecies,
  getSingleSpecies,
  addNewSpecies
};
