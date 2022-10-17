const express = require("express");
const connection = require("../connection.js");

const router = express.Router();

//DEVUELVE TODAS LAS CATEGORIAS
router.get("/", (req, res) => {
  const sql = `SELECT *
                FROM categories`;

  connection.query(sql, (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//DEVUELVE CATEGORIA CON ID ESPECIFICO
router.get("/:id", (req, res) => {
  const id = req.params.id;

  const sql = `SELECT * 
                  FROM categories
                  WHERE id = ?`;

  connection.query(sql, [id], (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//AGREGA CATEGORIA
router.post("/", (req, res) => {
  const name = req.body.name;

  const sql = `INSERT INTO categories(name, type)
                  VALUES(?, "NULL")`;

  connection.query(sql, [name], (error, result) => {
    if (error) {
      res.json({ message: error.message });
    } else {
      res.json(result);
    }
  });
});

//EDITA CATEGORIA
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  const sql = `UPDATE categories
                SET name = ?
                  WHERE id = ?`;

  connection.query(sql, [name, id], (error, result) => {
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

  const sql = `DELETE FROM categories
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
