async function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = "Connexion en cours...";

  try {
    // 1) Connexion → ton API génère un token
    const loginRes = await fetch("https://ton-api.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password })
    });

    const loginData = await loginRes.json();

    if (!loginData.token) {
      resultDiv.innerHTML = "Erreur : identifiants invalides.";
      return;
    }

    const token = loginData.token;

    // 2) Sauvegarde du token dans ton API
    await fetch("https://ton-api.com/saveToken", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, token })
    });

    // 3) Affichage du token au joueur
    resultDiv.innerHTML = `
      <strong>Ton token Pollybuzz :</strong><br><br>
      <code>${token}</code><br><br>
      Copie-le et colle-le dans Roblox.
    `;

  } catch (err) {
    resultDiv.innerHTML = "Erreur de connexion au serveur.";
  }
}
