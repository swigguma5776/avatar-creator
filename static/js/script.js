

class Bender {
    constructor(){
        this.dateCreated = new Date(); // new Date object
        this.id = this.setId();
    }
    
    setId = () => {
        return Math.floor(Math.random() * 100);
    }
    
    setAttributes = (attributes) => {
        Object.assign(this, attributes) // dynamically creating attributes on an object
        
    }
    
    getAttributes = () => {
        return { ...this }; //dynamically return all attributes
    }
}



function handleSubmit(event){
    event.preventDefault();
    // console.log(event.target.elements)
    
    const formElements = event.target.elements
    
     // Create an array to hold the selected abilities
     const abilities = [];
     for (let element of formElements.abilities) {
         if (element.checked) {
             abilities.push(element.value);
         }
     }
    
    const data = {
        name: formElements.name.value,
        age: formElements.age.value,
        nation: formElements.nation.value,
        skill: formElements['skill-level'].value,
        abilities,
        image: formElements.image.value
    }
    
    console.log(data)
    
    const bender = new Bender();
    bender.setAttributes(data);
    
    displayCharacters(bender)
    event.target.reset();
}


function displayCharacters(character){
    
    const display = document.getElementsByClassName('character-display')[0]
    console.log(display)
    const data = character.getAttributes();
    
    const html = `
    <div class="card col border rounded shadow p-3" id=card${data.id}>
      <div class="border rounded  image">
        <img src="${data.image}" class="img-fluid" alt="...">
      </div>
      <div class="card-body">
        <h5 class="card-title">${data.name}</h5>
        <p class="card-text">Nation: ${data.nation}</p>
        <p class="card-text">Age: ${data.age}</p>
        <p class="card-text">Abilities: ${data.abilities.join(", ")}</p>
        <p class="card-text">Skill Level: ${data.skill}</p>
      </div>
      <div class="card-body">
        <a href="#" class="btn btn-warning">Update</a>
        <a onclick="deleteBender(${data.id})" class="btn btn-danger">Delete</a>
      </div>
    </div>
    `;
    
  
  const card = document.createElement('div')
  card.setAttribute('id', data.id)
  
  card.innerHTML = html
  display.appendChild(card)
  
  const benderCard = document.getElementById(`card${data.id}`)
  benderCard.style.backgroundColor = getBackgroundColor(data.nation)
}

function getBackgroundColor(nation) {
    const nationColors = {
        air: "goldenrod",
        water: "turquoise",
        earth: "greenyellow",
        fire: "tomato"
    }
    
    return nationColors[nation]
}

function deleteBender(id){
    console.log(id)
    const display = document.querySelector('.character-display')
    console.log(display)
    const bender = document.getElementById(id)
    display.removeChild(bender)
}