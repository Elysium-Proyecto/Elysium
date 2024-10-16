// Función para ejecutar comandos de formato en el editor
function ejecutar(command, value = null) {
  document.execCommand(command, false, value);
}

// Guardar tarea en localStorage y redirigir
document.getElementById("upload-task").addEventListener("click", function () {
  const titulo = document.getElementById("tituloInput").value;
  const descripcion = document.getElementById("descripcionInput").value;
  const contenido = document.getElementById("editor").innerHTML;
  const fechaEntrega = document.getElementById("due-date").value;

  // Guardar datos en localStorage
  localStorage.setItem("titulo", titulo);
  localStorage.setItem("descripcion", descripcion);
  localStorage.setItem("contenido", contenido);
  localStorage.setItem("fechaEntrega", fechaEntrega);

  // Redirigir a la página de vista previa
  window.location.href = "vista-previa.html";
});

// Guardar en agenda
document.getElementById("add-to-agenda").addEventListener("click", function () {
  const titulo = document.getElementById("tituloInput").value;
  const fechaEntrega = document.getElementById("due-date").value;

  // Guardar en la agenda en localStorage
  const agenda = JSON.parse(localStorage.getItem("agenda")) || [];
  agenda.push({ titulo, fechaEntrega, entregado: false });
  localStorage.setItem("agenda", JSON.stringify(agenda));

  // Redirigir a la agenda
  window.location.href = "agenda.html";
});

// Mostrar tareas en la página de agenda
window.onload = function () {
  const tareasList = document.getElementById("tareasList");
  const agenda = JSON.parse(localStorage.getItem("agenda")) || [];

  agenda.forEach((tarea, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${tarea.titulo} - Fecha: ${tarea.fechaEntrega} <button onclick="verTarea(${index})">Subir Tarea</button>`;
    tareasList.appendChild(li);
  });
};

// Redirigir para ver la tarea desde la agenda
function verTarea(index) {
  localStorage.setItem("tareaIndex", index);
  window.location.href = "vista-previa.html";
}

// Mostrar datos en vista previa
window.onload = function () {
  const titulo = localStorage.getItem("titulo");
  const descripcion = localStorage.getItem("descripcion");
  const contenido = localStorage.getItem("contenido");
  const fechaEntrega = localStorage.getItem("fechaEntrega");

  document.getElementById("tituloMostrar").innerText = titulo;
  document.getElementById("descripcionMostrar").innerText = descripcion;
  document.getElementById("fechaEntrega").innerText = `Fecha de entrega: ${fechaEntrega}`;
  document.getElementById("contenidoMostrar").innerHTML = contenido;
};
