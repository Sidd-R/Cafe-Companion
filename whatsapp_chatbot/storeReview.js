const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "Apples123mysql*",
  database: "coffee",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("Connected to database!");
  }
});

const storeReview = (data) => {
  const query = `INSERT INTO reviews (user, review, rating) VALUES (?, ?, ?)`;
  const values = [data.from, data.comment, data.stars];
  connection.query(query, values, (err, results) => {
    if (err) {
      console.log(err);
    }
  });
};

module.exports = { storeReview };
