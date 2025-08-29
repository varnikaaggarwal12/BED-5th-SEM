let currentUserId = null;

// ----------------- SIGNUP -----------------
let signupForm = document.querySelector("#signupForm");
let signupName = document.querySelector("#signupName");
let signupEmail = document.querySelector("#signupEmail");
let signupPassword = document.querySelector("#signupPassword");

signupForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let data = {
    name: signupName.value,
    email: signupEmail.value,
    password: signupPassword.value,
  };

  let res = await fetch("/api/users/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  console.log(data);
  alert(result.message);
  if (result.success) signupForm.reset();
});

// ----------------- LOGIN -----------------
let loginForm = document.querySelector("#loginForm");
let loginEmail = document.querySelector("#loginEmail");
let loginPassword = document.querySelector("#loginPassword");

loginForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  let data = {
    email: loginEmail.value,
    password: loginPassword.value,
  };

  let res = await fetch("/api/users/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  console.log(data);
  alert(result.message);

  if (result.success) {
    currentUserId = result.userId;
    loadAllBlogs();
    loadMyBlogs();
  }
});

// ----------------- ADD BLOG -----------------
let blogForm = document.querySelector("#blogForm");
let blogTitle = document.querySelector("#blogTitle");
let blogContent = document.querySelector("#blogContent");

blogForm.addEventListener("submit", async function (e) {
  e.preventDefault();
  if (!currentUserId) {
    return alert("Please login first!");
  }

  let data = {
    title: blogTitle.value,
    content: blogContent.value,
    userId: currentUserId,
  };

  let res = await fetch("/api/blogs/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  let result = await res.json();
  alert(result.message);

  if (result.success) {
    blogForm.reset();
    loadAllBlogs();
    loadMyBlogs();
  }
});

// ----------------- LOAD ALL BLOGS -----------------
async function loadAllBlogs() {
  let res = await fetch("/api/blogs/all");
  let blogs = await res.json();
  let container = document.querySelector("#allBlogs");
  container.innerHTML = blogs
    .map(b => `<p><strong>${b.title}</strong> by ${b.author?.name || "Unknown"}<br>${b.content}</p>`)
    .join("");
}

// ----------------- LOAD MY BLOGS -----------------
async function loadMyBlogs() {
  if (!currentUserId) return;
  let res = await fetch(`/api/blogs/my/${currentUserId}`);
  let blogs = await res.json();
  let container = document.querySelector("#myBlogs");
  container.innerHTML = blogs
    .map(b => `<p><strong>${b.title}</strong><br>${b.content}</p>`)
    .join("");
}

// Initial load
loadAllBlogs();
