const express = require("express");
const router = express.Router();
const {getAllHabitats, getSingleHabitat, addHabitat} = require("../db/habitats_queries.js");
//Get
router.get('/', getAllHabitats)
router.get('/:id', getSingleHabitat)
//Post
router.post('/', addHabitat)

module.exports = router;
