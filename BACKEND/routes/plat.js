const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();

router.post("/AddPlat", (req, res) => {
  let plat = req.body;
  let query = "insert into repas(nomPlat,status) values(?,?)";
  connection.query(query, [plat.nomPlat, plat.status], (err, results) => {
    if (!err) {
      return res.status(200).json({ message: "plat enregistré avec succès" });
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getPlat", (req, res) => {
  var query = "select nomPlat,id_plat,status from repas  ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/updatePlat", (req, res) => {
  const platBody = req.body;
  const platQuery = req.query;

  var query = "update repas set nomPlat=?,status=? where id_plat=?";

  connection.query(
    query,
    [platBody.nomPlat, platBody.status, platQuery.id_plat],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({
            message: "plat not exist",
          });
        } else {
          return res.status(200).json({ message: "plat update succefully" });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
router.delete("/deletePlat", (req, res) => {
  const plat = req.query;
  var query = "delete from repas where id_plat=?";
  connection.query(query, [plat.id_plat], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          message: "idPlat not exist",
        });
      } else {
        return res.status(200).json({ message: "plat delete succefully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getPlatById", (req, res) => {
  const id_plat = req.query.id_plat; // Récupérer l'ID de la requête

  if (!id_plat) {
    return res.status(400).json({ message: "ID plat is missing" });
  }

  const query = "SELECT id_plat,nomPlat,status FROM repas WHERE id_plat = ?";

  connection.query(query, [id_plat], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "plat not found" });
      } else {
        return res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getcommandeRepas", (req, res) => {
  var query =
    "select  nomPlat, DATE_FORMAT(date, '%Y-%m-%d') AS date,nomPrenom from commande_Repas ";
  // "select  t.adresseDestination, DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie, t.heureSortie, DATE_FORMAT(t.dateDeDepart, '%Y-%m-%d') AS dateDeDepart, t.heureDeDepart,t.prenom,t.status,u.nom as nomUsers from transport as t inner join users as u where t.id_User=u.id_User and status='true' ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getnomPlat", (req, res) => {
  var query = "select nomPlat from repas  ";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/AddCommanderPlat", (req, res) => {
  let plat = req.body;
  let query =
    "insert into  commande_Repas(nomPrenom,nomPlat,date) values(?,?,?)";
  connection.query(
    query,
    [plat.nomPrenom, plat.nomPlat, plat.date],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "commande enregistré avec succès" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
router.get("/count", (req, res) => {
  const query = "SELECT COUNT(id) AS repasCount FROM commande_Repas";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    const repasCount = results[0].repasCount;
    res.json({ repasCount });
  });
});
module.exports = router;
