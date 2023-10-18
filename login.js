const btnSubmit = document.getElementById("btnSubmit")

btnSubmit.addEventListener("click", (event) => {
    event.preventDefault()
    const email = document.getElementById("email").value
    const password = document.getElementById("password").value
    fetch("http://localhost:5678/api/users/login", {
        method: 'POST',
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        },
        body : JSON.stringify({email, password})
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        //! TODO: Tu dois stocker la clé "token" dans ton localstorage
        // Tu dois le récupéré sur ta page index.js
        let userId = data.userId
        let token = data.token
        if ( userId == true ){
            console.log(token)
            document.location = 'index.html'
            window.localStorage.setItem('token', token)
        }
        else {
            alert('verifier vos informations de connection')
        }
        
    })
    .catch(error => { 
        console.log(error)
    })
})
