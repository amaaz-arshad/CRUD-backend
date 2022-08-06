const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const db = require("./database");
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Api is running");
});

//get all employees
app.get("/api/get", (req, res) => {
  const sqlquery = "SELECT * FROM employees;";
  db.query(sqlquery, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// add an employee
app.post("/api/add", (req, res) => {
  const { employeeName, position, age } = req.body;
  const sqlquery =
    "INSERT INTO employees (employeeName,position,age) VALUES (?,?,?)";
  db.query(sqlquery, [employeeName, position, age], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// delete an employee
app.delete("/api/delete/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const sqlquery = "DELETE FROM employees where id=?";
  db.query(sqlquery, id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

// update an employee
app.put("/api/update/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { employeeName, position, age } = req.body;
  const sqlquery =
    "UPDATE employees SET employeeName=?, position=?, age=? WHERE id=?";
  db.query(sqlquery, [employeeName, position, age, id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
