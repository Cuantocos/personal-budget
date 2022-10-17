const express = require("express");
const connection = require("../connection.js");

const router = express.Router();

//MUESTRA TODAS LAS OPERACIONES
router.get("/", (req, res) => {
  const sql = `SELECT * 
                FROM operations`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//MUESTRA INGRESOS
router.get("/income", (req, res) => {
  const sql = `SELECT * 
                FROM operations
                WHERE type = "entry" `;

  connection.query(sql, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//AGREGA INGRESOS
router.post("/income", (req, res) => {
  const id_user = req.body.id_user;
  const concept = req.body.concept;
  const amount = req.body.amount;
  const date = req.body.date;
  const id_category = req.body.id_category;

  const sql = `INSERT INTO operations(id_user, concept, amount, date, type, id_category)
  VALUES(?, ?, ?, ?, "entry", ?)`;

  connection.query(
    sql,
    [id_user, concept, amount, date, id_category],
    (error, result) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json(result);
      }
    }
  );
});

//MUESTRA EGRESOS
router.get("/expenses", (req, res) => {
  const sql = `SELECT * 
                FROM operations
                WHERE type = "egress" `;

  connection.query(sql, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//AGREGA EGRESOS
router.post("/expenses", (req, res) => {
  const id_user = req.body.id_user;
  const concept = req.body.concept;
  const amount = req.body.amount;
  const date = req.body.date;
  const id_category = req.body.id_category;

  const sql = `INSERT INTO operations(id_user, concept, amount, date, type, id_category)
  VALUES(?, ?, ?, ?, "egress", ?)`;

  connection.query(
    sql,
    [id_user, concept, amount, date, id_category],
    (error, result) => {
      if (error) {
        res.json({ message: error.message });
      } else {
        res.json(result);
      }
    }
  );
});

//MUESTRA OPERACION CON ID ESPECIFICO
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * 
                FROM operations
                WHERE id = ?`;

  connection.query(sql, [id], (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//AGREGA OPERACION
router.post("/", (req, res) => {
  const id_user = req.body.id_user;
  const concept = req.body.concept;
  const amount = req.body.amount;
  const date = req.body.date;
  const type = req.body.type;
  const id_category = req.body.id_category;

  const sql = `INSERT INTO operations(id_user, concept, amount, date, type, id_category)
                VALUES(?, ?, ?, ?, ?, ?)`;

  const values = [id_user, concept, amount, date, type, id_category];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//EDITA OPERACION
router.put("/:id", (req, res) => {
  const concept = req.body.concept;
  const amount = req.body.amount;
  const date = req.body.date;
  const id_category = req.body.id_category;
  const id = req.params.id;

  const sql = `UPDATE operations
              SET concept = ?, 
                amount = ?,
                date = ?, 
                id_category = ?
                WHERE id = ?`;

  const values = [concept, amount, date, id_category, id];

  connection.query(sql, values, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//ELIMINA OPERACION
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `DELETE FROM operations
                WHERE id = ?`;

  connection.query(sql, [id], (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
