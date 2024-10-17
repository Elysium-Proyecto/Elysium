const checkbox = document.getElementById('checkbox');
const containerAll = document.querySelector('.container-all');
const img = document.querySelector('.u-img');
const header = document.querySelector('#header');
const link = document.querySelector('#h-link');
const link2 = document.querySelector('#h-link2');
const link3 = document.querySelector('#h-link3');

const opblack = document.querySelector('.icono_menu');
const opwhite = document.querySelector('.icono_menu-dark');

const result = document.querySelector('#result1',);
const result2 = document.querySelector('#result2');
const result3 = document.querySelector('#result3');

const editbutton = document.querySelector('#edit-button');
const acceptbutton = document.querySelector('#accept-button');
const active = document.querySelector('.active');

const backwhite = document.querySelector('#back-white')
const backblack = document.querySelector('#back-black');
// Función para aplicar el modo oscuro
function applyDarkMode() {
    document.body.classList.add('dark-mode');
    active.classList.add('dark-mode');
    header.classList.add('dark-mode');
    link.classList.add('dark-mode');
    link2.classList.add('dark-mode');
    link3.classList.add('dark-mode');
    
    opblack.style.display = 'none';
    opwhite.style.display = 'block';

    result1.classList.add('dark-mode');
    result2.classList.add('dark-mode');
    result3.classList.add('dark-mode');
    containerAll.classList.add('dark-mode');
    img.classList.add('dark-mode');
    editbutton.classList.add('dark-mode');
    acceptbutton.classList.add('dark-mode');

    backwhite.style.display = 'block';
    backblack.style.display = 'none';
}

// Función para quitar el modo oscuro
function removeDarkMode() {
    document.body.classList.remove('dark-mode');
    active.classList.remove('dark-mode');
    header.classList.remove('dark-mode');
    link.classList.remove('dark-mode');
    link2.classList.remove('dark-mode');
    link3.classList.remove('dark-mode');

    opblack.style.display = 'block';
    opwhite.style.display = 'none';


    containerAll.classList.remove('dark-mode');
    result1.classList.remove('dark-mode');
    result2.classList.remove('dark-mode');
    result3.classList.remove('dark-mode');
    img.classList.remove('dark-mode');
    editbutton.classList.remove('dark-mode');
    acceptbutton.classList.remove('dark-mode');

    backwhite.style.display = 'none';
    backblack.style.display = 'block';
}

// Verificar si el modo oscuro está habilitado en localStorage
if (localStorage.getItem('darkMode') === 'enabled') {
    checkbox.checked = true;
    applyDarkMode();
} else {
    checkbox.checked = false;
    removeDarkMode();
}

// Escuchar cambios en el checkbox
checkbox.addEventListener('change', () => {
    if (checkbox.checked) {
        applyDarkMode();
        localStorage.setItem('darkMode', 'enabled');  // Guardar en localStorage
    } else {
        removeDarkMode();
        localStorage.setItem('darkMode', 'disabled'); // Guardar en localStorage
    }
});



//Modo ingles y la cosa suena rah

const languageSelect = document.getElementById('language');

// Objeto que contiene las traducciones
const translations = {
    es: {
        link1: 'Inicio',
        link2: 'Eventos',
        link3: 'Foros',
        link4: 'Plataforma LMS',
        username: 'Nombre de usuario:',
        email: 'Correo:',
        id: 'Matricula:',
        button: 'Editar',
        abutton: 'Aceptar',
        profile: 'Perfil',
        darkmode: 'Modo Oscuro',
        noti: 'Notificaciones',
        language: 'Idioma'
    },

    en: {
        link1: 'Home',
        link2: 'Events',
        link3: 'Forum',
        link4: 'LMS Platform',
        username: 'Username:',
        email: 'Email:',
        id: 'ID:',
        button: 'Edit',
        abutton: 'Accept',
        profile: 'Profile',
        darkmode: 'Dark mode',
        noti: 'Notifications',
        language: 'Language'
    }
};


// Función para traducir el contenido
function translatePage() {
    const selectedLanguage = languageSelect.value;

    // Validación: asegúrate de que el idioma seleccionado exista en translations
    if (translations[selectedLanguage]) {

        document.getElementById('profile').textContent = translations[selectedLanguage].profile;

        document.getElementById('u-name').textContent = translations[selectedLanguage].username;

        document.getElementById('u-email').textContent = translations[selectedLanguage].email;

        document.getElementById('u-id').textContent = translations[selectedLanguage].id;

        document.getElementById('edit-button').textContent = translations[selectedLanguage].button

        document.getElementById('accept-button').textContent = translations[selectedLanguage].abutton;

        document.getElementById('darkmode').textContent = translations[selectedLanguage].darkmode;

        document.getElementById('noti').textContent = translations[selectedLanguage].noti;

        document.getElementById('tongue').textContent = translations[selectedLanguage].language;

        document.getElementById('h-link').textContent = translations[selectedLanguage].link1;

        document.getElementById('h-link1').textContent = translations[selectedLanguage].link2;

        document.getElementById('h-link2').textContent = translations[selectedLanguage].link3;

        document.getElementById('h-link3').textContent = translations[selectedLanguage].link4;

        // Guarda el idioma seleccionado en localStorage
        localStorage.setItem('language', selectedLanguage);
    }
}

// Escuchar cambios en el selector de idioma
languageSelect.addEventListener('change', translatePage);

// Cargar el idioma guardado en localStorage (opcional)
const savedLanguage = localStorage.getItem('language') || 'es';
languageSelect.value = savedLanguage;
translatePage();


//Configurar usuario

function editoption() {
    document.getElementById("edit-button").style.display = "none";
    document.getElementById("accept-button").style.display = "block";
    document.getElementById("e-id").style.display = "block";
    document.getElementById("e-email").style.display = "block";
    document.getElementById("e-name").style.display = "block";
    document.getElementById("result1").style.display = "none";
    document.getElementById("result2").style.display = "none";
    document.getElementById("result3").style.display = "none";
}

function accepted() {
    const name = document.getElementById("e-name").value;
    const id = document.getElementById("e-id").value;
    const email = document.getElementById('e-email').value; 
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // para validar el email

    if (!emailPattern.test(email)) {
        alert("Ese email está malo, manin");
        event.preventDefault(); // Previene el envío del formulario
    } else {
        // Verifica si alguno de los campos está vacío
        if (name === "" || email === "" || id === "") {
            alert("No dejes los campos vacíos :(");
        } else {
            // Guardar en localStorage
            localStorage.setItem("name", name);
            localStorage.setItem("email", email);
            localStorage.setItem("id", id);

            // Oculta el botón "Aceptar" y los campos de entrada, muestra el botón "Editar"
            document.getElementById("accept-button").style.display = "none";
            document.getElementById("edit-button").style.display = "block";
            document.getElementById("e-id").style.display = "none";
            document.getElementById("e-email").style.display = "none";
            document.getElementById("e-name").style.display = "none";
            document.getElementById("result1").style.display = "block";
            document.getElementById("result2").style.display = "block";
            document.getElementById("result3").style.display = "block";

            // Limpiar los contenedores antes de añadir nuevos elementos
            const resultDiv = document.getElementById("result1");
            const resultDiv2 = document.getElementById("result2");
            const resultDiv3 = document.getElementById("result3");
            resultDiv.innerHTML = '';
            resultDiv2.innerHTML = '';
            resultDiv3.innerHTML = '';

            // Crear y añadir los nuevos elementos <p>
            const idvalue = document.createElement("p");
            idvalue.textContent = id;

            const emailvalue = document.createElement("p");
            emailvalue.textContent = email;

            const namevalue = document.createElement("p");
            namevalue.textContent = name;

            resultDiv3.appendChild(idvalue);
            resultDiv2.appendChild(emailvalue);
            resultDiv.appendChild(namevalue);
        }
    }
}

// Función para cargar datos desde localStorage al iniciar la página
function loadStoredData() {
    const storedName = localStorage.getItem("name");
    const storedEmail = localStorage.getItem("email");
    const storedId = localStorage.getItem("id");

    if (storedName) {
        document.getElementById("result1").innerHTML = `<p>${storedName}</p>`;
    }
    if (storedEmail) {
        document.getElementById("result2").innerHTML = `<p>${storedEmail}</p>`;
    }
    if (storedId) {
        document.getElementById("result3").innerHTML = `<p>${storedId}</p>`;
    }
}

// Llamar a la función al cargar la página
window.onload = loadStoredData;