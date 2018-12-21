const { db } = require("./index.js");

const getAllResearchers = (req, res, next) => {
  db.any("SELECT * FROM researchers")
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received all researchers data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const getSingleResearcher = (req, res, next) => {
  let researcherId = parseInt(req.params.id);
  db.one("SELECT * FROM researchers WHERE id=${id}", {
    id: researcherId
  })
    .then(data => {
      res.status(200).json({
        status: "success",
        message: "Received researcher data",
        data: data
      });
    })
    .catch(err => {
      return next(err);
    });
};

const addResearcher = (req, res, next) => {
  db.none(
    "INSERT INTO researchers(name, job_title) VALUES(${name}, ${job_title})",
    req.body
  )
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Added a research profile"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const updateResearcherInfo = (req, res, next) => {
  const researcherId = Number(req.params.id);
  let queryString = "UPDATE researchers SET ";
  if (req.body.name && req.body.job_title) {
    queryString += `name='${req.body.name}', job_title = '${
      req.body.job_title
    }'`;
  } else if (req.body.name) {
    queryString += `name='${req.body.name}'`;
  } else {
    queryString += `job_title='${req.body.job_title}'`;
  }
  queryString += `WHERE id = ${researcherId}`;
  db.none(queryString)
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Successfully update info"
      });
    })
    .catch(err => {
      return next(err);
    });
};

const deleteResearcher = (req, res, next) => {
  const researcherId = Number(req.params.id);
  db.none("DELETE FROM researchers WHERE id=$1", [researcherId])
    .then(() => {
      res.status(200).json({
        status: "success",
        message: "Successfully deleted a researcher info"
      });
    })
    .catch(err => {
      return next(err);
    });
};

module.exports = {
  getAllResearchers,
  getSingleResearcher,
  addResearcher,
  updateResearcherInfo,
  deleteResearcher
};
