module.exports = (req, res, next) => {
    if (!req.session.userId) {
        return res.status(401).json({ error: "Accès non autorisé, veuillez vous connecter." });
    }
    next();
};

// c'est un code qui définit un middlewares.
// cela protège certaine routes (getCurrentUser, getUsers, putUser et delUser) pour s'assurer qu'un utilisateur est bien connecté avant de lui donner accès à ces routes.
// on vérifie si l'utilisateur n'est pas enregistré dans la session. Si il userId n'est pas présent alors il n'est pas connecté.