require("dotenv").config();
const mongoose = require("mongoose");

// Connexion à MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connexion réussie à MongoDB"))
  .catch((err) => console.error("❌ Erreur de connexion à MongoDB :", err));

// Définition du schéma de l'utilisateur
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    gender: { type: String, enum: ["Homme", "Femme", "Autre"], required: true },
    activity: { type: String, required: true },
    address: { type: String, required: true },
    location: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    status: {
      type: String,
      enum: ["Disponible", "Occupé", "Absent"],
      default: "Disponible",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Définition du schéma du planning
const scheduleSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    startTime: { type: String, default: "" },
    endTime: { type: String, default: "" },
  },
  { timestamps: true }
);

const Schedule = mongoose.model("Schedule", scheduleSchema);

// Fonction pour ajouter un utilisateur
async function addUser(userData) {
  try {
    const existingUser = await User.findOne({ email: userData.email });
    if (existingUser) {
      console.log(
        `ℹ️ L'utilisateur avec l'email ${userData.email} existe déjà.`
      );
      return;
    }

    const newUser = new User(userData);
    await newUser.save();
    console.log("✅ Utilisateur ajouté avec succès :", newUser);
  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de l'utilisateur :", error);
  }
}

// Fonction pour récupérer tous les utilisateurs
async function getAllUsers() {
  try {
    const users = await User.find();
    console.log("📌 Liste des utilisateurs :", users);
  } catch (error) {
    console.error(
      "❌ Erreur lors de la récupération des utilisateurs :",
      error
    );
  }
}

// Fonction pour ajouter un planning vide pour chaque utilisateur
async function addScheduleForUsers() {
  try {
    const users = await User.find();
    if (users.length === 0) {
      console.log("⚠️ Aucun utilisateur trouvé !");
      return;
    }

    for (const user of users) {
      const existingSchedule = await Schedule.findOne({ email: user.email });
      if (!existingSchedule) {
        await Schedule.create({ email: user.email });
        console.log(`✅ Planning ajouté pour ${user.email}`);
      }
    }
  } catch (error) {
    console.error("❌ Erreur lors de la création des plannings :", error);
  }
}

// 📌 Exemple d'utilisation
async function main() {
  try {
    const users = [
      {
        firstName: "Elyes",
        lastName: "Nasri",
        gender: "Homme",
        activity: "Développeur",
        address: "118 rue de Veeweyde",
        location: "Bruxelles",
        email: "elyes.nasri88@gmail.com",
        phone: "0472463796",
        status: "Disponible",
      },
      {
        firstName: "Imad",
        lastName: "Ghali",
        gender: "Homme",
        activity: "Développeur",
        address: "45 rue des Lilas",
        location: "Bruxelles",
        email: "imad.ghali@example.com",
        phone: "0445858596",
        status: "Disponible",
      },
      {
        firstName: "Fauve",
        lastName: "Mareels",
        gender: "Femme",
        activity: "Designer",
        address: "22 avenue des Arts",
        location: "Anvers",
        email: "fauve.mareels@example.com",
        phone: "0465478923",
        status: "Disponible",
      },
      {
        firstName: "Jeffrey",
        lastName: "Deville",
        gender: "Homme",
        activity: "Développeur",
        address: "12 rue du Parc",
        location: "Liège",
        email: "jeffrey.deville@example.com",
        phone: "0456987412",
        status: "Disponible",
      },
    ];

    for (const user of users) {
      await addUser(user);
    }

    await addScheduleForUsers();
    await getAllUsers();
  } catch (error) {
    console.error("❌ Une erreur s'est produite :", error);
  } finally {
    mongoose.connection.close(() =>
      console.log("🔌 Connexion MongoDB fermée.")
    );
  }
}

// Exécuter le script
main();
