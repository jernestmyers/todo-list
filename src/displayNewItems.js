import { createNewProject, createNewTask } from './taskCreation.js'

function displayTasksOverview(arrayOfTaskObjects) {
    const overviewContainer = document.createElement(`div`);
    const overviewTitle = document.createElement(`h2`);
    overviewContainer.appendChild(overviewTitle);
    
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const tasksContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h3`);
        const taskDueDate = document.createElement(`p`);
        const taskDescription = document.createElement(`p`);
        const taskPriorityStatus = document.createElement(`p`);
        
        overviewContainer.classList.add(`project-container`);
        overviewTitle.textContent = `overview`;
        tasksContainer.classList.add(`project-tasks-container`);
        taskTitle.textContent = arrayOfTaskObjects[i].title;
        taskDueDate.textContent = arrayOfTaskObjects[i].dateDue;
        taskDescription.textContent = arrayOfTaskObjects[i].description;
        taskPriorityStatus.textContent = arrayOfTaskObjects[i].priorityStatus;

        tasksContainer.appendChild(taskTitle);
        tasksContainer.appendChild(taskDueDate);
        tasksContainer.appendChild(taskDescription);
        tasksContainer.appendChild(taskPriorityStatus);
        overviewContainer.appendChild(tasksContainer);
    }
    
    return overviewContainer
}

function displayNewProject(arrayOfProjectObjects) {
    const projectContainer = document.createElement(`div`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const tasksContainer = document.createElement(`div`);
    
    projectContainer.classList.add(`project-container`);
    projectTitle.textContent = arrayOfProjectObjects[0].title;
    projectDueDate.textContent = arrayOfProjectObjects[0].dateDue;
    projectDescription.textContent = arrayOfProjectObjects[0].description;
    tasksContainer.classList.add(`project-tasks-container`);

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDueDate);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(tasksContainer);
    
    console.log(arrayOfProjectObjects);
    console.log(projectContainer);

    return projectContainer
}

function appendProjectToProjectList(projectTitle) {
    const projectListHead = document.querySelector(`#project-list`);
    const newProjectTitle = document.createElement(`button`);
    newProjectTitle.textContent = projectTitle;

    projectListHead.appendChild(newProjectTitle);
}

export {
    displayTasksOverview,
    displayNewProject,
    appendProjectToProjectList
}