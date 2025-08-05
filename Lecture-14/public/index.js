let userContainer=document.querySelector(".user-container");
function getUsers(URL){
    fetch(URL)
    .then((res)=>{
        console.log(res)
        return res.json()
        
    })
    .then((data)=>{
        console.log(data)
        data.forEach((user)=>{
            displayUser(user);
        })
    })
    .catch((err)=>{
        console.log(err)
    })
}
getUsers("http://localhost:7777/users")
function displayUser(user){
    //user-->
    let li=document.createElement("li");
    li.innerHTML=` <div class="user-info">
            <h1>${user.name}</h1>
            <p>${user.username}</p>
            </div>
            <div class="user-btn">
                <button class="delete-btn">*</button>
                <button class="edit-btn">--</button>


            </div> `
            userContainer.appendChild(li)
}