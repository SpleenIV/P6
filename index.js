fetch("http://localhost:5678/api/works")
.then(response => response.json())
.then((data) => {
    let work = data
    const gallery = document.querySelector(".gallery")

        function galleriPrincipal() {
            gallery.innerHTML = ''
            for(let i = 0; i < work.length; i++ ) (
                gallery.innerHTML += `			
                    <figure>
                        <img src="${work[i].imageUrl}">
                        <figcaption>${work[i].title}</figcaption>
                    </figure>`
                    
                )
        }
        galleriPrincipal()

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

    function galleriModal(){
        galleryModal.innerHTML = ''

        for(let i = 0; i < work.length; i++ ) {
            galleryModal.innerHTML += `			
                <div class="ContModal">
                    <img src="${work[i].imageUrl}">
                    <div class="contLogo" data-id="${work[i].id}">
                    <i class="fa-solid fa-trash-can"></i>
                    </div>
                </div>`
        }

        let deleteImg = document.querySelectorAll('.contLogo')
        deleteImg.forEach(deleteImgs => {

            deleteImgs.addEventListener('click', function(){
                const id = deleteImgs.dataset.id 
                fetch(`http://localhost:5678/api/works/${id}`,{
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })

                .then(function(response) {
                    console.log(response);
                    console.log("ma requete est fini")
                    work = work.filter(function(works){
                        return works.id != id
                    })
                    galleriModal();
                    galleriPrincipal();
                })
        })
    })

    }
        galleriModal()

        const contBtn = document.querySelector('.containerbtn')
        fetch('http://localhost:5678/api/categories',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer`
            }
        })
        
        .then(response => response.json())
        .then((dataCat) => {
            console.log(dataCat)
            function generateBtn(){
                const category = dataCat 
                contBtn.innerHTML = '<button class="btn tous">tous</button>'
                
                for(let i = 0; i < category.length;i++)(
                    contBtn.innerHTML += `			
                    <button id='${category[i].id}'class='btn cat'>${category[i].name}</button>`
                        
                    )
            }
            generateBtn()
            const tous = document.querySelector('.tous')
            tous.addEventListener('click', function(){
                filtreObj(null)
            })
            const btnCategory = document.querySelectorAll('.cat')
            btnCategory.forEach(btnTri => {
                btnTri.addEventListener('click',function(){
                    const btnId = btnTri.id
                    console.log(btnId)
                    filtreObj(btnTri)
                })
            })
        })


        /*const Btn1 = document.querySelector('.f1')
        const Btn2 = document.querySelector('.f2')
        const Btn3 = document.querySelector('.f3')
        const Btn4 = document.querySelector('.f4')

        Btn1.addEventListener('click', function(){
            document.querySelector('.f1').className = 'btn f1 bgGreen'
            document.querySelector('.f2').className = 'btn f2 '
            document.querySelector('.f3').className = 'btn f3 '
            document.querySelector('.f4').className = 'btn f4 '
            filtreObj(null)
        })

        Btn2.addEventListener('click', function(){
            document.querySelector('.f1').className = 'btn f1'
            document.querySelector('.f2').className = 'btn f2 bgGreen '
            document.querySelector('.f3').className = 'btn f3 '
            document.querySelector('.f4').className = 'btn f4 '
            filtreObj(1)
        })

        Btn3.addEventListener('click', function(){
            document.querySelector('.f1').className = 'btn f1 '
            document.querySelector('.f2').className = 'btn f2 '
            document.querySelector('.f3').className = 'btn f3 bgGreen'
            document.querySelector('.f4').className = 'btn f4 '
            filtreObj(2)
        })

        Btn4.addEventListener('click', function(){
            document.querySelector('.f1').className = 'btn f1 '
            document.querySelector('.f2').className = 'btn f2 '
            document.querySelector('.f3').className = 'btn f3 '
            document.querySelector('.f4').className = 'btn f4 bgGreen'
            filtreObj(3)
        })*/

        function filtreObj(category){
            const workFilter = category !== null ? work.filter(function(works){
                return works.categoryId === category
                
            }) :work
            gallery.innerHTML = ''

            for(let i = 0; i < workFilter.length; i++ ) (
                gallery.innerHTML += `			
                    <figure data-category="${workFilter[i].category.name}">
                        <img src="${workFilter[i].imageUrl}">
                        <figcaption>${workFilter[i].title}</figcaption>
                    </figure>`
                )
        }

        const close = document.querySelector('.fa-xmark')
        close.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'none';
            document.querySelector('.modalAddImg').style["display"] = 'none';
            document.querySelector('.backgroundmodal').style["display"] = 'none';
        })  
        
        const close2 = document.querySelector('.lvl2')
        close2.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'none';
            document.querySelector('.backgroundmodal').style["display"] = 'none';
        })

        const retour = document.querySelector('.fa-arrow-left')
        retour.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'block';
            document.querySelector('.modalAddImg').style["display"] = 'none';
        })


        const open = document.querySelector('.open')
        open.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'flex';
            document.querySelector('.backgroundmodal').style["display"] = 'flex';
        })

        const addImg = document.querySelector('.btnModal');
        addImg.addEventListener('click', function(){
            document.querySelector('.modal').style["display"] = 'none';
            document.querySelector('.modalAddImg').style["display"] = 'block';
        });

        const formAdd = document.querySelector('.formAdd');
        formAdd.addEventListener('submit', async function(event){
            event.preventDefault();
            
            const image = document.querySelector('.photo').files[0];
            const title = document.querySelector('.title').value;
            const categoryId = document.querySelector('.category-choice').value;
            let categori = null 
            if (categoryId === "objets") {
                categori = 1;
            }
            else if (categoryId === "appartements") {
                categori = 2;
            }
            else if (categoryId === "hotels") {
                categori = 3;
            }
            const errorAdd = document.querySelector('.error-formadd');
                if (!title || !image || !categori) {
                console.log('false');

                errorAdd.innerHTML = `<p class='erreur-msg'>Veuillez bien remplir les champs</p>`
            }
            else {
                errorAdd.innerHTML = ``
                const formData = new FormData();
                formData.append('title', title);
                formData.append('image', image);
                formData.append('category', categori);
                
                console.log(formData.get('image', 'category', 'title'));
                fetch('http://localhost:5678/api/works', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData,
                })
                .then(function(response) {
                   return response.json()
                })
                .then(function(datas){
                    console.log(datas)
                    datas.categoryId = Number(datas.categoryId)

                    work.push(datas);

                    galleriModal();
                    galleriPrincipal();
                }) 
            }

        })

        const input = document.querySelector(".photo")
        const output = document.querySelector("output")
        let imagesArray = []

        input.addEventListener("change", () => {
        const file = input.files
        imagesArray.push(file[0])
        displayImages()
        document.querySelector('.add-img-btn').style["display"] = 'none';
        document.querySelector('.fa-image').style["display"] = 'none';
        document.querySelector('.fill-accept').style["display"] = 'none';
        })
        function displayImages() {
        let images = ""
        imagesArray.forEach((image) => {
            images = `<div class="cont-img">
            <img src="${URL.createObjectURL(image)}" class="img-upload" alt="votre image">
                        
            </div>`
        })
        output.innerHTML = images
        }


        
})






