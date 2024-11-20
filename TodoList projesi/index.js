// Tüm elementleri seçmek

const form = document.querySelector("#todoAddForm");
const addInput = document.querySelector("#todoName");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];
const secondCardBody = document.querySelectorAll(".card-body")[1];
const clearButton = document.querySelector("#clearButton");
const filterInput = document.querySelector("#todoSearch");

let todos = [];

runEvents();
function runEvents() {
  form.addEventListener("submit", addTodo);
  document.addEventListener("DOMContentLoaded", pageLoaded);
  secondCardBody.addEventListener("click", removeTodoToUI);
  clearButton.addEventListener("click", allTodosEveryWhere);
  filterInput.addEventListener("keyup", filter);
}

function filter(e) {
  const filterValue = e.target.value.toLowerCase().trim();
  const todoListesi = document.querySelectorAll(".list-group-item");

  if (todoListesi.length > 0) {
    todoListesi.forEach(function (todo) {
      if (todo.textContent.toLowerCase().trim().includes(filterValue)) {
        todo.setAttribute("style", "display:block");
      } else {
        todo.setAttribute("style", "display:none !important");
      }
    });
  } else {
    showAlert("warning", "En az bir filtreleme yapmalısınız.");
  }
}

function allTodosEveryWhere() {
  const todoListesi = document.querySelectorAll(".list-group-item");
  if (todoListesi.length > 0) {
    //ekrandan silme
    todoListesi.forEach(function (todo) {
      todo.remove();
    });

    //Strogeden silme
    todos = [];
    localStorage.setItem("todos", JSON.stringify(todos));
  } else {
    showAlert("warning", "silmek için bir todo olmalıdır");
  }
}
function pageLoaded() {
  checkTodosFromStorage();
  todos.forEach(function (todo) {
    addTodoUI(todo);
  });
}
function removeTodoToUI(e) {
  if (e.target.className === "fa fa-remove") {
    //ekrandan silmek
    const todo = e.target.parentElement.parentElement;
    todo.remove();

    //storageden silmek
    removeTodoToStorage(todo.textContent);

    showAlert("success", "todo basariyla silindi.");
  }
}
function removeTodoToStorage(removeTodo) {
  checkTodosFromStorage();
  todos.forEach(function (todo, index) {
    if (removeTodo === todo) {
      todos.splice(index, 1);
    }
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}
function addTodo(e) {
  const inputText = addInput.value.trim();
  if (inputText == null || inputText == "") {
    showAlert("danger", "Lütfen boş bırakayınız.");
  } else {
    //arayüze ekleme
    addTodoUI(inputText);
    addTodoToStorage(inputText);
    showAlert("success", "Todo basarili bir sekilde eklendi");
  }
  //storage ekleme
  e.preventDefault();
}
function addTodoUI(newTodo) {
  const li = document.createElement("li");
  li.className = "list-group-item d-flex justify-content-between";
  li.textContent = newTodo;
  const a = document.createElement("a");
  a.className = "delete-item";
  a.href = "#";

  const i = document.createElement("i");
  i.className = "fa fa-remove";

  a.appendChild(i);
  li.appendChild(a);
  todoList.appendChild(li);

  addInput.value = "";
}
function addTodoToStorage(newTodo) {
  checkTodosFromStorage();
  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
}
function checkTodosFromStorage() {
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
}
function showAlert(type, message) {
  const div = document.createElement("div");
  //   div.className = "alert alert-" + type;
  div.className = `alert alert-${type}`;
  div.textContent = message;
  firstCardBody.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2500);
}
