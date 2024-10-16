const step1Content = document.getElementById('step1-content');
const step2Content = document.getElementById('step2-content');
const step3Content = document.getElementById('step3-content');
const step1 = document.getElementById('step-1');
const step2 = document.getElementById('step-2');
const step3 = document.getElementById('step-3');

document.getElementById('next1').addEventListener('click', () => {
    step1Content.classList.remove('active');
    step2Content.classList.add('active');
    step1.classList.remove('active');
    step2.classList.add('active');
});

document.getElementById('next2').addEventListener('click', () => {
    step2Content.classList.remove('active');
    step3Content.classList.add('active');
    step2.classList.remove('active');
    step3.classList.add('active');
});
