const taskInput=document.getElementById("new-task");//Add a new task.
const addButton=document.getElementById("add-task-button");//first button
const incompleteTaskHolder=document.getElementById("active-tasks");//ul of #incompleteTasks
const completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
function createNewTaskElement(taskString){
  const listItem=document.createElement("li");
  const checkBox=document.createElement("input");//checkbx
  const label=document.createElement("label");//label
  const editInput=document.createElement("input");//text
  const editButton=document.createElement("button");//edit button
  const deleteButton=document.createElement("button");//delete button
  const deleteButtonImg=document.createElement("img");//delete button image
  listItem.className="task"
  
  label.innerText=taskString;
  label.className="task__label";

  checkBox.type="checkbox";
  checkBox.className="input task__checkbox";
  
  editInput.type="text";
  editInput.className="input task__text";
  
  editButton.innerText="Edit";
  editButton.className="button task__edit";
  
  deleteButton.className="button task__delete";
  
  deleteButtonImg.src="./remove.svg";
  deleteButtonImg.className="delete__icon";
  deleteButtonImg.alt="remove-icon";
  
  deleteButton.appendChild(deleteButtonImg);
  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  
  return listItem;
}



function addTask(){
  console.log("Add Task...");
  //Create a new list item with the text from the #new-task:
  if (!taskInput.value) return;
  const listItem=createNewTaskElement(taskInput.value);

  //Append listItem to incompleteTaskHolder
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskCompleted);

  taskInput.value="";

}

//Edit an existing task.
function editTask(){
  console.log("Edit Task...");
  console.log("Change 'edit' to 'save'");

  const listItem=this.parentNode;

  const editInput=listItem.querySelector(".task__text");
  const label=listItem.querySelector(".task__label");
  const editBtn=listItem.querySelector(".task__edit");
  const containsClass=listItem.classList.contains("task_edit");
  //If class of the parent is .editmode
  if(containsClass){
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText=editInput.value;
    editBtn.innerText="Edit";
  }else{
    editInput.value=label.innerText;
    editBtn.innerText="Save";
  }
  //toggle .editmode on the parent.
  listItem.classList.toggle("task_edit");
};
//Delete task.
function deleteTask(){
  console.log("Delete Task...");

  const listItem=this.parentNode;
  const ul=listItem.parentNode;
  //Remove the parent list item from the ul.
  ul.removeChild(listItem);
}


//Mark task completed
function taskCompleted(){
  console.log("Complete Task...");

  //Append the task list item to the #completed-tasks
  const listItem=this.parentNode;
  completedTasksHolder.appendChild(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}


//Mark task as incomplete.
function taskIncomplete(){
  console.log("Incomplete Task...");
  //When the checkbox is unchecked
  //Append the task list item to the #incompleteTasks.
  const listItem=this.parentNode;
  incompleteTaskHolder.appendChild(listItem);
  bindTaskEvents(listItem,taskCompleted);
}



function ajaxRequest(){
  console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


function bindTaskEvents(taskListItem,checkBoxEventHandler){
  console.log("bind list item events");
  const checkBox=taskListItem.querySelector(".task__checkbox");
  const editButton=taskListItem.querySelector(".task__edit");
  const deleteButton=taskListItem.querySelector(".task__delete");

  editButton.onclick=editTask;
  deleteButton.onclick=deleteTask;
  checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (let i=0; i<incompleteTaskHolder.children.length; i++){
  //bind events to list items chldren(tasksCompleted)
  bindTaskEvents(incompleteTaskHolder.children[i], taskCompleted);
}

//cycle over completed tasks
for (let i=0; i<completedTasksHolder.children.length; i++){
  //bind events to list items chldren(tasksIncompleted)
  bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
