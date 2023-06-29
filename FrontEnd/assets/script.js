//Je fais l'appel à l'API pour récuperer les projets
fetch("http://localhost:5678/api/works")
.then(reponse => reponse.json())
.then(data => console.log(data))