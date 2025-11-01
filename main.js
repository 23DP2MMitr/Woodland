const toggleBtn = document.querySelector('.toggle_btn');
const toggleBtnIcon = document.querySelector('.toggle_btn i');
const burgerMenu = document.querySelector('.burger_menu');

toggleBtn.onclick = function() {
    burgerMenu.classList.toggle('open');
    const isOpen = burgerMenu.classList.contains('open');

    toggleBtnIcon.classList = isOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
}

function dark_theme() {
    var element = document.body;
    element.classList.toggle("dark-mode");
}

function submit_form() {
    const email = document.getElementById("email");
    if (!email.value.includes("@")) {
        alert("Nepareiza e-pasta adrese");
        email.style.color = "red";
        email.style.backgroundColor = "#ffcccc";
        return false;
    }
    return true;
}