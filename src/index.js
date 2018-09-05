const DOGS_URL = `http://localhost:3000/dogs`

document.addEventListener('DOMContentLoaded', init)

function init() {
  fetchAllDogs()
}

function fetchAllDogs() {
  fetch(`${DOGS_URL}`)
  .then(response => response.json())
  .then(data => data.forEach(dogData => {
    let newDog = new Dog(dogData.name, dogData.breed, dogData.sex, dogData.id)
    newDog.render()
  }))
}

function fetchDogToEdit() {
  let dogId = event.target.dataset.dogId

  fetch(`${DOGS_URL}/${dogId}`)
  .then(response => response.json())
  .then(data => populateForm(data))
}

function populateForm(dogInfo) {
  let nameInput = document.getElementById('edit-name')
  let breedInput = document.getElementById('edit-breed')
  let sexInput = document.getElementById('edit-sex')
  let hiddenId = document.getElementById('hidden-id')

  nameInput.value = dogInfo.name
  breedInput.value = dogInfo.breed
  sexInput.value = dogInfo.sex
  hiddenId.value = dogInfo.id

  let editForm = document.getElementById('dog-form')
  editForm.addEventListener('submit', editPatch)
}

function editPatch(event) {
  event.preventDefault()

  let idValue = document.getElementById('hidden-id').value
  let nameValue = document.getElementById('edit-name').value
  let breedValue = document.getElementById('edit-breed').value
  let sexValue = document.getElementById('edit-sex').value

  fetch(`${DOGS_URL}/${idValue}`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: nameValue,
      breed: breedValue,
      sex: sexValue,
      id: idValue
    })
  })
  .then(response => response.json())
  .then(json => {
    let editedRow = document.getElementById(`row-${json.id}`)
    editedRow.querySelector(`#dog-name-${json.id}`).innerText = json.name
    editedRow.querySelector(`#dog-breed-${json.id}`).innerText = json.breed
    editedRow.querySelector(`#dog-sex-${json.id}`).innerText = json.sex
    // let editedDog = new Dog(json.name, json.breed, json.sex, json.id)
    // editedDog.render()
    document.getElementById('dog-form').reset()
  })
}
