require('./style.css');

const addTaskBtn = document.getElementById('add-task');
const addProjectBtn = document.getElementById('add-project');

addTaskBtn.addEventListener('click', e => {
    console.log("task added");
});

addProjectBtn.addEventListener('click', e=> {
    console.log("project added");
})