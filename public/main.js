const menuBtn = document.querySelector('.menu-btn');
const hamburger = document.querySelector('.menu-btn__burger');
const nav = document.querySelector('.nav');
const menuNav = document.querySelector('.menu-nav');
const navItems = document.querySelectorAll('.menu-nav__item');

let showMenu = false;

menuBtn.addEventListener('click', toggleMenu);

function toggleMenu(){
    if(!showMenu){
        hamburger.classList.add('open');
        nav.classList.add('open');
        menuNav.classList.add('open');
        navItems.forEach(item => item.classList.add('open'));

        showMenu = true
    } else {
        hamburger.classList.remove('open');
        nav.classList.remove('open');
        menuNav.classList.remove('open');
        navItems.forEach(item => item.classList.remove('open'));

        showMenu = false;
    }
}

const logo = document.querySelectorAll("#unmasked path");

for(let i = 0, j = 0; i<logo.length; i++, j++){
    let element = document.querySelector(`#unmasked path:nth-of-type(${i + 1})`)
    let totalLength = logo[i].getTotalLength();
    element.style.strokeDasharray = totalLength
    element.style.strokeDashoffset = totalLength
    element.animate({strokeDashoffset: 0}, {duration: 2000, easing: 'ease', direction: 'normal', fill: "forwards", delay: (j*1000)/8 }) 
}

