fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then((data) => {
    let work = data
    const gallery = document.querySelector(".gallery")
    for(let i = 0; i < work.length; i++ ) (
        gallery.innerHTML += `			
            <figure data-category="${work[i].category.name}">
                <img src="${work[i].imageUrl}">
                <figcaption>${work[i].title}</figcaption>
            </figure>`
        )

    let token = window.localStorage.getItem('token')
    console.log(token)

    const login = document.querySelector('.login')
    if (token){
        login.innerHTML = 'logout'
        login.addEventListener('click', function(){
        window.localStorage.removeItem('token')
        window.location.href = 'index.html'
        }
        )
    }

    const galleryModal = document.querySelector(".galleryModal")
    for(let i = 0; i < work.length; i++ ) (
        galleryModal.innerHTML += `			
            <div class="ContModal">
                <img src="${work[i].imageUrl}">
                <i class="fa-solid fa-trash-can"></i>
            </div>`
        )
})