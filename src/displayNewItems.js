import { createNewProject, createNewTask } from './taskCreation.js'

function displayTasksOverview(arrayOfTaskObjects) {
    const overviewContainer = document.createElement(`div`);
    const overviewTitle = document.createElement(`h2`);
    const tasksContainer = document.createElement(`div`);
    const taskTitle = document.createElement(`h2`);
    
    overviewContainer.classList.add(`project-container`);
    overviewTitle.textContent = `overview`;
    tasksContainer.classList.add(`project-tasks-container`);
    taskTitle.textContent = arrayOfTaskObjects[0].title;

    overviewContainer.appendChild(overviewTitle);
    tasksContainer.appendChild(taskTitle);
    overviewContainer.appendChild(tasksContainer);
    
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

export {
    displayTasksOverview,
    displayNewProject
}