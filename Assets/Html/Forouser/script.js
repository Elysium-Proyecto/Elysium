/** @format */

// Variables globales
let currentUser = null;
let currentCommunity = null;
const communities = [
  {
    id: 1,
    name: "General",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 2,
    name: "Programación",
    image:
      "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 3,
    name: "Matemáticas",
    image:
      "https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
  {
    id: 4,
    name: "Ciencias",
    image:
      "https://images.unsplash.com/photo-1507413245164-6160d8298b31?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
  },
];
let posts = {};
let notifications = [];
let activeUsers = [
  { id: 1, name: "Ana", role: "estudiante", status: "online" },
  { id: 2, name: "Carlos", role: "Estudiante", status: "away" },
];
// Elementos del DOM
const communitiesList = document.getElementById("communities-list");
const postsContainer = document.getElementById("posts-container");
const postForm = document.getElementById("post-form");
const loginBtn = document.getElementById("login-btn");
const loginModal = document.getElementById("login-modal");
const loginForm = document.getElementById("login-form");
const notificationsBtn = document.getElementById("notifications-btn");
const notificationsModal = document.getElementById("notifications-modal");
const notificationsList = document.getElementById("notifications-list");
const notificationCount = document.getElementById("notification-count");
const activeUsersList = document.getElementById("active-users-list");
// Funciones de inicialización
function init() {
  renderCommunities();
  setupEventListeners();
  loadNotifications();
  renderActiveUsers();
  showHomePage();
}
function setupEventListeners() {
  loginBtn.addEventListener("click", toggleLoginModal);
  loginForm.addEventListener("submit", handleLogin);
  notificationsBtn.addEventListener("click", toggleNotificationsModal);
  postForm.addEventListener("submit", handlePostSubmit);
  document.getElementById("home-link").addEventListener("click", showHomePage);
  document
    .getElementById("communities-link")
    .addEventListener("click", showCommunitiesPage);
  document
    .getElementById("rules-link")
    .addEventListener("click", showRulesPage);
}
// Funciones de renderizado
function renderCommunities() {
  communitiesList.innerHTML = communities
    .map(
      (community) =>
        `<li>
            <a href="#" data-id="${community.id}">
                <img src="${community.image}" alt="${community.name}" width="30" height="30">
                ${community.name}
            </a>
        </li>`
    )
    .join("");
  communitiesList.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      e.preventDefault();
      const communityId = parseInt(e.target.dataset.id);
      selectCommunity(communityId);
    }
  });
}
function renderPosts() {
  if (!currentCommunity) return;
  const communityPosts = posts[currentCommunity] || [];
  postsContainer.innerHTML = `
        <h2>${communities.find((c) => c.id === currentCommunity).name}</h2>
        <img src="${
          communities.find((c) => c.id === currentCommunity).image
        }" alt="${
    communities.find((c) => c.id === currentCommunity).name
  }" class="community-image">
        ${communityPosts
          .map(
            (post) => `
            <div class="post">
                <div class="post-header">
                    <span class="post-author">${post.author} 
                        <span class="user-tag ${post.role}-tag">${
              post.role
            }</span>
                    </span>
                    <span class="post-date">${new Date(
                      post.timestamp
                    ).toLocaleString()}</span>
                </div>
                <p>${post.content}</p>
                ${
                  post.image
                    ? `<img src="${post.image}" class="post-image" alt="Imagen adjunta">`
                    : ""
                }
                <div class="post-actions">
                    <button onclick="showCommentForm(${
                      post.id
                    })"><i class="fas fa-comment"></i> Comentar</button>
                    <button onclick="reportPost(${
                      post.id
                    })"><i class="fas fa-flag"></i> Reportar</button>
                    ${
                      currentUser && currentUser.username === post.author
                        ? `<button onclick="showEditPostForm(${post.id})"><i class="fas fa-edit"></i> Editar</button>`
                        : ""
                    }
                </div>
                <div id="comments-${post.id}">
                    ${renderComments(post.comments)}
                </div>
                <form id="comment-form-${post.id}" class="comment-form hidden">
                    <textarea placeholder="Escribe tu comentario..."></textarea>
                    <button type="submit"><i class="fas fa-paper-plane"></i> Enviar Comentario</button>
                </form>
            </div>
        `
          )
          .join("")}
    `;
  setupCommentForms();
}
function renderComments(comments) {
  return comments
    .map(
      (comment) => `
        <div class="comment">
            <strong>${comment.author} <span class="user-tag ${comment.role}-tag">${comment.role}</span>:</strong> ${comment.content}
            <button onclick="reportComment(${comment.id})" class="report-btn"><i class="fas fa-flag"></i> Reportar</button>
        </div>
    `
    )
    .join("");
}
function renderActiveUsers() {
  activeUsersList.innerHTML = activeUsers
    .map(
      (user) => `
        <li class="active-user">
            <span class="active-user-status ${user.status}"></span>
            ${user.name} 
            <span class="user-tag ${user.role}-tag">${user.role}</span>
        </li>
    `
    )
    .join("");
}
// Funciones de manejo de eventos
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  currentUser = { username, role: "estudiante" };
  loginBtn.innerHTML = `<i class="fas fa-sign-out-alt"></i>Cerrar Sesión (${username})`;
  toggleLoginModal();
  postForm.classList.remove("hidden");
  updateActiveUsers(username, "estudiante");
}
function handlePostSubmit(e) {
  e.preventDefault();
  if (!currentUser || !currentCommunity) return;
  const content = document.getElementById("post-content").value;
  const imageInput = document.getElementById("post-image");
  const image = imageInput.files[0]
    ? URL.createObjectURL(imageInput.files[0])
    : null;
  const newPost = {
    id: Date.now(),
    author: currentUser.username,
    role: currentUser.role,
    content,
    image,
    timestamp: Date.now(),
    comments: [],
  };
  if (!posts[currentCommunity]) {
    posts[currentCommunity] = [];
  }
  posts[currentCommunity].unshift(newPost);
  renderPosts();
  postForm.reset();
}
function selectCommunity(communityId) {
  currentCommunity = communityId;
  renderPosts();
}
function showCommentForm(postId) {
  const form = document.getElementById(`comment-form-${postId}`);
  form.classList.toggle("hidden");
}
function setupCommentForms() {
  document.querySelectorAll(".comment-form").forEach((form) => {
    form.addEventListener("submit", handleCommentSubmit);
  });
}
function handleCommentSubmit(e) {
  e.preventDefault();
  if (!currentUser) return;
  const postId = parseInt(e.target.id.split("-")[2]);
  const content = e.target.querySelector("textarea").value;
  const post = posts[currentCommunity].find((p) => p.id === postId);
  if (post) {
    post.comments.push({
      id: Date.now(),
      author: currentUser.username,
      role: currentUser.role,
      content,
    });
    renderPosts();
  }
}
// Funciones de utilidad
function toggleLoginModal() {
  loginModal.classList.toggle("hidden");
}
function toggleNotificationsModal() {
  notificationsModal.classList.toggle("hidden");
}
function loadNotifications() {
  setTimeout(() => {
    notifications = [
      { id: 1, message: "Nuevo comentario en tu publicación" },
      { id: 2, message: "Tu publicación ha sido destacada" },
    ];
    updateNotifications();
  }, 1000);
}
function updateNotifications() {
  notificationCount.textContent = notifications.length;
  notificationsList.innerHTML = notifications
    .map(
      (notif) =>
        `<li>
            <i class="fas fa-info-circle"></i> ${notif.message}
            <button onclick="closeNotification(${notif.id})" class="close-notification"><i class="fas fa-times"></i></button>
        </li>`
    )
    .join("");
}
function closeNotification(id) {
  notifications = notifications.filter((notif) => notif.id !== id);
  updateNotifications();
}
const modal = document.getElementById("notifications-modal");
const closeBtn = document.querySelector(".close-btn");

closeBtn.addEventListener("click", function () {
  modal.classList.add("hidden");
});

function updateActiveUsers(username, role) {
  const existingUserIndex = activeUsers.findIndex(
    (user) => user.name === username
  );
  if (existingUserIndex !== -1) {
    activeUsers[existingUserIndex].status = "online";
  } else {
    activeUsers.push({
      id: activeUsers.length + 1,
      name: username,
      role,
      status: "online",
    });
  }
  renderActiveUsers();
}
function showHomePage() {
  const postsContainer = document.getElementById("posts-container");
  postsContainer.innerHTML = `
        <div class="Mensaje-de-bienvenida">
            <h2>Bienvenido al Foro Estudiantil de Elysium</h2>
            <p>Un espacio para el intercambio de ideas y conocimientos.</p>
            <img src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Bienvenida"  class="welcome-image">
        </div>
    `;
}
function showCommunitiesPage(e) {
  e.preventDefault();
  postsContainer.innerHTML = `
        <h2>Comunidades Académicas</h2>
        <p>Explora nuestras comunidades especializadas:</p>
        <div class="communities-grid">
            ${communities
              .map(
                (community) => `
                <div class="community-card" onclick="selectCommunity(${community.id})">
                    <img src="${community.image}" alt="${community.name}">
                    <div class="community-card-content">
                        <h3>${community.name}</h3>
                    </div>
                </div>
            `
              )
              .join("")}
        </div>
    `;
}
function showRulesPage(e) {
  e.preventDefault();
  postsContainer.innerHTML = `
        <h2>Normas de Convivencia del Foro</h2>
        <img src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80" alt="Reglas del Foro" class="community-image">
        <ol class="rules-list">
            <li>Respeto mutuo: Trata a todos los miembros con cortesía y consideración.</li>
            <li>Contenido apropiado: Mantén las discusiones relacionadas con temas académicos y educativos.</li>
            <li>Propiedad intelectual: Respeta los derechos de autor y cita tus fuentes adecuadamente.</li>
            <li>No al plagio: Presenta tu propio trabajo e ideas originales.</li>
            <li>Privacidad: No compartas información personal de otros sin su consentimiento.</li>
            <li>Debate constructivo: Fomenta el diálogo respetuoso y el intercambio de ideas.</li>
            <li>Reporta problemas: Informa a los moderadores sobre contenido inapropiado o violaciones de las reglas.</li>
        </ol>
    `;
}

// reportes

function reportPost(postId) {
  if (!currentUser) {
    alert("Debes iniciar sesión para reportar una publicación.");
    return;
  }
  alert("Has reportado exitosamente la publicación.");

  addToModerationQueue(postId, "post");
}

function reportComment(commentId) {
  if (!currentUser) {
    alert("Debes iniciar sesión para reportar un comentario.");
    return;
  }
  alert("Has reportado exitosamente el comentario.");
  addToModerationQueue(commentId, "comment");
}

function showEditPostForm(postId) {
  const post = posts[currentCommunity].find((p) => p.id === postId);
  if (!post) return;

  const editForm = `
    <form id="edit-post-form-${postId}" class="edit-post-form">
      <textarea id="edit-post-content-${postId}">${post.content}</textarea>
      <button type="submit">Guardar cambios</button>
      <button type="button" onclick="cancelEditPost(${postId})">Cancelar</button>
    </form>
  `;

  const postElement = document.querySelector(
    `.post:has(button[onclick="showEditPostForm(${postId})"])`
  );
  postElement.innerHTML += editForm;

  document
    .getElementById(`edit-post-form-${postId}`)
    .addEventListener("submit", (e) => {
      e.preventDefault();
      const newContent = document.getElementById(
        `edit-post-content-${postId}`
      ).value;
      editPost(postId, newContent);
    });
}

function editPost(postId, newContent) {
  const post = posts[currentCommunity].find((p) => p.id === postId);
  if (post) {
    post.content = newContent;
    renderPosts();
  }
}

function cancelEditPost(postId) {
  const editForm = document.getElementById(`edit-post-form-${postId}`);
  if (editForm) {
    editForm.remove();
  }
}

init();