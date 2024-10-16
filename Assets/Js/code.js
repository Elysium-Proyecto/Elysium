/*
    By Emanuel Roa
*/

/*
    Calendario
*/
const meses = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
];

let fechaActual = new Date();

function Calendario() {
    const mesAnio = document.getElementById('mes');
    const fechas = document.getElementById('fechas');

    const mes = fechaActual.getMonth();
    const año = fechaActual.getFullYear();

    if (!mesAnio || !fechas) {
        console.log('Los elementos mes o fechas no existen en esta página.');
        return;
    }

    mesAnio.textContent = `${meses[mes]} ${año}`;
    fechas.innerHTML = ''; 

    const primerDia = new Date(año, mes, 1).getDay();
    const diasEnMes = new Date(año, mes + 1, 0).getDate();

    for (let i = 0; i < (primerDia || 7) - 1; i++) {
        fechas.innerHTML += `<div class="fecha"></div>`;
    }

    for (let dia = 1; dia <= diasEnMes; dia++) {
        const diaDiv = document.createElement('div');
        diaDiv.className = 'fecha';
        diaDiv.textContent = dia;

        diaDiv.addEventListener("click", () => {
            mostrarform();
        });

        fechas.appendChild(diaDiv);
    }
}

function cambiarMes(incremento) {
    fechaActual.setMonth(fechaActual.getMonth() + incremento);
    Calendario();
}

Calendario();

/*
    *Formulario Agendar Personal
*/

function mostrarform() {
    const formulario = document.getElementById('form_container_general');

    if (!formulario) {
        console.log('No se encontró el elemento con id form_container_general');
        return;
    }

    if (formulario.style.display === 'none') { 
        formulario.style.display = 'block';  
    } else {
        formulario.style.display = 'none';   
    }
    
}

function ocultarform() {
    const formulario = document.getElementById('form_container_general');

    if (!formulario) {
        console.log('No se encontró el elemento con id form_container_general');
        return;
    }

    if (formulario.style.display === 'block') { 
        formulario.style.display = 'none';  
    } else {
        formulario.style.display = 'block';   
    }    
}

function validarFormulario(){
    const nombre_agenda = document.getElementById('nombreAgenda').value.trim();
    const descripcion_agenda = document.getElementById('descripcionAgenda').value.trim();
    const fecha_agenda = document.getElementById('fechaAgenda').value.trim();
    const estado_agenda = document.getElementById('estadoAgenda').value.trim();

    let validar = true;

    if(nombre_agenda === ''){
        document.getElementById('error_nombre_agenda').textContent = 'Complete el campo';
        validar = false;
    }else{
        document.getElementById('error_nombre_agenda').textContent = '';
    }

    if(descripcion_agenda === ''){
        document.getElementById('error_descripcion_agenda').textContent = 'Complete el campo';
        validar = false;
    }else{
        document.getElementById('error_descripcion_agenda').textContent = '';
    }

    if(fecha_agenda === ''){
        document.getElementById('error_fecha_agenda').textContent = 'Complete el campo';
        validar = false;
    }else{
        document.getElementById('error_fecha_agenda').textContent = '';
    }

    if(estado_agenda === ''){
        document.getElementById('error_estado_agenda').textContent = 'Complete el campo';
        validar = false;
    }else{
        document.getElementById('error_estado_agenda').textContent = '';
    }

    if(!validar){
        return;
    }

    ocultarform();

    document.getElementById('hora_agenda_personal').innerHTML = fecha_agenda;
    document.getElementById('nombre_agenda_personal').innerHTML = nombre_agenda;
    document.getElementById('descripcion_agenda_personal').innerHTML = descripcion_agenda ;
    document.getElementById('estado_agenda_personal').innerHTML = estado_agenda;
}


/*
    Grupo Asignatura
*/

function valiMicroForm() {
    const fileInput = document.getElementById('file-input');
    const tarea = document.getElementById('Tarea');

    if (!fileInput.files.length) {
        alert('Por favor, selecciona un archivo para la tarea.');
        return;
    }

    ocultarentrega()
    console.log('Gracias por seleccionar el archivo.');
    tarea.textContent = 'Enviado';
}


function modalentrega() {
    const entregaasignatura = document.getElementById('modal_entregar_tarea');

    if (!entregaasignatura) {
        console.log('No se encontró el elemento con id modad_entregar_tarea');
        return;
    }

    if (entregaasignatura.style.display === 'none') { 
        entregaasignatura.style.display = 'block';  
    } else {
        entregaasignatura.style.display = 'none';   
    }
    
}

function ocultarentrega() {
    const entregaasignatura = document.getElementById('modal_entregar_tarea');

    if (!entregaasignatura) {
        console.log('No se encontró el elemento con id modar_entregar_tarea');
        return;
    }

    if (entregaasignatura.style.display === 'block') { 
        entregaasignatura.style.display = 'none';  
    } else {
        entregaasignatura.style.display = 'block';   
    }    
}
