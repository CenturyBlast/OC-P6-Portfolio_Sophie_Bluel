/* PROJETS */

//Appel à l'API pour récuperer les projets
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data);

        recupPortfolio(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

//Déclaration du conteneur des projets
const gallery = document.querySelector(".gallery");

function recupPortfolio(data) {

    for (let i = 0; i < data.length; i++) {
        //Création d'un article et apport du contenu dynamique
        const projet = document.createElement("figure");
        // Attribution d'une class
        projet.setAttribute("class", "figure");
        // Attribution d'un ID
        projet.setAttribute("id", data[i].categoryId);
        //Ajout d'une image
        const image = document.createElement("img");
        image.src = data[i].imageUrl;
        //Ajout d'un sous-titre
        const subtitle = document.createElement("figcaption");
        subtitle.innerText = data[i].title;
        //Association Contenu-Parents
        gallery.appendChild(projet);
        projet.appendChild(image);
        projet.appendChild(subtitle);
    }

    // Tableaux des travaux par catégorie
    const objetOnly = data.filter(element => element.categoryId === 1)
    console.table(objetOnly)
    const appartOnly = data.filter(element => element.categoryId === 2)
    console.table(appartOnly)
    const hotelOnly = data.filter(element => element.categoryId === 3)
    console.table(hotelOnly)

    // // Gestion du bouton TOUS (les projets)
    // const filterButtons = document.querySelectorAll(".filter_btn");
    // const works = document.querySelectorAll(".figure");

    // filterButtons.forEach(button => {
    //     button.addEventListener("click", () => {
    //         const filterValue = button.getAttribute("categoryid");
    //         filterWorks(filterValue);
    //         console.log("Afficher tous les travaux");
    //     });
    // });

    // function filterWorks(filter) {
    //     works.forEach(figure => {
    //         const categoryId = figure.getAttribute("id");

    //         if (filter === "0") {
    //             figure.style.display = "block";
    //         } else {
    //             figure.style.display = "none";
    //         }
    //     });
    // }

};

/* FILTRES */

//Appel à l'API pour récuperer les catégories
fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data);

        recupCat(data);
    })
    .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
    });

//Déclaration du conteneur des catégories
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
        //Association Contenu-Parents
        filters.appendChild(filter);
    };

};

/* LOGGED IN FEATURES*/

const authUser = localStorage.getItem("authToken");

if (authUser) {
    filters.classList.add("hidden");
    const worksTitle = document.querySelector(".works_title");
    worksTitle.classList.add("logged_margin");
    const banner = document.querySelector(".edit_banner");
    banner.classList.remove("hidden");
    const modifiers = document.querySelectorAll(".div_modifier");
    modifiers.forEach(element => {
        element.classList.remove("hidden");
    });
}




/* MODALE */

// //Modale méthode balise "Dialog" - Déclarations + Ouverture/Fermeture
// const openBtn = document.querySelector(".modifier")
// const closeBtn = document.querySelector(".modal_close")
// const modal = document.querySelector("[data-modal]")

// openBtn.addEventListener("click", () => {
//     modal.showModal()
// })

// closeBtn.addEventListener("click", () => {
//     modal.closest()
// })