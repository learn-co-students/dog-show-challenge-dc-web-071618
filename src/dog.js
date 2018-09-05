class Dog {
  constructor(name, breed, sex, id) {
    this.name = name
    this.breed = breed
    this.sex = sex
    this.id = id
  }

  renderDog() {
    let dogTable = document.querySelector('table')
    let tr = document.createElement('tr')
    let tdName = document.createElement('td')
    let tdBreed = document.createElement('td')
    let tdSex = document.createElement('td')
    let tdEdit = document.createElement('td')
    tr.id = `dog-${this.id}`
    tdName.id = `dog-name`
    tdBreed.id = `dog-breed`
    tdSex.id = `dog-sex`
    tdName.innerText = `${this.name}`
    tdBreed.innerText = `${this.breed}`
    tdSex.innerText = `${this.sex}`
    tdEdit.innerHTML = `<button>Edit Dog</button>`
    tdEdit.addEventListener('click', populateEditForm)
    tr.appendChild(tdName)
    tr.appendChild(tdBreed)
    tr.appendChild(tdSex)
    tr.appendChild(tdEdit)
    dogTable.appendChild(tr)
  }
}
