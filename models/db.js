require("dotenv").config();
const mongoose = require("mongoose");

// Fonction pour ajouter un planning vide pour chaque utilisateur

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
