const express = require("express");
const cors = require("cors");
const db = require("./db.js");

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/test", (req, res) => {
  // Requête pour récupérer l'utilisateur ayant l'ID = 1
  const query = "SELECT * FROM users WHERE Id = 1";

  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).send("Erreur serveur");
    }

    // Vérification si au moins un enregistrement est trouvé
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet ID" });
    }

    // Retourner le premier résultat (user avec Id=1) sous forme d'objet JSON
    const user = results[0];
    res.json(user);
  });
});
app.get("/api/test", (req, res) => {
  // Requête pour récupérer l'utilisateur ayant l'ID = 1
  const id = req[0];
  const mdp = req[1];
  const query = "SELECT Mdp AND Activity FROM users WHERE Ncontract = req[0]";
  if (query == mdp) {
  }
  db.query(query, (err, results) => {
    if (err) {
      console.error("Erreur lors de la requête :", err);
      return res.status(500).send("Erreur serveur");
    }

    // Vérification si au moins un enregistrement est trouvé
    if (results.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucun utilisateur trouvé avec cet ID" });
    }

    // Retourner le premier résultat (user avec Id=1) sous forme d'objet JSON
    const user = results[0];
    res.json(user);
  });
});

app.listen(port, () => {
  console.log("server online");
});
