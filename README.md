# 🚩 Sommaire

### ✨ Fonctionnalités principales

### 🔧 Prérequis et installation

### 📂 Structure du projet

### ⚙️ Configuration de l'environnement

### ▶️ Lancement de l'application

### 🛠 Utilisation et endpoints

### ✅ Tests et vérifications




#### ✨ Fonctionnalités principales

- Authentification utilisateur (login/logout via sessions)
- CRUD (Create, Read, Update, Delete) sur :
        Les utilisateurs (User)
        Les plannings (Schedule)
        Les statuts (Status)
        Les switches (Switch)
- Validation des switches : Possibilité de modifier les utilisateurs assignés sur des créneaux dans une plage de dates donnée
- Gestion de la session avec express-session (enregistrée côté serveur)

🔧 Prérequis et installation

    Node.js (version 14 ou supérieure recommandée)
    npm ou yarn (pour installer les dépendances)

Étapes d’installation

### 1. Cloner ce dépôt Git
        git clone https://github.com/<votre-compte>/nom-du-projet.git

### 2. Aller dans le dossier du projet
        cd nom-du-projet        

### 3. Installer les dépendances
        npm install



#### 📂 Structure du projet

```
├── backend
│   ├── config
│   │   └── connection.js        # Connexion MongoDB
│   ├── controllers              # Contrôleurs
│   │   ├── schedule.controller.js
│   │   ├── status.controller.js
│   │   ├── switch.controller.js
│   │   └── user.controller.js
│   ├── models                   # Modèles Mongoose
│   │   ├── schedule.js
│   │   ├── status.js
│   │   ├── switch.js
│   │   └── user.js
│   ├── routes                   # Définition des routes
│   │   ├── schedule.routes.js
│   │   ├── status.routes.js
│   │   ├── switch.routes.js
│   │   └── user.routes.js
│   └── ...
├── .env                         # Fichier d'environnement (à créer)
├── package.json
└── server.js                    # Point d'entrée principal (Express)
```



#### ⚙️ Configuration de l'environnement

Créez un fichier .env à la racine du projet (au même niveau que package.json et server.js) et ajoutez-y :

        MONGO_URI=mongodb://<votre-URI-MongoDB>
        SESSION_SECRET=<une-chaîne-de-caractères-secrète>

- MONGO_URI : L’URL de connexion à votre base de données MongoDB
- SESSION_SECRET : Une clé secrète pour chiffrer les sessions (utilisée par express-session)

Note : Ne commitez pas ce fichier dans un dépôt public (assurez-vous qu’il est ignoré dans votre .gitignore).

#### ▶️ Lancement de l'application

Après avoir configuré votre .env, vous pouvez lancer le serveur Express en utilisant :

        npm start

Ou en mode développement (si vous avez un script "dev" dans votre package.json, par exemple via nodemon) :

        npm run dev

Par défaut, le serveur tourne sur le port 8000 (modifiable dans server.js).
Vous devriez voir dans la console :

        🐍 Serveur en ligne sur le port 8000
        ✅ Connecté à MongoDB avec succès !



#### 🛠 Utilisation et endpoints

Une fois le serveur lancé, vous pouvez tester les routes depuis un outil tel que Postman, Insomnia ou un simple client HTTP.
1. Users (/user)

- POST /user : Créer un nouvel utilisateur
- POST /user/login : Connecter un utilisateur
- GET /user/logout : Déconnecter un utilisateur (supprime la session)
- GET /user/me : Récupérer l’utilisateur actuellement connecté (via la session)
- GET /user : Récupérer la liste de tous les utilisateurs
- PUT /user/:id : Mettre à jour un utilisateur (par son ID)
- DELETE /user/:id : Supprimer un utilisateur (par son ID)

2. Schedules (/schedule)

- POST /schedule : Créer un nouveau planning
- GET /schedule : Récupérer tous les plannings
- PUT /schedule/:id : Mettre à jour un planning (par son ID)
- PUT /schedule : Valider un switch et mettre à jour les plannings concernés (la route validateSwitch)
- DELETE /schedule/:id : Supprimer un planning (par son ID)

3. Status (/status)

- POST /status : Créer un nouveau statut
- GET /status : Récupérer la liste de tous les statuts
- PUT /status/:id : Mettre à jour un statut (par son ID)

4. Switch (/switch)

- POST /switch : Créer un nouveau switch
- GET /switch : Récupérer la liste de tous les switches
- GET /switch/:id : Récupérer le “solde” (balance) de jours d’un utilisateur
- PUT /switch/:id : Mettre à jour le state d’un switch (par son ID)
- DELETE /switch/:id : Supprimer un switch (par son ID)



#### ✅ Tests et vérifications

Pour tester les routes :

- Installer Postman (ou Insomnia, ou un autre client API)
- Vérifier l’URL de votre serveur (ex. http://localhost:8000)
- Tester chaque endpoint en respectant les méthodes (POST, GET, PUT, DELETE)
- Passer les données nécessaires dans req.body ou req.params selon la documentation ci-dessus

Exemple pour créer un utilisateur via Postman :

- Méthode : POST
    URL : http://localhost:8000/user
- Headers :
    Content-Type: application/json
- Body (raw, JSON) :

            {
              "passWord": "monMotDePasse",
              "fullName": "John Doe",
              "email": "john@example.com"
            }

