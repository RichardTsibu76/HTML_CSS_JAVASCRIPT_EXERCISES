// Retrieve todo from local storage or initialize an empty array
let todo = JSON.parse(localStorage.getItem("todo")) || []; // This is used to store the tasks in the local storage
const todoInput = document.getElementById("todoInput");
const todoList = document.getElementById("todoList");
const todoCount = document.getElementById("todoCount");
const addButton = document.querySelector(".btn");
const deleteButton = document.getElementById("deleteButton");

// Events listeners with their functions

document.addEventListener("DOMContentLoaded", function () {
  addButton.addEventListener("click", addTask);
  todoInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Prevents default Enter key behavior
      addTask();
    }
  });
  deleteButton.addEventListener("click", deleteAllTasks);
  displayTasks();
});

function addTask() {
  const newTask = todoInput.value.trim();
  if (newTask !== "") {
    todo.push({ text: newTask, disabled: false });
    saveToLocalStorage();
    todoInput.value = "";
    displayTasks();
  }
}

function displayTasks() { // This function is used to display the tasks
  todoList.innerHTML = "";
  todo.forEach((item, index) => {
    const p = document.createElement("p");
    p.innerHTML = `
      <div class="todo-container">
        <input type="checkbox" class="todo-checkbox" id="input-${index}" ${
      item.disabled ? "checked" : ""
    }>
        <p id="todo-${index}" class="${
      item.disabled ? "disabled" : ""
    }" onclick="editTask(${index})">${item.text}</p> 
      </div>
    `;
    p.querySelector(".todo-checkbox").addEventListener("change", () => // This event listener is used to toggle the task
      toggleTask(index)
    );
    todoList.appendChild(p);  // Appends the task to the todoList
  });
  todoCount.textContent = todo.length; // This displays the number of tasks
}

function editTask(index) { // This function is used to edit the task
  const todoItem = document.getElementById(`todo-${index}`);
  const existingText = todo[index].text;
  const inputElement = document.createElement("input");

  inputElement.value = existingText;
  todoItem.replaceWith(inputElement);
  inputElement.focus();

  inputElement.addEventListener("blur", function () { // This event listener is used to save the updated text when the input field is not in focus
    const updatedText = inputElement.value.trim();
    if (updatedText) {
      todo[index].text = updatedText;
      saveToLocalStorage();
    }
    displayTasks();
  });
}

function toggleTask(index) {
  todo[index].disabled = !todo[index].disabled; // Toggles the disabled property
  saveToLocalStorage();
  displayTasks();
}

function deleteAllTasks() { // This function deletes all the task incase they are not needed
  todo = [];
  saveToLocalStorage();
  displayTasks();
}

function saveToLocalStorage() {
  localStorage.setItem("todo", JSON.stringify(todo));
}