// URL de ton API Render
const API_URL = "https://pollybuzz-api.onrender.com";

// =======================
//     LOGIN
// =======================
async function login() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Connexion en cours...";

  try {
    const res = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!data.token) {
      resultDiv.innerHTML = "❌ Identifiants invalides.";
      return;
    }

    resultDiv.innerHTML = `
      ✅ Connexion réussie !<br><br>
      <strong>Ton token Pollybuzz :</strong><br>
      <code>${data.token}</code><br><br>
      Copie-le dans Roblox pour te connecter.
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ Erreur de connexion au serveur.";
  }
}

// =======================
//     REGISTER
// =======================
async function register() {
  const username = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const resultDiv = document.getElementById("result");

  resultDiv.innerHTML = "Création du compte...";

  try {
    const res = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (!data.token) {
      resultDiv.innerHTML = `❌ Erreur : ${data.error}`;
      return;
    }

    resultDiv.innerHTML = `
      🎉 Compte créé avec succès !<br><br>
      <strong>Ton token Pollybuzz :</strong><br>
      <code>${data.token}</code><br><br>
      Garde-le précieusement pour Roblox.
    `;
  } catch (err) {
    resultDiv.innerHTML = "❌ Erreur de connexion au serveur.";
  }
}
