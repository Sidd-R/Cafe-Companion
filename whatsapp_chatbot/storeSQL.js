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

const storeOrder = (data) => {
  data = JSON.parse(data);
  const query = `INSERT INTO orders (name, quantity, type, total, customer_no) VALUES (?, ?, ?, ?, ?)`;
  const customer_no = data.name;
  const items = data.items;
  items.forEach((order) => {
    if (order.type == "Medium") {
      const total_query = "SELECT med_price FROM menu WHERE name = ?";
      connection.query(total_query, [order.name], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const total = results[0].med_price * order.quantity;
          const values = [
            order.name,
            order.quantity,
            order.type,
            total,
            customer_no,
          ];
          connection.query(query, values, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    } else {
      const total_query = "SELECT large_price FROM menu WHERE name = ?";
      connection.query(total_query, [order.name], (err, results) => {
        if (err) {
          console.log(err);
        } else {
          const total = results[0].large_price * order.quantity;
          const values = [
            order.name,
            order.quantity,
            order.type,
            total,
            customer_no,
          ];
          connection.query(query, values, (err, results) => {
            if (err) {
              console.log(err);
            }
          });
        }
      });
    }
  });
};

module.exports = { storeOrder };
