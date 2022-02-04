const express = require("express");
const mysql = require("mysql2");
const inputCheck = require("./db/utils/inputCheck");
const PORT = process.env.PORT || 3001;
const app = express();
const { name, party, age, years_of_experience, votes } = body;

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "NEW_USER_PASSWORD",
    database: "election",
  },
  console.log("Connected to the election database.")
);

// Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });
// db.query(`SELECT * FROM candidates`, (err, rows) => {
//   console.log(rows);
// });
//Get a single candidate
app.get("/api/candidate/:id", (req, res) => {
  const sql = `SELECT * FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, row) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: row,
    });
  });
});

// Delete a candidate
app.delete("/api/candidate/:id", (req, res) => {
  const sql = `DELETE FROM candidates WHERE id = ?`;
  const params = [req.params.id];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.statusMessage(400).json({ error: res.message });
    } else if (!result.affectedRows) {
      res.json({
        message: "Candidate not found",
      });
    } else {
      res.json({
        message: "deleted",
        changes: result.affectedRows,
        id: req.params.id,
      });
    }
  });
});
// Create a candidate
app.post("/api/candidate", ({ body }, res) => {
  //create a candidate
  const { first_name, last_name, industry_connected } = body;
  const sql = `INSERT INTO candidates (first_name, last_name, industry_connected) VALUES (?, ?, ?, ?, ?)`;
  const params = [first_name, last_name, industry_connected];

  db.query(sql, params, (err, result) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: body,
    });
  });
  // Get all candidates
  app.get("/api/candidates", (req, res) => {
    const sql = `SELECT * FROM candidates`;

    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
      res.json({
        message: "success",
        data: rows,
      });
    });
  });
  // // Create a candidate
  // const sql = `INSERT INTO candidates (id, first_name, last_name, industry_connected)
  //               VALUES (?,?,?,?)`;
  // const params = [1, "Ronald", "Firbank", 1];

  // db.query(sql, params, (err, result) => {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log(result);
  // });
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
