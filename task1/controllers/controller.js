const Customer = require("../models/model");

exports.findAll = (req, res) => {
    Customer.getAll(req.query, (err, data) => {
      if (err)
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving company."
        });
      else res.send(data);
    });
};
exports.findOne = (req, res) => {
    Customer.findById(req.query, (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found staffNo with id ${req.query.staffNo}.`
          });
        } else {
          res.status(500).send({
            message: `Error retrieving staffNo with id ${req.query.staffNo}`
          });
        }
      } else res.send(data);
    });
  };