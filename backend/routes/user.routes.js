const express = require("express");
const authMiddleware = require("../middlewares/authMiddlewares");
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
router.get("/me", authMiddleware,getCurrentUser);

// Récupération de tous les utilisateurs
router.get("/", authMiddleware,getUsers);

// Mise à jour d'un utilisateur 
router.put("/:id", authMiddleware,putUser);

// Supperssion d'un utilisateur 
router.delete("/:id", authMiddleware,delUser);

module.exports = router;
