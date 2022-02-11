const express = require("express");
const router = express.Router();
const db = require("../../db/connection");
const inputCheck = require("../../db/utils/inputCheck");
router.get("/voters", (req, res) => {
  const sql = `SELECT * FROM voters ORDER BY last_name`;
  // Get single voter
  router.get("/voter/:id", (req, res) => {
    const sql = `SELECT * FROM voters WHERE id = ?`;
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
module.exports = router;
