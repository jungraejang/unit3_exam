const { db } = require("./index.js");

const getAllAnimals = (req, res, next) => {
  db.any(
    "SELECT species.name AS species, animals.* FROM animals JOIN species ON species.id=animals.species_id"
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received all animals data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleAnimal = (req, res, next) => {
  let animalId = Number(req.params.id);
  db.one(
    "SELECT species.name AS species, animals.* FROM animals JOIN species ON species.id=animals.species_id WHERE animals.id=$1",
    [animalId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Successfully retrived single animal data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addAnimalData = (req, res, next) => {
  db.none(
    "INSERT INTO animals(species_id, nickname) VALUES(${species_id}, ${nickname})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Added an animal successfully"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const updateAnimalInfo = (req, res, next) => {
  const animalId = Number(req.params.id);
  let queryString = "UPDATE animals SET ";
  if (req.body.species_id && req.body.nickname) {
    queryString += `species_id=${req.body.species_id}, nickname='${
      req.body.nickname
    }'`;
  } else if (req.body.species_id) {
    queryString += `species_id=${req.body.species_id}`;
  } else {
    queryString += `nickname='${req.body.nickname}'`;
  }
  queryString += `WHERE id = ${animalId}`;
  db.none(queryString)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "successfully updated animal info"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteAnimalInfo = (req, res, next) => {
  const animalId = parseInt(req.params.id);
  db.none("DELETE FROM animals WHERE id=$1", [animalId])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted an animal info"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllAnimals,
  getSingleAnimal,
  addAnimalData,
  updateAnimalInfo,
  deleteAnimalInfo
};
