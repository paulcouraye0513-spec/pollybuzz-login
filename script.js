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

    if (!res.ok) {
      resultDiv.innerHTML = `❌ ${data.error}`;
      return;
    }

    // Sauvegarde du token
    localStorage.setItem("token", data.token);

    resultDiv.innerHTML = `
      ✅ Connexion réussie !<br><br>
      <button onclick="showProfile()">Voir mon profil</button>
    `;
  } catch {
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

    if (!res.ok) {
      resultDiv.innerHTML = `❌ ${data.error}`;
      return;
    }

    resultDiv.innerHTML = `
      🎉 Compte créé avec succès !<br><br>
      <strong>Ton token :</strong><br>
      <code>${data.token}</code>
    `;
  } catch {
    resultDiv.innerHTML = "❌ Erreur de connexion au serveur.";
  }
}

// =======================
//   MOT DE PASSE OUBLIÉ
// =======================
async function forgotPassword() {
  const username = document.getElementById("email").value;
  const resultDiv = document.getElementById("result");

  if (!username) {
    resultDiv.innerHTML = "⚠️ Entrez votre nom d'utilisateur.";
    return;
  }

  resultDiv.innerHTML = "Réinitialisation du mot de passe...";

  try {
    const res = await fetch(`${API_URL}/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username })
    });

    const data = await res.json();

    if (!res.ok) {
      resultDiv.innerHTML = `❌ ${data.error}`;
      return;
    }

    resultDiv.innerHTML = `
      🔑 Nouveau mot de passe temporaire :<br>
      <code>${data.tempPassword}</code><br><br>
      Connecte-toi puis change-le dans ton profil.
    `;
  } catch {
    resultDiv.innerHTML = "❌ Erreur de connexion au serveur.";
  }
}

// =======================
//     PROFIL
// =======================
async function showProfile() {
  const token = localStorage.getItem("token");
  const resultDiv = document.getElementById("result");

  if (!token) {
    resultDiv.innerHTML = "⚠️ Aucun token trouvé. Connecte-toi d'abord.";
    return;
  }

  resultDiv.innerHTML = "Chargement du profil...";

  try {
    const res = await fetch(`${API_URL}/profile`, {
      headers: { "Authorization": `Bearer ${token}` }
    });

    const data = await res.json();

    if (!res.ok) {
      resultDiv.innerHTML = `❌ ${data.error}`;
      return;
    }

    resultDiv.innerHTML = `
      👤 <strong>Profil de ${data.username}</strong><br><br>
      Premium : ${data.profile.premium ? "✅ Oui" : "❌ Non"}<br>
      Bonus : ${Object.keys(data.profile.bonuses).join(", ")}<br><br>

      <button onclick="logout()">Déconnexion</button>
    `;
  } catch {
    resultDiv.innerHTML = "❌ Erreur de chargement du profil.";
  }
}

// =======================
//     DÉCONNEXION
// =======================
function logout() {
  localStorage.removeItem("token");
  document.getElementById("result").innerHTML = "👋 Déconnecté.";
}
