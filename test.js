async function getSwitchesAndUsers() {
  try {
    // 1. Récupération des données "switch"
    const switchRes = await fetch("http://localhost:8000/switch");
    const allSwitches = await switchRes.json();

    // 2. Récupération des données "user"
    const userRes = await fetch("http://localhost:8000/user");
    const allUsers = await userRes.json();

    // 3. Création d'une map { userId: userObject }
    const usersMap = allUsers.reduce((acc, user) => {
      acc[user._id] = user;
      return acc;
    }, {});

    // 4. Fusion switch & user
    const mergedData = allSwitches.map((sw) => {
      const associatedUser = usersMap[sw.userOne] || {};
      return { ...sw, ...associatedUser };
    });

    // 5. Tri en trois tableaux distincts selon la valeur de "state"
    const available = mergedData.filter((item) => item.state === "waiting");
    const pending = mergedData.filter((item) => item.state === "processing");
    const finished = mergedData.filter((item) => item.state === "validate");

    // 6. Retourne un objet contenant les trois tableaux
    return {
      available,
      pending,
      finished,
    };
  } catch (error) {
    console.error(
      "Erreur lors de la récupération ou du tri des données :",
      error
    );
    throw error;
  }
}
