const User = require("../models/user");

module.exports = {
  // Création d'un nouvel utilisateur
  setUser: async (req, res) => {
    try {
      const {
        contractNR,
        passWord,
        firstName,
        lastName,
        gender,
        activity,
        address,
        location,
        email,
        phone,
      } = req.body;

      // Vérification des champs obligatoires (adapter selon vos besoins)
      if (!contractNR || !passWord || !firstName || !lastName || !email) {
        return res.status(400).json({
          error:
            "Les champs contractNR, passWord, firstName, lastName et email sont obligatoires",
        });
      }

      // Vérification si un utilisateur existe déjà avec cet email
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ error: "Un utilisateur avec cet email existe déjà" });
      }

      // Création et sauvegarde du nouvel utilisateur
      const newUser = new User({
        contractNR,
        passWord,
        firstName,
        lastName,
        gender,
        activity,
        address,
        location,
        email,
        phone,
      });

      await newUser.save();
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Récupération de tous les utilisateurs
  getUsers: async (req, res) => {
    try {
      const users = await User.find();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Vérification des identifiants pour la connexion
  getLogin: async (req, res) => {
    try {
      const { email, passWord } = req.body;

      if (!email || !passWord) {
        return res
          .status(400)
          .json({ error: "Email et passWord sont obligatoires" });
      }

      // Recherche de l'utilisateur par email
      const user = await User.findOne({ email });

      // Retourne le même message d'erreur si l'utilisateur n'existe pas ou si le mot de passe ne correspond pas
      if (!user || user.passWord !== passWord) {
        return res
          .status(401)
          .json({ error: "email et/ou mot de passe incorrect" });
      }

      return res.status(200).json(user);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Mise à jour d'un utilisateur existant (en fonction de son email)
  putUser: async (req, res) => {
    try {
      const { email } = req.params; // L'email doit être fourni dans l'URL (ex: PUT /users/:email)

      const updatedUser = await User.findOneAndUpdate({ email }, req.body, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },

  // Suppression d'un utilisateur (en fonction de son email)
  delUser: async (req, res) => {
    try {
      const { email } = req.params; // L'email doit être fourni dans l'URL (ex: DELETE /users/:email)

      const deletedUser = await User.findOneAndDelete({ email });
      if (!deletedUser) {
        return res.status(404).json({ error: "Utilisateur non trouvé" });
      }

      return res
        .status(200)
        .json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  },
};
