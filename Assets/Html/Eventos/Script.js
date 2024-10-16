/** @format */

// Variables
const addEventBtn = document.getElementById("add-event-btn");
const modal = document.getElementById("event-form-modal");
const closeBtn = document.querySelector(".close-btn");
const eventForm = document.getElementById("event-form");
const eventsList = document.getElementById("events-list");
const imageUpload = document.getElementById("event-image");
const imagePreview = document.getElementById("image-preview");
let isEditing = false;
let editingIndex = null;

// Abrir el modal para añadir evento
addEventBtn.addEventListener("click", () => {
  modal.style.display = "block";
  resetForm();
});

// Cerrar el modal
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
  resetForm();
});

// Cerrar modal al hacer clic fuera del formulario
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    resetForm();
  }
});

// Previsualizar imagen
imageUpload.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      imagePreview.src = e.target.result;
      imagePreview.style.display = "block";
      document.querySelector(".image-upload-label span").style.display = "none";
    };
    reader.readAsDataURL(file);
  }
});

// Función para cargar eventos desde LocalStorage
function loadEvents() {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  eventsList.innerHTML = "";
  events.forEach((event, index) => {
    displayEvent(event, index);
  });
}

// Función para mostrar un evento en la página
function displayEvent(event, index) {
  const eventCard = document.createElement("div");
  eventCard.classList.add("event-card");
  eventCard.innerHTML = `
        <h3>${event.title}</h3>
        <p>${event.subtitle}</p>
        <p>Fecha: ${formatDate(event.date)}</p>
        <p>Lugar: ${event.location}</p>
        <img src="${event.image}" alt="${
    event.title
  }" style="max-width: 100%; height: auto;">
        <p>${event.description}</p>
        <button class="notify-btn">
            <i data-lucide="bell"></i>
            Avisarme del Evento
        </button>
        <button class="edit-btn" data-index="${index}">
            <i data-lucide="edit"></i>
            Editar
        </button>
        <button class="delete-btn" data-index="${index}">
            <i data-lucide="trash-2"></i>
            Eliminar Evento
        </button>
    `;
  eventsList.appendChild(eventCard);

  eventCard.querySelector(".delete-btn").addEventListener("click", (e) => {
    deleteEvent(e.target.dataset.index);
  });

  eventCard.querySelector(".edit-btn").addEventListener("click", (e) => {
    editEvent(e.target.dataset.index);
  });

  eventCard.querySelector(".notify-btn").addEventListener("click", () => {
    alert(
      `Serás notificado para el evento: "${event.title}" el ${formatDate(
        event.date
      )}`
    );
  });

  lucide.createIcons();
}

// Función para formatear la fecha
function formatDate(dateString) {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString("es-ES", options);
}

// Función para guardar el evento en LocalStorage
function saveEvent(event) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  if (isEditing) {
    events[editingIndex] = event;
    isEditing = false;
    editingIndex = null;
  } else {
    events.push(event);
  }
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}

// Función para eliminar un evento
function deleteEvent(index) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  events.splice(index, 1);
  localStorage.setItem("events", JSON.stringify(events));
  loadEvents();
}

// Función para editar un evento
function editEvent(index) {
  const events = JSON.parse(localStorage.getItem("events")) || [];
  const event = events[index];

  document.getElementById("event-title").value = event.title;
  document.getElementById("event-subtitle").value = event.subtitle;
  document.getElementById("event-date").value = event.date;
  document.getElementById("event-location").value = event.location;
  document.getElementById("event-description").value = event.description;
  imagePreview.src = event.image;
  imagePreview.style.display = "block";
  document.querySelector(".image-upload-label span").style.display = "none";

  document.getElementById("form-title").textContent = "Editar Evento";
  modal.style.display = "block";
  isEditing = true;
  editingIndex = index;
}

// Función para validar el formulario antes de guardar
function validateForm() {
  const requiredFields = ["event-title", "event-date", "event-location"];
  for (let field of requiredFields) {
    if (!document.getElementById(field).value) {
      alert("Por favor, completa todos los campos obligatorios");
      return false;
    }
  }
  return true;
}

// Manejo del formulario para agregar o editar eventos
eventForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (!validateForm()) return;

  const newEvent = {
    title: document.getElementById("event-title").value,
    subtitle: document.getElementById("event-subtitle").value,
    date: document.getElementById("event-date").value,
    location: document.getElementById("event-location").value,
    description: document.getElementById("event-description").value,
    image: imagePreview.src,
  };

  saveEvent(newEvent);
  resetForm();
  modal.style.display = "none";
});

// Función para reiniciar el formulario y su estado
function resetForm() {
  eventForm.reset();
  document.getElementById("form-title").textContent = "Subir Evento:";
  imagePreview.src = "placeholder-image.png";
  imagePreview.style.display = "none";
  document.querySelector(".image-upload-label span").style.display = "flex";
  isEditing = false;
  editingIndex = null;
}

// Cargar los eventos al cargar la página
document.addEventListener("DOMContentLoaded", loadEvents);
