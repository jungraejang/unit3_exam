const express = require("express");
const router = express.Router();
const {
  getAllTaggings,
  getSingleTagging,
  getTagByResearcher,
  getTagByAnimal,
  addNewTag
} = require("../db/taggings_queries.js");

//Get
router.get("/", getAllTaggings);
router.get("/:id", getSingleTagging);
router.get("/researchers/:id", getTagByResearcher);
router.get("/animals/:id", getTagByAnimal);

//post
router.post("/", addNewTag);

module.exports = router;
