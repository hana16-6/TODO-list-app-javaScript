let textVal = document.getElementById("textVal");
let addBtn = document.getElementById("form");
let mainUl = document.getElementById("inProgress").id;
let tasksSection = document.getElementsByClassName("tasksSection");
let count = 1;
let storageArr = [];

addBtn.addEventListener("submit", function (e) {
    e.preventDefault();
    let val = textVal.value;
    id = `item${count}`;

    if (val) {
        createItem(val, mainUl, id)

    }
});
function createItem(val, parent, id) {
    //console.log(parent)

    let selectedParent = document.getElementById(parent);
    //console.log(selectedParent)

    let li = document.createElement("li");
    li.setAttribute("draggable", true);
    li.setAttribute("id", id)
    li.innerHTML = val;
    document.getElementById(parent).appendChild(li);
    li.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData('text', this.id);
        console.log(this.id);

    });
    let obj = {
        id: li.id,
        value: li.innerHTML,
        parent: li.parentElement.id
    }
    storageArr.push(obj);
    count++;
    strorageData(storageArr);
}
for (let i = 0; i < tasksSection.length; i++) {
    tasksSection[i].addEventListener("dragover", dragoverFun)
    tasksSection[i].addEventListener('drop', dropFun)
}

function dragoverFun(e) {
    e.preventDefault();
}

function dropFun(event) {
    var darggedData = event.dataTransfer.getData('text');
    let li = document.getElementById(darggedData);
    let changedItem = this.appendChild(li);
    //console.log(changedItem);
    for (let i = 0; storageArr.length > i; i++) {
        if (storageArr[i].id == changedItem.id) {
            storageArr[i] = {
                id: changedItem.id,
                value: changedItem.innerHTML,
                parent: changedItem.parentElement.id
            }
        }
    }

    strorageData(storageArr);
    //console.log(storageArr);

}

function strorageData(storageArr) {
    localStorage.setItem("item", JSON.stringify(storageArr))
}
function getFromStorage() {
    var returnData = JSON.parse(localStorage.getItem("item"));
    //console.log(returnData)
    if (returnData) {
        for (let i = 0; i < returnData.length; i++) {
            // console.log(returnData[i])
            createItem(returnData[i].value, returnData[i].parent, returnData[i].id)
        }
    }
}
getFromStorage();