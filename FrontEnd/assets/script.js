/* PROJETS */

//Déclaration du conteneur des projets
const gallery = document.querySelector(".gallery")

function recupPortfolio(data) {

    for (let i = 0; i < data.length; i++) {
//Création fiche + image + sous-titre et lien avec contenu dynamique 
        const projet = document.createElement("figure")
        projet.setAttribute("id", data[i].category.name)
        const image = document.createElement("img")
        image.src = data[i].imageUrl
        const subtitle = document.createElement("figcaption")
        subtitle.innerHTML = data[i].title
//Association Contenu - Parents 
        gallery.appendChild(projet)
        projet.appendChild(image)
        projet.appendChild(subtitle)
    }
}

//Je fais l'appel à l'API pour récuperer les projets
fetch("http://localhost:5678/api/works")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data)

        recupPortfolio(data)
    })


/* FILTRES */

//Gestion dynamique des filtres
const filters = document.querySelector(".filters")

fetch("http://localhost:5678/api/categories")
    .then(reponse => reponse.json())
    .then(data => {
        console.table(data)

    })
    
/* LOGIN */

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