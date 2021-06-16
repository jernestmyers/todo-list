
// function loadMainContent(container, functionToInvoke) {
//     while (container.firstChild) {
//         container.removeChild(container.firstChild)
//     }
//     let containerToDisplay = functionToInvoke;
//     container.appendChild(containerToDisplay);
// }

const mainContainer = document.querySelector(`#main-content`);

function loadMainContent(projectsArray, tasksArray, currentPageDisplayed) {
    console.log(`loadMain counter`);
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild)
    }
    if (currentPageDisplayed === `overview`) {
    const containerToDisplay = displayTasksOverview(tasksArray);
    // container.appendChild(containerToDisplay);
    mainContainer.appendChild(containerToDisplay);
    }
}

function regenerateProjectTasks(pageTitle) {
    currentObjectArray = getObjectArrays();
    if (pageTitle === `overview`) {
        loadMainContent(mainContainer, displayTasksOverview(currentObjectArray.tasks));
    } else {
        const projectDisplayedObject = currentObjectArray.projects.filter( object => {
            if (object.title === pageTitle) {
                return object;
            }
        })
        const filterTasks = currentObjectArray.tasks.filter( object => {
            if (object.projectAssociated === pageTitle) {
                return object
            }
        })
        console.log(projectDisplayedObject[0]);
        loadMainContent(mainContainer, displayExistingProject(projectDisplayedObject[0], filterTasks));
    }
}

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
    // allTasksContainer.addEventListener(`click`, (e) => {
    //     if (e.target.tagName === `BUTTON` && e.target.textContent === `edit`) {
    //         const taskToEditIndex = e.target.dataset.indexNumber;
    //         const titleOfPageDisplayed = e.target.parentNode.parentNode.parentNode.firstChild.textContent;
    //         console.log(`editTask`);
    //         openEditTaskModal(taskToEditIndex, titleOfPageDisplayed);
    //     } else if (e.target.tagName === `BUTTON` && e.target.textContent === `delete`) {
    //         const taskToDeleteTitle = e.target.parentNode.firstChild.textContent;
    //         const taskToDeleteProjectAssociated = e.target.previousSibling.previousSibling.textContent;
    //         const titleOfPageDisplayed = e.target.parentNode.parentNode.parentNode.firstChild.textContent;
    //         // deleteTaskObject(taskToDeleteTitle, taskToDeleteProjectAssociated, titleOfPageDisplayed);
    //     }
    // });
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const newTaskContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h3`);
        const taskDueDate = document.createElement(`p`);
        const taskDescription = document.createElement(`p`);
        const taskPriorityStatus = document.createElement(`p`);
        const taskProjectAssociated = document.createElement(`p`);
        const taskEditButton = document.createElement(`button`);
        const taskDeleteButton = document.createElement(`button`);
        
        newTaskContainer.classList.add(`task-container`);
        taskTitle.textContent = arrayOfTaskObjects[i].title;
        taskDueDate.textContent = arrayOfTaskObjects[i].dateDue;
        taskDescription.textContent = arrayOfTaskObjects[i].description;
        taskPriorityStatus.textContent = arrayOfTaskObjects[i].priorityStatus;
        taskProjectAssociated.textContent = arrayOfTaskObjects[i].projectAssociated;
        taskEditButton.textContent = `edit`;
        taskEditButton.classList.add(`edit-task-btn`);
        taskEditButton.setAttribute(`data-index-number`, `${arrayOfTaskObjects[i].taskIndex}`);
        taskDeleteButton.textContent = `delete`;
        taskDeleteButton.classList.add(`delete-task-btn`);
        taskDeleteButton.setAttribute(`data-index-number`, `${arrayOfTaskObjects[i].taskIndex}`);

        newTaskContainer.appendChild(taskTitle);
        newTaskContainer.appendChild(taskDueDate);
        newTaskContainer.appendChild(taskDescription);
        newTaskContainer.appendChild(taskPriorityStatus);
        newTaskContainer.appendChild(taskProjectAssociated);
        newTaskContainer.appendChild(taskEditButton);
        newTaskContainer.appendChild(taskDeleteButton);

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
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectTitle.textContent = newProjectObject.title;
    projectDueDate.textContent = newProjectObject.dateDue;
    projectDescription.textContent = newProjectObject.description;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.classList.add(`project-display-button`);
    projectDeleteButton.classList.add(`project-display-button`);

    projectEditButton.addEventListener(`click`, (e) => {
            const projectToEditTitle = e.target.parentNode.firstChild.textContent;
            const projectToEditDescription = e.target.previousSibling.textContent;
            editProjectObject(projectToEditTitle, projectToEditDescription);
    });

    projectDeleteButton.addEventListener(`click`, (e) => {
            const projectToDeleteTitle = e.target.parentNode.firstChild.textContent;
            openDeleteProjectModal(projectToDeleteTitle);
    });

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDueDate);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectEditButton);
    projectContainer.appendChild(projectDeleteButton);

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
    newProjectTitle.setAttribute(`id`, projectTitle);
 
    projectListHead.appendChild(newProjectTitle);
}

export {
    loadMainContent,
}