/////////////////////// Timer


let endTime = '2022-07-19';
console.log('Hello! Started!');

const daysCounter = document.querySelector('#days');
const hoursCounter = document.querySelector('#hours');
const minutesCounter = document.querySelector('#minutes');
const secondsCounter = document.querySelector('#seconds');

function getRemainingTime(endtime) {
    let currentDate = Date.parse(new Date());
    let endDate = Date.parse(endtime);
    let diff = endDate - currentDate;
    let days, hours, minutes, seconds;
    if (diff < 0) {
        days = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
    }
    else {
        days = Math.floor(diff/24/60/60/1000);
        hours = Math.floor(diff/60/60/1000)%24;
        minutes = Math.floor(diff/60/1000)%60;
        seconds = Math.floor(diff/1000)%60;
    }
    return {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds
    };
}

function setTimerValues (t) {
    daysCounter.textContent = t.days;
    hoursCounter.textContent = t.hours;
    minutesCounter.textContent = t.minutes;
    secondsCounter.textContent = t.seconds;
}

function activateTimer(endTime) {
    let timerId = setInterval(() => {
        setTimerValues(getRemainingTime(endTime));
    }, 1000);
}

activateTimer(endTime);
console.log(daysCounter);

////////////////////////////////////////////// Modal

const modal = document.querySelector('.modal');
const modalBtns = document.querySelectorAll('[data-modal]');
const modalClose = document.querySelector('.modal__close');

function hideModal() {
    modal.classList.remove('show');
    modal.classList.add('hide');
    document.documentElement.style.overflow = '';
}

function showModal() {
    modal.classList.remove('hide');
    modal.classList.add('show');
    document.documentElement.style.overflow = 'hidden';
}

modal.addEventListener('click', e => {
    if(e.target == modal)
        hideModal();
})

Array.from(modalBtns).forEach(item => {
    item.addEventListener('click', () => {
        showModal();
    })
})

modalClose.addEventListener('click', () => {
    hideModal();
})

document.addEventListener('keydown', e => {
    if(e.key == 'Escape')
        hideModal();
})

///////////////////////////////////////////// Tabs

const tabs = Array.from(document.querySelectorAll('.tabcontent'));
const tabTitles = Array.from(document.querySelectorAll('.tabheader__item'));

console.log(tabs);
console.log(tabTitles);

function hideTabs() {
    tabs.forEach(item => {
        item.classList.remove('show');
        item.classList.add('hide');
    })
}

function switchToTab(ix) {
    hideTabs();
    tabs[ix].classList.remove('hide');
    tabs[ix].classList.add('show');
}

function deactivateTabTitles() {
    tabTitles.forEach(item => {
        item.classList.remove('tabheader__item_active');
    })
}

function switchToTabTitle(ix) {
    deactivateTabTitles();
    tabTitles[ix].classList.add('tabheader__item_active');
}

for(let i = 0; i < tabTitles.length; ++i) {
    tabTitles[i].addEventListener('click', () => {
        switchToTab(i);
        switchToTabTitle(i);
    })
}

switchToTab(0);

//////////////////////////////////// 3 cards

class MenuCard {
    constructor(src, alt, name, descr, price, parentSelector) {
        this.src = src;
        this.alt = alt;
        this.name = name;
        this.descr = descr;
        this.price = price;
        this.elem = document.createElement('div');
        this.parent = document.querySelector(parentSelector);
    }

    render() {
        this.elem.classList.add('menu__item');
        this.elem.innerHTML = 
        `<img src=${this.src} alt=${this.alt}>
        <h3 class="menu__item-subtitle">Меню "${this.name}"</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
            <div class="menu__item-cost">Цена:</div>
            <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
        </div>`
        this.parent.append(this.elem);
    }  
}

new MenuCard(
    "img/tabs/vegy.jpg",
    "vegy",
    "Фитнес",
    `Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!`,
    150,
    '.menu .container'
).render() 

new MenuCard(
    "img/tabs/elite.jpg",
    "elite",
    "Премиум",
    `В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!`,
    200,
    '.menu .container'
).render() 

new MenuCard(
    "img/tabs/post.jpg",
    "post",
    "Постное",
    `Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.`,
    300,
    '.menu .container'
).render() 