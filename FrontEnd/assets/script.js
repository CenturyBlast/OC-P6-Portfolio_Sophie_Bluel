/* PROJETS */

// Appel à l'API pour récuperer les projets
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data);

        recupPortfolio(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Déclaration du conteneur des projets
const gallery = document.querySelector(".gallery");

function recupPortfolio(data) {

    for (let i = 0; i < data.length; i++) {
        // Création d'un article et apport du contenu dynamique
        const projet = document.createElement("figure");
        // Attribution d'une class
        projet.setAttribute("class", "figure");
        // Attribution d'un ID
        projet.setAttribute("id", data[i].categoryId);
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
    console.table(objetOnly);
    const appartOnly = data.filter(element => element.categoryId === 2);
    console.table(appartOnly);
    const hotelOnly = data.filter(element => element.categoryId === 3);
    console.table(hotelOnly);


};

/* FILTRES */

// // nth Test Filtrage
// // Récup les éléments depuis le DOM
// const btns = document.querySelectorAll(".filters button");
// // imgs à lier aux travaux récup
// // const imgs = 
// // Ecouter l'évenement sur chaque bouton
// for (let a = 1; a < btns.length; a++) {
//     btns[a].addEventListener("click", filterImg);
// };
// // Activer le bouton au clic
// function setActiveBtn(e) {
//     // Enlever la class active de tous les boutons
//     btns.forEach(btn => {
//         btn.classList.remove("btn-clicked");
//     });
//     // Ajouter la class active au bouton cible
//     e.target.classList.add("btn-clicked");
// };
// // Filtrer les images
// function filterImg(e) {
//     // Lancer la fonction du bouton actif
//     setActiveBtn(e);
//     // Boucle au travers des travaux
//     imgs.forEach(img => {
//         // Montrer tous les travaux
//         img.classList.remove("hidden");
//         img.classList.add("show");
//         // Récup les données depuis les attributs de données
//         // Récup le type de donnée image
//         const imgType = parseInt(img.dataset.img);
//         // Récup le type de donnée bouton
//         const btnType = parseInt(e.target.dataset.btn);
//         // Si le type image différent du type bouton
//         if (imgType !== btnType) {
//             // Cacher le travail
//             img.classList.remove("show");
//             img.classList.add("hidden");
//         };
//     });
// };
// // Ajouter un event au clic sur "Tous les travaux"
// btns[0].addEventListener("click", (e) => {
//     // Lancer la fonction du bouton actif
//     setActiveBtn(e);
//     // Boucle au travers des travaux
//     imgs.forEach(img => {
//         // Afficher tous les travaux 
//         img.classList.remove("hidden");
//         img.classList.add("show");
//     });
// });




// Appel à l'API pour récuperer les catégories
fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data);

        recupCat(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

// Déclaration du conteneur des catégories
const filters = document.querySelector(".filters");

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

const allWorksBtn = document.getElementsByClassName('filter_btn')[0];
// const objetOnlyBtn = document.getElementsByClassName('filter_btn')[1];
// const appartOnlyBtn = document.getElementsByClassName('filter_btn')[2];
// const hotelOnlyBtn = document.getElementsByClassName('filter_btn')[3];


allWorksBtn.addEventListener("click", () => {

    console.log("Je veux afficher tous les travaux");

    //     for (let i = 0; i < data.length; i++) {
    //         //Création d'un article et apport du contenu dynamique
    //         const projet = document.createElement("figure");
    //         // Attribution d'une class
    //         projet.setAttribute("class", "figure");
    //         // Attribution d'un ID
    //         projet.setAttribute("id", data[i].categoryId);
    //         //Ajout d'une image
    //         const image = document.createElement("img");
    //         image.src = data[i].imageUrl;
    //         //Ajout d'un sous-titre
    //         const subtitle = document.createElement("figcaption");
    //         subtitle.innerText = data[i].title;
    //         //Association Contenu-Parents
    //         gallery.appendChild(projet);
    //         projet.appendChild(image);
    //         projet.appendChild(subtitle);
    //     };

});



/* FEATURES when LOGGED IN  */

// Appel du token
const authUser = localStorage.getItem("authToken");

// Modifications de l'accueil en mode administrateur
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

/* MODALE */

// Modale galerie - Déclarations
const openModalBtn = document.querySelectorAll(".modifier");
const closeModalBtn = document.querySelector(".modal_close");
const modal = document.querySelector(".modal");

// Modale galerie - Ouverture
openModalBtn.forEach(function (lien) {
    lien.addEventListener("click", () => {
        // event.preventDefault();
        modal.classList.remove("hidden");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
    });
});

// Modale galerie - Fermeture
closeModalBtn.addEventListener("click", () => {
    modal.classList.add("hidden");
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("aria-modal", "false");
});

// Modale galerie - Appel des travaux
// fetch("http://localhost:5678/api/works")
//     .then(reponse => reponse.json())
//     .then(data => {
//         console.table(data);

//         recupPortfolio(data);
//     })
//     .catch(error => {
//         console.error("Erreur lors de la récupération des données :", error);
//     });

// // Déclaration du conteneur des projets
// const modalWorksDisplay = document.querySelector(".modal_works");

// function recupPortfolio(data) {

//     for (let i = 0; i < data.length; i++) {
//         // Création d'un article et apport du contenu dynamique
//         const projet = document.createElement("figure");
//         // Attribution d'une class
//         projet.setAttribute("class", "figure");
//         // Attribution d'un ID
//         projet.setAttribute("id", data[i].categoryId);
//         // Ajout d'une image
//         const image = document.createElement("img");
//         image.src = data[i].imageUrl;
//         // Ajout d'un sous-titre
//         const subtitle = document.createElement("figcaption");
//         subtitle.innerText = "éditer";
//         // Association Contenu-Parents
//         modalWorksDisplay.appendChild(projet);
//         projet.appendChild(image);
//         projet.appendChild(subtitle);
//     };
// };

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