var taskInput=document.getElementById("new-task");//Add a new task.
var addButton=document.getElementById("add-task-button");//first button
var incompleteTaskHolder=document.getElementById("active-tasks");//ul of #incompleteTasks
var completedTasksHolder=document.getElementById("completed-tasks");//completed-tasks


//New task list item
var createNewTaskElement=function(taskString){

    var listItem=document.createElement("li");

    var checkBox=document.createElement("input");//checkbx
    var label=document.createElement("label");//label
    var editInput=document.createElement("input");//text
    var editButton=document.createElement("button");//edit button

    var deleteButton=document.createElement("button");//delete button
    var deleteButtonImg=document.createElement("img");//delete button image

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



var addTask=function(){
    console.log("Add Task...");
    //Create a new list item with the text from the #new-task:
    if (!taskInput.value) return;
    var listItem=createNewTaskElement(taskInput.value);

    //Append listItem to incompleteTaskHolder
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskCompleted);

    taskInput.value="";

}

//Edit an existing task.
var editTask=function(){
    console.log("Edit Task...");
    console.log("Change 'edit' to 'save'");


    var listItem=this.parentNode;

    var editInput=listItem.querySelector(".task__text");
    var label=listItem.querySelector(".task__label");
    var editBtn=listItem.querySelector(".task__edit");
    var containsClass=listItem.classList.contains("task_edit");
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
var deleteTask=function(){
    console.log("Delete Task...");

    var listItem=this.parentNode;
    var ul=listItem.parentNode;
    //Remove the parent list item from the ul.
    ul.removeChild(listItem);

}


//Mark task completed
var taskCompleted=function(){
    console.log("Complete Task...");

    //Append the task list item to the #completed-tasks
    var listItem=this.parentNode;
    completedTasksHolder.appendChild(listItem);
    bindTaskEvents(listItem, taskIncomplete);
}


//Mark task as incomplete.
var taskIncomplete=function(){
    console.log("Incomplete Task...");
    //When the checkbox is unchecked
    //Append the task list item to the #incompleteTasks.
    var listItem=this.parentNode;
    incompleteTaskHolder.appendChild(listItem);
    bindTaskEvents(listItem,taskCompleted);
}



var ajaxRequest=function(){
    console.log("AJAX Request");
}

//Set the click handler to the addTask function.
addButton.onclick=addTask;
addButton.addEventListener("click",addTask);
addButton.addEventListener("click",ajaxRequest);


var bindTaskEvents=function(taskListItem,checkBoxEventHandler){
    console.log("bind list item events");
    var checkBox=taskListItem.querySelector(".task__checkbox");
    var editButton=taskListItem.querySelector(".task__edit");
    var deleteButton=taskListItem.querySelector(".task__delete");


    editButton.onclick=editTask;
    deleteButton.onclick=deleteTask;
    checkBox.onchange=checkBoxEventHandler;
}

//cycle over incompleteTaskHolder ul list items
for (var i=0; i<incompleteTaskHolder.children.length;i++){
    //bind events to list items chldren(tasksCompleted)
    bindTaskEvents(incompleteTaskHolder.children[i],taskCompleted);
}

//cycle over completed tasks
for (var i=0; i<completedTasksHolder.children.length;i++){
    //bind events to list items chldren(tasksIncompleted)
    bindTaskEvents(completedTasksHolder.children[i],taskIncomplete);
}
