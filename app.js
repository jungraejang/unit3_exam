const express = require("express");
const app = express();
const researchers = require("./routes/researchers.js");
const species = require("./routes/species.js");
const animals = require("./routes/animals.js");
const habitats = require("./routes/habitats.js");
const taggings = require("./routes/taggings.js");
const sightings = require("./routes/sightings.js")

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/researchers", researchers);
app.use("/species", species);
app.use("/animals", animals);
app.use("/habitats", habitats);
app.use("/taggings", taggings);
app.use("/sightings", sightings);

app.get("/", (req, res) => {
  res.send("Welcome to University of JRJ Marine Biology Department");
});

app.get("/*", (req, res) => {
  res.send("404 Page Not Found, like real life Kraken");
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
