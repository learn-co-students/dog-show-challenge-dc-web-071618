document.addEventListener('DOMContentLoaded', () => {
  getDogData();
  editDogHandler();
})

function getDogData() {
  fetch('http://localhost:3000/dogs')
  .then(r => r.json())
  .then(json => {
    json.forEach(dog => {
      render(dog);
    });
  })
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
      'Content-Type': 'application/json'
    }
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
  const dogForm = document.querySelector('#dog-form');
  dogForm.addEventListener('submit', e => {
    e.preventDefault();
    patchDogData(Number(e.target[3].id.split('-')[2]))
    e.target.reset();
  })
}

function render(dog) {
  const dogTable = document.getElementById('table-body');
  const dogRow = document.createElement('tr');
  const dogName = document.createElement('td');
  const dogBreed = document.createElement('td');
  const dogSex = document.createElement('td');
  const dogEdit = document.createElement('td');
  const dogEditButton = document.createElement('button');

  dogRow.id = `dog-${dog.id}`;
  dogName.innerText = dog.name;
  dogBreed.innerText = dog.breed;
  dogSex.innerText = dog.sex;
  dogEditButton.innerText = 'Edit Dog';
  dogEditButton.addEventListener('click', fillEditForm);

  dogEdit.appendChild(dogEditButton);
  dogRow.appendChild(dogName);
  dogRow.appendChild(dogBreed);
  dogRow.appendChild(dogSex);
  dogRow.appendChild(dogEdit);
  dogTable.appendChild(dogRow);
}

function fillEditForm(e) {
  const dogName = e.path[2].querySelectorAll('td')[0].innerText;
  const dogBreed = e.path[2].querySelectorAll('td')[1].innerText;
  const dogSex = e.path[2].querySelectorAll('td')[2].innerText;
  const dogId = e.path[2].id.split('-')[1];

  const dogForm = document.querySelector('#dog-form');
  const dogNameInput = dogForm.querySelectorAll('input')[0];
  const dogBreedInput = dogForm.querySelectorAll('input')[1];
  const dogSexInput = dogForm.querySelectorAll('input')[2];
  const dogEditSubmit = dogForm.querySelectorAll('input')[3];

  dogNameInput.value = dogName;
  dogBreedInput.value = dogBreed;
  dogSexInput.value = dogSex;
  dogEditSubmit.id = `edit-dog-${dogId}`
}
