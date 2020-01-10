// Form
const form = document.querySelector("#task-form");
// Task List
const taskList = document.querySelector(".collection");
// Clear Button
const clearBtn = document.querySelector(".clear-tasks");
// Filter
const filter = document.querySelector("#filter");
// Task Input
const taskInput = document.querySelector("#task");

// Load event listener function
loadEventListeners();

// Create event listener function
function loadEventListeners() {
  // DOM Content Load
  document.addEventListener("DOMContentLoaded", getTasks);
  // Add task event
  form.addEventListener("submit", addTask);
  // Remove task event
  taskList.addEventListener("click", removeTask);
  // Clear task button
  clearBtn.addEventListener("click", clearTasks);
  // Filter tasks
  filter.addEventListener("keyup", filterTasks);
}

// Get tasks from local storage
function getTasks() {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(task => {
    //Create Li element
    const li = document.createElement("li");
    // Add class
    li.className = "collection-item";
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create link element
    const link = document.createElement("a");
    // Add class
    link.className = "delete-item secondary-content";
    // Add icon to html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append link to li
    li.appendChild(link);
    // Append li to ul
    taskList.appendChild(li);
  });
}

// Add task function
function addTask(e) {
  // If input is blank
  if (taskInput.value === "") {
    alert("Nothing has been added.");
  }

  // Create Li element
  const li = document.createElement("li");
  // Add class
  li.className = "collection-item";
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Adding Delete icons
  // Create link element
  const link = document.createElement("a");
  // Add class
  link.className = "delete-item secondary-content";
  // Add icon to html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append link to li
  li.appendChild(link);
  // Append li to ul
  taskList.appendChild(li);
  // Store in Local Storage
  storeTaskInLocalStorage(taskInput.value);

  // Clear Input
  taskInput.value = "";

  e.preventDefault();
}

// Function local storage
function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);

  localStorage.setItem("tasks", JSON.stringify(tasks));
}
// Function remove task
function removeTask(e) {
  if (e.target.parentElement.classList.contains("delete-item")) {
    if (confirm("Are you sure?")) {
      e.target.parentElement.parentElement.remove();

      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Function: Remove task from LS
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.forEach(function(task, index) {
    if (taskItem.textContent === task) {
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function: Clear all tasks
function clearTasks() {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
    // Clear from LS
    clearkTasksFromLocalStorage();
  }
}

// Function: Clear LS tasks
function clearkTasksFromLocalStorage() {
  localStorage.clear();
}

// Function: Filter tasks
function filterTasks(e) {
  text = e.target.value.toLowerCase();

  document.querySelectorAll(".collection-item").forEach(task => {
    const item = task.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) != -1) {
      task.style.display = "block";
    } else {
      task.style.display = "none";
    }
  });
}
