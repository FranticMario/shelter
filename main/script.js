
function slidesFn () {
const btnLeft = document.querySelector(".arrow__left")
const btnRight = document.querySelector(".arrow__right")
const petsSlider = document.querySelector(".pets__slider")
const petsContainer = document.querySelector(".pets__cards")
const cardsArray = [];

class Card {
    constructor ({name, img, type, breed, description, age, inoculations, diseases, parasites}) {
        this.name = name;
        this.img = img;
        this.type = type;
        this.breed = breed;
        this.description = description;
        this.age = age;
        this.inoculations = inoculations;
        this.diseases = diseases;
        this.parasites = parasites;
    }
    renderCard() {
        const card = document.createElement("div")
        card.className = "card__layout"


        card.innerHTML = 
        `<div class="card__layout">
        <img src="${this.img}" alt="animal" class="pet__img">
        <div class="pet__name">${this.name}</div>
        <div class="pet__button">Learn more</div>
        </div>`

        return card
    }
}


const createCards = (arr, wrapper, num) => {
    const newArray = arr.splice(Math.round(Math.random()), num).sort(() => (Math.random() > 0.5 ? 1: -1))
    newArray.forEach(card => wrapper.append(card.renderCard()))
    arr.push(...newArray);
}


const getPetsData = async () => {
    try {
        const response = await fetch("../assets/json/pets.json")
        const data = await response.json()
        return data
    }
    catch (err) {
        console.log("Error >>>", err)
    }
} 

const createCardByBtn = (sideClass) => {
    petsContainer.innerHTML = ""
    createCards(cardsArray, petsContainer, 3)
    const slides  = document.querySelectorAll(".card__layout")
    slides.forEach(slide => slide.classList.add(sideClass))
}




getPetsData().then(data => data.forEach(obj => cardsArray.push(new Card(obj))))
.then(() => createCards(cardsArray, petsContainer, 3))
console.log(cardsArray)
btnLeft.addEventListener("click",() => createCardByBtn("slide-left"))
btnRight.addEventListener("click",() => createCardByBtn("slide-right"))




}
slidesFn()
