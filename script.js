function loadTodos() {
    // this function will loads the todos from the browsers
   
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList" : []};
    console.log(todos);

    return todos;
} 


function refreshTodo(todos){
    localStorage.setItem("todos",JSON.stringify(todos));
}


function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push({...todo});
    localStorage.setItem("todos", JSON.stringify(todos));
}

function executorFilterAction(event){
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    todoList.innerHTML='';
    console.log(value);
    const todos = loadTodos();
    if(value == "all"){
        console.log(todoList);
        todos.todoList.forEach(todo => {
            addTodoInHtlm(todo);
        });
    } else if(value == "pending"){
        todos.todoList.forEach(todo => {
            if(todo.isCompeleted != true)
            addTodoInHtlm(todo);
        });
    } else {
        todos.todoList.forEach(todo => {
            if(todo.isCompeleted == true)
            addTodoInHtlm(todo);
        });
    }
}

function addTodoInHtlm(todo){

    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    todoItem.setAttribute("data-id", todo.id);

    const textDiv = document.createElement("div");

    if(todo.isCompeleted){
        textDiv.classList.add("completed"); ///////////
    }

    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem")

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons")

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("deleteBtn");
    deleteBtn.addEventListener("click", deleteTodo);

    const completedBtn = document.createElement("button");
    completedBtn.textContent = (todo.isCompeleted) ? "reset" : "completed";
    completedBtn.classList.add("completedBtn");
    completedBtn.addEventListener("click", toggleTodo);

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);
    todoList.appendChild(todoItem);

}

function resetHtmlTodos(todos){
    const todoList = document.getElementById("todoList");
    todoList.innerHTML = '';
    todos.todoList.forEach(todo => {
        addTodoInHtlm(todo);
    });
}


function toggleTodo(event){
    console.log("toggling");
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        if(todo.id == todoId){
            todo.isCompeleted = !todo.isCompeleted;
        }
    });
    refreshTodo(todos);
    resetHtmlTodos(todos);
}

function deleteTodo(event){
    const todoItem = event.target.parentElement.parentElement;
    const todoId = todoItem.getAttribute("data-id");
    let todos = loadTodos();

    todos.todoList =  todos.todoList.filter(todo => todo.id != todoId);
    refreshTodo(todos);
    resetHtmlTodos(todos);
}

document.addEventListener("DOMContentLoaded", () => {

    const addTotodo = document.getElementById("addTotodo");

    const submitButton = document.getElementById("buttonId");

    let todos = loadTodos();

    const todoList = document.getElementById("todoList");

    const completedBtns = document.getElementById("completedBtn");


    const filterBtns = document.getElementsByClassName("filterButton");

    console.log(filterBtns);
    for(const btn of filterBtns){
        console.log(btn);
        btn.addEventListener("click", executorFilterAction)
    }


    submitButton.addEventListener("click", (event) => {
        const todoText = addTotodo.value;

        if(todoText == ''){
            alert("please write something for todo");
        } else {
            todos = loadTodos();
            const id = todos.todoList.length
            addTodoToLocalStorage({text: todoText, isCompeleted: false,id});
            addTodoInHtlm({text: todoText, isCompeleted: false,id});
            addTotodo.value = '';
        }
    });

    addTotodo.addEventListener("change", (event) => { // change or input koi bhi ho skta hai
        //this callback method fired every time when something is change in input 
        const todoText = event.target.value;

        event.target.value = todoText.trim();

        console.log(event.target.value);    
    });
    
    todos.todoList.forEach(todo => {
        addTodoInHtlm(todo);
    });

});