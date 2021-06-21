/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dataModalHandler.js":
/*!*********************************!*\
  !*** ./src/dataModalHandler.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./objectDataManagement.js */ "./src/objectDataManagement.js");


// sets the default date in the addTask and addProject modals to today's date
Date.prototype.toDateInputValue = (function() {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0,10);
});
document.querySelector('#new-task-dateDue').value = new Date().toDateInputValue();    
document.querySelector('#new-project-dateDue').value = new Date().toDateInputValue();

// this section contains functions to open, close and submit addTask and addProject form modals
    const addTaskButton = document.querySelector(`#addTaskButton`);
    const addProjectButton = document.querySelector(`#addProjectButton`);
    addTaskButton.addEventListener(`click`, openNewObjectModal);
    addProjectButton.addEventListener(`click`, openNewObjectModal);
    
    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);
    
    function openNewObjectModal(e) {
        e.stopPropagation();
        const addObjectModal = document.querySelectorAll(`.modal`);
        if (e.target.id === `addTaskButton`) {
            addObjectModal[0].style.display = `block`;
        } else {
            addObjectModal[2].style.display = `block`;
        }
    }
    
    const submitProjectButton = document.querySelector(`#addProjectSubmitButton`);
    const submitTaskButton = document.querySelector(`#addTaskSubmitButton`);
    const cancelProjectButton = document.querySelector(`#cancelProject`);
    const cancelTaskButton = document.querySelector(`#cancelTask`);
    
    cancelProjectButton.addEventListener(`click`, (e) => closeNewObjectModal(e.target.id));
    cancelTaskButton.addEventListener(`click`, (e) => closeNewObjectModal(e.target.id));
    
    submitProjectButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(projectUserInput)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.instantiateNewProject)(projectUserInput);
            submitNewObjectForm(e);
        }
    })
    
    submitTaskButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(taskUserInput)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.instantiateNewTask)(taskUserInput);
            submitNewObjectForm(e);
        }
    })
    
    function submitNewObjectForm(event) {
        event.preventDefault();
        closeNewObjectModal(event.target.id);
    }
    
    function closeNewObjectModal(buttonID) {
        const modalToClose = document.querySelectorAll(`.modal`);
        const formToReset = document.querySelectorAll(`.formField`);
        if (buttonID === `addProjectSubmitButton` || buttonID === `cancelProject`) {
            modalToClose[2].style.display = `none`;
            formToReset[2].reset();
        } else {
            modalToClose[0].style.display = `none`;
            formToReset[0].reset();
        }
    }

// this section contains functions to open, close and submit editTask and editProject form modals
const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    e.stopPropagation();
    let currentPage = mainContainer.firstChild.firstChild.textContent;
    if (currentPage !== `overview`) {
        currentPage = mainContainer.firstChild.firstChild.firstChild.firstChild.firstChild.nextSibling.textContent;
    }
    if (e.target.className === `edit-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        openEditTaskModal(taskSelectedIndex, currentPage);
    } else if (e.target.className === `delete-task-btn`) {
        const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteTaskObject)(taskSelectedIndex, currentPage);
    } else if (e.target.className === `edit-project-btn`) {
        const projectSelectedTitle = e.target.parentNode.firstChild.lastChild.textContent;
        const projectSelectedIndex = e.target.parentElement.parentElement.parentElement.dataset.indexNumber;
        openEditProjectModal(projectSelectedTitle, projectSelectedIndex);
    } else if (e.target.className === `delete-project-btn`) {
        const projectSelectedTitle = e.target.parentNode.firstChild.lastChild.textContent;
        const projectSelectedIndex = e.target.parentElement.parentElement.parentElement.dataset.indexNumber;
        openDeleteProjectModal(projectSelectedTitle, projectSelectedIndex);
    }
});

function openEditTaskModal(taskToEditIndex, pageDisplayedTitle) {
    
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.getObjectArrays)();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    editTaskModal.style.display = `block`;
    
    // pre-populate the text inputs with existing data
    const editTaskInputs = document.querySelectorAll(`.editTaskInputs`);
    const prepopulateProjectInModal = document.querySelector(`#existing-project`);
    const prepopulatePriorityInModal = document.querySelector(`#existing-status`);
    editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
    editTaskInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
    editTaskInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
    editTaskInputs[2].textContent = currentObjectArray.tasks[taskToEditIndex].taskDescription;
    prepopulatePriorityInModal.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus}`)
    prepopulatePriorityInModal.textContent = `${currentObjectArray.tasks[taskToEditIndex].taskPriorityStatus} priority`;
    prepopulateProjectInModal.setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated}`);
    if (currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated === `default`) {
        prepopulateProjectInModal.textContent = `overview (${currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated})`;
    } else {
        prepopulateProjectInModal.textContent = currentObjectArray.tasks[taskToEditIndex].taskProjectAssociated;
    }
    
    const confirmTaskEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmTaskEdits.addEventListener(`click`, confirmTaskEditsHandler)
    
    function confirmTaskEditsHandler(e) {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editTaskInputs)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeTaskEdits)(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        }
    }
    
    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
    cancelTaskEdits.addEventListener(`click`, (e) => {
        confirmTaskEdits.removeEventListener(`click`, confirmTaskEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editTaskModal);
    });

}

function openEditProjectModal(projectToEditTitle, projectToEditIndex) {
    
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.getObjectArrays)();

    const editProjectModal = document.querySelector(`#editProjectModal`);
    editProjectModal.style.display = `block`;
    
    // pre-populate the edit form with existing data
    const editProjectInputs = document.querySelectorAll(`.editProjectInputs`);
    editProjectInputs[0].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectTitle}`);
    editProjectInputs[1].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDateDue}`);
    editProjectInputs[2].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDescription}`);
    editProjectInputs[2].textContent = currentObjectArray.projects[projectToEditIndex].projectDescription;
    
    const confirmProjectEdits = document.querySelector(`#editProjectSubmitButton`);
    confirmProjectEdits.addEventListener(`click`, confirmProjectEditsHandler)
    
    function confirmProjectEditsHandler(e) {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        e.stopPropagation();
        if (checkFormValidation(editProjectInputs)) {
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeProjectEdits)(editProjectInputs, projectToEditIndex, projectToEditTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        }
    }
    
    const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
    cancelProjectEdits.addEventListener(`click`, (e) => {
        confirmProjectEdits.removeEventListener(`click`, confirmProjectEditsHandler);
        e.preventDefault();
        closeEditOrDeleteModal(editProjectModal);
    })
    
}

function openDeleteProjectModal(projectToDeleteTitle, projectToDeleteIndex) {
    
    const deleteProjectModal = document.querySelector(`#confirmDeleteProject`)
    const deleteProjectMessage = document.querySelector(`#confirm-delete-text`);
    deleteProjectMessage.textContent = `Are you sure you want to delete the project "${projectToDeleteTitle}" and all of its tasks?`;
    
    const confirmDeleteButton = document.querySelector(`#confirmProjectDelete`);
    const cancelDeleteButton = document.querySelector(`#cancelProjectDelete`);
    
    confirmDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
        (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteProjectObject)(projectToDeleteTitle, projectToDeleteIndex);
    })
    
    cancelDeleteButton.addEventListener( `click`, (e) => {
        closeEditOrDeleteModal(deleteProjectModal);
    })
    
    deleteProjectModal.style.display = `block`;
}

function closeEditOrDeleteModal(modalToClose) {
    const formToReset = document.querySelectorAll(`.formField`);
    modalToClose.style.display = `none`;
    if (modalToClose === editTaskModal) {
        formToReset[1].reset();
    } else if (modalToClose === editProjectModal) {
        formToReset[3].reset();
    }
}

// this function validates both types of modals: add and edit
function checkFormValidation(inputNodeList) {
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
}

/***/ }),

/***/ "./src/objectDataManagement.js":
/*!*************************************!*\
  !*** ./src/objectDataManagement.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getObjectArrays": () => (/* binding */ getObjectArrays),
/* harmony export */   "instantiateNewTask": () => (/* binding */ instantiateNewTask),
/* harmony export */   "instantiateNewProject": () => (/* binding */ instantiateNewProject),
/* harmony export */   "finalizeTaskEdits": () => (/* binding */ finalizeTaskEdits),
/* harmony export */   "finalizeProjectEdits": () => (/* binding */ finalizeProjectEdits),
/* harmony export */   "deleteTaskObject": () => (/* binding */ deleteTaskObject),
/* harmony export */   "deleteProjectObject": () => (/* binding */ deleteProjectObject)
/* harmony export */ });
/* harmony import */ var _pageLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pageLoader.js */ "./src/pageLoader.js");


let projectsCreated = [
    {
        projectTitle: `todo list`,
        projectDateDue: `2021-06-20`,
        projectDescription: `this is a project for the odin project`,
        projectIndex: 0,
    },
    {
        projectTitle: `keep grinding`,
        projectDateDue: `2021-06-20`,
        projectDescription: `this is a test project for my buggy todo list app`,
        projectIndex: 1,
    },
];

let tasksCreated = [
    {
        taskTitle: `refactor code`,
        taskDateDue: `2021-06-20`,
        taskDescription: `clean it up, make logic more linear`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 0,
    },
    {
        taskTitle: `make progress`,
        taskDateDue: `2021-06-12`,
        taskDescription: `keep at it and stay positive`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 1,
    },
    {
        taskTitle: `do more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `do what you can, when you can`,
        taskPriorityStatus: `medium`,
        taskProjectAssociated: `default`,
        taskIndex: 2,
    },
    {
        taskTitle: `do even more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `carve out more time, if possible`,
        taskPriorityStatus: `low`,
        taskProjectAssociated: `keep grinding`,
        taskIndex: 3,
    }
];

function getObjectArrays() {
    const taskArrays = {
        projects: projectsCreated,
        tasks: tasksCreated
    }
    return taskArrays
}

class Project {
    constructor(projectTitle, projectDateDue, projectDescription, projectIndex) {
        this.projectTitle = projectTitle;
        this.projectDateDue = projectDateDue;
        this.projectDescription = projectDescription;
        this.projectIndex = projectIndex;
    }
}

class Task {
    constructor(taskTitle, taskDateDue, taskDescription, taskPriorityStatus, taskProjectAssociated, taskIndex) {
        this.taskTitle = taskTitle;
        this.taskDateDue = taskDateDue;
        this.taskDescription = taskDescription;
        this.taskPriorityStatus = taskPriorityStatus;
        this.taskProjectAssociated = taskProjectAssociated;
        this.taskIndex = taskIndex;
    }
}

function instantiateNewTask(newTaskModalInputs, pageToRefresh) {
    
    const newTaskInputArray = Array.from(newTaskModalInputs);
    const newTaskTitle = newTaskInputArray[0].value;
    const newTaskDateDue = newTaskInputArray[1].value;
    const newTaskDescription = newTaskInputArray[2].value;
    const newTaskPriorityStatus = newTaskInputArray[3].value;
    const newTaskProjectAssociated = newTaskInputArray[4].value;
    const newTaskIndex = tasksCreated.length;
    
    const newTask = new Task(newTaskTitle, newTaskDateDue, newTaskDescription, newTaskPriorityStatus, newTaskProjectAssociated, newTaskIndex);
    tasksCreated.push(newTask);

    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === newTaskProjectAssociated);
    const tasksToLoad = taskFilter(newTaskProjectAssociated);
    
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}
        
function instantiateNewProject(newProjectModalInputs) {
    const newProjectInputArray = Array.from(newProjectModalInputs);
    const newProjectTitle = newProjectInputArray[0].value;
    const newProjectDateDue = newProjectInputArray[1].value;
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);

    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, newProject, null, `new project`);
}

function finalizeTaskEdits(editModalInputs, targetIndex, currentPageDisplayed) {
    console.log(editModalInputs[0].value);
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = editModalInputs[1].value;
    const editedTaskDescription = editModalInputs[2].value;
    const editedTaskPriorityStatus = editModalInputs[3].value;
    const editedTaskProjectAssociated = editModalInputs[4].value;

    tasksCreated[targetIndex].taskTitle = editedTaskTitle;
    tasksCreated[targetIndex].taskDateDue = editedTaskDateDue;
    tasksCreated[targetIndex].taskDescription = editedTaskDescription;
    tasksCreated[targetIndex].taskPriorityStatus = editedTaskPriorityStatus;
    tasksCreated[targetIndex].taskProjectAssociated = editedTaskProjectAssociated;

    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}

function deleteTaskObject(indexOfTaskToDelete, currentPageDisplayed) {
    tasksCreated.splice(indexOfTaskToDelete, 1);
    updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed);
}

function updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed) {
    for (let i = indexOfTaskToDelete; i < tasksCreated.length; i++) {
        tasksCreated[i].taskIndex = i;
    }
    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}

function finalizeProjectEdits(editProjectModalInputs, targetProjectIndex, existingProjectTitle) {

    let tasksToLoad = null;
    const editedProjectTitle = editProjectModalInputs[0].value;
    const editedProjectDateDue = editProjectModalInputs[1].value;
    const editedProjectDescription = editProjectModalInputs[2].value;

    projectsCreated[targetProjectIndex].projectTitle = editedProjectTitle;
    projectsCreated[targetProjectIndex].projectDateDue = editedProjectDateDue;
    projectsCreated[targetProjectIndex].projectDescription = editedProjectDescription

    // if a project's title changes, this updates all associated tasks' taskProjectAssociated data to the new project title 
    if (editedProjectTitle !== existingProjectTitle) {
        tasksToLoad = taskFilter(existingProjectTitle);
        tasksToLoad.forEach( taskObject => {
            taskObject.taskProjectAssociated = editedProjectTitle;
        })
    } else {
        tasksToLoad = taskFilter(existingProjectTitle);
    }

    loadContentHelper(projectsCreated[targetProjectIndex], tasksToLoad);
}

function deleteProjectObject(projectToDeleteTitle, projectToDeleteIndex) {
    let taskIndexForDeletion = [];
    tasksCreated.filter( (object, index) => {
        if (object.taskProjectAssociated === projectToDeleteTitle) {
            taskIndexForDeletion.push(index);
        }
    })
    
    // deletes the tasks associated with the deleted project and updates the remaining task indices
    for (let i = taskIndexForDeletion.length; i >= 1; i--) {
        tasksCreated.splice(taskIndexForDeletion[i-1], 1);
        for (let j = i - 1; j < tasksCreated.length; j++) {
            tasksCreated[j].taskIndex = j;
        }
    }

    projectsCreated.splice(projectToDeleteIndex, 1);

    updateProjectIndex(projectToDeleteIndex);
}

function updateProjectIndex(indexOfDeletedProject) {
    for (let i = indexOfDeletedProject; i < projectsCreated.length; i++) {
        projectsCreated[i].projectIndex = i;
    }

    loadContentHelper(null, tasksCreated);
}

function taskFilter(projectAssociatedTitle) {
    let tasksAssociated = [];
    tasksCreated.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectAssociatedTitle) {
            tasksAssociated.push(taskObject);
        }
    })
    return tasksAssociated
}

function loadContentHelper(projectObjectToLoad, tasksArrayToLoad) {
    if (!projectObjectToLoad) {
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, null, tasksCreated, `overview`);
    } else {
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, projectObjectToLoad, tasksArrayToLoad, projectObjectToLoad.projectTitle);
    }
}



/***/ }),

/***/ "./src/pageLoader.js":
/*!***************************!*\
  !*** ./src/pageLoader.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadMainContent": () => (/* binding */ loadMainContent)
/* harmony export */ });
const mainContainer = document.querySelector(`#main-content`);

function loadMainContent(projectsArray, projectToLoad, tasksArray, pageToDisplay) {
    while (mainContainer.firstChild) {
        mainContainer.removeChild(mainContainer.firstChild)
    }
    if (pageToDisplay === `overview`) {
        const containerToDisplay = displayTasksOverview(tasksArray);
        mainContainer.appendChild(containerToDisplay);
    } else if (pageToDisplay === `new project`) {
        const containerToDisplay = displayProject(projectToLoad)
        mainContainer.appendChild(containerToDisplay);
    } else {
        const containerToDisplay = displayExistingProject(projectToLoad, tasksArray)
        mainContainer.appendChild(containerToDisplay);
    }
    projectButtonsAndSelectorsHandler(projectsArray)
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



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dataModalHandler_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dataModalHandler.js */ "./src/dataModalHandler.js");
/* harmony import */ var _objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./objectDataManagement.js */ "./src/objectDataManagement.js");
/* harmony import */ var _pageLoader_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./pageLoader.js */ "./src/pageLoader.js");




const navContainer = document.querySelector(`#nav-container`);
const projectButton = document.querySelector(`#project-button`);
const projectListContainer = document.querySelector(`#project-list`);

navContainer.addEventListener(`click`, pageSelector);
projectButton.addEventListener(`click`, (e) => console.log(e.target.textContent));
projectListContainer.addEventListener(`click`, (e) => {
    if (e.target.className === `projectListButton`) {
        projectSelector(e)
    }
});

const loadPage = (function() {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    const projectClickedTitle = e.target.textContent;
    const projectClickedIndex = e.target.dataset.indexNumber;

    let associatedTasksToLoad = [];
    currentObjectArray.tasks.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectClickedTitle) {
            associatedTasksToLoad.push(taskObject);
        }
    })

    ;(0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, currentObjectArray.projects[projectClickedIndex], associatedTasksToLoad, projectClickedTitle);
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxrRjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxZQUFZLCtFQUFxQjtBQUNqQztBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0EsWUFBWSw0RUFBa0I7QUFDOUI7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLDBFQUFnQjtBQUN4QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSwrQkFBK0IseUVBQWU7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msb0RBQW9EO0FBQ25HLCtDQUErQyxzREFBc0Q7QUFDckcsK0NBQStDLDBEQUEwRDtBQUN6RztBQUNBLHdEQUF3RCw2REFBNkQ7QUFDckgsZ0RBQWdELDZEQUE2RDtBQUM3Ryx1REFBdUQsZ0VBQWdFO0FBQ3ZIO0FBQ0EsNkRBQTZELGdFQUFnRTtBQUM3SCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyRUFBaUI7QUFDN0I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUEsK0JBQStCLHlFQUFlOztBQUU5QztBQUNBOztBQUVBO0FBQ0E7QUFDQSxrREFBa0QsNkRBQTZEO0FBQy9HLGtEQUFrRCwrREFBK0Q7QUFDakgsa0RBQWtELG1FQUFtRTtBQUNySDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBWSw4RUFBb0I7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLHVGQUF1RixxQkFBcUI7O0FBRTVHO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsNkVBQW1CO0FBQzNCLEtBQUs7O0FBRUw7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ3hOaUQ7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsSUFBSSwrREFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFDQUFxQyx5QkFBeUI7QUFDOUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVCxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw2Q0FBNkMsUUFBUTtBQUNyRDtBQUNBLDJCQUEyQix5QkFBeUI7QUFDcEQ7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx1Q0FBdUMsNEJBQTRCO0FBQ25FO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSwrREFBZTtBQUN2QixLQUFLO0FBQ0wsUUFBUSwrREFBZTtBQUN2QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDeE5BOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQsZ0NBQWdDO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsMkJBQTJCO0FBQ3JGO0FBQ0E7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLHFEQUFxRCxpQ0FBaUM7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDak5BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDcUI7QUFDVjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUMsSUFBSSwrREFBZTtBQUNuQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5RUFBZTtBQUNsRCxRQUFRLCtEQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLGdFQUFlO0FBQ25CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE9iamVjdEFycmF5cywgaW5zdGFudGlhdGVOZXdUYXNrLCBpbnN0YW50aWF0ZU5ld1Byb2plY3QsIGZpbmFsaXplVGFza0VkaXRzLCBmaW5hbGl6ZVByb2plY3RFZGl0cywgZGVsZXRlVGFza09iamVjdCwgZGVsZXRlUHJvamVjdE9iamVjdCB9IGZyb20gJy4vb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMnXG5cbi8vIHNldHMgdGhlIGRlZmF1bHQgZGF0ZSBpbiB0aGUgYWRkVGFzayBhbmQgYWRkUHJvamVjdCBtb2RhbHMgdG8gdG9kYXkncyBkYXRlXG5EYXRlLnByb3RvdHlwZS50b0RhdGVJbnB1dFZhbHVlID0gKGZ1bmN0aW9uKCkge1xuICAgIHZhciBsb2NhbCA9IG5ldyBEYXRlKHRoaXMpO1xuICAgIGxvY2FsLnNldE1pbnV0ZXModGhpcy5nZXRNaW51dGVzKCkgLSB0aGlzLmdldFRpbWV6b25lT2Zmc2V0KCkpO1xuICAgIHJldHVybiBsb2NhbC50b0pTT04oKS5zbGljZSgwLDEwKTtcbn0pO1xuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI25ldy10YXNrLWRhdGVEdWUnKS52YWx1ZSA9IG5ldyBEYXRlKCkudG9EYXRlSW5wdXRWYWx1ZSgpOyAgICBcbmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNuZXctcHJvamVjdC1kYXRlRHVlJykudmFsdWUgPSBuZXcgRGF0ZSgpLnRvRGF0ZUlucHV0VmFsdWUoKTtcblxuLy8gdGhpcyBzZWN0aW9uIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGFkZFRhc2sgYW5kIGFkZFByb2plY3QgZm9ybSBtb2RhbHNcbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tCdXR0b25gKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFByb2plY3RCdXR0b25gKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcbiAgICBcbiAgICBjb25zdCBwcm9qZWN0VXNlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnByb2plY3RVc2VySW5wdXRzYCk7XG4gICAgY29uc3QgdGFza1VzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC50YXNrVXNlcklucHV0c2ApO1xuICAgIFxuICAgIGZ1bmN0aW9uIG9wZW5OZXdPYmplY3RNb2RhbChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGFkZE9iamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1vZGFsYCk7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gYGFkZFRhc2tCdXR0b25gKSB7XG4gICAgICAgICAgICBhZGRPYmplY3RNb2RhbFswXS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE9iamVjdE1vZGFsWzJdLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHN1Ym1pdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkUHJvamVjdFN1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbnN0IHN1Ym1pdFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkVGFza1N1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdGApO1xuICAgIGNvbnN0IGNhbmNlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsVGFza2ApO1xuICAgIFxuICAgIGNhbmNlbFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY2xvc2VOZXdPYmplY3RNb2RhbChlLnRhcmdldC5pZCkpO1xuICAgIGNhbmNlbFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY2xvc2VOZXdPYmplY3RNb2RhbChlLnRhcmdldC5pZCkpO1xuICAgIFxuICAgIHN1Ym1pdFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbihwcm9qZWN0VXNlcklucHV0KSkge1xuICAgICAgICAgICAgaW5zdGFudGlhdGVOZXdQcm9qZWN0KHByb2plY3RVc2VySW5wdXQpO1xuICAgICAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgc3VibWl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKHRhc2tVc2VySW5wdXQpKSB7XG4gICAgICAgICAgICBpbnN0YW50aWF0ZU5ld1Rhc2sodGFza1VzZXJJbnB1dCk7XG4gICAgICAgICAgICBzdWJtaXROZXdPYmplY3RGb3JtKGUpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBmdW5jdGlvbiBzdWJtaXROZXdPYmplY3RGb3JtKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlTmV3T2JqZWN0TW9kYWwoZXZlbnQudGFyZ2V0LmlkKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2xvc2VOZXdPYmplY3RNb2RhbChidXR0b25JRCkge1xuICAgICAgICBjb25zdCBtb2RhbFRvQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxgKTtcbiAgICAgICAgY29uc3QgZm9ybVRvUmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZm9ybUZpZWxkYCk7XG4gICAgICAgIGlmIChidXR0b25JRCA9PT0gYGFkZFByb2plY3RTdWJtaXRCdXR0b25gIHx8IGJ1dHRvbklEID09PSBgY2FuY2VsUHJvamVjdGApIHtcbiAgICAgICAgICAgIG1vZGFsVG9DbG9zZVsyXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMl0ucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGFsVG9DbG9zZVswXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMF0ucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuLy8gdGhpcyBzZWN0aW9uIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGVkaXRUYXNrIGFuZCBlZGl0UHJvamVjdCBmb3JtIG1vZGFsc1xuY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcbm1haW5Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgbGV0IGN1cnJlbnRQYWdlID0gbWFpbkNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgaWYgKGN1cnJlbnRQYWdlICE9PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGN1cnJlbnRQYWdlID0gbWFpbkNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgfVxuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBlZGl0LXRhc2stYnRuYCkge1xuICAgICAgICBjb25zdCB0YXNrU2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkVkaXRUYXNrTW9kYWwodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGRlbGV0ZS10YXNrLWJ0bmApIHtcbiAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIGRlbGV0ZVRhc2tPYmplY3QodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGVkaXQtcHJvamVjdC1idG5gKSB7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5maXJzdENoaWxkLmxhc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICBvcGVuRWRpdFByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXByb2plY3QtYnRuYCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZC5sYXN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgIH1cbn0pO1xuXG5mdW5jdGlvbiBvcGVuRWRpdFRhc2tNb2RhbCh0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSkge1xuICAgIFxuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIFxuICAgIGNvbnN0IGVkaXRUYXNrTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRhc2tNb2RhbGApO1xuICAgIGVkaXRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgXG4gICAgLy8gcHJlLXBvcHVsYXRlIHRoZSB0ZXh0IGlucHV0cyB3aXRoIGV4aXN0aW5nIGRhdGFcbiAgICBjb25zdCBlZGl0VGFza0lucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0VGFza0lucHV0c2ApO1xuICAgIGNvbnN0IHByZXBvcHVsYXRlUHJvamVjdEluTW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZXhpc3RpbmctcHJvamVjdGApO1xuICAgIGNvbnN0IHByZXBvcHVsYXRlUHJpb3JpdHlJbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V4aXN0aW5nLXN0YXR1c2ApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrVGl0bGV9YCk7XG4gICAgZWRpdFRhc2tJbnB1dHNbMV0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tEYXRlRHVlfWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb259YCk7XG4gICAgZWRpdFRhc2tJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb247XG4gICAgcHJlcG9wdWxhdGVQcmlvcml0eUluTW9kYWwuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcmlvcml0eVN0YXR1c31gKVxuICAgIHByZXBvcHVsYXRlUHJpb3JpdHlJbk1vZGFsLnRleHRDb250ZW50ID0gYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1ByaW9yaXR5U3RhdHVzfSBwcmlvcml0eWA7XG4gICAgcHJlcG9wdWxhdGVQcm9qZWN0SW5Nb2RhbC5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkfWApO1xuICAgIGlmIChjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IGBkZWZhdWx0YCkge1xuICAgICAgICBwcmVwb3B1bGF0ZVByb2plY3RJbk1vZGFsLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3ICgke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZH0pYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBwcmVwb3B1bGF0ZVByb2plY3RJbk1vZGFsLnRleHRDb250ZW50ID0gY3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgIH1cbiAgICBcbiAgICBjb25zdCBjb25maXJtVGFza0VkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrU3VibWl0QnV0dG9uYCk7XG4gICAgY29uZmlybVRhc2tFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1UYXNrRWRpdHNIYW5kbGVyKVxuICAgIFxuICAgIGZ1bmN0aW9uIGNvbmZpcm1UYXNrRWRpdHNIYW5kbGVyKGUpIHtcbiAgICAgICAgY29uZmlybVRhc2tFZGl0cy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1UYXNrRWRpdHNIYW5kbGVyKTtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24oZWRpdFRhc2tJbnB1dHMpKSB7XG4gICAgICAgICAgICBmaW5hbGl6ZVRhc2tFZGl0cyhlZGl0VGFza0lucHV0cywgdGFza1RvRWRpdEluZGV4LCBwYWdlRGlzcGxheWVkVGl0bGUpO1xuICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0VGFza01vZGFsKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBcbiAgICBjb25zdCBjYW5jZWxUYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsVGFza0VkaXRgKTtcbiAgICBjYW5jZWxUYXNrRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBjb25maXJtVGFza0VkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgfSk7XG5cbn1cblxuZnVuY3Rpb24gb3BlbkVkaXRQcm9qZWN0TW9kYWwocHJvamVjdFRvRWRpdFRpdGxlLCBwcm9qZWN0VG9FZGl0SW5kZXgpIHtcbiAgICBcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcblxuICAgIGNvbnN0IGVkaXRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFByb2plY3RNb2RhbGApO1xuICAgIGVkaXRQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgXG4gICAgLy8gcHJlLXBvcHVsYXRlIHRoZSBlZGl0IGZvcm0gd2l0aCBleGlzdGluZyBkYXRhXG4gICAgY29uc3QgZWRpdFByb2plY3RJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZWRpdFByb2plY3RJbnB1dHNgKTtcbiAgICBlZGl0UHJvamVjdElucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdFRpdGxlfWApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGF0ZUR1ZX1gKTtcbiAgICBlZGl0UHJvamVjdElucHV0c1syXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdERlc2NyaXB0aW9ufWApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzJdLnRleHRDb250ZW50ID0gY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdERlc2NyaXB0aW9uO1xuICAgIFxuICAgIGNvbnN0IGNvbmZpcm1Qcm9qZWN0RWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFByb2plY3RTdWJtaXRCdXR0b25gKTtcbiAgICBjb25maXJtUHJvamVjdEVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVByb2plY3RFZGl0c0hhbmRsZXIpXG4gICAgXG4gICAgZnVuY3Rpb24gY29uZmlybVByb2plY3RFZGl0c0hhbmRsZXIoZSkge1xuICAgICAgICBjb25maXJtUHJvamVjdEVkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVByb2plY3RFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbihlZGl0UHJvamVjdElucHV0cykpIHtcbiAgICAgICAgICAgIGZpbmFsaXplUHJvamVjdEVkaXRzKGVkaXRQcm9qZWN0SW5wdXRzLCBwcm9qZWN0VG9FZGl0SW5kZXgsIHByb2plY3RUb0VkaXRUaXRsZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRQcm9qZWN0TW9kYWwpO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IGNhbmNlbFByb2plY3RFZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0RWRpdGApO1xuICAgIGNhbmNlbFByb2plY3RFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcik7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0UHJvamVjdE1vZGFsKTtcbiAgICB9KVxuICAgIFxufVxuXG5mdW5jdGlvbiBvcGVuRGVsZXRlUHJvamVjdE1vZGFsKHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCkge1xuICAgIFxuICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtRGVsZXRlUHJvamVjdGApXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdE1lc3NhZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybS1kZWxldGUtdGV4dGApO1xuICAgIGRlbGV0ZVByb2plY3RNZXNzYWdlLnRleHRDb250ZW50ID0gYEFyZSB5b3Ugc3VyZSB5b3Ugd2FudCB0byBkZWxldGUgdGhlIHByb2plY3QgXCIke3Byb2plY3RUb0RlbGV0ZVRpdGxlfVwiIGFuZCBhbGwgb2YgaXRzIHRhc2tzP2A7XG4gICAgXG4gICAgY29uc3QgY29uZmlybURlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtUHJvamVjdERlbGV0ZWApO1xuICAgIGNvbnN0IGNhbmNlbERlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0RGVsZXRlYCk7XG4gICAgXG4gICAgY29uZmlybURlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCBgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGRlbGV0ZVByb2plY3RNb2RhbCk7XG4gICAgICAgIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbiAgICB9KVxuICAgIFxuICAgIGNhbmNlbERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCBgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGRlbGV0ZVByb2plY3RNb2RhbCk7XG4gICAgfSlcbiAgICBcbiAgICBkZWxldGVQcm9qZWN0TW9kYWwuc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG59XG5cbmZ1bmN0aW9uIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwobW9kYWxUb0Nsb3NlKSB7XG4gICAgY29uc3QgZm9ybVRvUmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZm9ybUZpZWxkYCk7XG4gICAgbW9kYWxUb0Nsb3NlLnN0eWxlLmRpc3BsYXkgPSBgbm9uZWA7XG4gICAgaWYgKG1vZGFsVG9DbG9zZSA9PT0gZWRpdFRhc2tNb2RhbCkge1xuICAgICAgICBmb3JtVG9SZXNldFsxXS5yZXNldCgpO1xuICAgIH0gZWxzZSBpZiAobW9kYWxUb0Nsb3NlID09PSBlZGl0UHJvamVjdE1vZGFsKSB7XG4gICAgICAgIGZvcm1Ub1Jlc2V0WzNdLnJlc2V0KCk7XG4gICAgfVxufVxuXG4vLyB0aGlzIGZ1bmN0aW9uIHZhbGlkYXRlcyBib3RoIHR5cGVzIG9mIG1vZGFsczogYWRkIGFuZCBlZGl0XG5mdW5jdGlvbiBjaGVja0Zvcm1WYWxpZGF0aW9uKGlucHV0Tm9kZUxpc3QpIHtcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgaW5wdXROb2RlTGlzdC5mb3JFYWNoKCBpbnB1dEZpZWxkID0+IHtcbiAgICAgICAgaWYgKGlucHV0RmllbGQudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc1ZhbGlkXG59IiwiaW1wb3J0IHsgbG9hZE1haW5Db250ZW50IH0gZnJvbSAnLi9wYWdlTG9hZGVyLmpzJ1xuXG5sZXQgcHJvamVjdHNDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgcHJvamVjdFRpdGxlOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgcHJvamVjdERhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHByb2plY3QgZm9yIHRoZSBvZGluIHByb2plY3RgLFxuICAgICAgICBwcm9qZWN0SW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb2plY3RUaXRsZTogYGtlZXAgZ3JpbmRpbmdgLFxuICAgICAgICBwcm9qZWN0RGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdCBwcm9qZWN0IGZvciBteSBidWdneSB0b2RvIGxpc3QgYXBwYCxcbiAgICAgICAgcHJvamVjdEluZGV4OiAxLFxuICAgIH0sXG5dO1xuXG5sZXQgdGFza3NDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgcmVmYWN0b3IgY29kZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYGNsZWFuIGl0IHVwLCBtYWtlIGxvZ2ljIG1vcmUgbGluZWFyYCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgbWFrZSBwcm9ncmVzc2AsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xMmAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYGtlZXAgYXQgaXQgYW5kIHN0YXkgcG9zaXRpdmVgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBoaWdoYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgdGFza0luZGV4OiAxLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGBkbyBtb3JlYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTEzYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgZG8gd2hhdCB5b3UgY2FuLCB3aGVuIHlvdSBjYW5gLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBtZWRpdW1gLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGBkZWZhdWx0YCxcbiAgICAgICAgdGFza0luZGV4OiAyLFxuICAgIH0sXG4gICAge1xuICAgICAgICB0YXNrVGl0bGU6IGBkbyBldmVuIG1vcmVgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMTNgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGBjYXJ2ZSBvdXQgbW9yZSB0aW1lLCBpZiBwb3NzaWJsZWAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGxvd2AsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYGtlZXAgZ3JpbmRpbmdgLFxuICAgICAgICB0YXNrSW5kZXg6IDMsXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0T2JqZWN0QXJyYXlzKCkge1xuICAgIGNvbnN0IHRhc2tBcnJheXMgPSB7XG4gICAgICAgIHByb2plY3RzOiBwcm9qZWN0c0NyZWF0ZWQsXG4gICAgICAgIHRhc2tzOiB0YXNrc0NyZWF0ZWRcbiAgICB9XG4gICAgcmV0dXJuIHRhc2tBcnJheXNcbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdFRpdGxlLCBwcm9qZWN0RGF0ZUR1ZSwgcHJvamVjdERlc2NyaXB0aW9uLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGU7XG4gICAgICAgIHRoaXMucHJvamVjdERhdGVEdWUgPSBwcm9qZWN0RGF0ZUR1ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGVzY3JpcHRpb24gPSBwcm9qZWN0RGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgIH1cbn1cblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGF0ZUR1ZSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrUHJpb3JpdHlTdGF0dXMsIHRhc2tQcm9qZWN0QXNzb2NpYXRlZCwgdGFza0luZGV4KSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlO1xuICAgICAgICB0aGlzLnRhc2tEYXRlRHVlID0gdGFza0RhdGVEdWU7XG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRhc2tQcmlvcml0eVN0YXR1cyA9IHRhc2tQcmlvcml0eVN0YXR1cztcbiAgICAgICAgdGhpcy50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSB0YXNrUHJvamVjdEFzc29jaWF0ZWQ7XG4gICAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFudGlhdGVOZXdUYXNrKG5ld1Rhc2tNb2RhbElucHV0cywgcGFnZVRvUmVmcmVzaCkge1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2tJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdUYXNrTW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Rhc2tUaXRsZSA9IG5ld1Rhc2tJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlRHVlID0gbmV3VGFza0lucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0Rlc2NyaXB0aW9uID0gbmV3VGFza0lucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1ByaW9yaXR5U3RhdHVzID0gbmV3VGFza0lucHV0QXJyYXlbM10udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkID0gbmV3VGFza0lucHV0QXJyYXlbNF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0luZGV4ID0gdGFza3NDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmV3VGFza1RpdGxlLCBuZXdUYXNrRGF0ZUR1ZSwgbmV3VGFza0Rlc2NyaXB0aW9uLCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMsIG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCwgbmV3VGFza0luZGV4KTtcbiAgICB0YXNrc0NyZWF0ZWQucHVzaChuZXdUYXNrKTtcblxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cbiAgICAgICAgXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Byb2plY3QobmV3UHJvamVjdE1vZGFsSW5wdXRzKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdElucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Byb2plY3RNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERhdGVEdWUgPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0SW5kZXggPSBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChuZXdQcm9qZWN0VGl0bGUsIG5ld1Byb2plY3REYXRlRHVlLCBuZXdQcm9qZWN0RGVzY3JpcHRpb24sIG5ld1Byb2plY3RJbmRleCk7XG4gICAgcHJvamVjdHNDcmVhdGVkLnB1c2gobmV3UHJvamVjdCk7XG5cbiAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBuZXdQcm9qZWN0LCBudWxsLCBgbmV3IHByb2plY3RgKTtcbn1cblxuZnVuY3Rpb24gZmluYWxpemVUYXNrRWRpdHMoZWRpdE1vZGFsSW5wdXRzLCB0YXJnZXRJbmRleCwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBjb25zb2xlLmxvZyhlZGl0TW9kYWxJbnB1dHNbMF0udmFsdWUpO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tUaXRsZSA9IGVkaXRNb2RhbElucHV0c1swXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGF0ZUR1ZSA9IGVkaXRNb2RhbElucHV0c1sxXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrRGVzY3JpcHRpb24gPSBlZGl0TW9kYWxJbnB1dHNbMl0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza1ByaW9yaXR5U3RhdHVzID0gZWRpdE1vZGFsSW5wdXRzWzNdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRNb2RhbElucHV0c1s0XS52YWx1ZTtcblxuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1RpdGxlID0gZWRpdGVkVGFza1RpdGxlO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza0RhdGVEdWUgPSBlZGl0ZWRUYXNrRGF0ZUR1ZTtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tEZXNjcmlwdGlvbiA9IGVkaXRlZFRhc2tEZXNjcmlwdGlvbjtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tQcmlvcml0eVN0YXR1cyA9IGVkaXRlZFRhc2tQcmlvcml0eVN0YXR1cztcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRlZFRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcblxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlVGFza09iamVjdChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIHRhc2tzQ3JlYXRlZC5zcGxpY2UoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgMSk7XG4gICAgdXBkYXRlVGFza0luZGV4KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVGFza0luZGV4KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4T2ZUYXNrVG9EZWxldGU7IGkgPCB0YXNrc0NyZWF0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgdGFza3NDcmVhdGVkW2ldLnRhc2tJbmRleCA9IGk7XG4gICAgfVxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cblxuZnVuY3Rpb24gZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RNb2RhbElucHV0cywgdGFyZ2V0UHJvamVjdEluZGV4LCBleGlzdGluZ1Byb2plY3RUaXRsZSkge1xuXG4gICAgbGV0IHRhc2tzVG9Mb2FkID0gbnVsbDtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0VGl0bGUgPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzBdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3REYXRlRHVlID0gZWRpdFByb2plY3RNb2RhbElucHV0c1sxXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0RGVzY3JpcHRpb24gPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzJdLnZhbHVlO1xuXG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdFRpdGxlID0gZWRpdGVkUHJvamVjdFRpdGxlO1xuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3REYXRlRHVlID0gZWRpdGVkUHJvamVjdERhdGVEdWU7XG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdERlc2NyaXB0aW9uID0gZWRpdGVkUHJvamVjdERlc2NyaXB0aW9uXG5cbiAgICAvLyBpZiBhIHByb2plY3QncyB0aXRsZSBjaGFuZ2VzLCB0aGlzIHVwZGF0ZXMgYWxsIGFzc29jaWF0ZWQgdGFza3MnIHRhc2tQcm9qZWN0QXNzb2NpYXRlZCBkYXRhIHRvIHRoZSBuZXcgcHJvamVjdCB0aXRsZSBcbiAgICBpZiAoZWRpdGVkUHJvamVjdFRpdGxlICE9PSBleGlzdGluZ1Byb2plY3RUaXRsZSkge1xuICAgICAgICB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoZXhpc3RpbmdQcm9qZWN0VGl0bGUpO1xuICAgICAgICB0YXNrc1RvTG9hZC5mb3JFYWNoKCB0YXNrT2JqZWN0ID0+IHtcbiAgICAgICAgICAgIHRhc2tPYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdGVkUHJvamVjdFRpdGxlO1xuICAgICAgICB9KVxuICAgIH0gZWxzZSB7XG4gICAgICAgIHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihleGlzdGluZ1Byb2plY3RUaXRsZSk7XG4gICAgfVxuXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0sIHRhc2tzVG9Mb2FkKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUHJvamVjdE9iamVjdChwcm9qZWN0VG9EZWxldGVUaXRsZSwgcHJvamVjdFRvRGVsZXRlSW5kZXgpIHtcbiAgICBsZXQgdGFza0luZGV4Rm9yRGVsZXRpb24gPSBbXTtcbiAgICB0YXNrc0NyZWF0ZWQuZmlsdGVyKCAob2JqZWN0LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAob2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdFRvRGVsZXRlVGl0bGUpIHtcbiAgICAgICAgICAgIHRhc2tJbmRleEZvckRlbGV0aW9uLnB1c2goaW5kZXgpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbiAgICAvLyBkZWxldGVzIHRoZSB0YXNrcyBhc3NvY2lhdGVkIHdpdGggdGhlIGRlbGV0ZWQgcHJvamVjdCBhbmQgdXBkYXRlcyB0aGUgcmVtYWluaW5nIHRhc2sgaW5kaWNlc1xuICAgIGZvciAobGV0IGkgPSB0YXNrSW5kZXhGb3JEZWxldGlvbi5sZW5ndGg7IGkgPj0gMTsgaS0tKSB7XG4gICAgICAgIHRhc2tzQ3JlYXRlZC5zcGxpY2UodGFza0luZGV4Rm9yRGVsZXRpb25baS0xXSwgMSk7XG4gICAgICAgIGZvciAobGV0IGogPSBpIC0gMTsgaiA8IHRhc2tzQ3JlYXRlZC5sZW5ndGg7IGorKykge1xuICAgICAgICAgICAgdGFza3NDcmVhdGVkW2pdLnRhc2tJbmRleCA9IGo7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcm9qZWN0c0NyZWF0ZWQuc3BsaWNlKHByb2plY3RUb0RlbGV0ZUluZGV4LCAxKTtcblxuICAgIHVwZGF0ZVByb2plY3RJbmRleChwcm9qZWN0VG9EZWxldGVJbmRleCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVByb2plY3RJbmRleChpbmRleE9mRGVsZXRlZFByb2plY3QpIHtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhPZkRlbGV0ZWRQcm9qZWN0OyBpIDwgcHJvamVjdHNDcmVhdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHByb2plY3RzQ3JlYXRlZFtpXS5wcm9qZWN0SW5kZXggPSBpO1xuICAgIH1cblxuICAgIGxvYWRDb250ZW50SGVscGVyKG51bGwsIHRhc2tzQ3JlYXRlZCk7XG59XG5cbmZ1bmN0aW9uIHRhc2tGaWx0ZXIocHJvamVjdEFzc29jaWF0ZWRUaXRsZSkge1xuICAgIGxldCB0YXNrc0Fzc29jaWF0ZWQgPSBbXTtcbiAgICB0YXNrc0NyZWF0ZWQuZmlsdGVyKCAodGFza09iamVjdCkgPT4ge1xuICAgICAgICBpZiAodGFza09iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IHByb2plY3RBc3NvY2lhdGVkVGl0bGUpIHtcbiAgICAgICAgICAgIHRhc2tzQXNzb2NpYXRlZC5wdXNoKHRhc2tPYmplY3QpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gdGFza3NBc3NvY2lhdGVkXG59XG5cbmZ1bmN0aW9uIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RPYmplY3RUb0xvYWQsIHRhc2tzQXJyYXlUb0xvYWQpIHtcbiAgICBpZiAoIXByb2plY3RPYmplY3RUb0xvYWQpIHtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgbnVsbCwgdGFza3NDcmVhdGVkLCBgb3ZlcnZpZXdgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBwcm9qZWN0T2JqZWN0VG9Mb2FkLCB0YXNrc0FycmF5VG9Mb2FkLCBwcm9qZWN0T2JqZWN0VG9Mb2FkLnByb2plY3RUaXRsZSk7XG4gICAgfVxufVxuXG5leHBvcnQge1xuICAgIGdldE9iamVjdEFycmF5cyxcbiAgICBpbnN0YW50aWF0ZU5ld1Rhc2ssXG4gICAgaW5zdGFudGlhdGVOZXdQcm9qZWN0LFxuICAgIGZpbmFsaXplVGFza0VkaXRzLFxuICAgIGZpbmFsaXplUHJvamVjdEVkaXRzLFxuICAgIGRlbGV0ZVRhc2tPYmplY3QsXG4gICAgZGVsZXRlUHJvamVjdE9iamVjdCxcbn0iLCJjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI21haW4tY29udGVudGApO1xuXG5mdW5jdGlvbiBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNBcnJheSwgcHJvamVjdFRvTG9hZCwgdGFza3NBcnJheSwgcGFnZVRvRGlzcGxheSkge1xuICAgIHdoaWxlIChtYWluQ29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgbWFpbkNvbnRhaW5lci5yZW1vdmVDaGlsZChtYWluQ29udGFpbmVyLmZpcnN0Q2hpbGQpXG4gICAgfVxuICAgIGlmIChwYWdlVG9EaXNwbGF5ID09PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlUYXNrc092ZXJ2aWV3KHRhc2tzQXJyYXkpO1xuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclRvRGlzcGxheSk7XG4gICAgfSBlbHNlIGlmIChwYWdlVG9EaXNwbGF5ID09PSBgbmV3IHByb2plY3RgKSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3RUb0xvYWQpXG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5RXhpc3RpbmdQcm9qZWN0KHByb2plY3RUb0xvYWQsIHRhc2tzQXJyYXkpXG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9XG4gICAgcHJvamVjdEJ1dHRvbnNBbmRTZWxlY3RvcnNIYW5kbGVyKHByb2plY3RzQXJyYXkpXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrc092ZXJ2aWV3KGFycmF5T2ZUYXNrT2JqZWN0cykge1xuICAgIGNvbnN0IG92ZXJ2aWV3Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3Qgb3ZlcnZpZXdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgb3ZlcnZpZXdUaXRsZS50ZXh0Q29udGVudCA9IGBvdmVydmlld2A7XG4gICAgb3ZlcnZpZXdUaXRsZS5zZXRBdHRyaWJ1dGUoYGlkYCwgYG92ZXJ2aWV3LWhlYWRlcmApO1xuICAgIG92ZXJ2aWV3Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtY29udGFpbmVyYCk7XG4gICAgb3ZlcnZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcnZpZXdUaXRsZSk7XG4gICAgXG4gICAgY29uc3QgdGFza3NUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3MoYXJyYXlPZlRhc2tPYmplY3RzLCBvdmVydmlld0NvbnRhaW5lciwgdHJ1ZSlcbiAgICBcbiAgICByZXR1cm4gdGFza3NUb0Rpc3BsYXlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKGFycmF5T2ZUYXNrT2JqZWN0cywgY29udGFpbmVyLCB0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICBjb25zdCBhbGxUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGFsbFRhc2tzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtdGFza3MtY29udGFpbmVyYCk7XG5cbiAgICBjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgdGFza0hlYWRlci5zZXRBdHRyaWJ1dGUoYGlkYCwgYHRhc2staGVhZGVyYCk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgY29uc3QgaGVhZGVyRHVlRGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJEZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJQcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBoZWFkZXJUaXRsZUxhYmVsLnRleHRDb250ZW50ID0gYHRhc2tgO1xuICAgIGhlYWRlckR1ZURhdGVMYWJlbC50ZXh0Q29udGVudCA9IGBkdWUgZGF0ZWA7XG4gICAgaGVhZGVyRGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9IGBkZXNjcmlwdGlvbmA7XG4gICAgaGVhZGVyUHJpb3JpdHlMYWJlbC50ZXh0Q29udGVudCA9IGBwcmlvcml0eWA7XG4gICAgaGVhZGVyUHJvamVjdEFzc29jaWF0ZWRMYWJlbC50ZXh0Q29udGVudCA9IGBhc3NvY2lhdGVkIHByb2plY3RgO1xuXG4gICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUaXRsZUxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlckR1ZURhdGVMYWJlbCk7XG4gICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJEZXNjcmlwdGlvbkxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclByaW9yaXR5TGFiZWwpO1xuICAgIGlmICh0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICAgICAgdGFza0hlYWRlci5zZXRBdHRyaWJ1dGUoYGlkYCwgYG92ZXJ2aWV3LXRhc2staGVhZGVyYCk7XG4gICAgICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJvamVjdEFzc29jaWF0ZWRMYWJlbCk7XG4gICAgfVxuXG4gICAgYWxsVGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU9mVGFza09iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV3VGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNGApO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrUHJpb3JpdHlTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgY29uc3QgdGFza0RlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGB0YXNrLWNvbnRhaW5lcmApO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLnNldEF0dHJpYnV0ZShgZGF0YS1pbmRleC1udW1iZXJgLCBgJHthcnJheU9mVGFza09iamVjdHNbaV0udGFza0luZGV4fWApO1xuICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1RpdGxlO1xuICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrRGF0ZUR1ZTtcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEZXNjcmlwdGlvbjtcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tQcmlvcml0eVN0YXR1cztcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24udGV4dENvbnRlbnQgPSBgZWRpdGA7XG4gICAgICAgIHRhc2tFZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoYGVkaXQtdGFzay1idG5gKTtcbiAgICAgICAgdGFza0RlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IGBkZWxldGVgO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGRlbGV0ZS10YXNrLWJ0bmApO1xuXG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlTdGF0dXMpO1xuICAgICAgICBpZiAodG9EaXNwbGF5UHJvamVjdEFzc29jaWF0aW9uKSB7XG4gICAgICAgICAgICBuZXdUYXNrQ29udGFpbmVyLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctdGFzay1jb250YWluZXJgKTtcbiAgICAgICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFZGl0QnV0dG9uKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVsZXRlQnV0dG9uKTtcblxuICAgICAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFsbFRhc2tzQ29udGFpbmVyKTtcbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3RPYmplY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdEluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mb0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgbGFiZWxgKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoMmApO1xuICAgIGNvbnN0IHByb2plY3REdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgIGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgIGNvbnN0IHByb2plY3REZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICBcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtY29udGFpbmVyYCk7XG4gICAgcHJvamVjdEluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1pbmZvLWNvbnRhaW5lcmApO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtaW5mby1oZWFkZXJgKTtcbiAgICBwcm9qZWN0VGl0bGVMYWJlbC5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LXRpdGxlLWhlYWRlcmApO1xuICAgIHByb2plY3REdWVEYXRlLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtZGF0ZS1kdWVgKTtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kZXNjcmlwdGlvbmApO1xuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke3Byb2plY3RPYmplY3QucHJvamVjdEluZGV4fWApO1xuICAgIHByb2plY3RUaXRsZUxhYmVsLnRleHRDb250ZW50ID0gYHByb2plY3Q6YDtcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICBwcm9qZWN0RHVlRGF0ZS50ZXh0Q29udGVudCA9IGBkdWU6ICR7cHJvamVjdE9iamVjdC5wcm9qZWN0RGF0ZUR1ZX1gO1xuICAgIHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGBkZXNjcmlwdGlvbjogJHtwcm9qZWN0T2JqZWN0LnByb2plY3REZXNjcmlwdGlvbn1gO1xuICAgIHByb2plY3RFZGl0QnV0dG9uLnRleHRDb250ZW50ID0gYGVkaXQgcHJvamVjdGA7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IGBkZWxldGUgcHJvamVjdGA7XG4gICAgcHJvamVjdEVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC1wcm9qZWN0LWJ0bmApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXByb2plY3QtYnRuYCk7XG5cbiAgICBwcm9qZWN0VGl0bGVMYWJlbC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuXG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlTGFiZWwpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3REdWVEYXRlKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEJ1dHRvbik7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG5cbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SW5mb0hlYWRlcik7XG4gICAgcHJvamVjdEluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEluZm9Db250YWluZXIpO1xuXG4gICAgcmV0dXJuIHByb2plY3RDb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheUV4aXN0aW5nUHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0LCBwcm9qZWN0VGFza3NBcnJheSkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0KTtcbiAgICBjb25zdCBwcm9qZWN0VGFza3MgPSBkaXNwbGF5VGFza3MocHJvamVjdFRhc2tzQXJyYXksIHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQsIGZhbHNlKTtcbiAgICByZXR1cm4gcHJvamVjdFRhc2tzXG59XG5cbi8vIHRoaXMgXCJtb2R1bGVcIiByZS1sb2FkcyB0aGUgYnV0dG9ucyBhbmQgc2VsZWN0b3JzIGV2ZXJ5IHBhZ2VMb2FkIHdpdGggdXBkYXRlZCBwcm9qZWN0c0NyZWF0ZWQgZGF0YVxuZnVuY3Rpb24gcHJvamVjdEJ1dHRvbnNBbmRTZWxlY3RvcnNIYW5kbGVyKHByb2plY3RzQ3JlYXRlZEFycmF5KSB7XG4gICAgY29uc3QgcHJvamVjdExpc3RIZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuICAgIGNvbnN0IGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1hc3NvY2lhdGVkYCk7XG4gICAgY29uc3QgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdC1wcm9qZWN0LWFzc29jaWF0ZWRgKTtcbiAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gcHJvamVjdHNDcmVhdGVkQXJyYXk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0LCBhZGRTZWxlY3RvciwgZWRpdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFycmF5T2ZDb250YWluZXJzID0gW3Byb2plY3RMaXN0LCBhZGRTZWxlY3RvciwgZWRpdFNlbGVjdG9yXTtcblxuICAgICAgICBhcnJheU9mQ29udGFpbmVycy5mb3JFYWNoKCAoY29udGFpbmVyKSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvamVjdEJ1dHRvbnNUb1Byb2plY3RMaXN0KCkge1xuXG4gICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaCggKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKGBpZGAsIHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIHByb2plY3RPYmplY3QucHJvamVjdEluZGV4KTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChgcHJvamVjdExpc3RCdXR0b25gKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdExpc3RIZWFkLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IGBvdmVydmlldyAoZGVmYXVsdClgO1xuICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0QXNzb2NpYXRlZEluRWRpdE1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0QXNzb2NpYXRlZEluRWRpdE1vZGFsLnNldEF0dHJpYnV0ZShgaWRgLCBgZXhpc3RpbmctcHJvamVjdGApO1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcblxuICAgICAgICBlZGl0VGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChjdXJyZW50UHJvamVjdEFzc29jaWF0ZWRJbkVkaXRNb2RhbCk7XG4gICAgICAgIGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgXG4gICAgICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0SGVhZCwgYWRkVGFza1Byb2plY3RTZWxlY3RvciwgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IpO1xuICAgIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpO1xuICAgIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgICBsb2FkTWFpbkNvbnRlbnQsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge30gZnJvbSAnLi9kYXRhTW9kYWxIYW5kbGVyLmpzJ1xuaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzIH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcbmltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI25hdi1jb250YWluZXJgKTtcbmNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1idXR0b25gKTtcbmNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBwYWdlU2VsZWN0b3IpO1xucHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjb25zb2xlLmxvZyhlLnRhcmdldC50ZXh0Q29udGVudCkpO1xucHJvamVjdExpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBwcm9qZWN0TGlzdEJ1dHRvbmApIHtcbiAgICAgICAgcHJvamVjdFNlbGVjdG9yKGUpXG4gICAgfVxufSk7XG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGxvYWRNYWluQ29udGVudChjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHMsIG51bGwsIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcywgYG92ZXJ2aWV3YCk7XG59KSgpO1xuXG5mdW5jdGlvbiBwYWdlU2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IHBhZ2VTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgaWYgKHBhZ2VTZWxlY3RlZFRpdGxlID09PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIHBhZ2VTZWxlY3RlZFRpdGxlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2plY3RTZWxlY3RvcihlKSB7XG4gICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=