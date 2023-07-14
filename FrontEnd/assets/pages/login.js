/* LOGIN */

// Déclaration de l'url pour la requête fetch
const url = "http://localhost:5678/api/users/login";

// Déclaration du formulaire
const loginForm = document.querySelector("form");
// On écoute l'évenement lors de l'envoi des identifiants
loginForm.addEventListener("submit", submitForm);

function submitForm(event) {
    // On empêche le refresh de la page par défaut
    event.preventDefault();

    // Déclaration des valeurs à lier à l'objet
    const email = document.querySelector("#email").value;
    const password = document.querySelector(".password").value;

    // Déclaration de l'objet à envoyer
    const formData = {
        email: email,
        password: password
    };

    // Déclaration de la valeur de l'option body 
    const formJSON = JSON.stringify(formData);
    console.log(formJSON);

    // Requête fetch méthode POST
    fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: formJSON,
    })
        // Traitement de la réponse
        .then(response => response.json())
        .then(data => {
            // Affichage des données retournées dans la console
            console.log(data);
            let token = data.token;
            if (data.token) {
                // Stockage du token en local 
                localStorage.setItem("authToken", data.token)
                // Renvoi à la page d'accueil
                window.location.href = "../../index.html";
            } else {
                // Message d'erreur si mauvais identifiants
                alert("Les information saisies sont incorrectes.");
            }
        })
}

console.log("Je suis sur la page de Login");
