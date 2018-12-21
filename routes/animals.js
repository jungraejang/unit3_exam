const express = require("express");
const router = express.Router();
const {
  getAllAnimals,
  getSingleAnimal,
  addAnimalData,
  updateAnimalInfo,
  deleteAnimalInfo
} = require("../db/animals_queries.js");
//Get
router.get("/", getAllAnimals);
router.get("/:id", getSingleAnimal);
//post
router.post("/", addAnimalData);
//Patch
router.patch("/:id", updateAnimalInfo);
//Delete
router.delete("/:id", deleteAnimalInfo);


module.exports = router;
