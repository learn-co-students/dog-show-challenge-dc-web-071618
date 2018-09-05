document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()

})

// On page load, render a list of already registered dogs in the table. You can fetch these dogs from http://localhost:3000/dogs.
function fetchDogs() {
  fetch(`http://localhost:3000/dogs`)
  .then(response => response.json())
  .then(jsonData => {
    jsonData.forEach(dog => {
      renderDogs(dog)
    })
  })
}

function renderDogs(dog) {
  // console.log(dog)
  // debugger
  let tbody = document.querySelector('#table-body')
  let row = document.createElement('tr')
  row.id = `row-${dog.id}`
  let name = document.createElement('td')
  name.classList.add('dogName')
  name.innerText = dog.name
  let breed = document.createElement('td')
  breed.classList.add('dogBreed')
  breed.innerText = dog.breed
  let sex = document.createElement('td')
  sex.classList.add('dogSex')
  sex.innerText = dog.sex
  let editButton = document.createElement('button')
  editButton.id = `button-${dog.id}`
  editButton.innerText = 'Edit Dog'
  editButton.addEventListener('click', populateForm)

  tbody.appendChild(row)
  row.appendChild(name)
  row.appendChild(breed)
  row.appendChild(sex)
  row.appendChild(editButton)

}
// Make a dog editable. Clicking on the edit button next to a dog should populate the top form with that dog's current information.
function populateForm(event) {
  let nameValue = event.target.parentElement.querySelector('.dogName').innerText
  let breedValue = event.target.parentElement.querySelector('.dogBreed').innerText
  let sexValue = event.target.parentElement.querySelector('.dogSex').innerText

  document.querySelector('.formName').value = nameValue
  document.querySelector('.formBreed').value = breedValue
  document.querySelector('.formSex').value = sexValue

  let dogId = event.target.id.split('-')[1]
  let submit = document.querySelector('#submit').addEventListener('click', () => {
    patchFetch(dogId)
  })
}

// On submit of the form, a PATCH request should be made to http://localhost:3000/dogs/:id to update the dog information (including name, breed and sex attributes).
function patchFetch(dogId) {
  let editName = document.querySelector('.formName').value
  let editBreed = document.querySelector('.formBreed').value
  let editSex = document.querySelector('.formSex').value

  let data = {name: editName, breed: editBreed, sex: editSex}

  fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  })
  .then(response => response.json())
  .then(jsonData => {
    document.querySelector('.dogName').value = jsonData.name
    document.querySelector('.dogBreed').value = jsonData.breed
    document.querySelector('.dogSex').value = jsonData.sex
  })
}

// Once the form is submitted, the table should reflect the updated dog information. You can either use the response from the PATCH request for this or use optimistic rendering. This means you can update the frontend before you have gotten the response from the backend.


// In order to locate one row on the DOM and update specific data cells within it, you may need to assign id and or class values to locate each attribute.
