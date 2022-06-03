import { closeSuccessfulAlert, 
        clearForm } from './tasks';

import greenCheckmarkImage from './images/icons/green-checkmark.png';

class Project {
    constructor(name, deadline, desc, priority) {
        this.name = name,
        this.deadline = deadline,
        this.desc = desc
    }
}

let projectList = [];
let numAllProjects = 0;

export function saveProject() {
    let projName = document.getElementById('proj-name');
    let projDeadline = document.getElementById('proj-deadline');
    let projDesc = document.getElementById('proj-desc');

    createProject();

    function createProject() {
        const displayNumAllProjects = document.getElementById('num-my-projects');

        if (projName === "" || projDeadline === "") {
            alert("You must enter a name and deadline for the project.");
        } else {
            let project = new Project(projName, projDeadline, projDesc);
            projectList.push(project);
            displaySuccessfulAlert();
        }
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





