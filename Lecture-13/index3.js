//how to insert new element in dom
//1.create a new element-----> createElement
//2.add required data in that element using innerText or innerHtml
//3.add that element in parent container using appendChild or append
let todo=[{
    id:3435435,
    title:"Todo4"
},
{
    id:46535435,
    title:"Todo5"
},]
let ul=document.createElement("li");
function addTodo(){
    let li=document.createElement("li");
    li.innerHtml=` <div>
                <input type="checkbox" name="" id="checkbox">
                <h1>Title 1</h1>
            </div>
            <button class="edit">edit</button>
        <button class="delete">delete</button>    
        <P>i3ouujjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjjj heheu8eu3w shailnuuhf
            shalkjj
        </P> 
        </div>
        </div>`
        ul.appendChild(li);
}
function showAllTodos(todos){
    todos.foreach(todo=>{
        addTodo(todo)
    });
}
//addTodo(todo);
showAllTodos(todos);