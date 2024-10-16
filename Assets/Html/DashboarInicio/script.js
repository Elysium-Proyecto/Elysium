/** @format */

document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  const modeSelect = document.getElementById("modeSelect");
  const sideNav = document.getElementById("sideNav");
  const mainContent = document.getElementById("mainContent");

  // Variables asignación
  const courseSelect = document.getElementById("courseSelect");
  const assignmentsList = document.getElementById("assignmentsList");
  const addAssignmentBtn = document.getElementById("addAssignmentBtn");
  const assignmentModal = document.getElementById("assignmentModal");

  const assignmentsData = {
    matematicas: [
      {
        id: 1,
        title: "Ejercicios de álgebra lineal",
        description: "Resolver problemas del capítulo 3",
        dueDate: "2023-05-18",
      },
      {
        id: 2,
        title: "Proyecto de estadística",
        description: "Análisis de datos reales",
        dueDate: "2023-05-25",
      },
    ],
    fisica: [
      {
        id: 3,
        title: "Informe de laboratorio",
        description: "Experimento de caída libre",
        dueDate: "2023-05-20",
      },
      {
        id: 4,
        title: "Problemas de electromagnetismo",
        description: "Resolver ejercicios del libro",
        dueDate: "2023-05-27",
      },
    ],
    literatura: [
      {
        id: 5,
        title: "Ensayo sobre García Márquez",
        description: 'Analizar "Cien años de soledad"',
        dueDate: "2023-05-22",
      },
      {
        id: 6,
        title: "Presentación de poesía",
        description: "Elegir un poeta contemporáneo",
        dueDate: "2023-05-29",
      },
    ],
  };

  function updateSideNav(mode) {
    const teacherNavItems = [
      { icon: "home", text: "Dashboard", id: "dashboard" },
      { icon: "users", text: "Mis Clases", id: "classes" },
      { icon: "clipboard", text: "Asignaciones", id: "assignments" },
      { icon: "bar-chart", text: "Calificaciones", id: "grades" },
      { icon: "calendar", text: "Eventos", id: "events" },
    ];

    const adminNavItems = [
      { icon: "home", text: "Dashboard", id: "dashboard" },
      { icon: "users", text: "Gestión de Usuarios", id: "users" },
      { icon: "book", text: "Gestión de Cursos", id: "courses" },
      { icon: "briefcase", text: "Gestión de Clases", id: "admin-classes" },
      { icon: "settings", text: "Configuración del Sistema", id: "settings" },
      { icon: "bar-chart", text: "Análisis", id: "reports" },
      { icon: "calendar", text: "Eventos", id: "events" },
    ];

    const navItems = mode === "admin" ? adminNavItems : teacherNavItems;

    sideNav.innerHTML = navItems
      .map(
        (item) => `
          <a href="#" class="side-nav-link" id="${item.id}Link">
            <i data-lucide="${item.icon}"></i>
            <span>${item.text}</span>
          </a>
        `
      )
      .join("");

    lucide.createIcons();

    navItems.forEach((item) => {
      document
        .getElementById(`${item.id}Link`)
        .addEventListener("click", (e) => {
          e.preventDefault();
          updateMainContent(mode, item.id);
        });
    });

    updateMainContent(mode, "dashboard");
  }

  function updateMainContent(mode, section) {
    document
      .querySelectorAll(".page")
      .forEach((page) => (page.style.display = "none"));

    const selectedPage = document.getElementById(section);
    if (selectedPage) {
      selectedPage.style.display = "block";
    }

    sideNav
      .querySelectorAll(".side-nav-link")
      .forEach((a) => a.classList.remove("active"));

    const activeLink = document.getElementById(`${section}Link`);
    if (activeLink) {
      activeLink.classList.add("active");
    }

    switch (section) {
      case "dashboard":
        updateDashboardContent(mode);
        break;
      case "courses":
        updateCourseContent(mode);
        break;
      case "users":
        updateUserContent(mode);
        break;
      case "classes":
        updateClassesContent(mode);
        break;
      case "settings":
        initializeSettingsPage();
        break;
      case "reports":
        initializeReportsPage();
        break;
      case "events":
        updateeventsContent(mode);
        break;
      case "grades":
        updateGradesContent(mode);
        break;
      
    }
  }

  //dashboard content//

  function updateDashboardContent(mode) {
    const dashboardContent = document.getElementById("dashboard");
    dashboardContent.innerHTML = `
      <h2 class="section-title">Dashboard</h2>
      <div class="dashboard-grid">
        <div class="dashboard-card">
          <h3>Total de Usuarios</h3>
          <div class="stat">1,234</div>
          <p>Estudiantes: 1,100 | Profesores: 120 | Administradores: 14</p>
        </div>
        <div class="dashboard-card">
          <h3>Tareas completadas</h3>
          <div class="stat">185</div>
          <p>Esta Semana: 35 | Este Mes: 150</p>
        </div>
        <div class="dashboard-card">
          <h3>Clases Creadas</h3>
          <div class="stat">166</div>
          <p>Esta semana: 18 | Este mes: 148</p>
        </div>
        <div class="dashboard-card">
          <h3>Eventos Próximos</h3>
          <div class="stat">8</div>
          <p>Este mes: 5 | Próximo mes: 3</p>
        </div>
        
        <div class="dashboard-card">
          <h3>Actividad del Sistema</h3>
          <div class="stat">85%</div>
          <p>Usuarios activos hoy: 876</p>
        </div>
        <div class="dashboard-card">
          <h3>Rendimiento Promedio</h3>
          <div class="stat">78%</div>
          <p>Mejora del 5% respecto al mes anterior</p>
        </div>
      </div>
    `;
  }

  //classes open view studenst and //

  const classes = [
    {
      id: 1,
      name: "Matemáticas",
      students: ["Juan", "María", "Pedro"],
      progress: 78,
    },
    {
      id: 2,
      name: "Matematicas 2",
      students: ["Ana", "Carlos", "Luis", "fray", "luis", "gimenes"],
      progress: 65,
    },
    {
      id: 3,
      name: "Fisica cuantica",
      students: [
        "Miguel",
        "Sofía",
        "Clara",
        "juan",
        "jose",
        "gilbert",
        "joel",
        "eugenio",
      ],
      progress: 90,
    },
  ];
  function showStudentList(classId) {
    const classData = classes.find((c) => c.id === parseInt(classId));

    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
        <div class="modal-content">
            <h3 class="modal-title">${classData.name} - Estudiantes</h3>
            <ul class="student-list">
                ${classData.students
                  .map(
                    (student) => `
                    <li class="student-item">
                        ${student}
                        <button class="btn remove-student-btn" data-student="${student}">Eliminar</button>
                    </li>
                `
                  )
                  .join("")}
            </ul>
            <button id="closeModalBtn" class="btn close-modal-btn">Cerrar</button>
        </div>
    `;
    document.body.appendChild(modal);

    modal.querySelector("#closeModalBtn").addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    modal.querySelectorAll(".remove-student-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const student = btn.getAttribute("data-student");
        removeStudent(classId, student);
        document.body.removeChild(modal);
        showStudentList(classId);
      });
    });
  }

  function removeStudent(classId, student) {
    const classData = classes.find((c) => c.id === parseInt(classId));
    const studentIndex = classData.students.indexOf(student);
    if (studentIndex > -1) {
      classData.students.splice(studentIndex, 1); // Eliminar estudiante
      console.log(
        `Estudiante ${student} eliminado de la clase ${classData.name}`
      );
    }
  }

  document.querySelectorAll(".view-students-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const classId = btn.getAttribute("data-class-id");
      showStudentList(classId);
    });
  });
  function removeStudent(classData, student) {
    const index = classData.students.indexOf(student);
    if (index > -1) {
      classData.students.splice(index, 1);
    }
  }

  function updateClassesContent(mode) {
    const classesContent = document.getElementById("admin-classes");
    classesContent.innerHTML = `
      <h2 class="section-title">Gestión de Clases</h2>
      <button id="addClassBtn" class="btn">Agregar Nueva Clase</button>
      <div class="classes-list">
        <div class="class-item">
          <div class="class-info">
            <h3>Matemáticas Avanzadas</h3>
            <p>Profesor: Dr. Juan Pérez</p>
            <p>Horario: Lunes y Miércoles, 10:00 - 11:30</p>
            <p>Estudiantes: 25/30</p>
          </div>
          <div class="class-actions">
            <button class="btn btn-edit">Editar</button>
            <button class="btn btn-delete">Eliminar</button>
          </div>
        </div>
        <div class="class-item">
          <div class="class-info">
            <h3>Física Cuántica</h3>
            <p>Profesor: Dra. María González</p>
            <p>Horario: Martes y Jueves, 14:00 - 15:30</p>
            <p>Estudiantes: 18/20</p>
          </div>
          <div class="class-actions">
            <button class="btn btn-edit">Editar</button>
            <button class="btn btn-delete">Eliminar</button>
          </div>
        </div>
      </div>
    `;

    const addClassBtn = document.getElementById("addClassBtn");
    addClassBtn.addEventListener("click", showAddClassModal);
  }

  function showAddClassModal() {
    const modal = document.createElement("div");
    modal.className = "modal";
    modal.innerHTML = `
      <div class="modal-content">
        <h3>Agregar Nueva Clase</h3>
        <form id="addClassForm">
          <input type="text" id="className" placeholder="Nombre de la clase" required>
          <input type="text" id="classTeacher" placeholder="Profesor" required>
          <input type="text" id="classSchedule" placeholder="Horario" required>
          <input type="number" id="classCapacity" placeholder="Capacidad" required>
          <button type="submit" class="btn">Guardar Clase</button>
          <button type="button" class="btn" id="closeClassModal">Cancelar</button>
        </form>
      </div>
    `;
    document.body.appendChild(modal);

    const closeClassModal = document.getElementById("closeClassModal");
    closeClassModal.addEventListener("click", () => {
      document.body.removeChild(modal);
    });

    const addClassForm = document.getElementById("addClassForm");
    addClassForm.addEventListener("submit", (e) => {
      e.preventDefault();
      console.log("Nueva clase guardada");
      document.body.removeChild(modal);
    });
  }
  //asignaciones
  courseSelect.addEventListener("change", loadAssignments);
  addAssignmentBtn.addEventListener("click", () => {
    if (modeSelect.value === "profesor" || modeSelect.value === "admin") {
      assignmentModal.style.display = "flex";
    } else {
      alert(
        "Solo los profesores y administradores pueden añadir asignaciones."
      );
    }
  });

  function loadAssignments() {
    const course = courseSelect.value;
    const assignments = assignmentsData[course] || [];

    if (assignments.length === 0) {
      assignmentsList.innerHTML = `<p>No hay asignaciones disponibles para este curso.</p>`;
    } else {
      assignmentsList.innerHTML = assignments
        .map(
          (assignment) => `
          <div class="assignment-item">
              <h3>${assignment.title}</h3>
              <p>${assignment.description}</p>
              <p class="assignment-meta">Fecha de entrega: ${assignment.dueDate}</p>
          </div>
      `
        )
        .join("");
    }
  }
  //report
  function initializeReportsPage() {
    console.log("Initializing reports page");

    const activityCtx = document
      .getElementById("activityChart")
      .getContext("2d");
    new Chart(activityCtx, {
      type: "line",
      data: {
        labels: ["1 May", "8 May", "15 May", "22 May", "29 May"],
        datasets: [
          {
            label: "Actividad de Usuarios",
            data: [65, 59, 80, 81, 56],
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      },
    });

    const progressCtx = document
      .getElementById("progressChart")
      .getContext("2d");
    new Chart(progressCtx, {
      type: "bar",
      data: {
        labels: ["Matemáticas 101", "Física 201", "Literatura 301"],
        datasets: [
          {
            label: "Progreso Promedio",
            data: [85, 78, 88],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
      },
    });

    document
      .getElementById("customReportForm")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        console.log("Generating custom report");
      });
  }

  //calificaciones
  function updateGradesContent(mode) {
    const gradesContent = document.getElementById("grades");
    gradesContent.innerHTML = `
      <h2 class="section-title">Calificaciones</h2>
      <div class="grades-container">
        <div class="course-selection">
          <select id="gradesCourseSelect">
            <option value="">Seleccionar Curso</option>
            <option value="matematicas">Matemáticas-5B</option>
            <option value="fisica">Física-6C</option>
            <option value="literatura">Lengua Española-6A</option>
          </select>
        </div>
        <div id="gradesList" class="grades-list">

        </div>
      </div>
    `;

    const gradesCourseSelect = document.getElementById("gradesCourseSelect");
    gradesCourseSelect.addEventListener("change", loadGrades);
  }

  function loadGrades() {
    const gradesCourseSelect = document.getElementById("gradesCourseSelect");
    const gradesList = document.getElementById("gradesList");
    const course = gradesCourseSelect.value;

    // Datos de ejemplo para las calificaciones
    const gradesData = {
      matematicas: [
        { id: 1, name: "Juan Pérez", grade: 85 },
        { id: 2, name: "María García", grade: 92 },
        { id: 3, name: "Carlos Rodríguez", grade: 78 },
      ],
      fisica: [
        { id: 4, name: "Ana Martínez", grade: 88 },
        { id: 5, name: "Luis Sánchez", grade: 95 },
        { id: 6, name: "Elena Fernández", grade: 82 },
      ],
      literatura: [
        { id: 7, name: "Pedro Gómez", grade: 90 },
        { id: 8, name: "Sofía López", grade: 87 },
        { id: 9, name: "Diego Torres", grade: 93 },
      ],
    };

    const grades = gradesData[course] || [];

    if (grades.length === 0) {
      gradesList.innerHTML = `<p>No hay calificaciones  para este curso.</p>`;
    } else {
      gradesList.innerHTML = `
        <table class="grades-table">
          <thead>
            <tr>
              <th>Estudiante</th>
              <th>Calificación</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            ${grades
              .map(
                (grade) => `
              <tr>
                <td>${grade.name}</td>
                <td>${grade.grade}</td>
                <td>
                  <button class="btn btn-edit" data-id="${grade.id}">Editar</button>
                </td>
              </tr>
            `
              )
              .join("")}
          </tbody>
        </table>
      `;
    }

    // Agregar event listeners para los botones de editar
    document.querySelectorAll(".btn-edit").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const gradeId = e.target.getAttribute("data-id");
        editGrade(gradeId);
      });
    });
  }

  function editGrade(gradeId) {
    console.log(`Editando calificación con ID: ${gradeId}`);
  }
 
function updateeventsContent(mode) {
  const eventsContent = document.getElementById("events");
  eventsContent.innerHTML = `
          <h2 class="section-title">Gestión de Eventos</h2>
          <div class="events-dashboard">
            <div class="events-metrics">
              <div class="metric-card">
                <h3>Total de Eventos</h3>
                <div class="stat" id="totalEvents">5</div>
              </div>
              <div class="metric-card">
                <h3>Eventos Próximos</h3>
                <div class="stat" id="upcomingEvents">6</div>
              </div>
              <div class="metric-card">
                <h3>Eventos Pasados</h3>
                <div class="stat" id="pastEvents">20</div>
              </div>
            </div>
          </div>
    `;
}

  modeSelect.addEventListener("change", () => {
    const mode = modeSelect.value;
    updateSideNav(mode);
  });

  //poner parte de eugenio la de abri eventos
  
  updateSideNav("profesor");
});
