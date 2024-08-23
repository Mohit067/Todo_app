function loadTodos() {
    // this function will loads the todos from the browsers
   
    const todos = JSON.parse(localStorage.getItem("todos")) || {"todoList" : []};
    console.log(todos);

    return todos;
}


function addTodoToLocalStorage(todoText) {
    const todos = loadTodos();
    todos.todoList.push(todoText);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoInHtlm(todoText){

    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");
    todoItem.textContent = todoText;
    todoItem.classList.add("todoItem")

    const editBtn = document.createElement("button");
    editBtn.textContent = "edit";
    editBtn.classList.add("editButton");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "delete";
    deleteBtn.classList.add("deleteButton");

    const completedBtn = document.createElement("button");
    completedBtn.textContent = "completed";
    completedBtn.classList.add("completedButton");

    todoItem.appendChild(editBtn);
    todoItem.appendChild(deleteBtn);
    todoItem.appendChild(completedBtn);

    todoList.appendChild(todoItem);

}

document.addEventListener("DOMContentLoaded", () => {

    const addTotodo = document.getElementById("addTotodo");

    const submitButton = document.getElementById("buttonId");

    const todoList = document.getElementById("todoList");

    submitButton.addEventListener("click", (event) => {
        const todoText = addTotodo.value;

        if(todoText == ''){
            alert("please write something for todo");
        } else {
            addTodoToLocalStorage(todoText);

            addTodoInHtlm(todoText);
            addTotodo.value = '';
        }
    });

    addTotodo.addEventListener("change", (event) => { // change or input koi bhi ho skta hai
        //this callback method fired every time when something is change in input 
        const todoText = event.target.value;

        event.target.value = todoText.trim();

        console.log(event.target.value);    
    });


   
    const todos = loadTodos();
    
    todos.todoList.forEach(todo => {
        const newTodoItem = document.createElement("li");
        newTodoItem.textContent = todo;
        todoList.appendChild(newTodoItem);
    });
});
