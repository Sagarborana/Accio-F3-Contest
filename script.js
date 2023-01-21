
let items = [];
const addItem = document.getElementById("add-item")
const date = document.getElementById("date")
date.min= `${new Date().toISOString().split('T')[0]}`


const inFuture = (date) => {
    return date.setHours(0,0,0,0) > new Date().setHours(0,0,0,0)
};

function deleteItem(id){
    // console.log(id)
    items = items.filter(item => item.id != id);
    localStorage.setItem("todo",JSON.stringify(items))
    updateDOM();
}

function completeItem(id){
    items = items.map(item => {
        if(item.id == id){
            item.completed = true;
        }
        return item;
    });
    localStorage.setItem("todo",JSON.stringify(items))
    updateDOM();
}

const makeTodo = (items) =>{

    if(items == null){
        return;
    }
    items.map((item)=>{
        const todaySection = document.getElementById("today")
        const futureSection = document.getElementById("future")
        const completeSection = document.getElementById("complete-sec")
        const div = document.createElement("div");
        div.classList.add("todo")
        
        if(item.completed){
            div.innerHTML = `<span id="show-name">${item.name}</span>
            <span id="show-date">${item.date}</span>
            <span id="show-priority">Priority: ${item.priority}</span>
            <i class="fa-solid fa-trash" id="${item.id}"></i>`
            div.classList.add("complete")
            completeSection.appendChild(div);
            return;
        }

        div.innerHTML = `<span id="show-name">${item.name}</span>
        <span id="show-date">${item.date}</span>
        <span id="show-priority">Priority: ${item.priority}</span>
        <i class="fa-solid fa-check" id="${item.id}"></i>
        <i class="fa-solid fa-trash" id="${item.id}"></i>`
        
        if(item.samedate){
            todaySection.appendChild(div);
        }else{
            futureSection.appendChild(div);
        }
    })

    let dltBtn = document.getElementsByClassName("fa-trash")

    dltBtn = Array.from(dltBtn);
    dltBtn.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            deleteItem(e.target.id);
        })
    });

    let tickBtn = document.getElementsByClassName("fa-check")

    tickBtn = Array.from(tickBtn);
    tickBtn.forEach((btn)=>{
        btn.addEventListener("click", (e)=>{
            completeItem(e.target.id);
        })
    });
}

function add(){
    const name = document.getElementById("name").value
    const date = document.getElementById("date").value
    const priority = document.getElementById("priority").value

    if(name == "" || date == "" || priority == "") return;
    const dates = date.split("-")
    const fullDate = new Date(dates[0],dates[1]-1,dates[2]);
    const isSame = !inFuture(fullDate);
    const id = uniq = 'id' + (new Date()).getTime();
    const todoObj = {
        id: id,
        name: name,
        date: date,
        priority: priority,
        completed: false,
        samedate: isSame
    }

    const todo = localStorage.getItem("todo")
    items = JSON.parse(todo);
    // console.log(items)
    if(items == null){
        items = [];
    }
    items.push(todoObj)
    localStorage.setItem("todo", JSON.stringify(items));
    updateDOM();
    
}

function updateDOM(){
    const todo = localStorage.getItem("todo")
    items = JSON.parse(todo);
    const todaySection = document.getElementById("today")
    const futureSection = document.getElementById("future")
    const completeSection = document.getElementById("complete-sec")
    todaySection.innerHTML = "";
    futureSection.innerHTML = "";
    completeSection.innerHTML = "";
    makeTodo(items);
}

addItem.addEventListener("click", (e)=>{
    e.preventDefault();
    add();
})


document.addEventListener("DOMContentLoaded", updateDOM);