let todoInput=document.querySelector(".todoTitle");
let todoForm=document.querySelector("#todoform");
let todoContainer=document.querySelector(".todoContainer");

let todoArray=[];
//fetch
fetch("http://localhost:2412/todos")
.then((response)=>response.json())
.then((data)=>{
    console.log(data)
    todoArray=data
    showAllTodos(todoArray)
})

todoForm.addEventListener("submit",function(e){
   e.preventDefault();
   let value=inputValue();
   let newTodo={
    id:Math.floor(Math.random() * 1000000),
    title:value
   }
   todoArray.push(newTodo);
//    addTodo(newTodo);
    showAllTodos(todoArray);
   todoInput.value=""; // Clear input field after adding
})

function inputValue(){
    return todoInput.value;
}

function addTodo(todo){
    let li=document.createElement("li");
    li.setAttribute("id",`${todo.id}`);
    li.innerHTML=` <div id="122334354">
                <input type="checkbox" name="" id="checkbox">
                <h1>${todo.title}</h1>
                <div>
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, obcaecati!</p>
                </div>
            </div>`
        todoContainer.appendChild(li);
}

function showAllTodos(todoArray) {
    todoContainer.innerHTML = ""; // Clear existing todos
    todoArray.forEach(todo => {
        addTodo(todo);
    });
}