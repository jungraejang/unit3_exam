const { db } = require("./index.js");

const getAllTaggings = (req, res, next) => {
  db.any("SELECT * FROM taggings")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received all tagging data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleTagging = (req, res, next) => {
  const tagId = Number(req.params.id);
  db.one("SELECT * FROM taggings WHERE id=$1", [tagId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Retrived single tag data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getTagByResearcher = (req, res, next) => {
  const researcherId = Number(req.params.id);
  db.any(
    "SELECT * FROM taggings JOIN researchers ON researchers.id=taggings.researcher_id WHERE researchers.id=$1",
    [researcherId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Successfully retrived tag data by researcher ID",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getTagByAnimal = (req, res, next) => {
  const animalId = Number(req.params.id);
  db.any(
    "SELECT taggings.*, animals.nickname FROM taggings JOIN animals ON animals.id=taggings.animal_id WHERE animals.id=$1",
    [animalId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Successfully retrived tag data by animal ID",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addNewTag = (req, res, next) => {
  db.none(
    "INSERT INTO taggings(animal_id, researcher_id) VALUES(${animal_id}, ${researcher_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Added a new tagging data"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllTaggings,
  getSingleTagging,
  getTagByResearcher,
  getTagByAnimal,
  addNewTag
};
