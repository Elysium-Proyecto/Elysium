/** @format */


const header = document.querySelector('#header');
const link1 = document.querySelector('#link1');
const link2 = document.querySelector('#link2');
const link3 = document.querySelector('#link3');
const link4 = document.querySelector('#link4');
const corptext = document.querySelector('#corp-text');
const div1 = document.querySelector('.div1');
const div2 = document.querySelector('.div2');
const div3 = document.querySelector('.div3');
const div4 = document.querySelector('.div4');
const text1 = document.querySelector('.text1');
const text2 = document.querySelector('.text2');
const text3 = document.querySelector('.text3');
const text4 = document.querySelector('.text4');
const card = document.querySelector('.card');


function applyDarkMode() {
    document.body.classList.add('dark-mode')
    header.classList.add('dark-mode');
    link1.classList.add('dark-mode');
    link2.classList.add('dark-mode');
    link3.classList.add('dark-mode');
    link4.classList.add('dark-mode');
    corptext.classList.add('dark-mode')
    div1.classList.add('dark-mode');
    div2.classList.add('dark-mode');
    div3.classList.add('dark-mode');
    div4.classList.add('dark-mode');
    text1.classList.add('dark-mode');
    text2.classList.add('dark-mode');
    text3.classList.add('dark-mode');
    text4.classList.add('dark-mode');
    card.classList.add('dark-mode');
}

if (localStorage.getItem('darkMode') === 'enabled') {
    applyDarkMode();
}else{
    document.body.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    link1.classList.remove('dark-mode');
    link2.classList.remove('dark-mode');
    link3.classList.remove('dark-mode');
    link4.classList.remove('dark-mode');
    corptext.classList.remove('dark-mode')
    div1.classList.remove('dark-mode');
    div2.classList.remove('dark-mode');
    div3.classList.remove('dark-mode');
    div4.classList.remove('dark-mode');
    text1.classList.remove('dark-mode');
    text2.classList.remove('dark-mode');
    text3.classList.remove('dark-mode');
    text4.classList.remove('dark-mode');
    card.classList.remove('dark-mode');

}
