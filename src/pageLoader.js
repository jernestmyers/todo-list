const mainContainer = document.querySelector(`#main-content`);

function loadMainContent(projectsArray, projectToLoad, tasksArray, pageToDisplay) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild)
    }
    if (pageToDisplay === `overview` || pageToDisplay === `done.`) {
        const containerToDisplay = displayTasksOverview(tasksArray);
        mainContainer.appendChild(containerToDisplay);
    } else if (pageToDisplay === `due today` || pageToDisplay === `due this week` || pageToDisplay === `past due`) {
        const containerToDisplay = displayTasksSortedByDate(tasksArray, pageToDisplay);
        mainContainer.appendChild(containerToDisplay);
    } else if (!pageToDisplay) {
        const containerToDisplay = displayProject(projectToLoad)
        mainContainer.appendChild(containerToDisplay);
    } else {
        const containerToDisplay = displayExistingProject(projectToLoad, tasksArray)
        mainContainer.appendChild(containerToDisplay);
    }
    projectButtonsAndSelectorsHandler(projectsArray);
}

function displayTasksOverview(arrayOfTaskObjects) {
    const overviewContainer = document.createElement(`div`);
    const overviewTitle = document.createElement(`h2`);
    overviewTitle.textContent = `overview`;
    overviewTitle.setAttribute(`id`, `overview-header`);
    overviewContainer.classList.add(`project-container`);
    overviewContainer.appendChild(overviewTitle);
    
    const tasksToDisplay = displayTasks(arrayOfTaskObjects, overviewContainer, true)
    
    return tasksToDisplay
}

function displayTasksSortedByDate(arrayOfTaskObjects, sortedDateType) {
    const sortedDateContainer = document.createElement(`div`);
    const sortedDateTitle = document.createElement(`h2`);
    if (sortedDateType === `due today`) {
        sortedDateTitle.textContent = `tasks due today`;
    } else if (sortedDateType === `due this week`) {
        sortedDateTitle.textContent = `tasks due this week`;
    } else {
        sortedDateTitle.textContent = `tasks past due`
    }
    sortedDateTitle.setAttribute(`id`, `overview-header`);
    sortedDateContainer.classList.add(`project-container`);
    sortedDateContainer.appendChild(sortedDateTitle);
    
    const tasksToDisplay = displayTasks(arrayOfTaskObjects, sortedDateContainer, true)
    
    return tasksToDisplay
}

function displayTasks(arrayOfTaskObjects, container, toDisplayProjectAssociation) {
    const allTasksContainer = document.createElement(`div`);
    allTasksContainer.classList.add(`project-tasks-container`);

    const taskHeader = document.createElement(`div`);
    taskHeader.setAttribute(`id`, `task-header`);
    const headerTitleLabel = document.createElement(`h5`);
    const headerDueDateLabel = document.createElement(`h5`);
    const headerDescriptionLabel = document.createElement(`h5`);
    const headerPriorityLabel = document.createElement(`h5`);
    const headerProjectAssociatedLabel = document.createElement(`h5`);
    headerTitleLabel.textContent = `task`;
    headerDueDateLabel.textContent = `due date`;
    headerDescriptionLabel.textContent = `description`;
    headerPriorityLabel.textContent = `priority`;
    headerProjectAssociatedLabel.textContent = `associated project`;

    taskHeader.appendChild(headerTitleLabel);
    taskHeader.appendChild(headerDueDateLabel);
    taskHeader.appendChild(headerDescriptionLabel);
    taskHeader.appendChild(headerPriorityLabel);
    if (toDisplayProjectAssociation) {
        taskHeader.setAttribute(`id`, `overview-task-header`);
        taskHeader.appendChild(headerProjectAssociatedLabel);
    }

    allTasksContainer.appendChild(taskHeader);
    
    for (let i = 0; i < arrayOfTaskObjects.length; i++) {
        const newTaskContainer = document.createElement(`div`);
        const taskTitle = document.createElement(`h4`);
        const taskDueDate = document.createElement(`p`);
        const taskDescription = document.createElement(`p`);
        const taskPriorityStatus = document.createElement(`p`);
        const taskProjectAssociated = document.createElement(`p`);
        const taskEditButton = document.createElement(`button`);
        const taskDeleteButton = document.createElement(`button`);
        
        newTaskContainer.classList.add(`task-container`);
        newTaskContainer.setAttribute(`data-index-number`, `${arrayOfTaskObjects[i].taskIndex}`);
        taskTitle.textContent = arrayOfTaskObjects[i].taskTitle;
        taskDueDate.textContent = arrayOfTaskObjects[i].taskDateDue;
        taskDescription.textContent = arrayOfTaskObjects[i].taskDescription;
        taskPriorityStatus.textContent = arrayOfTaskObjects[i].taskPriorityStatus;
        taskProjectAssociated.textContent = arrayOfTaskObjects[i].taskProjectAssociated;
        taskEditButton.textContent = `edit`;
        taskEditButton.classList.add(`edit-task-btn`);
        taskDeleteButton.textContent = `delete`;
        taskDeleteButton.classList.add(`delete-task-btn`);

        newTaskContainer.appendChild(taskTitle);
        newTaskContainer.appendChild(taskDueDate);
        newTaskContainer.appendChild(taskDescription);
        newTaskContainer.appendChild(taskPriorityStatus);
        if (toDisplayProjectAssociation) {
            newTaskContainer.setAttribute(`id`, `overview-task-container`);
            newTaskContainer.appendChild(taskProjectAssociated);
        }
        newTaskContainer.appendChild(taskEditButton);
        newTaskContainer.appendChild(taskDeleteButton);

        allTasksContainer.appendChild(newTaskContainer);
    }
    
    container.appendChild(allTasksContainer);
    return container
}

function displayProject(projectObject) {
    const projectContainer = document.createElement(`div`);
    const projectInfoContainer = document.createElement(`div`);
    const projectInfoHeader = document.createElement(`div`);
    const projectTitleLabel = document.createElement(`label`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectInfoContainer.classList.add(`project-info-container`);
    projectInfoHeader.classList.add(`project-info-header`);
    projectTitleLabel.classList.add(`project-title-header`);
    projectDueDate.classList.add(`project-date-due`);
    projectDescription.classList.add(`project-description`);
    projectContainer.setAttribute(`data-index-number`, `${projectObject.projectIndex}`);
    projectTitleLabel.textContent = `project:`;
    projectTitle.textContent = projectObject.projectTitle;
    projectDueDate.textContent = `due: ${projectObject.projectDateDue}`;
    projectDescription.textContent = `description: ${projectObject.projectDescription}`;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.classList.add(`edit-project-btn`);
    projectDeleteButton.classList.add(`delete-project-btn`);

    projectTitleLabel.appendChild(projectTitle);

    projectInfoHeader.appendChild(projectTitleLabel);
    projectInfoHeader.appendChild(projectDueDate);
    projectInfoHeader.appendChild(projectEditButton);
    projectInfoHeader.appendChild(projectDeleteButton);

    projectInfoContainer.appendChild(projectInfoHeader);
    projectInfoContainer.appendChild(projectDescription);

    projectContainer.appendChild(projectInfoContainer);

    return projectContainer
}

function displayExistingProject(projectToDisplayObject, projectTasksArray) {
    const projectContainerDisplayed = displayProject(projectToDisplayObject);
    const projectTasks = displayTasks(projectTasksArray, projectContainerDisplayed, false);
    return projectTasks
}

// this "module" re-loads the buttons and selectors every pageLoad with updated projectsCreated data
function projectButtonsAndSelectorsHandler(projectsCreatedArray) {
    const projectListHead = document.querySelector(`#project-list`);
    const addTaskProjectSelector = document.querySelector(`#project-associated`);
    const editTaskProjectSelector = document.querySelector(`#edit-project-associated`);
    const projectsArray = projectsCreatedArray;

    function removeExistingElements(projectList, addSelector, editSelector) {
        const arrayOfContainers = [projectList, addSelector, editSelector];

        arrayOfContainers.forEach( (container) => {
            while (container.firstChild) {
                container.removeChild(container.firstChild)
            }
        })
    }

    function appendProjectButtonsToProjectList() {

        projectsArray.forEach( (projectObject) => {
            const newProjectButton = document.createElement(`button`);
            newProjectButton.textContent = projectObject.projectTitle;
            newProjectButton.setAttribute(`id`, projectObject.projectTitle);
            newProjectButton.setAttribute(`data-index-number`, projectObject.projectIndex);
            newProjectButton.classList.add(`projectListButton`);
            
            projectListHead.appendChild(newProjectButton);
        })
    }

    function appendProjectsToSelectors() {
        const defaultProjectForAddTaskSelector = document.createElement(`option`);
        defaultProjectForAddTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForAddTaskSelector.textContent = `overview (default)`;
        addTaskProjectSelector.appendChild(defaultProjectForAddTaskSelector);
        
        const currentProjectAssociatedInEditModal = document.createElement(`option`);
        currentProjectAssociatedInEditModal.setAttribute(`id`, `existing-project`);
        const defaultProjectForEditTaskSelector = document.createElement(`option`);
        defaultProjectForEditTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForEditTaskSelector.textContent = `overview (default)`;

        editTaskProjectSelector.appendChild(currentProjectAssociatedInEditModal);
        editTaskProjectSelector.appendChild(defaultProjectForEditTaskSelector);
        
        projectsArray.forEach( (projectObject) => {
            const projectForAddTaskSelector = document.createElement(`option`);
            projectForAddTaskSelector.setAttribute(`value`, projectObject.projectTitle);
            projectForAddTaskSelector.textContent = projectObject.projectTitle;
            
            const projectForEditTaskSelector = document.createElement(`option`);
            projectForEditTaskSelector.setAttribute(`value`, projectObject.projectTitle);
            projectForEditTaskSelector.textContent = projectObject.projectTitle;
        
            addTaskProjectSelector.appendChild(projectForAddTaskSelector);
            editTaskProjectSelector.appendChild(projectForEditTaskSelector);
        })
    }
    removeExistingElements(projectListHead, addTaskProjectSelector, editTaskProjectSelector);
    appendProjectButtonsToProjectList();
    appendProjectsToSelectors();
}

export {
    loadMainContent,
}