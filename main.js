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
        document.querySelector('#new-task-dateDue').value = new Date().toDateInputValue();    
        addObjectModal[0].style.display = `block`;
    } else {
        document.querySelector('#new-project-dateDue').value = new Date().toDateInputValue();
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
    
    // <------- pre-populate the editModal inputs with existing data -------------->
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
    // <------- end of pre-populating the editModal inputs ------------------------>

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
    deleteProjectMessage.textContent = `Are you sure you want to delete this project and all of its associated tasks?`;
    
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

function updateLocalStorage(objectType) {
    if (objectType === `task`) {
        window.localStorage.removeItem(`tasksCreated`);
        window.localStorage.setItem(`tasksCreated`, JSON.stringify(tasksCreated));
    } else {
        window.localStorage.removeItem(`projectsCreated`);
        window.localStorage.setItem(`projectsCreated`, JSON.stringify(projectsCreated));
    }
    // projectsCreated = JSON.parse(window.localStorage.getItem(`projectsCreated`));
    // tasksCreated = JSON.parse(window.localStorage.getItem(`tasksCreated`));
}

function getObjectArrays() {
    if (!window.localStorage.length) {
        window.localStorage.setItem(`projectsCreated`, JSON.stringify(projectsCreated));
        window.localStorage.setItem(`tasksCreated`, JSON.stringify(tasksCreated));
    }
    const taskArrays = {
        projects: JSON.parse(window.localStorage.getItem(`projectsCreated`)),
        tasks: JSON.parse(window.localStorage.getItem(`tasksCreated`)),
    }
    console.log(taskArrays.projects);
    console.log(taskArrays.tasks);
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
    
    updateLocalStorage(`task`);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
}
        
function instantiateNewProject(newProjectModalInputs) {
    let isDisplayed = false;

    const newProjectInputArray = Array.from(newProjectModalInputs);
    const newProjectTitle = newProjectInputArray[0].value;
    const newProjectDateDue = newProjectInputArray[1].value;
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);

    updateLocalStorage(`project`);
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_0__.loadMainContent)(projectsCreated, newProject, null, isDisplayed);
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

    updateLocalStorage(`task`);
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

    updateLocalStorage(`task`);
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

    updateLocalStorage(`task`);
    updateLocalStorage(`project`);
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

    updateLocalStorage(`task`);
    updateLocalStorage(`project`);
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
    } else if (!pageToDisplay) {
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

// window.localStorage.removeItem(`test`);
window.localStorage.removeItem(`projectsCreated`);
window.localStorage.removeItem(`tasksCreated`);

const loadPage = (function() {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
        console.log(currentObjectArray);
        (0,_pageLoader_js__WEBPACK_IMPORTED_MODULE_2__.loadMainContent)(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
    const currentObjectArray = (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_1__.getObjectArrays)();
    console.log(currentObjectArray);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEY7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLCtFQUFxQjtBQUM3QjtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0EsUUFBUSw0RUFBa0I7QUFDMUI7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxRQUFRLDBFQUFnQjtBQUN4QixLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDs7QUFFQSwrQkFBK0IseUVBQWU7O0FBRTlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQ0FBK0Msb0RBQW9EO0FBQ25HLCtDQUErQyxzREFBc0Q7QUFDckcsK0NBQStDLDBEQUEwRDtBQUN6RztBQUNBLHdEQUF3RCw2REFBNkQ7QUFDckgsZ0RBQWdELDZEQUE2RDtBQUM3Ryx1REFBdUQsZ0VBQWdFO0FBQ3ZIO0FBQ0EsNkRBQTZELGdFQUFnRTtBQUM3SCxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJFQUFpQjtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMOztBQUVBOztBQUVBLCtCQUErQix5RUFBZTs7QUFFOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esa0RBQWtELDZEQUE2RDtBQUMvRyxrREFBa0QsK0RBQStEO0FBQ2pILGtEQUFrRCxtRUFBbUU7QUFDckg7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksOEVBQW9CO0FBQ2hDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDZFQUFtQjtBQUMzQixLQUFLOztBQUVMO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQSxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN4TmlEOztBQUVqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0EsSUFBSSwrREFBZTtBQUNuQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EscUNBQXFDLHlCQUF5QjtBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1QsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBLDZDQUE2QyxRQUFRO0FBQ3JEO0FBQ0EsMkJBQTJCLHlCQUF5QjtBQUNwRDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1Qyw0QkFBNEI7QUFDbkU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSwrREFBZTtBQUN2QixLQUFLO0FBQ0wsUUFBUSwrREFBZTtBQUN2QjtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7O0FDcFBBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxtQkFBbUIsK0JBQStCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSw4REFBOEQsZ0NBQWdDO0FBQzlGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwREFBMEQsMkJBQTJCO0FBQ3JGO0FBQ0E7QUFDQSx5Q0FBeUMsNkJBQTZCO0FBQ3RFLHFEQUFxRCxpQ0FBaUM7QUFDdEY7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7O1VDak5BO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0Esd0NBQXdDLHlDQUF5QztXQUNqRjtXQUNBO1dBQ0EsRTs7Ozs7V0NQQSx3Rjs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSxzREFBc0Qsa0JBQWtCO1dBQ3hFO1dBQ0EsK0NBQStDLGNBQWM7V0FDN0QsRTs7Ozs7Ozs7Ozs7Ozs7QUNOOEI7QUFDNkI7QUFDVjs7QUFFakQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHlFQUFlO0FBQzlDLElBQUksK0RBQWU7QUFDbkIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUVBQWU7QUFDbEQ7QUFDQSxRQUFRLCtEQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMLElBQUksZ0VBQWU7QUFDbkIsQyIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzLCBpbnN0YW50aWF0ZU5ld1Rhc2ssIGluc3RhbnRpYXRlTmV3UHJvamVjdCwgZmluYWxpemVUYXNrRWRpdHMsIGZpbmFsaXplUHJvamVjdEVkaXRzLCBkZWxldGVUYXNrT2JqZWN0LCBkZWxldGVQcm9qZWN0T2JqZWN0IH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcblxuLy8gc2V0cyB0aGUgZGVmYXVsdCBkYXRlIGluIHRoZSBhZGRUYXNrIGFuZCBhZGRQcm9qZWN0IG1vZGFscyB0byB0b2RheSdzIGRhdGVcbkRhdGUucHJvdG90eXBlLnRvRGF0ZUlucHV0VmFsdWUgPSAoZnVuY3Rpb24oKSB7XG4gICAgdmFyIGxvY2FsID0gbmV3IERhdGUodGhpcyk7XG4gICAgbG9jYWwuc2V0TWludXRlcyh0aGlzLmdldE1pbnV0ZXMoKSAtIHRoaXMuZ2V0VGltZXpvbmVPZmZzZXQoKSk7XG4gICAgcmV0dXJuIGxvY2FsLnRvSlNPTigpLnNsaWNlKDAsMTApO1xufSk7XG5cbi8vIHRoaXMgc2VjdGlvbiBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBhZGRUYXNrIGFuZCBhZGRQcm9qZWN0IGZvcm0gbW9kYWxzXG5jb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tCdXR0b25gKTtcbmNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkUHJvamVjdEJ1dHRvbmApO1xuYWRkVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIG9wZW5OZXdPYmplY3RNb2RhbCk7XG5hZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcblxuY29uc3QgcHJvamVjdFVzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5wcm9qZWN0VXNlcklucHV0c2ApO1xuY29uc3QgdGFza1VzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC50YXNrVXNlcklucHV0c2ApO1xuXG5mdW5jdGlvbiBvcGVuTmV3T2JqZWN0TW9kYWwoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgYWRkT2JqZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxgKTtcbiAgICBpZiAoZS50YXJnZXQuaWQgPT09IGBhZGRUYXNrQnV0dG9uYCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXRhc2stZGF0ZUR1ZScpLnZhbHVlID0gbmV3IERhdGUoKS50b0RhdGVJbnB1dFZhbHVlKCk7ICAgIFxuICAgICAgICBhZGRPYmplY3RNb2RhbFswXS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICB9IGVsc2Uge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjbmV3LXByb2plY3QtZGF0ZUR1ZScpLnZhbHVlID0gbmV3IERhdGUoKS50b0RhdGVJbnB1dFZhbHVlKCk7XG4gICAgICAgIGFkZE9iamVjdE1vZGFsWzJdLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIH1cbn1cblxuY29uc3Qgc3VibWl0UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRQcm9qZWN0U3VibWl0QnV0dG9uYCk7XG5jb25zdCBzdWJtaXRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tTdWJtaXRCdXR0b25gKTtcbmNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdGApO1xuY29uc3QgY2FuY2VsVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxUYXNrYCk7XG5cbmNhbmNlbFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY2xvc2VOZXdPYmplY3RNb2RhbChlLnRhcmdldC5pZCkpO1xuY2FuY2VsVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjbG9zZU5ld09iamVjdE1vZGFsKGUudGFyZ2V0LmlkKSk7XG5cbnN1Ym1pdFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKHByb2plY3RVc2VySW5wdXQpKSB7XG4gICAgICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdChwcm9qZWN0VXNlcklucHV0KTtcbiAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICB9XG59KVxuXG5zdWJtaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbih0YXNrVXNlcklucHV0KSkge1xuICAgICAgICBpbnN0YW50aWF0ZU5ld1Rhc2sodGFza1VzZXJJbnB1dCk7XG4gICAgICAgIHN1Ym1pdE5ld09iamVjdEZvcm0oZSk7XG4gICAgfVxufSlcblxuZnVuY3Rpb24gc3VibWl0TmV3T2JqZWN0Rm9ybShldmVudCkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY2xvc2VOZXdPYmplY3RNb2RhbChldmVudC50YXJnZXQuaWQpO1xufVxuXG5mdW5jdGlvbiBjbG9zZU5ld09iamVjdE1vZGFsKGJ1dHRvbklEKSB7XG4gICAgY29uc3QgbW9kYWxUb0Nsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1vZGFsYCk7XG4gICAgY29uc3QgZm9ybVRvUmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZm9ybUZpZWxkYCk7XG4gICAgaWYgKGJ1dHRvbklEID09PSBgYWRkUHJvamVjdFN1Ym1pdEJ1dHRvbmAgfHwgYnV0dG9uSUQgPT09IGBjYW5jZWxQcm9qZWN0YCkge1xuICAgICAgICBtb2RhbFRvQ2xvc2VbMl0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgZm9ybVRvUmVzZXRbMl0ucmVzZXQoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBtb2RhbFRvQ2xvc2VbMF0uc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgZm9ybVRvUmVzZXRbMF0ucmVzZXQoKTtcbiAgICB9XG59XG5cbi8vIHRoaXMgc2VjdGlvbiBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBlZGl0VGFzayBhbmQgZWRpdFByb2plY3QgZm9ybSBtb2RhbHNcbmNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG5tYWluQ29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGxldCBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgIGlmIChjdXJyZW50UGFnZSAhPT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLm5leHRTaWJsaW5nLnRleHRDb250ZW50O1xuICAgIH1cbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZWRpdC10YXNrLWJ0bmApIHtcbiAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIG9wZW5FZGl0VGFza01vZGFsKHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBkZWxldGUtdGFzay1idG5gKSB7XG4gICAgICAgIGNvbnN0IHRhc2tTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICBkZWxldGVUYXNrT2JqZWN0KHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBlZGl0LXByb2plY3QtYnRuYCkge1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnBhcmVudE5vZGUuZmlyc3RDaGlsZC5sYXN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgb3BlbkVkaXRQcm9qZWN0TW9kYWwocHJvamVjdFNlbGVjdGVkVGl0bGUsIHByb2plY3RTZWxlY3RlZEluZGV4KTtcbiAgICB9IGVsc2UgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGRlbGV0ZS1wcm9qZWN0LWJ0bmApIHtcbiAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQubGFzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFNlbGVjdGVkVGl0bGUsIHByb2plY3RTZWxlY3RlZEluZGV4KTtcbiAgICB9XG59KTtcblxuZnVuY3Rpb24gb3BlbkVkaXRUYXNrTW9kYWwodGFza1RvRWRpdEluZGV4LCBwYWdlRGlzcGxheWVkVGl0bGUpIHtcbiAgICBcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICBcbiAgICBjb25zdCBlZGl0VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrTW9kYWxgKTtcbiAgICBlZGl0VGFza01vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIFxuICAgIC8vIDwtLS0tLS0tIHByZS1wb3B1bGF0ZSB0aGUgZWRpdE1vZGFsIGlucHV0cyB3aXRoIGV4aXN0aW5nIGRhdGEgLS0tLS0tLS0tLS0tLS0+XG4gICAgY29uc3QgZWRpdFRhc2tJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZWRpdFRhc2tJbnB1dHNgKTtcbiAgICBjb25zdCBwcmVwb3B1bGF0ZVByb2plY3RJbk1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2V4aXN0aW5nLXByb2plY3RgKTtcbiAgICBjb25zdCBwcmVwb3B1bGF0ZVByaW9yaXR5SW5Nb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNleGlzdGluZy1zdGF0dXNgKTtcbiAgICBlZGl0VGFza0lucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1RpdGxlfWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGF0ZUR1ZX1gKTtcbiAgICBlZGl0VGFza0lucHV0c1syXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza0Rlc2NyaXB0aW9ufWApO1xuICAgIGVkaXRUYXNrSW5wdXRzWzJdLnRleHRDb250ZW50ID0gY3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza0Rlc2NyaXB0aW9uO1xuICAgIHByZXBvcHVsYXRlUHJpb3JpdHlJbk1vZGFsLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrUHJpb3JpdHlTdGF0dXN9YClcbiAgICBwcmVwb3B1bGF0ZVByaW9yaXR5SW5Nb2RhbC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcmlvcml0eVN0YXR1c30gcHJpb3JpdHlgO1xuICAgIHByZXBvcHVsYXRlUHJvamVjdEluTW9kYWwuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZH1gKTtcbiAgICBpZiAoY3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBgZGVmYXVsdGApIHtcbiAgICAgICAgcHJlcG9wdWxhdGVQcm9qZWN0SW5Nb2RhbC50ZXh0Q29udGVudCA9IGBvdmVydmlldyAoJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrUHJvamVjdEFzc29jaWF0ZWR9KWA7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcHJlcG9wdWxhdGVQcm9qZWN0SW5Nb2RhbC50ZXh0Q29udGVudCA9IGN1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICB9XG4gICAgLy8gPC0tLS0tLS0gZW5kIG9mIHByZS1wb3B1bGF0aW5nIHRoZSBlZGl0TW9kYWwgaW5wdXRzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLT5cblxuICAgIGNvbnN0IGNvbmZpcm1UYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRhc2tTdWJtaXRCdXR0b25gKTtcbiAgICBjb25maXJtVGFza0VkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpXG4gICAgXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2tFZGl0c0hhbmRsZXIoZSkge1xuICAgICAgICBjb25maXJtVGFza0VkaXRzLnJlbW92ZUV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgY29uZmlybVRhc2tFZGl0c0hhbmRsZXIpO1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbihlZGl0VGFza0lucHV0cykpIHtcbiAgICAgICAgICAgIGZpbmFsaXplVGFza0VkaXRzKGVkaXRUYXNrSW5wdXRzLCB0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSk7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRUYXNrTW9kYWwpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY2FuY2VsVGFza0VkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tFZGl0YCk7XG4gICAgY2FuY2VsVGFza0VkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY29uZmlybVRhc2tFZGl0cy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1UYXNrRWRpdHNIYW5kbGVyKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRUYXNrTW9kYWwpO1xuICAgIH0pO1xufVxuXG5mdW5jdGlvbiBvcGVuRWRpdFByb2plY3RNb2RhbChwcm9qZWN0VG9FZGl0VGl0bGUsIHByb2plY3RUb0VkaXRJbmRleCkge1xuICAgIFxuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuXG4gICAgY29uc3QgZWRpdFByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0UHJvamVjdE1vZGFsYCk7XG4gICAgZWRpdFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICBcbiAgICAvLyBwcmUtcG9wdWxhdGUgdGhlIGVkaXQgZm9ybSB3aXRoIGV4aXN0aW5nIGRhdGFcbiAgICBjb25zdCBlZGl0UHJvamVjdElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0UHJvamVjdElucHV0c2ApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0VGl0bGV9YCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMV0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3REYXRlRHVlfWApO1xuICAgIGVkaXRQcm9qZWN0SW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb259YCk7XG4gICAgZWRpdFByb2plY3RJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb247XG4gICAgXG4gICAgY29uc3QgY29uZmlybVByb2plY3RFZGl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0UHJvamVjdFN1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcilcbiAgICBcbiAgICBmdW5jdGlvbiBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcihlKSB7XG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMucmVtb3ZlRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBjb25maXJtUHJvamVjdEVkaXRzSGFuZGxlcik7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRQcm9qZWN0SW5wdXRzKSkge1xuICAgICAgICAgICAgZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RJbnB1dHMsIHByb2plY3RUb0VkaXRJbmRleCwgcHJvamVjdFRvRWRpdFRpdGxlKTtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3RFZGl0YCk7XG4gICAgY2FuY2VsUHJvamVjdEVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY29uZmlybVByb2plY3RFZGl0cy5yZW1vdmVFdmVudExpc3RlbmVyKGBjbGlja2AsIGNvbmZpcm1Qcm9qZWN0RWRpdHNIYW5kbGVyKTtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRQcm9qZWN0TW9kYWwpO1xuICAgIH0pXG4gICAgXG59XG5cbmZ1bmN0aW9uIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgXG4gICAgY29uc3QgZGVsZXRlUHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm1EZWxldGVQcm9qZWN0YClcbiAgICBjb25zdCBkZWxldGVQcm9qZWN0TWVzc2FnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtLWRlbGV0ZS10ZXh0YCk7XG4gICAgZGVsZXRlUHJvamVjdE1lc3NhZ2UudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGlzIHByb2plY3QgYW5kIGFsbCBvZiBpdHMgYXNzb2NpYXRlZCB0YXNrcz9gO1xuICAgIFxuICAgIGNvbnN0IGNvbmZpcm1EZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybVByb2plY3REZWxldGVgKTtcbiAgICBjb25zdCBjYW5jZWxEZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdERlbGV0ZWApO1xuICAgIFxuICAgIGNvbmZpcm1EZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChkZWxldGVQcm9qZWN0TW9kYWwpO1xuICAgICAgICBkZWxldGVQcm9qZWN0T2JqZWN0KHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCk7XG4gICAgfSlcbiAgICBcbiAgICBjYW5jZWxEZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChkZWxldGVQcm9qZWN0TW9kYWwpO1xuICAgIH0pXG4gICAgXG4gICAgZGVsZXRlUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xufVxuXG5mdW5jdGlvbiBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKG1vZGFsVG9DbG9zZSkge1xuICAgIGNvbnN0IGZvcm1Ub1Jlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmZvcm1GaWVsZGApO1xuICAgIG1vZGFsVG9DbG9zZS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRUYXNrTW9kYWwpIHtcbiAgICAgICAgZm9ybVRvUmVzZXRbMV0ucmVzZXQoKTtcbiAgICB9IGVsc2UgaWYgKG1vZGFsVG9DbG9zZSA9PT0gZWRpdFByb2plY3RNb2RhbCkge1xuICAgICAgICBmb3JtVG9SZXNldFszXS5yZXNldCgpO1xuICAgIH1cbn1cblxuLy8gdGhpcyBmdW5jdGlvbiB2YWxpZGF0ZXMgYm90aCB0eXBlcyBvZiBtb2RhbHM6IGFkZCBhbmQgZWRpdFxuZnVuY3Rpb24gY2hlY2tGb3JtVmFsaWRhdGlvbihpbnB1dE5vZGVMaXN0KSB7XG4gICAgbGV0IGlzVmFsaWQgPSB0cnVlO1xuICAgIGlucHV0Tm9kZUxpc3QuZm9yRWFjaCggaW5wdXRGaWVsZCA9PiB7XG4gICAgICAgIGlmIChpbnB1dEZpZWxkLnZhbGlkaXR5LnZhbHVlTWlzc2luZykge1xuICAgICAgICAgICAgaXNWYWxpZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfSlcbiAgICByZXR1cm4gaXNWYWxpZFxufSIsImltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxubGV0IHByb2plY3RzQ3JlYXRlZCA9IFtcbiAgICB7XG4gICAgICAgIHByb2plY3RUaXRsZTogYHRvZG8gbGlzdGAsXG4gICAgICAgIHByb2plY3REYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHByb2plY3REZXNjcmlwdGlvbjogYHRoaXMgaXMgYSBwcm9qZWN0IGZvciB0aGUgb2RpbiBwcm9qZWN0YCxcbiAgICAgICAgcHJvamVjdEluZGV4OiAwLFxuICAgIH0sXG4gICAge1xuICAgICAgICBwcm9qZWN0VGl0bGU6IGBrZWVwIGdyaW5kaW5nYCxcbiAgICAgICAgcHJvamVjdERhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHRlc3QgcHJvamVjdCBmb3IgbXkgYnVnZ3kgdG9kbyBsaXN0IGFwcGAsXG4gICAgICAgIHByb2plY3RJbmRleDogMSxcbiAgICB9LFxuXTtcblxubGV0IHRhc2tzQ3JlYXRlZCA9IFtcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYHJlZmFjdG9yIGNvZGVgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGBjbGVhbiBpdCB1cCwgbWFrZSBsb2dpYyBtb3JlIGxpbmVhcmAsXG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1czogYGhpZ2hgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGB0b2RvIGxpc3RgLFxuICAgICAgICB0YXNrSW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHRhc2tUaXRsZTogYG1ha2UgcHJvZ3Jlc3NgLFxuICAgICAgICB0YXNrRGF0ZUR1ZTogYDIwMjEtMDYtMTJgLFxuICAgICAgICB0YXNrRGVzY3JpcHRpb246IGBrZWVwIGF0IGl0IGFuZCBzdGF5IHBvc2l0aXZlYCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgZG8gbW9yZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xM2AsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYGRvIHdoYXQgeW91IGNhbiwgd2hlbiB5b3UgY2FuYCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgbWVkaXVtYCxcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkOiBgZGVmYXVsdGAsXG4gICAgICAgIHRhc2tJbmRleDogMixcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgZG8gZXZlbiBtb3JlYCxcbiAgICAgICAgdGFza0RhdGVEdWU6IGAyMDIxLTA2LTEzYCxcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uOiBgY2FydmUgb3V0IG1vcmUgdGltZSwgaWYgcG9zc2libGVgLFxuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXM6IGBsb3dgLFxuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQ6IGBrZWVwIGdyaW5kaW5nYCxcbiAgICAgICAgdGFza0luZGV4OiAzLFxuICAgIH1cbl07XG5cbmZ1bmN0aW9uIHVwZGF0ZUxvY2FsU3RvcmFnZShvYmplY3RUeXBlKSB7XG4gICAgaWYgKG9iamVjdFR5cGUgPT09IGB0YXNrYCkge1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHRhc2tzQ3JlYXRlZGApO1xuICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0oYHRhc2tzQ3JlYXRlZGAsIEpTT04uc3RyaW5naWZ5KHRhc2tzQ3JlYXRlZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdHNDcmVhdGVkYCk7XG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbShgcHJvamVjdHNDcmVhdGVkYCwgSlNPTi5zdHJpbmdpZnkocHJvamVjdHNDcmVhdGVkKSk7XG4gICAgfVxuICAgIC8vIHByb2plY3RzQ3JlYXRlZCA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGBwcm9qZWN0c0NyZWF0ZWRgKSk7XG4gICAgLy8gdGFza3NDcmVhdGVkID0gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0oYHRhc2tzQ3JlYXRlZGApKTtcbn1cblxuZnVuY3Rpb24gZ2V0T2JqZWN0QXJyYXlzKCkge1xuICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZS5sZW5ndGgpIHtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGBwcm9qZWN0c0NyZWF0ZWRgLCBKU09OLnN0cmluZ2lmeShwcm9qZWN0c0NyZWF0ZWQpKTtcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKGB0YXNrc0NyZWF0ZWRgLCBKU09OLnN0cmluZ2lmeSh0YXNrc0NyZWF0ZWQpKTtcbiAgICB9XG4gICAgY29uc3QgdGFza0FycmF5cyA9IHtcbiAgICAgICAgcHJvamVjdHM6IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKGBwcm9qZWN0c0NyZWF0ZWRgKSksXG4gICAgICAgIHRhc2tzOiBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbShgdGFza3NDcmVhdGVkYCkpLFxuICAgIH1cbiAgICBjb25zb2xlLmxvZyh0YXNrQXJyYXlzLnByb2plY3RzKTtcbiAgICBjb25zb2xlLmxvZyh0YXNrQXJyYXlzLnRhc2tzKTtcbiAgICByZXR1cm4gdGFza0FycmF5c1xufVxuXG5jbGFzcyBQcm9qZWN0IHtcbiAgICBjb25zdHJ1Y3Rvcihwcm9qZWN0VGl0bGUsIHByb2plY3REYXRlRHVlLCBwcm9qZWN0RGVzY3JpcHRpb24sIHByb2plY3RJbmRleCkge1xuICAgICAgICB0aGlzLnByb2plY3RUaXRsZSA9IHByb2plY3RUaXRsZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGF0ZUR1ZSA9IHByb2plY3REYXRlRHVlO1xuICAgICAgICB0aGlzLnByb2plY3REZXNjcmlwdGlvbiA9IHByb2plY3REZXNjcmlwdGlvbjtcbiAgICAgICAgdGhpcy5wcm9qZWN0SW5kZXggPSBwcm9qZWN0SW5kZXg7XG4gICAgfVxufVxuXG5jbGFzcyBUYXNrIHtcbiAgICBjb25zdHJ1Y3Rvcih0YXNrVGl0bGUsIHRhc2tEYXRlRHVlLCB0YXNrRGVzY3JpcHRpb24sIHRhc2tQcmlvcml0eVN0YXR1cywgdGFza1Byb2plY3RBc3NvY2lhdGVkLCB0YXNrSW5kZXgpIHtcbiAgICAgICAgdGhpcy50YXNrVGl0bGUgPSB0YXNrVGl0bGU7XG4gICAgICAgIHRoaXMudGFza0RhdGVEdWUgPSB0YXNrRGF0ZUR1ZTtcbiAgICAgICAgdGhpcy50YXNrRGVzY3JpcHRpb24gPSB0YXNrRGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMudGFza1ByaW9yaXR5U3RhdHVzID0gdGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0aGlzLnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IHRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICAgICAgdGhpcy50YXNrSW5kZXggPSB0YXNrSW5kZXg7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Rhc2sobmV3VGFza01vZGFsSW5wdXRzLCBwYWdlVG9SZWZyZXNoKSB7XG4gICAgXG4gICAgY29uc3QgbmV3VGFza0lucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Rhc2tNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3VGFza1RpdGxlID0gbmV3VGFza0lucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0RhdGVEdWUgPSBuZXdUYXNrSW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrRGVzY3JpcHRpb24gPSBuZXdUYXNrSW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMgPSBuZXdUYXNrSW5wdXRBcnJheVszXS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrUHJvamVjdEFzc29jaWF0ZWQgPSBuZXdUYXNrSW5wdXRBcnJheVs0XS52YWx1ZTtcbiAgICBjb25zdCBuZXdUYXNrSW5kZXggPSB0YXNrc0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2sgPSBuZXcgVGFzayhuZXdUYXNrVGl0bGUsIG5ld1Rhc2tEYXRlRHVlLCBuZXdUYXNrRGVzY3JpcHRpb24sIG5ld1Rhc2tQcmlvcml0eVN0YXR1cywgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkLCBuZXdUYXNrSW5kZXgpO1xuICAgIHRhc2tzQ3JlYXRlZC5wdXNoKG5ld1Rhc2spO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBjb25zdCB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIobmV3VGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICBcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuICAgICAgICBcbmZ1bmN0aW9uIGluc3RhbnRpYXRlTmV3UHJvamVjdChuZXdQcm9qZWN0TW9kYWxJbnB1dHMpIHtcbiAgICBsZXQgaXNEaXNwbGF5ZWQgPSBmYWxzZTtcblxuICAgIGNvbnN0IG5ld1Byb2plY3RJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdQcm9qZWN0TW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Byb2plY3RUaXRsZSA9IG5ld1Byb2plY3RJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Byb2plY3REYXRlRHVlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERlc2NyaXB0aW9uID0gbmV3UHJvamVjdElucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdEluZGV4ID0gcHJvamVjdHNDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdQcm9qZWN0ID0gbmV3IFByb2plY3QobmV3UHJvamVjdFRpdGxlLCBuZXdQcm9qZWN0RGF0ZUR1ZSwgbmV3UHJvamVjdERlc2NyaXB0aW9uLCBuZXdQcm9qZWN0SW5kZXgpO1xuICAgIHByb2plY3RzQ3JlYXRlZC5wdXNoKG5ld1Byb2plY3QpO1xuXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBwcm9qZWN0YCk7XG4gICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgbmV3UHJvamVjdCwgbnVsbCwgaXNEaXNwbGF5ZWQpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVRhc2tFZGl0cyhlZGl0TW9kYWxJbnB1dHMsIHRhcmdldEluZGV4LCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIGNvbnNvbGUubG9nKGVkaXRNb2RhbElucHV0c1swXS52YWx1ZSk7XG4gICAgY29uc3QgZWRpdGVkVGFza1RpdGxlID0gZWRpdE1vZGFsSW5wdXRzWzBdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEYXRlRHVlID0gZWRpdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tEZXNjcmlwdGlvbiA9IGVkaXRNb2RhbElucHV0c1syXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrUHJpb3JpdHlTdGF0dXMgPSBlZGl0TW9kYWxJbnB1dHNbM10udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdE1vZGFsSW5wdXRzWzRdLnZhbHVlO1xuXG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrVGl0bGUgPSBlZGl0ZWRUYXNrVGl0bGU7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrRGF0ZUR1ZSA9IGVkaXRlZFRhc2tEYXRlRHVlO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza0Rlc2NyaXB0aW9uID0gZWRpdGVkVGFza0Rlc2NyaXB0aW9uO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1ByaW9yaXR5U3RhdHVzID0gZWRpdGVkVGFza1ByaW9yaXR5U3RhdHVzO1xuICAgIHRhc2tzQ3JlYXRlZFt0YXJnZXRJbmRleF0udGFza1Byb2plY3RBc3NvY2lhdGVkID0gZWRpdGVkVGFza1Byb2plY3RBc3NvY2lhdGVkO1xuXG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVUYXNrT2JqZWN0KGluZGV4T2ZUYXNrVG9EZWxldGUsIGN1cnJlbnRQYWdlRGlzcGxheWVkKSB7XG4gICAgdGFza3NDcmVhdGVkLnNwbGljZShpbmRleE9mVGFza1RvRGVsZXRlLCAxKTtcbiAgICB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVUYXNrSW5kZXgoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBmb3IgKGxldCBpID0gaW5kZXhPZlRhc2tUb0RlbGV0ZTsgaSA8IHRhc2tzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICB0YXNrc0NyZWF0ZWRbaV0udGFza0luZGV4ID0gaTtcbiAgICB9XG4gICAgY29uc3QgcHJvamVjdEFzc29jaWF0ZWRUb0xvYWQgPSBwcm9qZWN0c0NyZWF0ZWQuZmluZChvYmplY3QgPT4gb2JqZWN0LnByb2plY3RUaXRsZSA9PT0gY3VycmVudFBhZ2VEaXNwbGF5ZWQpO1xuICAgIGNvbnN0IHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihjdXJyZW50UGFnZURpc3BsYXllZCk7XG5cbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBmaW5hbGl6ZVByb2plY3RFZGl0cyhlZGl0UHJvamVjdE1vZGFsSW5wdXRzLCB0YXJnZXRQcm9qZWN0SW5kZXgsIGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG5cbiAgICBsZXQgdGFza3NUb0xvYWQgPSBudWxsO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3RUaXRsZSA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMF0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdERhdGVEdWUgPSBlZGl0UHJvamVjdE1vZGFsSW5wdXRzWzFdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFByb2plY3REZXNjcmlwdGlvbiA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMl0udmFsdWU7XG5cbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0VGl0bGUgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgcHJvamVjdHNDcmVhdGVkW3RhcmdldFByb2plY3RJbmRleF0ucHJvamVjdERhdGVEdWUgPSBlZGl0ZWRQcm9qZWN0RGF0ZUR1ZTtcbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb24gPSBlZGl0ZWRQcm9qZWN0RGVzY3JpcHRpb25cblxuICAgIC8vIGlmIGEgcHJvamVjdCdzIHRpdGxlIGNoYW5nZXMsIHRoaXMgdXBkYXRlcyBhbGwgYXNzb2NpYXRlZCB0YXNrcycgdGFza1Byb2plY3RBc3NvY2lhdGVkIGRhdGEgdG8gdGhlIG5ldyBwcm9qZWN0IHRpdGxlIFxuICAgIGlmIChlZGl0ZWRQcm9qZWN0VGl0bGUgIT09IGV4aXN0aW5nUHJvamVjdFRpdGxlKSB7XG4gICAgICAgIHRhc2tzVG9Mb2FkID0gdGFza0ZpbHRlcihleGlzdGluZ1Byb2plY3RUaXRsZSk7XG4gICAgICAgIHRhc2tzVG9Mb2FkLmZvckVhY2goIHRhc2tPYmplY3QgPT4ge1xuICAgICAgICAgICAgdGFza09iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBlZGl0ZWRQcm9qZWN0VGl0bGU7XG4gICAgICAgIH0pXG4gICAgfSBlbHNlIHtcbiAgICAgICAgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGV4aXN0aW5nUHJvamVjdFRpdGxlKTtcbiAgICB9XG5cbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHRhc2tgKTtcbiAgICB1cGRhdGVMb2NhbFN0b3JhZ2UoYHByb2plY3RgKTtcbiAgICBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XSwgdGFza3NUb0xvYWQpO1xufVxuXG5mdW5jdGlvbiBkZWxldGVQcm9qZWN0T2JqZWN0KHByb2plY3RUb0RlbGV0ZVRpdGxlLCBwcm9qZWN0VG9EZWxldGVJbmRleCkge1xuICAgIGxldCB0YXNrSW5kZXhGb3JEZWxldGlvbiA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoIChvYmplY3QsIGluZGV4KSA9PiB7XG4gICAgICAgIGlmIChvYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0VG9EZWxldGVUaXRsZSkge1xuICAgICAgICAgICAgdGFza0luZGV4Rm9yRGVsZXRpb24ucHVzaChpbmRleCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIC8vIGRlbGV0ZXMgdGhlIHRhc2tzIGFzc29jaWF0ZWQgd2l0aCB0aGUgZGVsZXRlZCBwcm9qZWN0IGFuZCB1cGRhdGVzIHRoZSByZW1haW5pbmcgdGFzayBpbmRpY2VzXG4gICAgZm9yIChsZXQgaSA9IHRhc2tJbmRleEZvckRlbGV0aW9uLmxlbmd0aDsgaSA+PSAxOyBpLS0pIHtcbiAgICAgICAgdGFza3NDcmVhdGVkLnNwbGljZSh0YXNrSW5kZXhGb3JEZWxldGlvbltpLTFdLCAxKTtcbiAgICAgICAgZm9yIChsZXQgaiA9IGkgLSAxOyBqIDwgdGFza3NDcmVhdGVkLmxlbmd0aDsgaisrKSB7XG4gICAgICAgICAgICB0YXNrc0NyZWF0ZWRbal0udGFza0luZGV4ID0gajtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByb2plY3RzQ3JlYXRlZC5zcGxpY2UocHJvamVjdFRvRGVsZXRlSW5kZXgsIDEpO1xuXG4gICAgdXBkYXRlUHJvamVjdEluZGV4KHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlUHJvamVjdEluZGV4KGluZGV4T2ZEZWxldGVkUHJvamVjdCkge1xuICAgIGZvciAobGV0IGkgPSBpbmRleE9mRGVsZXRlZFByb2plY3Q7IGkgPCBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgcHJvamVjdHNDcmVhdGVkW2ldLnByb2plY3RJbmRleCA9IGk7XG4gICAgfVxuXG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGB0YXNrYCk7XG4gICAgdXBkYXRlTG9jYWxTdG9yYWdlKGBwcm9qZWN0YCk7XG4gICAgbG9hZENvbnRlbnRIZWxwZXIobnVsbCwgdGFza3NDcmVhdGVkKTtcbn1cblxuZnVuY3Rpb24gdGFza0ZpbHRlcihwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgbGV0IHRhc2tzQXNzb2NpYXRlZCA9IFtdO1xuICAgIHRhc2tzQ3JlYXRlZC5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdEFzc29jaWF0ZWRUaXRsZSkge1xuICAgICAgICAgICAgdGFza3NBc3NvY2lhdGVkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiB0YXNrc0Fzc29jaWF0ZWRcbn1cblxuZnVuY3Rpb24gbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCkge1xuICAgIGlmICghcHJvamVjdE9iamVjdFRvTG9hZCkge1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBudWxsLCB0YXNrc0NyZWF0ZWQsIGBvdmVydmlld2ApO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIHByb2plY3RPYmplY3RUb0xvYWQsIHRhc2tzQXJyYXlUb0xvYWQsIHByb2plY3RPYmplY3RUb0xvYWQucHJvamVjdFRpdGxlKTtcbiAgICB9XG59XG5cbmV4cG9ydCB7XG4gICAgZ2V0T2JqZWN0QXJyYXlzLFxuICAgIGluc3RhbnRpYXRlTmV3VGFzayxcbiAgICBpbnN0YW50aWF0ZU5ld1Byb2plY3QsXG4gICAgZmluYWxpemVUYXNrRWRpdHMsXG4gICAgZmluYWxpemVQcm9qZWN0RWRpdHMsXG4gICAgZGVsZXRlVGFza09iamVjdCxcbiAgICBkZWxldGVQcm9qZWN0T2JqZWN0LFxufSIsImNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG5cbmZ1bmN0aW9uIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0FycmF5LCBwcm9qZWN0VG9Mb2FkLCB0YXNrc0FycmF5LCBwYWdlVG9EaXNwbGF5KSB7XG4gICAgd2hpbGUgKG1haW5Db250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICBtYWluQ29udGFpbmVyLnJlbW92ZUNoaWxkKG1haW5Db250YWluZXIuZmlyc3RDaGlsZClcbiAgICB9XG4gICAgaWYgKHBhZ2VUb0Rpc3BsYXkgPT09IGBvdmVydmlld2ApIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheVRhc2tzT3ZlcnZpZXcodGFza3NBcnJheSk7XG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9IGVsc2UgaWYgKCFwYWdlVG9EaXNwbGF5KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lclRvRGlzcGxheSA9IGRpc3BsYXlQcm9qZWN0KHByb2plY3RUb0xvYWQpXG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5RXhpc3RpbmdQcm9qZWN0KHByb2plY3RUb0xvYWQsIHRhc2tzQXJyYXkpXG4gICAgICAgIG1haW5Db250YWluZXIuYXBwZW5kQ2hpbGQoY29udGFpbmVyVG9EaXNwbGF5KTtcbiAgICB9XG4gICAgcHJvamVjdEJ1dHRvbnNBbmRTZWxlY3RvcnNIYW5kbGVyKHByb2plY3RzQXJyYXkpXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrc092ZXJ2aWV3KGFycmF5T2ZUYXNrT2JqZWN0cykge1xuICAgIGNvbnN0IG92ZXJ2aWV3Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3Qgb3ZlcnZpZXdUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgb3ZlcnZpZXdUaXRsZS50ZXh0Q29udGVudCA9IGBvdmVydmlld2A7XG4gICAgb3ZlcnZpZXdUaXRsZS5zZXRBdHRyaWJ1dGUoYGlkYCwgYG92ZXJ2aWV3LWhlYWRlcmApO1xuICAgIG92ZXJ2aWV3Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtY29udGFpbmVyYCk7XG4gICAgb3ZlcnZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcnZpZXdUaXRsZSk7XG4gICAgXG4gICAgY29uc3QgdGFza3NUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3MoYXJyYXlPZlRhc2tPYmplY3RzLCBvdmVydmlld0NvbnRhaW5lciwgdHJ1ZSlcbiAgICBcbiAgICByZXR1cm4gdGFza3NUb0Rpc3BsYXlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKGFycmF5T2ZUYXNrT2JqZWN0cywgY29udGFpbmVyLCB0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICBjb25zdCBhbGxUYXNrc0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGFsbFRhc2tzQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtdGFza3MtY29udGFpbmVyYCk7XG5cbiAgICBjb25zdCB0YXNrSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgdGFza0hlYWRlci5zZXRBdHRyaWJ1dGUoYGlkYCwgYHRhc2staGVhZGVyYCk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgY29uc3QgaGVhZGVyRHVlRGF0ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJEZXNjcmlwdGlvbkxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJQcmlvcml0eUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBjb25zdCBoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDVgKTtcbiAgICBoZWFkZXJUaXRsZUxhYmVsLnRleHRDb250ZW50ID0gYHRhc2tgO1xuICAgIGhlYWRlckR1ZURhdGVMYWJlbC50ZXh0Q29udGVudCA9IGBkdWUgZGF0ZWA7XG4gICAgaGVhZGVyRGVzY3JpcHRpb25MYWJlbC50ZXh0Q29udGVudCA9IGBkZXNjcmlwdGlvbmA7XG4gICAgaGVhZGVyUHJpb3JpdHlMYWJlbC50ZXh0Q29udGVudCA9IGBwcmlvcml0eWA7XG4gICAgaGVhZGVyUHJvamVjdEFzc29jaWF0ZWRMYWJlbC50ZXh0Q29udGVudCA9IGBhc3NvY2lhdGVkIHByb2plY3RgO1xuXG4gICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJUaXRsZUxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlckR1ZURhdGVMYWJlbCk7XG4gICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJEZXNjcmlwdGlvbkxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclByaW9yaXR5TGFiZWwpO1xuICAgIGlmICh0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICAgICAgdGFza0hlYWRlci5zZXRBdHRyaWJ1dGUoYGlkYCwgYG92ZXJ2aWV3LXRhc2staGVhZGVyYCk7XG4gICAgICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJvamVjdEFzc29jaWF0ZWRMYWJlbCk7XG4gICAgfVxuXG4gICAgYWxsVGFza3NDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0hlYWRlcik7XG4gICAgXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBhcnJheU9mVGFza09iamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgY29uc3QgbmV3VGFza0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNGApO1xuICAgICAgICBjb25zdCB0YXNrRHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza0Rlc2NyaXB0aW9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrUHJpb3JpdHlTdGF0dXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza0VkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgY29uc3QgdGFza0RlbGV0ZUJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGB0YXNrLWNvbnRhaW5lcmApO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLnNldEF0dHJpYnV0ZShgZGF0YS1pbmRleC1udW1iZXJgLCBgJHthcnJheU9mVGFza09iamVjdHNbaV0udGFza0luZGV4fWApO1xuICAgICAgICB0YXNrVGl0bGUudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1RpdGxlO1xuICAgICAgICB0YXNrRHVlRGF0ZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrRGF0ZUR1ZTtcbiAgICAgICAgdGFza0Rlc2NyaXB0aW9uLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEZXNjcmlwdGlvbjtcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tQcmlvcml0eVN0YXR1cztcbiAgICAgICAgdGFza1Byb2plY3RBc3NvY2lhdGVkLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tQcm9qZWN0QXNzb2NpYXRlZDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24udGV4dENvbnRlbnQgPSBgZWRpdGA7XG4gICAgICAgIHRhc2tFZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoYGVkaXQtdGFzay1idG5gKTtcbiAgICAgICAgdGFza0RlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IGBkZWxldGVgO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGRlbGV0ZS10YXNrLWJ0bmApO1xuXG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1RpdGxlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRHVlRGF0ZSk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0Rlc2NyaXB0aW9uKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJpb3JpdHlTdGF0dXMpO1xuICAgICAgICBpZiAodG9EaXNwbGF5UHJvamVjdEFzc29jaWF0aW9uKSB7XG4gICAgICAgICAgICBuZXdUYXNrQ29udGFpbmVyLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctdGFzay1jb250YWluZXJgKTtcbiAgICAgICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1Byb2plY3RBc3NvY2lhdGVkKTtcbiAgICAgICAgfVxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFZGl0QnV0dG9uKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVsZXRlQnV0dG9uKTtcblxuICAgICAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFsbFRhc2tzQ29udGFpbmVyKTtcbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3RPYmplY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdEluZm9Db250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mb0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgbGFiZWxgKTtcbiAgICBjb25zdCBwcm9qZWN0VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoMmApO1xuICAgIGNvbnN0IHByb2plY3REdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgIGNvbnN0IHByb2plY3REZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICBjb25zdCBwcm9qZWN0RWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgIGNvbnN0IHByb2plY3REZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICBcbiAgICBwcm9qZWN0Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtY29udGFpbmVyYCk7XG4gICAgcHJvamVjdEluZm9Db250YWluZXIuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1pbmZvLWNvbnRhaW5lcmApO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtaW5mby1oZWFkZXJgKTtcbiAgICBwcm9qZWN0VGl0bGVMYWJlbC5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LXRpdGxlLWhlYWRlcmApO1xuICAgIHByb2plY3REdWVEYXRlLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtZGF0ZS1kdWVgKTtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kZXNjcmlwdGlvbmApO1xuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke3Byb2plY3RPYmplY3QucHJvamVjdEluZGV4fWApO1xuICAgIHByb2plY3RUaXRsZUxhYmVsLnRleHRDb250ZW50ID0gYHByb2plY3Q6YDtcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICBwcm9qZWN0RHVlRGF0ZS50ZXh0Q29udGVudCA9IGBkdWU6ICR7cHJvamVjdE9iamVjdC5wcm9qZWN0RGF0ZUR1ZX1gO1xuICAgIHByb2plY3REZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGBkZXNjcmlwdGlvbjogJHtwcm9qZWN0T2JqZWN0LnByb2plY3REZXNjcmlwdGlvbn1gO1xuICAgIHByb2plY3RFZGl0QnV0dG9uLnRleHRDb250ZW50ID0gYGVkaXQgcHJvamVjdGA7XG4gICAgcHJvamVjdERlbGV0ZUJ1dHRvbi50ZXh0Q29udGVudCA9IGBkZWxldGUgcHJvamVjdGA7XG4gICAgcHJvamVjdEVkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC1wcm9qZWN0LWJ0bmApO1xuICAgIHByb2plY3REZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXByb2plY3QtYnRuYCk7XG5cbiAgICBwcm9qZWN0VGl0bGVMYWJlbC5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuXG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlTGFiZWwpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3REdWVEYXRlKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEJ1dHRvbik7XG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG5cbiAgICBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0SW5mb0hlYWRlcik7XG4gICAgcHJvamVjdEluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcblxuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdEluZm9Db250YWluZXIpO1xuXG4gICAgcmV0dXJuIHByb2plY3RDb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheUV4aXN0aW5nUHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0LCBwcm9qZWN0VGFza3NBcnJheSkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0KTtcbiAgICBjb25zdCBwcm9qZWN0VGFza3MgPSBkaXNwbGF5VGFza3MocHJvamVjdFRhc2tzQXJyYXksIHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQsIGZhbHNlKTtcbiAgICByZXR1cm4gcHJvamVjdFRhc2tzXG59XG5cbi8vIHRoaXMgXCJtb2R1bGVcIiByZS1sb2FkcyB0aGUgYnV0dG9ucyBhbmQgc2VsZWN0b3JzIGV2ZXJ5IHBhZ2VMb2FkIHdpdGggdXBkYXRlZCBwcm9qZWN0c0NyZWF0ZWQgZGF0YVxuZnVuY3Rpb24gcHJvamVjdEJ1dHRvbnNBbmRTZWxlY3RvcnNIYW5kbGVyKHByb2plY3RzQ3JlYXRlZEFycmF5KSB7XG4gICAgY29uc3QgcHJvamVjdExpc3RIZWFkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuICAgIGNvbnN0IGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1hc3NvY2lhdGVkYCk7XG4gICAgY29uc3QgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdC1wcm9qZWN0LWFzc29jaWF0ZWRgKTtcbiAgICBjb25zdCBwcm9qZWN0c0FycmF5ID0gcHJvamVjdHNDcmVhdGVkQXJyYXk7XG5cbiAgICBmdW5jdGlvbiByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0LCBhZGRTZWxlY3RvciwgZWRpdFNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IGFycmF5T2ZDb250YWluZXJzID0gW3Byb2plY3RMaXN0LCBhZGRTZWxlY3RvciwgZWRpdFNlbGVjdG9yXTtcblxuICAgICAgICBhcnJheU9mQ29udGFpbmVycy5mb3JFYWNoKCAoY29udGFpbmVyKSA9PiB7XG4gICAgICAgICAgICB3aGlsZSAoY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgICAgICAgICAgICBjb250YWluZXIucmVtb3ZlQ2hpbGQoY29udGFpbmVyLmZpcnN0Q2hpbGQpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvamVjdEJ1dHRvbnNUb1Byb2plY3RMaXN0KCkge1xuXG4gICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaCggKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG5ld1Byb2plY3RCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24udGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKGBpZGAsIHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIHByb2plY3RPYmplY3QucHJvamVjdEluZGV4KTtcbiAgICAgICAgICAgIG5ld1Byb2plY3RCdXR0b24uY2xhc3NMaXN0LmFkZChgcHJvamVjdExpc3RCdXR0b25gKTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgcHJvamVjdExpc3RIZWFkLmFwcGVuZENoaWxkKG5ld1Byb2plY3RCdXR0b24pO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKSB7XG4gICAgICAgIGNvbnN0IGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IGBvdmVydmlldyAoZGVmYXVsdClgO1xuICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRQcm9qZWN0QXNzb2NpYXRlZEluRWRpdE1vZGFsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGN1cnJlbnRQcm9qZWN0QXNzb2NpYXRlZEluRWRpdE1vZGFsLnNldEF0dHJpYnV0ZShgaWRgLCBgZXhpc3RpbmctcHJvamVjdGApO1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcblxuICAgICAgICBlZGl0VGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChjdXJyZW50UHJvamVjdEFzc29jaWF0ZWRJbkVkaXRNb2RhbCk7XG4gICAgICAgIGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgXG4gICAgICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0SGVhZCwgYWRkVGFza1Byb2plY3RTZWxlY3RvciwgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IpO1xuICAgIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpO1xuICAgIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgICBsb2FkTWFpbkNvbnRlbnQsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQgJy4vZGF0YU1vZGFsSGFuZGxlci5qcydcbmltcG9ydCB7IGdldE9iamVjdEFycmF5cyB9IGZyb20gJy4vb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMnXG5pbXBvcnQgeyBsb2FkTWFpbkNvbnRlbnQgfSBmcm9tICcuL3BhZ2VMb2FkZXIuanMnXG5cbmNvbnN0IG5hdkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNuYXYtY29udGFpbmVyYCk7XG5jb25zdCBwcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtYnV0dG9uYCk7XG5jb25zdCBwcm9qZWN0TGlzdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWxpc3RgKTtcblxubmF2Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgcGFnZVNlbGVjdG9yKTtcbnByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY29uc29sZS5sb2coZS50YXJnZXQudGV4dENvbnRlbnQpKTtcbnByb2plY3RMaXN0Q29udGFpbmVyLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgcHJvamVjdExpc3RCdXR0b25gKSB7XG4gICAgICAgIHByb2plY3RTZWxlY3RvcihlKVxuICAgIH1cbn0pO1xuXG4vLyB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHRlc3RgKTtcbndpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbShgcHJvamVjdHNDcmVhdGVkYCk7XG53aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oYHRhc2tzQ3JlYXRlZGApO1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIGBvdmVydmlld2ApO1xufSkoKTtcblxuZnVuY3Rpb24gcGFnZVNlbGVjdG9yKGUpIHtcbiAgICBjb25zdCBwYWdlU2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGlmIChwYWdlU2VsZWN0ZWRUaXRsZSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICAgICAgY29uc29sZS5sb2coY3VycmVudE9iamVjdEFycmF5KTtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgbnVsbCwgY3VycmVudE9iamVjdEFycmF5LnRhc2tzLCBwYWdlU2VsZWN0ZWRUaXRsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9qZWN0U2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGNvbnNvbGUubG9nKGN1cnJlbnRPYmplY3RBcnJheSk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=