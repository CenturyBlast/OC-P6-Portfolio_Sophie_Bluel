/***** PROJETS *****/

// Appel à l'API pour récupérer les projets
function getTravaux() {
    return fetch("http://localhost:5678/api/works")
        .then(reponse => reponse.json())
        .then(data => {

            return data
        })
        .catch(error => {
            console.error("Erreur lors de la récupération des données :", error);
        });
};

getTravaux().then(response => {
    recupPortfolio(response)
});


// Déclaration du conteneur des projets
const gallery = document.querySelector(".gallery");
// Fonction pour afficher le portfolio page d'accueil
function recupPortfolio(data) {

    console.log(data, "travaux");

    for (let i = 0; i < data.length; i++) {
        // Création d'un article et apport du contenu dynamique
        const projet = document.createElement("figure");
        // Attribution d'une class
        projet.setAttribute("class", "figure");
        // Attribution d'un ID
        projet.setAttribute("id", data[i].id);
        // Attribution d'une catégorie
        projet.setAttribute("data-category", data[i].categoryId);
        // Ajout d'une image
        const image = document.createElement("img");
        image.src = data[i].imageUrl;
        // Ajout d'un sous-titre
        const subtitle = document.createElement("figcaption");
        subtitle.innerText = data[i].title;
        // Association Contenu-Parents
        gallery.appendChild(projet);
        projet.appendChild(image);
        projet.appendChild(subtitle);
    };

    // Tableaux des travaux par catégorie
    const objetOnly = data.filter(element => element.categoryId === 1);
    console.log(objetOnly, "objets");
    const appartOnly = data.filter(element => element.categoryId === 2);
    console.log(appartOnly, "apparts");
    const hotelOnly = data.filter(element => element.categoryId === 3);
    console.log(hotelOnly, "hotels");


};

/***** FILTRES *****/

// Récupérer les boutons depuis le DOM
const btns = document.querySelectorAll(".filters button");
// Récupérer les travaux depuis le DOM
const works = document.querySelectorAll(".gallery figure");
// Ecouter l'évenement sur chaque bouton
for (let a = 0; a < btns.length; a++) {
    btns[a].addEventListener("click", filterImg);
};
// Activer le bouton au clic
function setActiveBtn(e) {
    // Enlever la class active de tous les boutons
    btns.forEach(btn => {
        btn.classList.remove("btn-clicked");
    });
    // Ajouter la class active au bouton cible
    e.target.classList.add("btn-clicked");
};
// Filtrer les images
function filterImg(e) {
    // Lancer la fonction du bouton actif
    setActiveBtn(e);
    // Boucle au travers des travaux
    works.forEach(work => {
        // Montrer tous les travaux
        work.classList.remove("hidden");
        work.classList.add("show");
        // Récup les données depuis les attributs de données
        // Récup le type de donnée image
        const workType = parseInt(figure.dataset.category);
        // Récup le type de donnée bouton
        const btnType = parseInt(e.target.categoryid);
        // Si le type image différent du type bouton
        if (workType !== btnType) {
            // Cacher le travail
            work.classList.remove("show");
            work.classList.add("hidden");
        };
    });
};
// Ajouter un event au clic sur "Tous les travaux"
btns[0].addEventListener("click", (e) => {
    // Lancer la fonction du bouton actif
    setActiveBtn(e);
    console.log("Afficher tous les travaux");
    // Boucle au travers des travaux
    works.forEach(work => {
        // Afficher tous les travaux 
        work.classList.remove("hidden");
        work.classList.add("show");
    });
});


// Appel à l'API pour récupérer les catégories
fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(data => {

        console.log(data, "categories");

        recupCat(data);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });

// Déclaration du conteneur des catégories
const filters = document.querySelector(".filters");
// Fonction pour afficher les boutons de catégories
function recupCat(data) {

    for (let i = 0; i < data.length; i++) {
        // Création de boutons au contenu dynamique
        const filter = document.createElement("button");
        // Attribution d'un categoryId
        filter.setAttribute("categoryId", data[i].id);
        // Application du style CSS
        filter.setAttribute("class", "filter_btn");
        // Insertion d'une catégorie dans chaque bouton
        filter.innerText = data[i].name;
        // Association Contenu-Parents
        filters.appendChild(filter);
    };

};

// const allWorksBtn = document.getElementsByClassName('filter_btn')[0];

// const appartOnlyBtn = document.getElementsByClassName('filter_btn')[2];
// const hotelOnlyBtn = document.getElementsByClassName('filter_btn')[3];


// allWorksBtn.addEventListener("click", () => {

//     console.log("Je veux afficher tous les travaux");
// });

// document.addEventListener("DOMContentLoaded", () => {
//     const objetOnlyBtn = document.getElementsByClassName('filter_btn')[1];
//     objetOnlyBtn.addEventListener("click", () => {

//         console.log("Je veux afficher les objets");
//     });
// });



/***** MODE EDITION/ADMINISTRATEUR *****/

// Appel du token
const authUser = localStorage.getItem("authToken");

// Modifications de l'accueil lorsque administrateur
if (authUser) {
    // Le bouton login devient logout
    const loginBtn = document.querySelector(".login");
    loginBtn.innerText = "logout";
    // Au clic sur logout, je me déconnecte
    loginBtn.addEventListener('click', function (logout) {
        logout.preventDefault();
        // Effacer le contenu du localStorage
        localStorage.clear();
        // Renvoi à l'accueil
        window.location.href = "./index.html";
        console.log("Vous avez été déconnectée avec succès.");
    });

    // Masquage des filtres
    filters.classList.add("hidden");
    // Réglage de marge
    const worksTitle = document.querySelector(".works_title");
    worksTitle.classList.add("logged_margin");
    // La bannière mode édition apparait
    const banner = document.querySelector(".edit_banner");
    banner.classList.remove("hidden");
    // Les deux boutons modifier apparaissent
    const modifiers = document.querySelectorAll(".div_modifier");
    modifiers.forEach(element => {
        element.classList.remove("hidden");
    });
};

/***** MODALES *****/

// Modale galerie - Déclarations
const openModalBtn = document.querySelectorAll(".modifier");
const closeModalBtn = document.querySelectorAll(".modal_close");
const modal = document.querySelector(".modal");

// Modale galerie - Ouverture
openModalBtn.forEach(function (lien) {
    lien.addEventListener("click", () => {
        // event.preventDefault();
        modal.classList.remove("hidden");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        // Modale galerie - Appel des travaux
        getTravaux().then(response => {
            recupAltPortfolio(response)
        });
    });
});

// Vider le contenu de la modale
function clearModalContent() {
    // Supprimer le contenu HTML
    modalWorksDisplay.innerHTML = "";
};

// Modale galerie - Fermeture - Croix
closeModalBtn.forEach(function (lien) {
    lien.addEventListener("click", () => {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
        modal.setAttribute("aria-modal", "false");
        clearModalContent();
    });
});

// Modale galerie - Fermeture - En dehors
function closeModalOutside(event) {
    // Si le clic est en dehors du contenu de la modale
    if (event.target === modal) {
        modal.classList.add("hidden");
        modal.setAttribute("aria-hidden", "true");
        modal.setAttribute("aria-modal", "false");
        clearModalContent();
    };
};

// Fermeture au clic en dehors de la modale
window.addEventListener('click', closeModalOutside);

// Déclaration du conteneur des projets pour la modale
const modalWorksDisplay = document.querySelector(".modal_works");
// Fonction pour afficher le portfolio dans la modale
function recupAltPortfolio(data) {

    for (let i = 0; i < data.length; i++) {
        // Création d'un article et apport du contenu dynamique
        const projet = document.createElement("figure");
        // Attribution d'une class
        projet.setAttribute("class", "figure");
        // Attribution d'un ID
        projet.setAttribute("id", data[i].id);
        // Attribution d'une catégorie
        projet.setAttribute("data-category", data[i].categoryId);
        // Ajout d'une image
        const image = document.createElement("img");
        image.src = data[i].imageUrl;
        // Ajout icone 'supprimer'
        const trash = document.createElement("div");
        trash.setAttribute("class", "trash");
        trash.innerHTML = `<i class="fa-regular fa-trash-can" aria-hidden="true"></i>`;
        // Ajout icone 'déplacer'
        const move = document.createElement("div");
        move.setAttribute("class", "move");
        move.innerHTML = `<i class="fa-solid fa-arrows-up-down-left-right" aria-hidden="true"></i>`;
        // Ajout d'un sous-titre
        const subtitle = document.createElement("figcaption");
        subtitle.innerText = "éditer";
        // Association Contenu-Parents
        modalWorksDisplay.appendChild(projet);
        projet.appendChild(image);
        projet.appendChild(subtitle);
        projet.appendChild(trash);
        projet.appendChild(move);

        /***** Modale galerie - SUPPRESSION de projet en DB et DOM *****/

        modalWorksDisplay.addEventListener("click", async function (event) {
            // Vérifier si l'élément cliqué est bien la corbeille
            if (event.target.classList.contains("fa-trash-can")) {
                // Récupération du conteneur parent "figure"
                const figure = event.target.closest("figure");
                // Récupération de l'ID de l'élément figure à supprimer
                const workID = figure.id;
                // Requête fetch méthode DELETE
                await fetch(`http://localhost:5678/api/works/${workID}`, {
                    method: "DELETE",
                    headers: {
                        "Authorization": `Bearer ${authUser}`
                    }
                })
                    .then(function (response) {
                        if (response.ok) {
                            // Afficher le portfolio mis à jour dans la modale
                            recupAltPortfolio(response);
                            // Afficher le portfolio mis à jour sur page accueil
                            recupPortfolio(response);
                            // Message de confirmation
                            alert("Suppression du projet effectuée.");
                        } else {
                            console.error("Erreur lors de la suppression du projet");
                        }
                    })
                    .catch(function (error) {
                        console.error("Erreur lors de la suppression du projet", error);
                    });
            };
        });
    };
};

// Modale ajout de photo - Déclarations
const modalGallery = document.querySelector(".modal_gallery");
const modalAddPhoto = document.querySelector(".modal_add_photo");
const addPhotoBtn = document.querySelector(".add_photo");
const returnModalBtn = document.querySelector(".modal_return");

// Modale ajout de photo - Ouverture
addPhotoBtn.addEventListener("click", () => {
    modalGallery.classList.add("hidden");
    modalAddPhoto.classList.remove("hidden");
});

// Modale ajout de photo - Retour
returnModalBtn.addEventListener("click", () => {
    modalGallery.classList.remove("hidden");
    modalAddPhoto.classList.add("hidden");
});


/***** Modale ajout de photo - AJOUT de projet *****/

// Déclaration de l'URL pour la requête fetch
const urlAddWork = "http://localhost:5678/api/works";

// Déclaration du formulaire
const addWorkForm = document.getElementById("add");
// On écoute l'évenement lors de l'envoi des identifiants
addWorkForm.addEventListener("submit", submitForm);

function submitForm(event) {
    // On empêche le refresh de la page par défaut
    event.preventDefault();

    // Déclaration des valeurs à lier à l'objet
    const addImg = document.querySelector("#email").value;
    const addTitle = document.querySelector(".title").value;
    const addCategory = document.querySelector(".category").value;

    // Déclaration de l'objet à envoyer
    const formData = {
        email: email,
        password: password
    };

    // Déclaration de la valeur de l'option body 
    const formJSON = JSON.stringify(formData);
    console.log(formJSON);

    // Requête fetch méthode POST
    fetch(urlLogin, {
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
        });
};