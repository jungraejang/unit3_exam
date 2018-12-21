const express = require("express");
const router = express.Router();
const {
  getAllSightings,
  getSightingsByspecies,
  getSightingsByResearcher,
  getSightingsByHabitat,
  addSighting,
  deleteSighting
} = require("../db/sightings_queries.js");

//Get
router.get("/", getAllSightings);
router.get("/species/:id", getSightingsByspecies);
router.get("/researchers/:id", getSightingsByResearcher);
router.get("/habitats/:id", getSightingsByHabitat);

//Post
router.post("/", addSighting);
//Delete
router.delete('/:id', deleteSighting);


module.exports = router;
