document.addEventListener('DOMContentLoaded', () => {
    console.log('content loaded')
    renderAllDogs();
        
})

function renderAllDogs() {
    fetch('http://localhost:3000/dogs')
        .then(res => res.json())
        .then(dogs => {
            console.log(dogs);
            dogs.forEach(dog => {
                renderDog(dog);
            })
            document.querySelectorAll('.edit-button').forEach(button => {
                button.addEventListener('click', editDog)
            })
        })
}

function renderDog(dog) {
    table = document.querySelector('thead.blue')
    // dogRows.innerHTML = '';
    table.innerHTML += `<tr id="dog-${dog.id}">
    <td>${dog.name}</td>
    <td>${dog.breed}</td>
    <td>${dog.sex}</td>
    <td><button class="edit-button" id="${dog.id}">X</button></td>
    </tr>`
}

function updateDog(dog) {
    const dogRow = document.getElementById(`dog-${dog.id}`)
    const dogName = dogRow.children[0];
    const dogBreed = dogRow.children[1];
    const dogSex = dogRow.children[2];
    dogName.innerText = dog.name;
    dogBreed.innerText = dog.breed;
    dogSex.innerText = dog.sex;
    
}

function patchDog(event) {
    event.preventDefault();
    const id = event.currentTarget.id;
    const inputs = event.currentTarget.querySelectorAll('input')
    const patchName = inputs[0].value;
    const patchBreed = inputs[1].value;
    const patchSex = inputs[2].value;
    const data = {
        name: patchName,
        breed: patchBreed,
        sex: patchSex
    }
    fetch(`http://localhost:3000/dogs/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json', 
            'Accept': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
        .then(dog => {
            console.log(dog);
            updateDog(dog);
        })

}

function editDog(event) {
    const form = document.querySelector('form#dog-form')
    const formFields = document.querySelectorAll('form#dog-form input');
    const formName = formFields[0];
    const formBreed = formFields[1];
    const formSex = formFields[2];
    const formSubmit = formFields[3];

    fetch(`http://localhost:3000/dogs/${event.currentTarget.id}`)
        .then(res => res.json())
        .then(dog => {
            formName.value = dog.name
            formBreed.value = dog.breed;
            formSex.value = dog.sex
            form.id = dog.id  
            form.addEventListener('submit', patchDog)          
        })
}