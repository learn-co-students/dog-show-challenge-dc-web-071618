class Dog {
  constructor(name, breed, sex, id) {
    this.name = name
    this.breed = breed
    this.sex = sex
    this.id = id
  }

  render() {
    let tableBody = document.getElementById('table-body')
    let newRow = document.createElement('tr')
    let tdName = document.createElement('td')
    tdName.id = `dog-name-${this.id}`
    let tdBreed = document.createElement('td')
    tdBreed.id = `dog-breed-${this.id}`
    let tdSex = document.createElement('td')
    tdSex.id = `dog-sex-${this.id}`
    let tdEdit = document.createElement('td')
    let editButton = document.createElement('button')

    tdName.innerText = this.name
    tdBreed.innerText = this.breed
    tdSex.innerText = this.sex
    editButton.innerText = 'Edit Dog'
    editButton.dataset.dogId = `${this.id}`
    newRow.id = `row-${this.id}`

    tableBody.appendChild(newRow)
    newRow.appendChild(tdName)
    newRow.appendChild(tdBreed)
    newRow.appendChild(tdSex)
    newRow.appendChild(tdEdit)
    tdEdit.appendChild(editButton)

    editButton.addEventListener('click', fetchDogToEdit)
  }
}
