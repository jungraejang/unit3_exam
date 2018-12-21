const express = require("express");
const router = express.Router();
const {
  getAllResearchers,
  getSingleResearcher,
  addResearcher,
  updateResearcherInfo,
  deleteResearcher
} = require("../db/researchers_queries.js");
//Get
router.get("/", getAllResearchers);
router.get("/:id", getSingleResearcher);
//Post
router.post("/", addResearcher);
//Patch
router.patch("/:id", updateResearcherInfo)
//Delete
router.delete("/:id", deleteResearcher)

module.exports = router;
