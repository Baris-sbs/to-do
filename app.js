//! Elements

const todoInput = document.getElementById("todo-input"); //? works faster than querySelector

const addBtn = document.querySelector("#todo-button");

const todoUl = document.querySelector("#todo-ul");

//? data is kept as "string" in local storage
//? we should parse it to array with "JSON.parse()"

// let todoList = JSON.parse(localStorage.getItem("todoList")) || []

//* load event vs. DomContentLoaded:
//? The "load" event and the "DOMContentLoaded" event are two different events in JavaScript that are triggered at different times when a web page is loading.

//? The "load" event is triggered when all elements on a page have finished loading, including images, stylesheets, and scripts.

//? The "DOMContentLoaded" event is triggered when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.

//! So, the DOMContentLoaded event fires "earlier" than the load event and can be used if you want to perform some actions as soon as the DOM is ready, without waiting for other resources to finish loading.

//? If there is data in local storage, it will pull the data when the page is refreshed. 👇

window.addEventListener("load", () => {
    getTodoListFromLocalStorage();
})

const getTodoListFromLocalStorage = () => {
    //! get TodoList from localStorage and load to UI
}


//* form => submit event vs button => click event

// form.addEventListener("submit", () => {})

addBtn.addEventListener("click", (e) => {
    //! The preventDefault() method of the Event interface tells the user agent that if the event does not get explicitly handled, its default action should not be taken as it normally would be. 👇
    e.preventDefault();
    //! The trim() method removes whitespace from both ends of a string and returns a new string, without modifying the original string 👇
    if(todoInput.value.trim() === ""){
        alert("Please, enter new todo text!");
        //? It is better to use "return" without setting the else structure. 👇
        return;
    }
    // alert("Continue");

    const newTodo = {
        //* A new and unique id will be created for each click event. 👇
        id : new Date().getTime(), //! 👈 unique ID with milliseconds of now.
        completed : false, //! 👈 STATUS
        text : todoInput.value //! 👈 USER INPUT
    }
    createTodo(newTodo);
    todoList.push(newTodo)
    //localStorage todolist update
    // localstorage vs. sessionstorage vs cookies farkı ? sınav sorusu
    //!!!!!!!!!!!!stringify unutmuyoruz!!!!!!!
    localStorage.setItem("todoList",JSON.stringify(todoList));
    // event.target vs event.currenttarget nedir araştır ? sınav sorusu
    e.target.closest("form").reset();
    
})

const createTodo =()=> {
    // todo item creation
    alert("item was added");


}