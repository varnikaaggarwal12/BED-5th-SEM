let box=document.querySelector("#box");
let btn=document.querySelector("#btn");
let colours=["red","black","green","pink","blue","grey","orange","purple","brown","brown"]
let id=null;
function generateRandomColor(){
    let index=Math.floor(Math.random()*10);
    console.log(index);
    let randomcolor=colours[index];
    console.log(randomcolor)
    box. style.background=randomcolor
}
btn.addEventListener("click",function(){
    id=setInterval(()=>{
        generateRandomColor();
    },500)
})
stop.addEventListener("click",function(){
    if(id){
        clearInterval(id)

    }
})