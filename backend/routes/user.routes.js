const express = require("express");
// const authMiddleware = require("../middlewares/authMiddlewares");
const router = express.Router();

const {
  setUser,
  login,
  logout,
  getUsers,
  getCurrentUser,
  putUser,
  delUser,
} = require("../controllers/user.controller.js");

// Création d'un utilisateur 
router.post("/", setUser);

// Connexion
router.post("/login", login);

// Déconnexion
router.get("/logout", logout);

// Récupérer de l'utilisatuer connecté
router.get("/me",getCurrentUser);

// Récupération de tous les utilisateurs
router.get("/", getUsers);

// Mise à jour d'un utilisateur 
router.put("/:id",putUser);

// Supperssion d'un utilisateur 
router.delete("/:id",delUser);

module.exports = router;
