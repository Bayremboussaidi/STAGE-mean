const express = require("express");
const connection = require("../connection");
const router = express.Router();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const auth = require("../services/authentication");
const { genSaltSync, hashSync } = require("bcrypt");
const bcrypt = require("bcrypt");
const { sign } = require("jsonwebtoken");
// users
router.post("/AddUser", (req, res) => {
  let user = req.body;
  const salt = genSaltSync(10);
  user.motDePasse = hashSync(user.motDePasse, salt);
  query = "select email,motDePasse from users where email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      // verification email not exist
      if (results.length <= 0) {
        query =
          "insert into users(nomPrenom,dateDeNaissance,numDeTelephone,email,motDePasse,role,status) values(?,?,?,?,?,?,?)";
        connection.query(
          query,
          [
            user.nomPrenom,
            user.dateDeNaissance,
            user.numDeTelephone,
            user.email,
            user.motDePasse,
            user.role,
            user.status,
          ],
          (err, results) => {
            if (!err) {
              return res
                .status(200)
                .json({ message: "Successfully Registered" });
            } else {
              return res.status(500).json(err);
            }
          }
        );
      } else {
        return res.status(400).json({ message: "Email déja utilisé !." });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/login", (req, res) => {
  const user = req.body;

  query =
    "SELECT email, motDePasse,role,nomPrenom ,id_User FROM users WHERE email=?";
  connection.query(query, [user.email], (err, results) => {
    if (!err) {
      if (results.length <= 0) {
        return res
          .status(401)
          .json({ message: "Incorrect Email ou bien Password !" });
      }

      const hashedPasswordFromDatabase = results[0].motDePasse;

      bcrypt.compare(
        user.motDePasse,
        hashedPasswordFromDatabase,
        (err, passwordMatch) => {
          if (passwordMatch) {
            const response = {
              email: results[0].email,
              role: results[0].role,
              nomPrenom: results[0].nomPrenom,
              id_User: results[0].id_User,
            };

            const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, {
              expiresIn: "8h",
            });

            res.status(200).json({ token: accessToken, infoUser: response });
          } else {
            return res
              .status(401)
              .json({ message: "Incorrect Email ou bien Password !" });
          }
        }
      );
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getAllUser", (req, res) => {
  var query =
    "select id_User,nomPrenom, DATE_FORMAT(dateDeNaissance, '%Y-%m-%d') AS dateDeNaissance,numDeTelephone,email,role,motDePasse,status from users ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/updateUser", (req, res) => {
  const userBody = req.body;
  const userQuery = req.query;
  var query =
    "update users set nomPrenom=?,dateDeNaissance=?,numDeTelephone=?,email=?,motDePasse=?,role=?,status=? where id_User=?";
  connection.query(
    query,
    [
      userBody.nomPrenom,
      userBody.dateDeNaissance,
      userBody.numDeTelephone,
      userBody.email,
      userBody.motDePasse,
      userBody.role,
      userBody.status,

      userQuery.id_User,
    ],
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
router.delete("/deleteUser", (req, res) => {
  const user = req.query;
  var query = "delete from users where id_User=?";
  connection.query(query, [user.id_User], (err, results) => {
    if (!err) {
      if (results.affectedRows == 0) {
        return res.status(404).json({
          message: "user idUser not exist",
        });
      } else {
        return res.status(200).json({ message: "user delete succefully" });
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/getUserById", (req, res) => {
  const id_User = req.query.id_User;

  if (!id_User) {
    return res.status(400).json({ message: "ID user is missing" });
  }

  const query =
    "SELECT id_User, DATE_FORMAT(dateDeNaissance, '%Y-%m-%d') AS dateDeNaissance, nomPrenom,numDeTelephone, email, motDePasse, role,status FROM users WHERE id_User = ?";

  connection.query(query, [id_User], (err, results) => {
    if (!err) {
      if (results.length === 0) {
        return res.status(404).json({ message: "user not found" });
      } else {
        return res.status(200).json(results[0]);
      }
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/count", (req, res) => {
  // Requête pour récupérer le nombre total de transports dans la base de données
  const query = "SELECT COUNT(id_user) AS UsersCount FROM users";

  // Exécuter la requête
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    // Extraire le nombre total de transports à partir des résultats de la requête
    const UsersCount = results[0].UsersCount;

    // Envoyer le nombre total de transports en tant que réponse JSON
    res.json({ UsersCount });
  });
});
router.patch("/updateMotDePasse", (req, res) => {
  const userBody = req.body;
  const userQuery = req.query;

  // Générer le sel et crypter le nouveau mot de passe
  const salt = bcrypt.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(userBody.motDePasse, salt);

  var query = "update users set motDePasse=? where id_User=?";
  connection.query(
    query,
    [hashedPassword, userQuery.id_User],
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
router.get("/getReclamation", (req, res) => {
  var query = "select nomPrenom,description from reclamation  ";

  connection.query(query, (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/AddReclamation", (req, res) => {
  let rec = req.body;

  let query = "INSERT INTO reclamation (nomPrenom,description) VALUES ( ?, ?)";
  connection.query(query, [rec.nomPrenom, rec.description], (err, results) => {
    if (!err) {
      return res
        .status(200)
        .json({ message: "reclamation enregistré avec succès" });
    } else {
      return res.status(500).json(err);
    }
  });
});
router.get("/countReclamation", (req, res) => {
  // Requête pour récupérer le nombre total de transports dans la base de données
  const query = "SELECT COUNT(id_rec) AS reclamationCount FROM reclamation";

  // Exécuter la requête
  connection.query(query, (error, results, fields) => {
    if (error) {
      console.error("Erreur lors de l'exécution de la requête :", error);
      res
        .status(500)
        .json({ error: "Erreur lors de l'exécution de la requête" });
      return;
    }

    // Extraire le nombre total de transports à partir des résultats de la requête
    const reclamationCount = results[0].reclamationCount;

    // Envoyer le nombre total de transports en tant que réponse JSON
    res.json({ reclamationCount });
  });
});

module.exports = router;
