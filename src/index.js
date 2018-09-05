document.addEventListener('DOMContentLoaded', () => {
  getDogs()
  addSubmitFormHandler()
})

function getDogs() {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogsData => {
    for (let i = 0; i < dogsData.length; i++) {
      let dog = new Dog(dogsData[i].name, dogsData[i].breed, dogsData[i].sex, dogsData[i].id)
      dog.renderDog()
    }
  })
}

function addSubmitFormHandler() {
  let dogForm = document.querySelector('#dog-form')
  dogForm.addEventListener('submit', editDog)
}

function populateEditForm(event) {
  let dogRow = event.currentTarget.parentNode
  let clickedDogName = dogRow.querySelector('#dog-name').innerText
  let clickedDogBreed = dogRow.querySelector('#dog-breed').innerText
  let clickedDogSex = dogRow.querySelector('#dog-sex').innerText
  let clickedDogId = dogRow.id.split("-")[1]

  let dogFormName = document.querySelector('#dog-form-name')
  let dogFormBreed = document.querySelector('#dog-form-breed')
  let dogFormSex = document.querySelector('#dog-form-sex')
  let dogFormSubmit = document.querySelector('#dog-form-submit')

  dogFormName.value = clickedDogName
  dogFormBreed.value = clickedDogBreed
  dogFormSex.value = clickedDogSex
  dogFormSubmit.dataset.dogId = clickedDogId
}

function editDog(event) {
  event.preventDefault()
  let editedDogId = document.querySelector('#dog-form-submit').dataset.dogId
  let editedDogName = document.querySelector('#dog-form-name').value
  let editedDogBreed = document.querySelector('#dog-form-breed').value
  let editedDogSex = document.querySelector('#dog-form-sex').value
  let editedDogData = {name: editedDogName, breed: editedDogBreed, sex: editedDogSex}
  fetch(`http://localhost:3000/dogs/${editedDogId}`, {
    method: "PATCH",
    body: JSON.stringify(editedDogData),
    headers: {
      "Content-type": 'application/json',
      "Accept": 'application/json'
    }
  })
  .then(response => response.json())
  .then(dogData => renderEditedDog(dogData))
}

function renderEditedDog(dogData) {
  let editedDogRow = document.querySelector(`#dog-${dogData.id}`)
  editedDogRow.querySelector('#dog-name').innerText = dogData.name
  editedDogRow.querySelector('#dog-breed').innerText = dogData.breed
  editedDogRow.querySelector('#dog-sex').innerText = dogData.sex
}
