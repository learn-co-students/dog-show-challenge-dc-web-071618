//-----------Welcome to the 🐶 show-----------//

let formIdTracker

document.addEventListener(`DOMContentLoaded`, function(){
  console.log(`We have lift-off 🚀`)
  fetchRegisteredDogs()
})

function fetchRegisteredDogs(){
  fetch(`http://localhost:3000/dogs`)
  .then(res => res.json())
  .then(json => doleOutDogs(json))
}

function doleOutDogs(json){
  json.forEach(function(dog){
    renderOneDog(dog)
  })
}

function renderOneDog(dog){
  let dogsTable = document.getElementById('dogsTable')
  let dogRow = document.createElement(`tr`)
  dogRow.className = `dogRow`
  dogRow.id = `rowId_${dog.id}`

  let dogName = document.createElement(`th`)
  dogName.innerText = `${dog.name}`
  dogName.id = `dog name`

  let dogBreed = document.createElement(`th`)
  dogBreed.innerText = `${dog.breed}`
  dogBreed.id = `dog breed`

  let dogSex = document.createElement(`th`)
  dogSex.innerText = `${dog.sex}`
  dogSex.id = `dog sex`

  let dogEditDog = document.createElement(`th`)
  let editDogBtn = document.createElement(`button`)
  editDogBtn.innerText = `Edit Dog`
  editDogBtn.id = `dogId_${dog.id}`
  editDogBtn.dogName = `${dog.name}`
  editDogBtn.dogBreed = `${dog.breed}`
  editDogBtn.dogSex = `${dog.sex}`
  editDogBtn.addEventListener(`click`, populateDogForm)
  dogEditDog.appendChild(editDogBtn)

  dogsTable.appendChild(dogRow)
  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(dogEditDog)
}

function populateDogForm(e){
  let dogForm = document.getElementById(`dog-form`)
  formIdTracker = parseInt(e.target.id.split("_")[1])

  dogForm.addEventListener('submit', editSubmitHandler)

  let formName = document.getElementById(`formName`)
  let formBreed = document.getElementById(`formBreed`)
  let formSex = document.getElementById(`formSex`)

  formName.value = `${e.target.dogName}`
  formBreed.value = `${e.target.dogBreed}`
  formSex.value = `${e.target.dogSex}`

}

function editSubmitHandler(e){
  e.preventDefault()
  // debugger
  fetch(`http://localhost:3000/dogs/${formIdTracker}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: `${e.target.name.value}`,
      breed: `${e.target.breed.value}`,
      sex: `${e.target.sex.value}`
    })
  })
    .then(res => res.json())
    .then(json => renderSpecificDog(json))
}

function renderSpecificDog(dog){
  let dogRow = document.getElementById(`rowId_${dog.id}`)
  dogRow.innerHTML = ("")

  let dogName = document.createElement(`th`)
  dogName.innerText = `${dog.name}`
  dogName.id = `dog name`

  let dogBreed = document.createElement(`th`)
  dogBreed.innerText = `${dog.breed}`
  dogBreed.id = `dog breed`

  let dogSex = document.createElement(`th`)
  dogSex.innerText = `${dog.sex}`
  dogSex.id = `dog sex`

  let dogEditDog = document.createElement(`th`)
  let editDogBtn = document.createElement(`button`)
  editDogBtn.innerText = `Edit Dog`
  editDogBtn.id = `dogId_${dog.id}`
  editDogBtn.dogName = `${dog.name}`
  editDogBtn.dogBreed = `${dog.breed}`
  editDogBtn.dogSex = `${dog.sex}`
  editDogBtn.addEventListener(`click`, populateDogForm)
  dogEditDog.appendChild(editDogBtn)

  dogRow.appendChild(dogName)
  dogRow.appendChild(dogBreed)
  dogRow.appendChild(dogSex)
  dogRow.appendChild(dogEditDog)
}
