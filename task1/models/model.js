const sql = require("./db.js");

const Customer = () =>{

}
Customer.getAll = (query, result) => {
  const DB = {
    'order': query.order ? query.order: 'asc',
    'sortColumn': query.sortColumn? query.sortColumn: 'staffNo',
    'pageCount': query.pageCount? query.pageCount: 5,
    'pageNumber': query.pageNumber? query.pageNumber: 1,
  }

  sql.query(`SELECT * FROM staff ORDER BY ${DB.sortColumn} ${DB.order} LIMIT ${DB.pageCount} OFFSET ${DB.pageCount * (DB.pageNumber - 1)} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    result(null, res);
  });
};

Customer.findById = (query, result) => {
  
  sql.query(`SELECT dept.* FROM staff JOIN dept ON staff.deptId = dept.id WHERE staff.staffNo = ${query.staffNo} `, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.length) {
      console.log("found dept: ", res[0]);
      result(null, res[0]);
      return;
    }

    result({ kind: "not_found" }, null);
  });
};
module.exports = Customer;