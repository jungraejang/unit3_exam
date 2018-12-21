const express = require("express");
const router = express.Router();
const { getAllSpecies, getSingleSpecies, addNewSpecies } = require("../db/species_queries.js");
//Get
router.get("/", getAllSpecies);
router.get("/:id", getSingleSpecies);
//Post
router.post("/", addNewSpecies);

module.exports = router;
