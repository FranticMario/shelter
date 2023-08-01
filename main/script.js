function burgerFn() {
    const burgerMenu = document.querySelector(".header__burger");
    const menuContainer = document.querySelector(".menu__container");
    const headerMenu = document.querySelector(".header__menu");
    const menuList = document.querySelector(".menu__list")
  
  
    const toggleBurgerMenu = () => {
        menuContainer.classList.toggle("active");
        headerMenu.style.transform = menuContainer.classList.contains("active") ? "translateX(0)" : "";
        burgerMenu.classList.toggle("burger");
        document.documentElement.style.overflow = menuContainer.classList.contains("active") ? "hidden" : "";
      } 
      const closeByOberlay = (e) => !(e.target.classList.contains('active')) || toggleBurgerMenu();
      const closeByLink = (e) => !(e.target.classList.contains('menu__list') || e.target.classList.contains('menu__link')) || toggleBurgerMenu();
    
      burgerMenu.addEventListener("click", toggleBurgerMenu);
      document.addEventListener('click', closeByOberlay);
      menuList.addEventListener("click",  closeByLink );


}
burgerFn ()








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
        this.popup = this.renderPopup()
    }
    renderCard() {
        const card = document.createElement("div")
        card.className = "card__layout"
        card.addEventListener("click", () => {
        document.body.append(this.popup)
        document.documentElement.style.overflow = 'hidden';
        })
        card.innerHTML = 
        `
        <img src="${this.img}" alt="animal" class="pet__img">
        <div class="pet__name">${this.name}</div>
        <div class="pet__button">Learn more</div>
        `
        return card
    }

    renderPopup () {
        const popup = document.createElement("div")
        popup.className = "overlay"
        popup.innerHTML = `<div class="modal">   
        <img class="modal__close-icon" src ="../assets/icons/modal_close_button.svg"></img>
        <div class="modal__content">
            <img src="${this.img}" alt="" class="animal__img">
            <div class="animal__content">
                <h3 class="animal__name">${this.name}</h3>
                <h4 class="animal__type">${this.type} - ${this.breed} </h4>
                <h5 class="animal__description">${this.description}</h5>
                <ul class="list__content">
                    <li class="animal__age">Age: <span class="age">${this.age}</span></li>
                    <li class="animal__inculations">Inoculations: <span class="inculations">${this.inoculations}</span> </li>
                    <li class="animal__diseases">Diseases: <span class="diseases">${this.diseases}</span></li>
                    <li class="animal__parasites">Parasites: <span class="parasites">${this.parasites}</span></li>
                </ul>
            </div>
        </div>
    </div>`
        return popup
    }
}

const closeModal = (e) => {
    let classes = e.target.classList;
    if(classes.contains("overlay") || classes.contains("modal__close-icon")) {
        document.querySelector(".overlay").remove();
    }

}
const hoverOnModal = (e) => {
    let classes = e.target.classList;
    if(classes.contains("overlay") || classes.contains("modal__close-icon")) {
        document.querySelector(".modal__close-icon").classList.add("active")
    }

}

const hoverOutModal = (e) => {
    let classes = e.target.classList;
    if(classes.contains("overlay") || classes.contains("modal__close-icon")) {
        document.querySelector(".modal__close-icon").classList.remove("active")
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
window.addEventListener("click", closeModal)
window.addEventListener("mouseover",hoverOnModal)
window.addEventListener("mouseout",hoverOutModal)
}
slidesFn()
