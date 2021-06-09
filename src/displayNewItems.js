import { createNewProject, createNewTask } from './taskCreation.js'

function displayTasksOverview(arrayOfTaskObjects) {
    const overviewContainer = document.createElement(`div`);
    const overviewTitle = document.createElement(`h2`);
    overviewTitle.textContent = `overview`;
    overviewContainer.classList.add(`project-container`);
    overviewContainer.appendChild(overviewTitle);
    
    const tasksToDisplay = displayTasks(arrayOfTaskObjects, overviewContainer)
    
    return tasksToDisplay
}

function displayTasks(arrayOfTaskObjects, container) {
    const allTasksContainer = document.createElement(`div`);
    allTasksContainer.classList.add(`project-tasks-container`);
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const newTaskContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h3`);
        const taskDueDate = document.createElement(`p`);
        const taskDescription = document.createElement(`p`);
        const taskPriorityStatus = document.createElement(`p`);
        const taskProjectAssociated = document.createElement(`p`);
        
        taskTitle.textContent = arrayOfTaskObjects[i].title;
        taskDueDate.textContent = arrayOfTaskObjects[i].dateDue;
        taskDescription.textContent = arrayOfTaskObjects[i].description;
        taskPriorityStatus.textContent = arrayOfTaskObjects[i].priorityStatus;
        taskProjectAssociated.textContent = arrayOfTaskObjects[i].projectAssociated;

        newTaskContainer.appendChild(taskTitle);
        newTaskContainer.appendChild(taskDueDate);
        newTaskContainer.appendChild(taskDescription);
        newTaskContainer.appendChild(taskPriorityStatus);
        newTaskContainer.appendChild(taskProjectAssociated);

        allTasksContainer.appendChild(newTaskContainer);
    }
    
    container.appendChild(allTasksContainer);
    return container
}

function displayNewProject(newProjectObject) {
    const projectContainer = document.createElement(`div`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    
    projectContainer.classList.add(`project-container`);
    projectTitle.textContent = newProjectObject.title;
    projectDueDate.textContent = newProjectObject.dateDue;
    projectDescription.textContent = newProjectObject.description;

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDueDate);
    projectContainer.appendChild(projectDescription);

    return projectContainer
}

function displayExistingProject(projectObject, taskObject) {
    const projectContainerDisplayed = displayNewProject(projectObject);
    const projectTasks = displayTasks(taskObject, projectContainerDisplayed);
    return projectTasks
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
    displayExistingProject,
    appendProjectToProjectList
}