// //! Elements

// const todoInput = document.getElementById("todo-input"); //? works faster than querySelector

// const addBtn = document.querySelector("#todo-button");

// const todoUl = document.querySelector("#todo-ul");

// //? data is kept as "string" in local storage
// //? we should parse it to array with "JSON.parse()"

// let todoList = JSON.parse(localStorage.getItem("todoList")) || []

// //* load event vs. DomContentLoaded:
// //? The "load" event and the "DOMContentLoaded" event are two different events in JavaScript that are triggered at different times when a web page is loading.

// //? The "load" event is triggered when all elements on a page have finished loading, including images, stylesheets, and scripts.

// //? The "DOMContentLoaded" event is triggered when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

// //! So, the DOMContentLoaded event fires "earlier" than the load event and can be used if you want to perform some actions as soon as the DOM is ready, without waiting for other resources to finish loading.

// //? If there is data in local storage, it will pull the data when the page is refreshed. 👇

// window.addEventListener("load", () => {
//   getTodoListFromLocalStorage();
// });

// const getTodoListFromLocalStorage = () => {
//   //! get TodoList from localStorage and load to UI
// };

// //* form => submit event vs button => click event

// // form.addEventListener("submit", () => {})

// addBtn.addEventListener("click", (e) => {
//   //! The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. 👇
//   e.preventDefault();
//   //! The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string 👇
//   if (todoInput.value.trim() === "") {
//     alert("Please, enter new todo text!");
//     //? It is better to use "return" without setting the else structure. 👇
//     return;
//   }
//   // alert("Continue");

//   const newTodo = {
//     //* A new and unique id will be created for each click event. 👇
//     id: new Date().getTime(), //! 👈 unique ID with milliseconds of now.
//     completed: false, //! 👈 STATUS
//     text: todoInput.value, //! 👈 USER INPUT
//   };
//   createTodo(newTodo);
//   todoList.push(newTodo);
//   //localStorage todolist update
//   // localstorage vs. sessionstorage vs cookies farkı ? sınav sorusu
//   //!!!!!!!!!!!!stringify unutmuyoruz!!!!!!!
//   localStorage.setItem("todoList", JSON.stringify(todoList));
//   // event.target vs event.currenttarget nedir araştır ? sınav sorusu
//   e.target.closest("form").reset();
// });

// const createTodo = () => {
//   // todo item creation
//   // alert("item was added");
//   // obj.dest.(ES6 => JS e kazandırılan yapılar hangileridir?) sınav sorusu
//   const { id, completed, text } = newTodo;

//   //creat li

//   const li = document.createElement("li");
//   li.setAttribute("id", id);

//   completed ? li.classList.add("checked") : "";

//   const icon = document.createElement("i");
//   icon.setAttribute("class", "fas fa-check");
//   //append vs appendchild nedir sınav sorusu
//   li.append(icon);
//   const p = document.createElement("p");
//   p.innerText = text;
//   li.appendChild(p);

//   //create remove button
//   const removeIcon = document.createElement("i");
//   removeIcon.setAttribute("class", "fas fa-trash");
//   li.append(removeIcon);

//   console.log(li);

//   // append li to ul
//   todoUl.append(li);
// };

//Elements
const todoInput = document.getElementById("todo-input");
const addBtn = document.querySelector("#todo-button");
const todoUl = document.querySelector("#todo-ul");

//global array for todo obj
let todoList = JSON.parse(localStorage.getItem("todoList")) || [];

//load event vs. DomContentLoaded
window.addEventListener("load", () => {
  getTodoListFromLocalStorage();
});

const getTodoListFromLocalStorage = () => {
  //get TodoList from localStorage and load to UI
  todoList.forEach((todo) => {
    createTodo(todo);
  });
};

//form => submit event vs. button => click event
// form.addEventListener("submit", ()=>{})
addBtn.addEventListener("click", (e) => {
  //prevent form submit
  e.preventDefault();
  //user input control
  if (todoInput.value.trim() === "") {
    alert("Please, enter new todo text!");
    return;
  }
  // else{
  //     alert("continue");
  // }
  //continue func.
  const newTodo = {
    id: new Date().getTime(), //unique id with ms of now
    completed: false, //status
    text: todoInput.value, //userInput
  };

  // insertTodoToDB(newTodo);
  createTodo(newTodo);

  //UPDATE TODO array
  todoList.push(newTodo);
  //localStorage todoList Update
  //localStorage vs. SessionStorage vs. Cookies
  //!!!!!!!!stringify!!!!!!!!!
  localStorage.setItem("todoList", JSON.stringify(todoList));
  //event.target vs. event.currentTarget
  e.target.closest("form").reset();
});

const createTodo = (newTodo) => {
  //todo item creation
  //alert("item was added");
  //obj. dest. (ES6 => JS'e kazandırılan yapılar??)
  const { id, completed, text } = newTodo;

  //create li
  const li = document.createElement("li");
  li.setAttribute("id", id);

  //add class with completed(status)
  completed ? li.classList.add("checked") : "";

  //create check icon
  const icon = document.createElement("i");
  icon.setAttribute("class", "fas fa-check");
  //append vs. appendChild
  li.append(icon);

  //create item text
  const p = document.createElement("p");
  p.innerText = text;
  li.appendChild(p);

  //create remove icon
  const removeIcon = document.createElement("i");
  removeIcon.setAttribute("class", "fas fa-trash");
  li.append(removeIcon);

  // console.log(li);

  //append li to ul
  //prepend vs. append
  // todoUl.append(li);
  todoUl.prepend(li);
};

//Capturing vs. Bubbling
//static closest parent element => child
todoUl.addEventListener("click", (e) => {
  const idAttr = e.target.closest("li").getAttribute("id");
  if (e.target.classList.contains("fa-check")) {
    // alert("check clicked");
    //update UI
    e.target.parentElement.classList.toggle("checked");
    //update array
    // todoList.map((todo)=>{
    //     if(todo.id == idAttr){
    //         todo.completed = !todo.completed;
    //     }
    // });
    todoList.forEach((todo) => {
      if (todo.id == idAttr) {
        todo.completed = !todo.completed;
      }
    });
    //add updated array to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else if (e.target.classList.contains("fa-trash")) {
    // alert("remove clicked");
    //remove from UI
    e.target.parentElement.remove();
    //remove from Array
    //id si ile silinmeyenleri filtrele array i update et ==> silineni array den remove
    todoList = todoList.filter((todo) => todo.id != idAttr);
    //add updated array to localStorage
    localStorage.setItem("todoList", JSON.stringify(todoList));
  } else {
    alert("other element clicked");
  }
  console.log(todoList);
});
