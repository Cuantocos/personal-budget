const mySql = require("mysql2");

const connection = mySql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "db_adm_pres",
});

connection.connect((error) => {
  if (error) {
    console.log(error.message);
  } else {
    console.log("Successful connection");
  }
});

module.exports = connection;
