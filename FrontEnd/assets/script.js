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
// Fonction pour afficher le portfolio sur page d'accueil
function recupPortfolio(data) {

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
        // Association Enfant-Parent
        gallery.appendChild(projet);
        projet.appendChild(image);
        projet.appendChild(subtitle);
    };
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

// Filtrer les images
function filterImg(a) {
    // Récup le type de donnée bouton
    const btnType = parseInt(a.target.getAttribute("categoryId"));
    // Boucle au travers des travaux
    works.forEach(work => {
        // Montrer tous les travaux
        work.classList.remove("hidden");
        // Récup les données depuis les attributs de données
        // Récup le type de donnée image
        const workType = parseInt(work.dataset.category);

        // Si le type image différent du type bouton
        if (workType !== btnType) {
            // Cacher le travail
            work.classList.add("hidden");
        };
    });
};

// Ajouter un event au clic sur "Tous les travaux"
btns[0].addEventListener("click", () => {
    // Boucle au travers des travaux
    works.forEach(work => {
        // Afficher tous les travaux 
        work.classList.remove("hidden");
    });
});

// Appel à l'API pour récupérer les catégories
fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(data => {
        recupCat(data);
    })
    .catch(error => {
        console.error("Erreur lors de la récupération des données :", error);
    });

// Déclaration du conteneur des catégories
const filters = document.querySelector(".filters");

// Bouton "Tous"
const allWorksBtn = document.getElementsByClassName('filter_btn')[0];
allWorksBtn.addEventListener("click", () => {
    console.log("Afficher tous les travaux");

    let galleryDiv = document.querySelector(".gallery");
    galleryDiv.innerHTML = '';

    getTravaux().then(response => {
        console.log(response)
        recupPortfolio(response)
    });
});

// Bouton "Objets"
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const objetOnlyBtn = document.getElementsByClassName('filter_btn')[1];

        objetOnlyBtn.addEventListener("click", () => {
            console.log("Afficher les objets");

            let galleryDiv = document.querySelector(".gallery");
            galleryDiv.innerHTML = '';

            getTravaux().then(response => {
                let filteredWorks = response.filter(work => work.categoryId === 1);
                console.log(filteredWorks)

                recupPortfolio(filteredWorks)
            });
        });
    }, 1000);
});

// Bouton "Appartements"
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const appartOnlyBtn = document.getElementsByClassName('filter_btn')[2];

        appartOnlyBtn.addEventListener("click", () => {
            console.log("Afficher les appartements");

            let galleryDiv = document.querySelector(".gallery");
            galleryDiv.innerHTML = '';

            getTravaux().then(response => {
                let filteredWorks = response.filter(work => work.categoryId === 2);
                console.log(filteredWorks)

                recupPortfolio(filteredWorks)
            });
        });
    }, 1000);
});

// Bouton "Hotels & Restaurants"
document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        const hotelOnlyBtn = document.getElementsByClassName('filter_btn')[3];

        hotelOnlyBtn.addEventListener("click", () => {
            console.log("Afficher les hotels et restaurants");

            let galleryDiv = document.querySelector(".gallery");
            galleryDiv.innerHTML = '';

            getTravaux().then(response => {
                let filteredWorks = response.filter(work => work.categoryId === 3);
                console.log(filteredWorks)

                recupPortfolio(filteredWorks)
            });
        });
    }, 1000);
});

// Fonction pour afficher les boutons de catégories
function recupCat(data) {

    for (let i = 0; i < data.length; i++) {
        // Création de boutons au contenu dynamique
        const filter = document.createElement("button");
        // Attribution d'un categoryId
        filter.setAttribute("categoryId", data[i].id);
        // Application du style CSS
        filter.setAttribute("class", "filter_btn");
        // Insertion d'un nom de catégorie dans chaque bouton
        filter.innerText = data[i].name;
        // Association Enfant-Parent
        filters.appendChild(filter);

        // Ecouter l'événement sur chaque bouton
        filter.addEventListener("click", filterImg);
    };
};



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
        // On empêche le refresh de la page par défaut
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
        modal.classList.remove("hidden");
        modal.removeAttribute("aria-hidden");
        modal.setAttribute("aria-modal", "true");
        // Le scroll de l'arrière plan est désactivé
        document.body.style.overflow = 'hidden';
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
    // Le scroll de l'arrière plan est ré-activé
    document.body.style.overflow = 'auto';
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
        // Association Enfant-Parent
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

                            // // On empêche le refresh de la page par défaut
                            // response.preventDefault();

                            // Afficher le portfolio mis à jour dans la modale
                            recupAltPortfolio(response);
                            // Afficher le portfolio mis à jour sur page accueil
                            recupPortfolio(response);
                            console.log("Projet supprimé");
                        } else {
                            console.error("Erreur lors de la suppression du projet");
                        }
                    })
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

// Modale ajout de photo - Retour vers modale galerie
returnModalBtn.addEventListener("click", () => {
    modalGallery.classList.remove("hidden");
    modalAddPhoto.classList.add("hidden");
});


/***** Modale ajout de photo - AJOUT de projet *****/

// Fonction pour montrer un preview de l'image
function showPreview(event) {
    if (event.target.files.length > 0) {
        const src = URL.createObjectURL(event.target.files[0]);
        const preview = document.getElementById("previewImg");
        preview.src = src;
        const addBoxLabel = document.getElementById("photolab");
        addBoxLabel.style.display = "none";
        const addBoxSub = document.getElementById("photosub");
        addBoxSub.style.display = "none";
    }
}

const addImgBtn = document.getElementById("file");
addImgBtn.addEventListener("change", showPreview);

// Déclaration de l'URL pour la requête fetch
const urlAddWork = "http://localhost:5678/api/works";

// Déclaration du formulaire
const addWorkForm = document.getElementById("add");
const sendBtn = document.getElementById("validate");

// On écoute l'évenement lors de l'envoi du projet
addWorkForm.addEventListener("submit", (event) => {

    // On empêche le refresh de la page par défaut
    event.preventDefault();

    // Déclaration des valeurs à lier à l'objet
    const addImg = document.getElementById("file").files[0];
    const addTitle = document.getElementById("title").value;
    const addCategory = document.getElementById("category").value;
    console.log(addImg, addTitle, addCategory);

    // Déclaration de l'objet à envoyer
    const formData = new FormData();
    formData.append("image", addImg);
    formData.append("title", addTitle);
    formData.append("category", addCategory);
    console.log(formData);

    // Requête fetch méthode POST
    fetch(urlAddWork, {
        method: "POST",
        headers: { "authorization": `Bearer ${authUser}` },
        body: formData,
    })
        // Traitement de la réponse
        .then(response => {
            console.log(response);
            if (response.status === 201) {
                console.log("Projet ajouté")
            } else {
                console.log("Erreur lors de l'ajout de projet");
                // Message d'erreur si formulaire ma rempli
                alert("Le formulaire n’est pas correctement rempli.");
            }
        }
        )
        .catch(error => {
            console.error("Erreur lors de la requête fetch :", error);
            alert("Une erreur s'est produite lors de la communication avec le serveur.");
        });
});