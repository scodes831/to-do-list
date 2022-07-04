import { closeSuccessfulAlert, 
        clearForm, 
        displayTasksbyProjectName,
        taskList,
        displayTaskTableByProjectName } from './tasks';

import greenCheckmarkImage from './images/icons/green-checkmark.png';
import trashBinImage from './images/icons/trash-bin.png';

class Project {
    constructor(name, deadline, desc) {
        this.name = name,
        this.deadline = deadline,
        this.desc = desc
    }
}

let projectList = [];
let numAllProjects = 0;

export function saveProject() {
    let projName = document.getElementById('project-name').value;
    let projDeadline = document.getElementById('project-deadline').value;
    let projDesc = document.getElementById('project-desc').value;
    console.log("the project name is " + projName);
    console.log("the deadline is " + projDeadline);
    console.log("the desc is " + projDesc);

    createProject();

    function createProject() {
        const displayNumAllProjects = document.getElementById('num-my-projects');

        if (projName === "" || projDeadline === "") {
            alert("You must enter a name and deadline for the project.");
        } else {
            let project = new Project(projName, projDeadline, projDesc);
            projectList.push(project);
            console.log(projectList);
            displaySuccessfulAlert();
            let addProject = ++numAllProjects;
            displayNumAllProjects.textContent = addProject;
            clearForm();
            setTimeout(closeSuccessfulAlert, 1500);
        }
    }
};

export function addProjectToTaskForm() {
    console.log("the project list is " + projectList);
    const container = document.getElementById('task-project');

    for (let i = 0; i < projectList.length; i++) {
        let projectName = projectList[i].name;

        let taskFormProjectOption = document.createElement('option');
        taskFormProjectOption.setAttribute('value', projectName);
        taskFormProjectOption.textContent = projectName;
        container.appendChild(taskFormProjectOption); 
    }
};

function displaySuccessfulAlert() {
    const container = document.getElementById('project-form-container');

    const modalContainer = document.createElement('div');
    modalContainer.setAttribute('id', 'modal-container');
    container.appendChild(modalContainer);

    const modalText = document.createElement('p');
    modalText.classList.add('modal-text');
    modalText.textContent = "Project successfully added!"
    modalContainer.appendChild(modalText);

    const modalIcon = document.createElement('img');
    modalIcon.classList.add('modal-icon');
    modalIcon.src = greenCheckmarkImage;
    modalIcon.alt = "Green check mark icon";
    modalContainer.appendChild(modalIcon);
};

export function displayProjectsList() {
    createProjectTable(projectList);
};

function createProjectTable(a) {
    const container = document.getElementById('content-container');
    const projectsTableContainer = document.createElement('div');
    projectsTableContainer.setAttribute('id', 'new-project-container');
    projectsTableContainer.classList.add('active');
    container.appendChild(projectsTableContainer);

    const projectsTable = document.createElement('table');
    projectsTable.setAttribute('id', 'projects-table');
    projectsTableContainer.appendChild(projectsTable);

    const tableHead = document.createElement('thead');
    projectsTable.appendChild(tableHead);

    const headRow = document.createElement('tr');
    tableHead.appendChild(headRow);

    const deadlineHeading = document.createElement('th');
    deadlineHeading.classList.add('heading');
    deadlineHeading.textContent = "Deadline";
    headRow.appendChild(deadlineHeading);

    const nameHeading = document.createElement('th');
    nameHeading.classList.add('heading');
    nameHeading.textContent = "Project Name";
    headRow.appendChild(nameHeading);

    const descHeading = document.createElement('th');
    descHeading.classList.add('heading');   
    descHeading.textContent = "Description";
    headRow.appendChild(descHeading);

    const deleteHeading = document.createElement('th');
    headRow.appendChild(deleteHeading);

    const tableBody = document.createElement('tbody');
    projectsTable.appendChild(tableBody);

    for (let i = 0; i < a.length; i++) {        
        let newRow = document.createElement('tr');
        tableBody.appendChild(newRow);
        
        let deadlineCell = document.createElement('td');
        deadlineCell.textContent = a[i].deadline;
        newRow.appendChild(deadlineCell);

        let nameCell = document.createElement('td');
        nameCell.textContent = a[i].name;
        let pName = a[i].name;
        newRow.appendChild(nameCell);
        nameCell.addEventListener('click', displayTasksbyProjectName(pName));

        let descCell = document.createElement('td');
        descCell.textContent = a[i].desc;
        newRow.appendChild(descCell);

        showTasksByProjectName(taskList);
    }  
};

function showTasksByProjectName(a) {
    const projectsTable = document.getElementById('projects-table');
    const rows = projectsTable.getElementsByTagName('tr');
        for (let i = 1; i < rows.length; i++) {
            rows[i].addEventListener('click', () => {
                console.log("row clicked");
                console.log(rows[i].children[1].textContent);
                console.log(a);
                let project = rows[i].children[1].textContent;
                console.log("the project name is " + project);
                let projectArr = [];
                for (let i = 0; i< a.length; i++) {
                    if (a[i].assocProj === project) {
                        console.log(a[i].assocProj);
                        console.log(project);
                        projectArr.push(a[i]);
                    }
                    console.log(projectArr);
                }
                removeProjectTable();
                displayTaskTableByProjectName(projectArr);
            })
        }

}

export function removeProjectTable() {
    const doesProjTableExist = !!document.getElementById('new-project-container');
    const doesTaskTableExist = !!document.getElementById('new-task-container');
    const projectTable = document.getElementById('new-project-container');
    const tasksTable = document.getElementById('new-task-container');
    
    if (doesProjTableExist === true) {
        projectTable.remove();
    }
    if (doesTaskTableExist === true) {
        tasksTable.remove();
    }
};





