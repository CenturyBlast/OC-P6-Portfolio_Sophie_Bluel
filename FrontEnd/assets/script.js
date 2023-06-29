const gallery = document.querySelector(".gallery")

function recupPortfolio(data) {

    for (let i = 0; i < data.length; i++) {

        const projet = document.createElement("figure")
        projet.setAttribute("id", data[i].category.name)
        const image = document.createElement("img")
        image.src = data[i].imageUrl
        const subtitle = document.createElement("figcaption")
        subtitle.innerHTML = data[i].title

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



// //Modale méthode "Dialog" - Déclarations + Ouverture/Fermeture
// const openBtn = document.querySelector(".modifier")
// const closeBtn = document.querySelector(".modal_close")
// const modal = document.querySelector("[data-modal]")

// openBtn.addEventListener("click", () => {
//     modal.showModal()
// })

// closeBtn.addEventListener("click", () => {
//     modal.closest()
// })