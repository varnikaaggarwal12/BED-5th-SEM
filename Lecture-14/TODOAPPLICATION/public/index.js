//fetch
fetch("http://localhost:2557/todos")
.then((response)=>response.json())
.then((data)=>console.log(data))