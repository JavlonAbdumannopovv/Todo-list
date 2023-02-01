/* Variables ************************************************** */

let todoList = document.querySelector(".todo_list");
let button = document.querySelector(".add_item");
let input = document.querySelector(".input");
let btnEnd = document.querySelector(".toggle_button");
let removableArray = [];
let itemDoneArray = [];


/* todo list appendchild list item **************************************** */
function todoAppendChild() {
  todoList.innerHTML = "";

  todoArray.forEach((item) => {
    let li = document.createElement("li");
    li.className = item.className;
    li.innerHTML = `
    <span>${item.name}</span>
    <ion-icon name="${item.iconName}" class="check" onclick="itemChecked(${item.id})"></ion-icon>
    <ion-icon name="trash-outline" class="remove" onclick="itemRemove(${item.id})"></ion-icon>
    `;
    todoList.appendChild(li);
  })
};
todoAppendChild();


/* Add Item *********************************************************** */
let count = 4;
button.addEventListener("click", (e) => {
  e.preventDefault();
  let inputObj = {};
  inputObj.id = count + 1;
  inputObj.name = input.value;
  inputObj.iconName = "square-outline";
  inputObj.className = "list_item";
  todoArray.push(inputObj);
  input.value = "";
  todoAppendChild();
  moveEnd1();
});
  

/* Item check and noncheck ******************************************************** */
function itemChecked(itemId) {
  todoArray.forEach((item) => {
    if (item.id == itemId) {
      if (item.iconName === "square-outline") {
        item.iconName = "checkbox";
        item.className = "list_item delete";
        itemDoneArray.push(item);
      } else {
        item.iconName = "square-outline";
        item.className = "list_item";
        itemDoneArray.forEach((el, index) => {
          if (el.id == itemId) {
            itemDoneArray.splice(index, 1);
          }
        })
      }
    }
  });
  moveEnd1();
  todoAppendChild();
};


/* Item move **************************************************************** */
function moveEnd1(){

  if (btnEnd.className == "toggle_button active") {

    itemDoneArray.forEach((item) => {
      todoArray.forEach((el, index) => {
        if (item.id == el.id) {
          todoArray.splice(index, 1);
        }
        removableArray.forEach((el1, index1) => {
          if (el1.id == el.id) {
            todoArray.splice(index, 1);
          }
        });
      });
      todoArray.push(item);

    });
    todoAppendChild();


  }else if(btnEnd.className != "toggle_button active"){
    itemDoneArray.forEach((item) => {
      todoArray.forEach((el, index) => {
        if (item.id == el.id) {
          todoArray.splice(index, 1);
        }
        removableArray.forEach((el1, index1) => {
          if (el1.id == el.id) {
            todoArray.splice(index, 1);
          }
        });
      });
      todoArray.unshift(item);
    });
    todoAppendChild();
  }


}

/* Item  moved button toggle ******************************************************/
function moveEnd() {
  if (btnEnd.className == "toggle_button") {
    btnEnd.className = "toggle_button active";
  } else {
    btnEnd.className = "toggle_button";
  }

  moveEnd1();
}

/* Item Remove ****************************************************************** */
function itemRemove(itemId) {
  todoArray.forEach((item, index) => {
    if (item.id == itemId) {
      removableArray.push(item);
      todoArray.splice(index, 1);
    }
  })

  todoAppendChild();
}









