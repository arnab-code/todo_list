// CODE EXPLAINED channel

const clear = document.querySelector(".clear")
const dateElement = document.getElementById("date")
const list = document.getElementById("list")
const input = document.getElementById("input")


//Class names

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";


//Variables

let LIST, id;

let data = localStorage.getItem("NEW");

if(data) {
    LIST = JSON.parse(data);
    id = LIST.length;
    loadList(LIST);
}
else {
    console.log("test")
    LIST = [];
    id = 0;
}

//Clear local storage

clear.addEventListener("click", () => {
    localStorage.clear();
    location.reload()
})

//Date element

const options = {weekday: "long", month: "short", day: "numeric"}
const today = new Date()
dateElement.innerHTML = today.toLocaleDateString("en-US", options)

//Load List function

function loadList(array) {
    array.forEach(function(item) {
        addToDo(item.name, item.id, item.done, item.trash);
    });
}

//Add to-do function

function addToDo(toDo, id, done, trash) {
    if(trash) return;

    let DONE = done ? CHECK : UNCHECK
    let LINE = done ? LINE_THROUGH : ""
    
    let item = `  <li class="item">
                        <i class="fa ${DONE} co" job="complete" id=${id}></i>
                        <p class="text ${LINE}">${toDo}</p>
                        <i class="fa fa-trash-o de" job="delete" id=${id}></i>
                    </li>
                `
    const position = "beforeend"
    list.insertAdjacentHTML(position, item)
    
}

//Complete ToDo

function completeToDo(element) {
    element.classList.toggle(CHECK)
    element.classList.toggle(UNCHECK)
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH)

    LIST[element.id].done = LIST[element.id].done ? false : true;
}

//Remove ToDo

function removeToDo(element) {
    element.parentNode.parentNode.removeChild(element.parentNode);
    LIST[element.id].trash = true;
    
}


//Add event listener

document.addEventListener("keyup", function(event) {
    if(event.keyCode == 13) {
        const toDo = input.value;
        if(toDo) {
            addToDo(toDo, id, false, false);

            LIST.push({
                name: toDo,
                id: id,
                done: false,
                trash: false
            });
            localStorage.setItem("NEW", JSON.stringify(LIST));
            id++;
        }
        input.value = "";
    }
})


//List event listener

list.addEventListener("click", function(event) {
    const element = event.target;
    const elementJob = element.attributes.job.value;

    if (elementJob == "complete"){
        completeToDo(element);
    }
    else if (elementJob == "delete"){
        removeToDo(element);
    }
    localStorage.setItem("NEW", JSON.stringify(LIST));

})