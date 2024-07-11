const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
const auth = require("../services/authentication");
const check = require("../services/check");
const checkRole = require("../services/checkRole");

router.post("/AddTransport", (req, res) => {
  let transport = req.body;

  let query =
    "INSERT INTO transport (adresseDestination, dateDeDepart, heureDeDepart,prenomTransporteur, status) VALUES ( ?, ?, ?, ?,?)";
  connection.query(
    query,
    [
      transport.adresseDestination,
      transport.dateDeDepart,
      transport.heureDeDepart,
      transport.prenomTransporteur,
      transport.status,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "Transport enregistré avec succès" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.get("/getTransport", (req, res) => {
  var query =
    "select id_transport, adresseDestination,DATE_FORMAT(dateDeDepart, '%Y-%m-%d') AS dateDeDepart,heureDeDepart,prenomTransporteur,status from transport ";
  // "select  t.adresseDestination, DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie, t.heureSortie, DATE_FORMAT(t.dateDeDepart, '%Y-%m-%d') AS dateDeDepart, t.heureDeDepart,t.prenom,t.status,u.nom as nomUsers from transport as t inner join users as u where t.id_User=u.id_User and status='true' ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getTransportById", (req, res) => {
  const id_transport = req.query.id_transport; // Récupérer l'ID de la requête

  if (!id_transport) {
    return res.status(400).json({ message: "ID transport is missing" });
  }

  const query =
    "SELECT id_transport,adresseDestination, DATE_FORMAT(dateDeDepart, '%Y-%m-%d') AS dateDeDepart, heureDeDepart, prenomTransporteur, status FROM transport WHERE id_transport = ?";

  connection.query(query, [id_transport], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "Transport not found" });
      } else {
        return res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});

router.post("/updateTransport", (req, res) => {
  const transportBody = req.body;
  const transportQuery = req.query;
  const query =
    "UPDATE transport SET adresseDestination=?, dateDeDepart=?, heureDeDepart=?, prenomTransporteur=?  ,status=? WHERE id_transport=?";
  connection.query(
    query,
    [
      transportBody.adresseDestination,

      transportBody.dateDeDepart,
      transportBody.heureDeDepart,
      transportBody.prenomTransporteur,
      transportBody.status,
      transportQuery.id_transport,
    ],
    (err, results) => {
      if (!err) {
        if (results.affectedRows === 0) {
          return res.status(404).json({
            message: "Transport does not exist",
          });
        } else {
          return res
            .status(200)
            .json({ message: "Transport updated successfully" });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});

router.delete("/deleteTransport", (req, res) => {
  const transport = req.query;
  var query = "delete from transport where id_transport=?";
  connection.query(query, [transport.id_transport], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          message: "idTransport not exist",
        });
      } else {
        return res.status(200).json({ message: "transport delete succefully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post(
  "/updatestatus",
  auth.authenticateToken,
  checkRole.checkRole,
  (req, res) => {
    const transport = req.body;
    var query = "update  transport set status=? where idTransport=?";
    connection.query(
      query,
      [transport.status, transport.idTransport],
      (err, results) => {
        if (!err) {
          if (results.affectedRows == 0) {
            return res.status(404).json({
              message: "users idUser does not exist",
            });
          }
          return res.status(200).json({ message: "user update succefully" });
        } else {
          return res.status(500).json(err);
        }
      }
    );
  }
);
router.post("/AddReservationTransport", (req, res) => {
  let transportBody = req.body;

  let query =
    "INSERT INTO reservation_transport (nomPrenom,adresseDestination,prenomTransporteur, dateSortie, heureSortie) VALUES ( ?,?,?, ?, ?)";
  connection.query(
    query,
    [
      transportBody.nomPrenom,
      transportBody.adresseDestination,
      transportBody.prenomTransporteur,
      transportBody.dateSortie,
      transportBody.heureSortie,
    ],
    (err, results) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "La réservation a été enregistrée avec succès" });
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
router.get("/getReservationTransport", (req, res) => {
  var query =
    "select id,adresseDestination, DATE_FORMAT(dateSortie, '%Y-%m-%d') AS dateSortie,heureSortie, nomPrenom,prenomTransporteur, statusReservation FROM reservation_transport";
  //"select t.id, t.adresseDestination,DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie,t.heureSortie,t.prenomTransporteur,u.nomPrenom  as nomUsers  from reservation_transport as t inner join users as u where t.id_User=u.id_User ";
  // "select  t.adresseDestination, DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie, t.heureSortie, DATE_FORMAT(t.dateDeDepart, '%Y-%m-%d') AS dateDeDepart, t.heureDeDepart,t.prenom,t.status,u.nom as nomUsers from transport as t inner join users as u where t.id_User=u.id_User and status='true' ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getReservationTransportByStatus", (req, res) => {
  var query =
    "select id,adresseDestination, DATE_FORMAT(dateSortie, '%Y-%m-%d') AS dateSortie,heureSortie, nomPrenom,prenomTransporteur, statusReservation FROM reservation_transport where statusReservation='en attente'";
  //"select t.id, t.adresseDestination,DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie,t.heureSortie,t.prenomTransporteur,u.nomPrenom  as nomUsers  from reservation_transport as t inner join users as u where t.id_User=u.id_User ";
  // "select  t.adresseDestination, DATE_FORMAT(t.dateSortie, '%Y-%m-%d') AS dateSortie, t.heureSortie, DATE_FORMAT(t.dateDeDepart, '%Y-%m-%d') AS dateDeDepart, t.heureDeDepart,t.prenom,t.status,u.nom as nomUsers from transport as t inner join users as u where t.id_User=u.id_User and status='true' ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/count", (req, res) => {
  const query = "SELECT COUNT(id) AS TransportCount FROM reservation_transport";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    const TransportCount = results[0].TransportCount;

    res.json({ TransportCount });
  });
});
router.get("/getAdresse", (req, res) => {
  var query = "select * from transport  ";
  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/countOfNamesPerAddress", (req, res) => {
  const query =
    "SELECT adresseDestination, COUNT(nomPrenom) AS countOfNames FROM reservation_transport GROUP BY adresseDestination";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});

router.get("/countReservation", (req, res) => {
  const query =
    "SELECT COUNT(statusReservation) AS reservationAttente FROM reservation_transport WHERE statusReservation='en attente'";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    // Assurez-vous d'accéder à la colonne correctement (reservationAttente)
    const countReservation = results[0].reservationAttente;

    res.json({ countReservation });
  });
});
router.get("/countReservationAnnuler", (req, res) => {
  const query =
    "SELECT COUNT(statusReservation) AS reservationAnnuler FROM reservation_transport WHERE statusReservation='annuler'";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    // Assurez-vous d'accéder à la colonne correctement (reservationAttente)
    const reservationAnnuler = results[0].reservationAnnuler;

    res.json({ reservationAnnuler });
  });
});
router.get("/countReservationConfirmer", (req, res) => {
  const query =
    "SELECT COUNT(statusReservation) AS reservationConfirmer FROM reservation_transport WHERE statusReservation='confirmer'";

  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    // Assurez-vous d'accéder à la colonne correctement (reservationAttente)
    const reservationConfirmer = results[0].reservationConfirmer;

    res.json({ reservationConfirmer });
  });
});
router.get("/getReservationById", (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ message: "ID reservation is missing" });
  }

  const query =
    "SELECT id,adresseDestination, DATE_FORMAT(dateSortie, '%Y-%m-%d') AS dateSortie,heureSortie, nomPrenom,prenomTransporteur, statusReservation FROM reservation_transport WHERE id = ?";

  connection.query(query, [id], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "reservation not found" });
      } else {
        return res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/updateStatusResevation", (req, res) => {
  const userBody = req.body;
  const userQuery = req.query;
  var query = "update reservation_transport set statusReservation=? where id=?";
  connection.query(
    query,
    [userBody.statusReservation, userQuery.id],
    (err, results) => {
      if (!err) {
        if (results.affectedRows == 0) {
          return res.status(404).json({
            message: "user idUser not exist",
          });
        } else {
          return res.status(200).json({ message: "user update succefully" });
        }
      } else {
        return res.status(500).json(err);
      }
    }
  );
});
module.exports = router;
