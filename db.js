require('dotenv').config();
const { MongoClient } = require('mongodb');

const client = new MongoClient(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

async function connectToDB() {
    try {
        await client.connect();
        console.log("✅ Connexion réussie à MongoDB Atlas !");
        return client.db('myTask');
    } catch (error) {
        console.error("❌ Erreur de connexion à MongoDB :", error);
    }
}

// ** CREATE : Ajouter un utilisateur s'il n'existe pas déjà **
async function addUser(userData) {
    const db = await connectToDB();
    const collection = db.collection('users');

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await collection.findOne({ email: userData.email });
    if (existingUser) {
        console.log(`ℹ️ Utilisateur avec l'email ${userData.email} existe déjà.`);
        return;
    }

    // Ajouter l'utilisateur
    const result = await collection.insertOne(userData);
    console.log('✅ Utilisateur ajouté :', result.insertedId);
}

// ** READ : Récupérer tous les utilisateurs **
async function getAllUsers() {
    const db = await connectToDB();
    const collection = db.collection('users');
    const users = await collection.find().toArray();
    console.log('📌 Liste des utilisateurs :', users);
}

// ** CREATE : Ajouter un planning vide pour chaque utilisateur **
async function addScheduleForUsers() {
    const db = await connectToDB();
    const usersCollection = db.collection('users');
    const scheduleCollection = db.collection('schedule');

    // Récupérer tous les utilisateurs
    const users = await usersCollection.find().toArray();

    if (users.length === 0) {
        console.log("⚠️ Aucun utilisateur trouvé !");
        return;
    }

    // Créer des plannings pour chaque utilisateur
    const schedules = users.map(user => ({
        email: user.email, 
        startTime: "", 
        endTime: ""    
    }));

    // Insérer les plannings en évitant les doublons
    for (const schedule of schedules) {
        const existingSchedule = await scheduleCollection.findOne({ email: schedule.email });
        if (!existingSchedule) {
            await scheduleCollection.insertOne(schedule);
            console.log(`✅ Planning ajouté pour ${schedule.email}`);
        }
    }
}

// 📌 Exemple d'utilisation
async function main() {
    try {
        await addUser({
            firstName: "Elyes",
            lastName: "Nasri",
            gender: "Homme",
            activity: "Développeur",
            address: "118 rue de Veeweyde",
            location: "Bruxelles",
            email: "elyes.nasri88@gmail.com",
            phone: "0472463796",
            status: "Disponible"
        });

        await addUser({
            firstName: "Imad",
            lastName: "Ghali",
            gender: "Homme",
            activity: "Développeur",
            address: "45 rue des Lilas",
            location: "Bruxelles",
            email: "imad.ghali@example.com",
            phone: "0445858596",
            status: "Disponible"
        });

        await addUser({
            firstName: "Fauve",
            lastName: "Mareels",
            gender: "Femme",
            activity: "Designer",
            address: "22 avenue des Arts",
            location: "Anvers",
            email: "fauve.mareels@example.com",
            phone: "0465478923",
            status: "Disponible"
        });

        await addUser({
            firstName: "Jeffrey",
            lastName: "Deville",
            gender: "Homme",
            activity: "Développeur",
            address: "12 rue du Parc",
            location: "Liège",
            email: "jeffrey.deville@example.com",
            phone: "0456987412",
            status: "Disponible"
        });

        await addScheduleForUsers();

        await getAllUsers();
    } catch (error) {
        console.error("❌ Une erreur s'est produite :", error);
    } finally {
        await client.close();
        console.log("🔌 Connexion MongoDB fermée.");
    }
}

// Exécuter le script
main();
