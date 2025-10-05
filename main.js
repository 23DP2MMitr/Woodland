const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const burgerMenu = document.querySelector('.burger_menu');

toggleBtn.onclick = function() {
    burgerMenu.classList.toggle('open');
    const isOpen = burgerMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}