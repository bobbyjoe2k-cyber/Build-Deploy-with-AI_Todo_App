// * ====== DOM Elements ======

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all";

// Functions
// Save tasks to localStorage

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// * Render tasks based on filter
// Render tasks based on filter
function renderTasks() {
  taskList.innerHTML = "";
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  });

  filteredTasks.forEach((task) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);
    li.innerHTML = `
      <span>${task.text}</span>
      <div class="action-buttons">
        <button onclick="toggleTask(${task.id})">✔</button>
        <button onclick="editTask(${task.id})">✏</button>
        <button onclick="deleteTask(${task.id})">🗑</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}

// * Add new Task
function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return alert("Please enter a task.");
  tasks.push({
    id: Date.now(),
    text,
    completed: false,
  });
  taskInput.value = "";
  saveTasks();
  renderTasks(); 
     
}

// * Toggle task completion
function toggleTask(id) {
  const task = tasks.find((t) => t.id === id); // t
  if (task) task.completed = !task.completed;
  saveTasks();
  renderTasks();
}

// *Edite Task

// Edit task
function editTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task) return;
  const newText = prompt("Edit your task:", task.text);
  if (newText !== null && newText.trim() !== "") {
    task.text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// * Delete task
function deleteTask(id) {
  // * It will filter all the tasks, meaning the one you have clicked will be removed and the rest will remina on the page.
  tasks = tasks.filter((t) => t.id !== id);
  saveTasks();
  renderTasks();
}

// * Filter buttons event listeners
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    // The current button that was clicked
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTasks();
  });
});

// * ====== Event Listeners =====

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addTask();
});

// * Initialize
renderTasks();