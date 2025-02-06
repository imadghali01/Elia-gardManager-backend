const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const port = 3306;
const users = require("./routes/users");
const admins = require("./routes/admins");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", users);
app.use("/admins", admins);

// Récupérer la chaîne de connexion depuis le fichier .env
const uri = process.env.MONGO_URI;

// Créer une instance de MongoClient
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Fonction asynchrone qui démarre le serveur après connexion à la DB
async function startServer() {
  try {
    // Se connecter à MongoDB Atlas
    await client.connect();
    console.log("Connexion réussie à MongoDB Atlas !");

    // Choisir la base de données (ici "myTask")
    const db = client.db("myTask");

    // Exemple de route qui récupère tous les documents de la collection "users"
    app.get("/gard-manager/test", async (req, res) => {
      try {
        // Accéder à la collection "users"
        const usersCollection = db.collection("users");
        // Récupérer tous les utilisateurs sous forme de tableau
        const users = await usersCollection.find({}).toArray();
        // Retourner les données au format JSON
        res.json(users);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des utilisateurs :",
          error
        );
        res.status(500).send("Erreur serveur");
      }
    });

    // Démarrer le serveur Express
    app.listen(port, () => {
      console.log(`Serveur en ligne sur le port ${port}`);
    });
  } catch (error) {
    console.error("Erreur lors de la connexion à MongoDB :", error);
  }
}

// Lancer la fonction de démarrage
startServer();
