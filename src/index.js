const dogForm = document.querySelector('#dog-form');

function fetchDogs() {
  fetch('http://localhost:3000/dogs')
  .then(response => response.json())
  .then(data => data.forEach(dog => addDogsToDom(dog)))
}

function addDogsToDom(dog) {
  let table = document.querySelector("table.margin")
  let tableBody = document.querySelector("#table-body")
  let tr = document.createElement('tr');
  let tdName = document.createElement('td');
  let tdBreed = document.createElement('td');
  let tdSex = document.createElement('td');
  let editBtn = document.createElement('button');

  tr.id = `dog-${dog.id}`;
  tdName.innerText = dog.name;
  tdBreed.innerText = dog.breed;
  tdSex.innerText = dog.sex;
  editBtn.innerText = "Edit";
  editBtn.id = `edit-${dog.id}`
  editBtn.addEventListener('click', function(event) {
    renderDogInfoToForm(event)
  })

  tr.appendChild(tdName);
  tr.appendChild(tdBreed);
  tr.appendChild(tdSex);
  tr.appendChild(editBtn);
  tableBody.appendChild(tr);
  table.appendChild(tableBody)
}

function renderDogInfoToForm(event) {
  let formDogName = dogForm.name;
  let formDogBreed = dogForm.breed;
  let formDogSex = dogForm.sex;

  let dogId = event.target.id.split("-")[1]
  dogForm.dataset.dogId = dogId

  formDogName.value = event.path[1].childNodes[0].innerText
  formDogBreed.value = event.path[1].childNodes[1].innerText
  formDogSex.value = event.path[1].childNodes[2].innerText
  // console.log(event.path[1].childNodes)
}

function getEditFormData() {
  let formDogName = dogForm.name;
  let formDogBreed = dogForm.breed;
  let formDogSex = dogForm.sex;
  return {
    name: formDogName.value,
    breed: formDogBreed.value,
    sex: formDogSex.value
  }
}

  function fetchEditDogs(id) {
    fetch(`http://localhost:3000/dogs/${id}`, {
      method: "PATCH",
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify(getEditFormData())
    })
    .then(response => response.json())
    .then(dogInfo => {
      renderNewDogInfo(dogInfo)})
  }

  function renderNewDogInfo(dogInfo) {
    let tr = document.getElementById(`dog-${dogInfo.id}`);
    let tdName = tr.children[0];
    let tdBreed = tr.children[1];
    let tdSex = tr.children[2];

    tdName.innerText = dogInfo.name;
    tdBreed.innerText = dogInfo.breed;
    tdSex.innerText = dogInfo.sex;
  }

function addSubmitListener() {
  dogForm.addEventListener('submit', function(event) {
    event.preventDefault();
    fetchEditDogs(event.target.dataset.dogId)
  })
}

function init(){
  fetchDogs();
  addSubmitListener();
}
document.addEventListener('DOMContentLoaded', init)
