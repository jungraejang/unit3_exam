const { db } = require("./index.js");

const getAllSightings = (req, res, next) => {
  db.any("SELECT * FROM sightings")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received all sightings data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSightingsByspecies = (req, res, next) => {
  let speciesId = Number(req.params.id);
  db.any(
    "SELECT sightings.*, species.name AS species FROM sightings JOIN species ON species.id=sightings.species_id WHERE species.id=$1",
    [speciesId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Successfully retrived sighting data by species",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSightingsByResearcher = (req, res, next) => {
  let researcherId = Number(req.params.id);
  db.any(
    "SELECT sightings.*, researchers.name, habitats.category AS location FROM sightings JOIN researchers ON researchers.id=sightings.researcher_id JOIN habitats ON habitats.id=sightings.habitat_id WHERE researchers.id=$1",
    [researcherId]
  )
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "successfully retrived data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSightingsByHabitat = (req, res, next) => {
  let habitatId = Number(req.params.id);
  db.any("SELECT * FROM sightings WHERE habitat_id=$1", [habitatId])
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Successfully retrived data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addSighting = (req, res, next) => {
  req.body.researcher_id = parseInt(req.body.researcher_id);
  req.body.species_id = parseInt(req.body.species_id);
  req.body.habitat_id = parseInt(req.body.habitat_id);
  db.none(
    "INSERT INTO sightings(researcher_id, species_id, habitat_id) VALUES(${researcher_id}, ${species_id}, ${habitat_id})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Added new sighting data"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteSighting = (req, res, next) => {
  let sightingId = req.params.id;
  db.none("DELETE FROM sightings WHERE id=$1", [sightingId])
  .then(() => {
    res.status(200).json({
      status: 'success',
      message: 'Successfully deleted a sighting data'
    })
  })
  .catch(err => {
    return next(err);
  })
}

module.exports = {
  getAllSightings,
  getSightingsByspecies,
  getSightingsByResearcher,
  getSightingsByHabitat,
  addSighting,
  deleteSighting
};
