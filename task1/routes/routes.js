module.exports = app => {
    const customers = require("../controllers/controller");
    app.get("/staffs", customers.findAll);
    app.get("/dept", customers.findOne);
};