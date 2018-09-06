document.addEventListener('DOMContentLoaded', () => {
  fetchDogs()
  editDogHandler()
})

function fetchDogs(){
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(dogData => {dogData.forEach (dog => createDog(dog))})
}

function patchDogData(id) {
  const dogName = document.querySelector('#dog-form').querySelectorAll('input')[0].value;
  const dogBreed = document.querySelector('#dog-form').querySelectorAll('input')[1].value;
  const dogSex = document.querySelector('#dog-form').querySelectorAll('input')[2].value;
  const data = {name: dogName, breed: dogBreed, sex: dogSex};
  fetch(`http://localhost:3000/dogs/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'}
  })
  .then(r => r.json())
  .then(json => {
    const dogRow = document.querySelector(`#dog-${json.id}`);
    dogRow.querySelectorAll('td')[0].innerText = json.name;
    dogRow.querySelectorAll('td')[1].innerText = json.breed;
    dogRow.querySelectorAll('td')[2].innerText = json.sex;
  })
}

function editDogHandler() {
  const dogForm = document.querySelector('#dog-form'); //gets dog form
  dogForm.addEventListener('submit', e => { //adds event listener to submit of form
    e.preventDefault(); //prevents default
    patchDogData(Number(e.target[3].id.split('-')[2])) //call on patch -> parameter converted to number
    e.target.reset(); //resets target for next time you edit
  })
}

function createDog(dog){
  let dogTable = document.getElementById('table-body');
  let dogRow = document.createElement('tr')
  let dogName = document.createElement('td')
  let dogBreed = document.createElement('td')
  let dogSex = document.createElement('td')
  let dogButtonRow = document.createElement('td')
  let dogButton = document.createElement('button')
  dogTable.appendChild(dogRow)
  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(dogButtonRow)
  dogButtonRow.appendChild(dogButton)
  dogRow.id = `dog-${dog.id}`
  dogName.innerText = dog.name
  dogBreed.innerText = dog.breed
  dogSex.innerText = dog.sex
  dogButton.innerText = "Edit Dog"
  dogButton.addEventListener('click', editDog)
}

function editDog(event) {
  let dogName = event.path[2].querySelectorAll('td')[0].innerText;
  let dogBreed = event.path[2].querySelectorAll('td')[1].innerText;
  let dogSex = event.path[2].querySelectorAll('td')[2].innerText;
  let dogId = event.path[2].id.split('-')[1];

  const dogForm = document.querySelector('#dog-form');
  dogForm.querySelectorAll('input')[0].value = dogName
  dogForm.querySelectorAll('input')[1].value = dogBreed
  dogForm.querySelectorAll('input')[2].value = dogSex
  const dogEditSubmit = dogForm.querySelectorAll('input')[3];

  dogEditSubmit.id = `edit-dog-${dogId}`
}
