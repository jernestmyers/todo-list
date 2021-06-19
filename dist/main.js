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


// module contains functions to open, close and submit addTask and addProject form modals
// const newObjectModalModule = (function() {

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
// })();

// module contains functions to open, close and submit editTask and editProject form modals
// const editObjectModalModule = (function() {
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
        editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
        editTaskInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
        editTaskInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
        editTaskInputs[2].textContent = currentObjectArray.tasks[taskToEditIndex].taskDescription;
        

        const confirmTaskEdits = document.querySelector(`#editTaskSubmitButton`);
        confirmTaskEdits.addEventListener(`click`, (e) => {
            e.stopPropagation();
            if (checkFormValidation(editTaskInputs)) {
                (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeTaskEdits)(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
                e.preventDefault();
                closeEditOrDeleteModal(editTaskModal);
            }
        });
        
        const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
        cancelTaskEdits.addEventListener(`click`, (e) => {
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        })
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
        confirmProjectEdits.addEventListener(`click`, (e) => {
            if (checkFormValidation(editProjectInputs)) {
                (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.finalizeProjectEdits)(editProjectInputs, projectToEditIndex, projectToEditTitle);
                e.preventDefault();
                closeEditOrDeleteModal(editProjectModal);
            }
        });
        
        const cancelProjectEdits = document.querySelector(`#cancelProjectEdit`);
        cancelProjectEdits.addEventListener(`click`, (e) => {
            e.preventDefault();
            closeEditOrDeleteModal(editProjectModal);
        })
        
    }

    function openDeleteProjectModal(projectToDeleteTitle, projectToDeleteIndex) {
        console.log(projectToDeleteIndex);
        
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
// })();

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
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 0,
    },
    {
        taskTitle: `make progress`,
        taskDateDue: `2021-06-12`,
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `todo list`,
        taskIndex: 1,
    },
    {
        taskTitle: `do more`,
        taskDateDue: `2021-06-13`,
        taskDescription: `this is a test`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `default`,
        taskIndex: 2,
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
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = editModalInputs[1].value;
    const editedTaskDescription = editModalInputs[2].value;
    const editedTaskPriorityStatus = editModalInputs[3].value;
    const editedTaskProjectAssocaited = editModalInputs[4].value;

    tasksCreated[targetIndex].taskTitle = editedTaskTitle;
    tasksCreated[targetIndex].taskDateDue = editedTaskDateDue;
    tasksCreated[targetIndex].taskDescription = editedTaskDescription;
    tasksCreated[targetIndex].taskPriorityStatus = editedTaskPriorityStatus;
    tasksCreated[targetIndex].taskProjectAssociated = editedTaskProjectAssocaited;

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
    headerPriorityLabel.textContent = `priority status`;
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
    // const projectDueLabel = document.createElement(`label`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectInfoContainer.classList.add(`project-info-container`);
    projectInfoHeader.classList.add(`project-info-header`);
    projectTitleLabel.classList.add(`project-title-header`);
    // projectDueLabel.classList.add(`project-date-header`);
    projectDueDate.classList.add(`project-date-due`);
    projectDescription.classList.add(`project-description`);
    projectContainer.setAttribute(`data-index-number`, `${projectObject.projectIndex}`);
    projectTitleLabel.textContent = `project:`;
    projectTitle.textContent = projectObject.projectTitle;
    // projectDueLabel.textContent = `due:`;
    projectDueDate.textContent = `due: ${projectObject.projectDateDue}`;
    projectDescription.textContent = `description: ${projectObject.projectDescription}`;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.classList.add(`edit-project-btn`);
    projectDeleteButton.classList.add(`delete-project-btn`);

    projectTitleLabel.appendChild(projectTitle);
    // projectDueLabel.appendChild(projectDueDate);

    projectInfoHeader.appendChild(projectTitleLabel);
    projectInfoHeader.appendChild(projectDueDate);
    // projectInfoHeader.appendChild(projectDueLabel);
    projectInfoHeader.appendChild(projectEditButton);
    projectInfoHeader.appendChild(projectDeleteButton);

    projectInfoContainer.appendChild(projectInfoHeader);
    // projectInfoContainer.appendChild(projectDueDate);
    projectInfoContainer.appendChild(projectDescription);
    // projectInfoContainer.appendChild(projectEditButton);
    // projectInfoContainer.appendChild(projectDeleteButton);

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
        
        const defaultProjectForEditTaskSelector = document.createElement(`option`);
        defaultProjectForEditTaskSelector.setAttribute(`value`, `default`);
        defaultProjectForEditTaskSelector.textContent = `overview (default)`;
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
projectListContainer.addEventListener(`click`, projectSelector);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksK0VBQXFCO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxZQUFZLDRFQUFrQjtBQUM5QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFlBQVksMEVBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNB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QUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztVQ3JOQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHdDQUF3Qyx5Q0FBeUM7V0FDakY7V0FDQTtXQUNBLEU7Ozs7O1dDUEEsd0Y7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0Esc0RBQXNELGtCQUFrQjtXQUN4RTtXQUNBLCtDQUErQyxjQUFjO1dBQzdELEU7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ3FCO0FBQ1Y7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUMsSUFBSSwrREFBZTtBQUNuQixDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBLG1DQUFtQyx5RUFBZTtBQUNsRCxRQUFRLCtEQUFlO0FBQ3ZCO0FBQ0E7O0FBRUE7QUFDQSwrQkFBK0IseUVBQWU7QUFDOUM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTCxJQUFJLGdFQUFlO0FBQ25CLEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE9iamVjdEFycmF5cywgaW5zdGFudGlhdGVOZXdUYXNrLCBpbnN0YW50aWF0ZU5ld1Byb2plY3QsIGZpbmFsaXplVGFza0VkaXRzLCBmaW5hbGl6ZVByb2plY3RFZGl0cywgZGVsZXRlVGFza09iamVjdCwgZGVsZXRlUHJvamVjdE9iamVjdCB9IGZyb20gJy4vb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMnXG5cbi8vIG1vZHVsZSBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBhZGRUYXNrIGFuZCBhZGRQcm9qZWN0IGZvcm0gbW9kYWxzXG4vLyBjb25zdCBuZXdPYmplY3RNb2RhbE1vZHVsZSA9IChmdW5jdGlvbigpIHtcblxuICAgIGNvbnN0IGFkZFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkVGFza0J1dHRvbmApO1xuICAgIGNvbnN0IGFkZFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkUHJvamVjdEJ1dHRvbmApO1xuICAgIGFkZFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBvcGVuTmV3T2JqZWN0TW9kYWwpO1xuICAgIGFkZFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBvcGVuTmV3T2JqZWN0TW9kYWwpO1xuICAgIFxuICAgIGNvbnN0IHByb2plY3RVc2VySW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAucHJvamVjdFVzZXJJbnB1dHNgKTtcbiAgICBjb25zdCB0YXNrVXNlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnRhc2tVc2VySW5wdXRzYCk7XG4gICAgXG4gICAgZnVuY3Rpb24gb3Blbk5ld09iamVjdE1vZGFsKGUpIHtcbiAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgY29uc3QgYWRkT2JqZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxgKTtcbiAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSBgYWRkVGFza0J1dHRvbmApIHtcbiAgICAgICAgICAgIGFkZE9iamVjdE1vZGFsWzBdLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWRkT2JqZWN0TW9kYWxbMl0uc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgICAgIH1cbiAgICB9XG4gICAgXG4gICAgY29uc3Qgc3VibWl0UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRQcm9qZWN0U3VibWl0QnV0dG9uYCk7XG4gICAgY29uc3Qgc3VibWl0VGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNhZGRUYXNrU3VibWl0QnV0dG9uYCk7XG4gICAgY29uc3QgY2FuY2VsUHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxQcm9qZWN0YCk7XG4gICAgY29uc3QgY2FuY2VsVGFza0J1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjYW5jZWxUYXNrYCk7XG4gICAgXG4gICAgY2FuY2VsUHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjbG9zZU5ld09iamVjdE1vZGFsKGUudGFyZ2V0LmlkKSk7XG4gICAgY2FuY2VsVGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjbG9zZU5ld09iamVjdE1vZGFsKGUudGFyZ2V0LmlkKSk7XG4gICAgXG4gICAgc3VibWl0UHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKHByb2plY3RVc2VySW5wdXQpKSB7XG4gICAgICAgICAgICBpbnN0YW50aWF0ZU5ld1Byb2plY3QocHJvamVjdFVzZXJJbnB1dCk7XG4gICAgICAgICAgICBzdWJtaXROZXdPYmplY3RGb3JtKGUpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBzdWJtaXRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24odGFza1VzZXJJbnB1dCkpIHtcbiAgICAgICAgICAgIGluc3RhbnRpYXRlTmV3VGFzayh0YXNrVXNlcklucHV0KTtcbiAgICAgICAgICAgIHN1Ym1pdE5ld09iamVjdEZvcm0oZSk7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIFxuICAgIGZ1bmN0aW9uIHN1Ym1pdE5ld09iamVjdEZvcm0oZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgY2xvc2VOZXdPYmplY3RNb2RhbChldmVudC50YXJnZXQuaWQpO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBjbG9zZU5ld09iamVjdE1vZGFsKGJ1dHRvbklEKSB7XG4gICAgICAgIGNvbnN0IG1vZGFsVG9DbG9zZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5tb2RhbGApO1xuICAgICAgICBjb25zdCBmb3JtVG9SZXNldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5mb3JtRmllbGRgKTtcbiAgICAgICAgaWYgKGJ1dHRvbklEID09PSBgYWRkUHJvamVjdFN1Ym1pdEJ1dHRvbmAgfHwgYnV0dG9uSUQgPT09IGBjYW5jZWxQcm9qZWN0YCkge1xuICAgICAgICAgICAgbW9kYWxUb0Nsb3NlWzJdLnN0eWxlLmRpc3BsYXkgPSBgbm9uZWA7XG4gICAgICAgICAgICBmb3JtVG9SZXNldFsyXS5yZXNldCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgbW9kYWxUb0Nsb3NlWzBdLnN0eWxlLmRpc3BsYXkgPSBgbm9uZWA7XG4gICAgICAgICAgICBmb3JtVG9SZXNldFswXS5yZXNldCgpO1xuICAgICAgICB9XG4gICAgfVxuLy8gfSkoKTtcblxuLy8gbW9kdWxlIGNvbnRhaW5zIGZ1bmN0aW9ucyB0byBvcGVuLCBjbG9zZSBhbmQgc3VibWl0IGVkaXRUYXNrIGFuZCBlZGl0UHJvamVjdCBmb3JtIG1vZGFsc1xuLy8gY29uc3QgZWRpdE9iamVjdE1vZGFsTW9kdWxlID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IG1haW5Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbWFpbi1jb250ZW50YCk7XG4gICAgbWFpbkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGxldCBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICBpZiAoY3VycmVudFBhZ2UgIT09IGBvdmVydmlld2ApIHtcbiAgICAgICAgICAgIGN1cnJlbnRQYWdlID0gbWFpbkNvbnRhaW5lci5maXJzdENoaWxkLmZpcnN0Q2hpbGQuZmlyc3RDaGlsZC5maXJzdENoaWxkLmZpcnN0Q2hpbGQubmV4dFNpYmxpbmcudGV4dENvbnRlbnQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGUudGFyZ2V0LmNsYXNzTmFtZSA9PT0gYGVkaXQtdGFzay1idG5gKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrU2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5FZGl0VGFza01vZGFsKHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXRhc2stYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgdGFza1NlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LmRhdGFzZXQuaW5kZXhOdW1iZXI7XG4gICAgICAgICAgICBkZWxldGVUYXNrT2JqZWN0KHRhc2tTZWxlY3RlZEluZGV4LCBjdXJyZW50UGFnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZWRpdC1wcm9qZWN0LWJ0bmApIHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQucGFyZW50Tm9kZS5maXJzdENoaWxkLmxhc3RDaGlsZC50ZXh0Q29udGVudDtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RTZWxlY3RlZFRpdGxlLCBwcm9qZWN0U2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXByb2plY3QtYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQubGFzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkSW5kZXggPSBlLnRhcmdldC5wYXJlbnRFbGVtZW50LnBhcmVudEVsZW1lbnQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICAgICAgb3BlbkRlbGV0ZVByb2plY3RNb2RhbChwcm9qZWN0U2VsZWN0ZWRUaXRsZSwgcHJvamVjdFNlbGVjdGVkSW5kZXgpO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBvcGVuRWRpdFRhc2tNb2RhbCh0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSkge1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBlZGl0VGFza01vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrTW9kYWxgKTtcbiAgICAgICAgZWRpdFRhc2tNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgXG4gICAgICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgdGV4dCBpbnB1dHMgd2l0aCBleGlzdGluZyBkYXRhXG4gICAgICAgIGNvbnN0IGVkaXRUYXNrSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmVkaXRUYXNrSW5wdXRzYCk7XG4gICAgICAgIGVkaXRUYXNrSW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrVGl0bGV9YCk7XG4gICAgICAgIGVkaXRUYXNrSW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGF0ZUR1ZX1gKTtcbiAgICAgICAgZWRpdFRhc2tJbnB1dHNbMl0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS50YXNrc1t0YXNrVG9FZGl0SW5kZXhdLnRhc2tEZXNjcmlwdGlvbn1gKTtcbiAgICAgICAgZWRpdFRhc2tJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb247XG4gICAgICAgIFxuXG4gICAgICAgIGNvbnN0IGNvbmZpcm1UYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFRhc2tTdWJtaXRCdXR0b25gKTtcbiAgICAgICAgY29uZmlybVRhc2tFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24oZWRpdFRhc2tJbnB1dHMpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxpemVUYXNrRWRpdHMoZWRpdFRhc2tJbnB1dHMsIHRhc2tUb0VkaXRJbmRleCwgcGFnZURpc3BsYXllZFRpdGxlKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0VGFza01vZGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxUYXNrRWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsVGFza0VkaXRgKTtcbiAgICAgICAgY2FuY2VsVGFza0VkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gb3BlbkVkaXRQcm9qZWN0TW9kYWwocHJvamVjdFRvRWRpdFRpdGxlLCBwcm9qZWN0VG9FZGl0SW5kZXgpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0TW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjZWRpdFByb2plY3RNb2RhbGApO1xuICAgICAgICBlZGl0UHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgICAgICBcbiAgICAgICAgLy8gcHJlLXBvcHVsYXRlIHRoZSBlZGl0IGZvcm0gd2l0aCBleGlzdGluZyBkYXRhXG4gICAgICAgIGNvbnN0IGVkaXRQcm9qZWN0SW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmVkaXRQcm9qZWN0SW5wdXRzYCk7XG4gICAgICAgIGVkaXRQcm9qZWN0SW5wdXRzWzBdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0VGl0bGV9YCk7XG4gICAgICAgIGVkaXRQcm9qZWN0SW5wdXRzWzFdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGF0ZUR1ZX1gKTtcbiAgICAgICAgZWRpdFByb2plY3RJbnB1dHNbMl0uc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGAke2N1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0VG9FZGl0SW5kZXhdLnByb2plY3REZXNjcmlwdGlvbn1gKTtcbiAgICAgICAgZWRpdFByb2plY3RJbnB1dHNbMl0udGV4dENvbnRlbnQgPSBjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb247XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb25maXJtUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0U3VibWl0QnV0dG9uYCk7XG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24oZWRpdFByb2plY3RJbnB1dHMpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RJbnB1dHMsIHByb2plY3RUb0VkaXRJbmRleCwgcHJvamVjdFRvRWRpdFRpdGxlKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0UHJvamVjdE1vZGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxQcm9qZWN0RWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdEVkaXRgKTtcbiAgICAgICAgY2FuY2VsUHJvamVjdEVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtRGVsZXRlUHJvamVjdGApXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm0tZGVsZXRlLXRleHRgKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdE1lc3NhZ2UudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgcHJvamVjdCBcIiR7cHJvamVjdFRvRGVsZXRlVGl0bGV9XCIgYW5kIGFsbCBvZiBpdHMgdGFza3M/YDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbmZpcm1EZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybVByb2plY3REZWxldGVgKTtcbiAgICAgICAgY29uc3QgY2FuY2VsRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3REZWxldGVgKTtcbiAgICAgICAgXG4gICAgICAgIGNvbmZpcm1EZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNhbmNlbERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCBgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChkZWxldGVQcm9qZWN0TW9kYWwpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwobW9kYWxUb0Nsb3NlKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Ub1Jlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmZvcm1GaWVsZGApO1xuICAgICAgICBtb2RhbFRvQ2xvc2Uuc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgaWYgKG1vZGFsVG9DbG9zZSA9PT0gZWRpdFRhc2tNb2RhbCkge1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMV0ucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRQcm9qZWN0TW9kYWwpIHtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzNdLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4vLyB9KSgpO1xuXG5mdW5jdGlvbiBjaGVja0Zvcm1WYWxpZGF0aW9uKGlucHV0Tm9kZUxpc3QpIHtcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgaW5wdXROb2RlTGlzdC5mb3JFYWNoKCBpbnB1dEZpZWxkID0+IHtcbiAgICAgICAgaWYgKGlucHV0RmllbGQudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc1ZhbGlkXG59IiwiaW1wb3J0IHsgbG9hZE1haW5Db250ZW50IH0gZnJvbSAnLi9wYWdlTG9hZGVyLmpzJ1xuXG5sZXQgcHJvamVjdHNDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgcHJvamVjdFRpdGxlOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgcHJvamVjdERhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHByb2plY3QgZm9yIHRoZSBvZGluIHByb2plY3RgLFxuICAgICAgICBwcm9qZWN0SW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb2plY3RUaXRsZTogYGtlZXAgZ3JpbmRpbmdgLFxuICAgICAgICBwcm9qZWN0RGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdCBwcm9qZWN0IGZvciBteSBidWdneSB0b2RvIGxpc3QgYXBwYCxcbiAgICAgICAgcHJvamVjdEluZGV4OiAxLFxuICAgIH0sXG5dO1xuXG5sZXQgdGFza3NDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgcmVmYWN0b3IgY29kZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgbWFrZSBwcm9ncmVzc2AsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xMmAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgZG8gbW9yZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xM2AsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYGRlZmF1bHRgLFxuICAgICAgICB0YXNrSW5kZXg6IDIsXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0T2JqZWN0QXJyYXlzKCkge1xuICAgIGNvbnN0IHRhc2tBcnJheXMgPSB7XG4gICAgICAgIHByb2plY3RzOiBwcm9qZWN0c0NyZWF0ZWQsXG4gICAgICAgIHRhc2tzOiB0YXNrc0NyZWF0ZWRcbiAgICB9XG4gICAgcmV0dXJuIHRhc2tBcnJheXNcbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdFRpdGxlLCBwcm9qZWN0RGF0ZUR1ZSwgcHJvamVjdERlc2NyaXB0aW9uLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGU7XG4gICAgICAgIHRoaXMucHJvamVjdERhdGVEdWUgPSBwcm9qZWN0RGF0ZUR1ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGVzY3JpcHRpb24gPSBwcm9qZWN0RGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgIH1cbn1cblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGF0ZUR1ZSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrUHJpb3JpdHlTdGF0dXMsIHRhc2tQcm9qZWN0QXNzb2NpYXRlZCwgdGFza0luZGV4KSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlO1xuICAgICAgICB0aGlzLnRhc2tEYXRlRHVlID0gdGFza0RhdGVEdWU7XG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRhc2tQcmlvcml0eVN0YXR1cyA9IHRhc2tQcmlvcml0eVN0YXR1cztcbiAgICAgICAgdGhpcy50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSB0YXNrUHJvamVjdEFzc29jaWF0ZWQ7XG4gICAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFudGlhdGVOZXdUYXNrKG5ld1Rhc2tNb2RhbElucHV0cywgcGFnZVRvUmVmcmVzaCkge1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2tJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdUYXNrTW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Rhc2tUaXRsZSA9IG5ld1Rhc2tJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlRHVlID0gbmV3VGFza0lucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0Rlc2NyaXB0aW9uID0gbmV3VGFza0lucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1ByaW9yaXR5U3RhdHVzID0gbmV3VGFza0lucHV0QXJyYXlbM10udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkID0gbmV3VGFza0lucHV0QXJyYXlbNF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0luZGV4ID0gdGFza3NDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmV3VGFza1RpdGxlLCBuZXdUYXNrRGF0ZUR1ZSwgbmV3VGFza0Rlc2NyaXB0aW9uLCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMsIG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCwgbmV3VGFza0luZGV4KTtcbiAgICB0YXNrc0NyZWF0ZWQucHVzaChuZXdUYXNrKTtcblxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cbiAgICAgICAgXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Byb2plY3QobmV3UHJvamVjdE1vZGFsSW5wdXRzKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdElucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Byb2plY3RNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERhdGVEdWUgPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0SW5kZXggPSBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChuZXdQcm9qZWN0VGl0bGUsIG5ld1Byb2plY3REYXRlRHVlLCBuZXdQcm9qZWN0RGVzY3JpcHRpb24sIG5ld1Byb2plY3RJbmRleCk7XG4gICAgcHJvamVjdHNDcmVhdGVkLnB1c2gobmV3UHJvamVjdCk7XG5cbiAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBuZXdQcm9qZWN0LCBudWxsLCBgbmV3IHByb2plY3RgKTtcbn1cblxuZnVuY3Rpb24gZmluYWxpemVUYXNrRWRpdHMoZWRpdE1vZGFsSW5wdXRzLCB0YXJnZXRJbmRleCwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBjb25zdCBlZGl0ZWRUYXNrVGl0bGUgPSBlZGl0TW9kYWxJbnB1dHNbMF0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza0RhdGVEdWUgPSBlZGl0TW9kYWxJbnB1dHNbMV0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza0Rlc2NyaXB0aW9uID0gZWRpdE1vZGFsSW5wdXRzWzJdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tQcmlvcml0eVN0YXR1cyA9IGVkaXRNb2RhbElucHV0c1szXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrUHJvamVjdEFzc29jYWl0ZWQgPSBlZGl0TW9kYWxJbnB1dHNbNF0udmFsdWU7XG5cbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tUaXRsZSA9IGVkaXRlZFRhc2tUaXRsZTtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tEYXRlRHVlID0gZWRpdGVkVGFza0RhdGVEdWU7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrRGVzY3JpcHRpb24gPSBlZGl0ZWRUYXNrRGVzY3JpcHRpb247XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrUHJpb3JpdHlTdGF0dXMgPSBlZGl0ZWRUYXNrUHJpb3JpdHlTdGF0dXM7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBlZGl0ZWRUYXNrUHJvamVjdEFzc29jYWl0ZWQ7XG5cbiAgICBjb25zdCBwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCA9IHByb2plY3RzQ3JlYXRlZC5maW5kKG9iamVjdCA9PiBvYmplY3QucHJvamVjdFRpdGxlID09PSBjdXJyZW50UGFnZURpc3BsYXllZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2tPYmplY3QoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICB0YXNrc0NyZWF0ZWQuc3BsaWNlKGluZGV4T2ZUYXNrVG9EZWxldGUsIDEpO1xuICAgIHVwZGF0ZVRhc2tJbmRleChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRhc2tJbmRleChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIGZvciAobGV0IGkgPSBpbmRleE9mVGFza1RvRGVsZXRlOyBpIDwgdGFza3NDcmVhdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhc2tzQ3JlYXRlZFtpXS50YXNrSW5kZXggPSBpO1xuICAgIH1cbiAgICBjb25zdCBwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCA9IHByb2plY3RzQ3JlYXRlZC5maW5kKG9iamVjdCA9PiBvYmplY3QucHJvamVjdFRpdGxlID09PSBjdXJyZW50UGFnZURpc3BsYXllZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplUHJvamVjdEVkaXRzKGVkaXRQcm9qZWN0TW9kYWxJbnB1dHMsIHRhcmdldFByb2plY3RJbmRleCwgZXhpc3RpbmdQcm9qZWN0VGl0bGUpIHtcblxuICAgIGxldCB0YXNrc1RvTG9hZCA9IG51bGw7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdFRpdGxlID0gZWRpdFByb2plY3RNb2RhbElucHV0c1swXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0RGF0ZUR1ZSA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMV0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdERlc2NyaXB0aW9uID0gZWRpdFByb2plY3RNb2RhbElucHV0c1syXS52YWx1ZTtcblxuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3RUaXRsZSA9IGVkaXRlZFByb2plY3RUaXRsZTtcbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0RGF0ZUR1ZSA9IGVkaXRlZFByb2plY3REYXRlRHVlO1xuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3REZXNjcmlwdGlvbiA9IGVkaXRlZFByb2plY3REZXNjcmlwdGlvblxuXG4gICAgLy8gaWYgYSBwcm9qZWN0J3MgdGl0bGUgY2hhbmdlcywgdGhpcyB1cGRhdGVzIGFsbCBhc3NvY2lhdGVkIHRhc2tzJyB0YXNrUHJvamVjdEFzc29jaWF0ZWQgZGF0YSB0byB0aGUgbmV3IHByb2plY3QgdGl0bGUgXG4gICAgaWYgKGVkaXRlZFByb2plY3RUaXRsZSAhPT0gZXhpc3RpbmdQcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGV4aXN0aW5nUHJvamVjdFRpdGxlKTtcbiAgICAgICAgdGFza3NUb0xvYWQuZm9yRWFjaCggdGFza09iamVjdCA9PiB7XG4gICAgICAgICAgICB0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRlZFByb2plY3RUaXRsZTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoZXhpc3RpbmdQcm9qZWN0VGl0bGUpO1xuICAgIH1cblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgbGV0IHRhc2tJbmRleEZvckRlbGV0aW9uID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKG9iamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKG9iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IHByb2plY3RUb0RlbGV0ZVRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrSW5kZXhGb3JEZWxldGlvbi5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgLy8gZGVsZXRlcyB0aGUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHRoZSBkZWxldGVkIHByb2plY3QgYW5kIHVwZGF0ZXMgdGhlIHJlbWFpbmluZyB0YXNrIGluZGljZXNcbiAgICBmb3IgKGxldCBpID0gdGFza0luZGV4Rm9yRGVsZXRpb24ubGVuZ3RoOyBpID49IDE7IGktLSkge1xuICAgICAgICB0YXNrc0NyZWF0ZWQuc3BsaWNlKHRhc2tJbmRleEZvckRlbGV0aW9uW2ktMV0sIDEpO1xuICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPCB0YXNrc0NyZWF0ZWQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRhc2tzQ3JlYXRlZFtqXS50YXNrSW5kZXggPSBqO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvamVjdHNDcmVhdGVkLnNwbGljZShwcm9qZWN0VG9EZWxldGVJbmRleCwgMSk7XG5cbiAgICB1cGRhdGVQcm9qZWN0SW5kZXgocHJvamVjdFRvRGVsZXRlSW5kZXgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0SW5kZXgoaW5kZXhPZkRlbGV0ZWRQcm9qZWN0KSB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4T2ZEZWxldGVkUHJvamVjdDsgaSA8IHByb2plY3RzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9qZWN0c0NyZWF0ZWRbaV0ucHJvamVjdEluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihudWxsLCB0YXNrc0NyZWF0ZWQpO1xufVxuXG5mdW5jdGlvbiB0YXNrRmlsdGVyKHByb2plY3RBc3NvY2lhdGVkVGl0bGUpIHtcbiAgICBsZXQgdGFza3NBc3NvY2lhdGVkID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKHRhc2tPYmplY3QpID0+IHtcbiAgICAgICAgaWYgKHRhc2tPYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrc0Fzc29jaWF0ZWQucHVzaCh0YXNrT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRhc2tzQXNzb2NpYXRlZFxufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0T2JqZWN0VG9Mb2FkLCB0YXNrc0FycmF5VG9Mb2FkKSB7XG4gICAgaWYgKCFwcm9qZWN0T2JqZWN0VG9Mb2FkKSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIG51bGwsIHRhc2tzQ3JlYXRlZCwgYG92ZXJ2aWV3YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgcHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCwgcHJvamVjdE9iamVjdFRvTG9hZC5wcm9qZWN0VGl0bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBnZXRPYmplY3RBcnJheXMsXG4gICAgaW5zdGFudGlhdGVOZXdUYXNrLFxuICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdCxcbiAgICBmaW5hbGl6ZVRhc2tFZGl0cyxcbiAgICBmaW5hbGl6ZVByb2plY3RFZGl0cyxcbiAgICBkZWxldGVUYXNrT2JqZWN0LFxuICAgIGRlbGV0ZVByb2plY3RPYmplY3QsXG59IiwiY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcblxuZnVuY3Rpb24gbG9hZE1haW5Db250ZW50KHByb2plY3RzQXJyYXksIHByb2plY3RUb0xvYWQsIHRhc2tzQXJyYXksIHBhZ2VUb0Rpc3BsYXkpIHtcbiAgICB3aGlsZSAobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW5Db250YWluZXIucmVtb3ZlQ2hpbGQobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKVxuICAgIH1cbiAgICBpZiAocGFnZVRvRGlzcGxheSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3NPdmVydmlldyh0YXNrc0FycmF5KTtcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSBpZiAocGFnZVRvRGlzcGxheSA9PT0gYG5ldyBwcm9qZWN0YCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0VG9Mb2FkKVxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclRvRGlzcGxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheUV4aXN0aW5nUHJvamVjdChwcm9qZWN0VG9Mb2FkLCB0YXNrc0FycmF5KVxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclRvRGlzcGxheSk7XG4gICAgfVxuICAgIHByb2plY3RCdXR0b25zQW5kU2VsZWN0b3JzSGFuZGxlcihwcm9qZWN0c0FycmF5KVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGFza3NPdmVydmlldyhhcnJheU9mVGFza09iamVjdHMpIHtcbiAgICBjb25zdCBvdmVydmlld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IG92ZXJ2aWV3VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoMmApO1xuICAgIG92ZXJ2aWV3VGl0bGUudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXdgO1xuICAgIG92ZXJ2aWV3VGl0bGUuc2V0QXR0cmlidXRlKGBpZGAsIGBvdmVydmlldy1oZWFkZXJgKTtcbiAgICBvdmVydmlld0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWNvbnRhaW5lcmApO1xuICAgIG92ZXJ2aWV3Q29udGFpbmVyLmFwcGVuZENoaWxkKG92ZXJ2aWV3VGl0bGUpO1xuICAgIFxuICAgIGNvbnN0IHRhc2tzVG9EaXNwbGF5ID0gZGlzcGxheVRhc2tzKGFycmF5T2ZUYXNrT2JqZWN0cywgb3ZlcnZpZXdDb250YWluZXIsIHRydWUpXG4gICAgXG4gICAgcmV0dXJuIHRhc2tzVG9EaXNwbGF5XG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlUYXNrcyhhcnJheU9mVGFza09iamVjdHMsIGNvbnRhaW5lciwgdG9EaXNwbGF5UHJvamVjdEFzc29jaWF0aW9uKSB7XG4gICAgY29uc3QgYWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBhbGxUYXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LXRhc2tzLWNvbnRhaW5lcmApO1xuXG4gICAgY29uc3QgdGFza0hlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIHRhc2tIZWFkZXIuc2V0QXR0cmlidXRlKGBpZGAsIGB0YXNrLWhlYWRlcmApO1xuICAgIGNvbnN0IGhlYWRlclRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoNWApO1xuICAgIGNvbnN0IGhlYWRlckR1ZURhdGVMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgY29uc3QgaGVhZGVyRGVzY3JpcHRpb25MYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgY29uc3QgaGVhZGVyUHJpb3JpdHlMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgY29uc3QgaGVhZGVyUHJvamVjdEFzc29jaWF0ZWRMYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg1YCk7XG4gICAgaGVhZGVyVGl0bGVMYWJlbC50ZXh0Q29udGVudCA9IGB0YXNrYDtcbiAgICBoZWFkZXJEdWVEYXRlTGFiZWwudGV4dENvbnRlbnQgPSBgZHVlIGRhdGVgO1xuICAgIGhlYWRlckRlc2NyaXB0aW9uTGFiZWwudGV4dENvbnRlbnQgPSBgZGVzY3JpcHRpb25gO1xuICAgIGhlYWRlclByaW9yaXR5TGFiZWwudGV4dENvbnRlbnQgPSBgcHJpb3JpdHkgc3RhdHVzYDtcbiAgICBoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsLnRleHRDb250ZW50ID0gYGFzc29jaWF0ZWQgcHJvamVjdGA7XG5cbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlclRpdGxlTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyRHVlRGF0ZUxhYmVsKTtcbiAgICB0YXNrSGVhZGVyLmFwcGVuZENoaWxkKGhlYWRlckRlc2NyaXB0aW9uTGFiZWwpO1xuICAgIHRhc2tIZWFkZXIuYXBwZW5kQ2hpbGQoaGVhZGVyUHJpb3JpdHlMYWJlbCk7XG4gICAgaWYgKHRvRGlzcGxheVByb2plY3RBc3NvY2lhdGlvbikge1xuICAgICAgICB0YXNrSGVhZGVyLnNldEF0dHJpYnV0ZShgaWRgLCBgb3ZlcnZpZXctdGFzay1oZWFkZXJgKTtcbiAgICAgICAgdGFza0hlYWRlci5hcHBlbmRDaGlsZChoZWFkZXJQcm9qZWN0QXNzb2NpYXRlZExhYmVsKTtcbiAgICB9XG5cbiAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrSGVhZGVyKTtcbiAgICBcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGFycmF5T2ZUYXNrT2JqZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICBjb25zdCBuZXdUYXNrQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgICAgIGNvbnN0IHRhc2tUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGg0YCk7XG4gICAgICAgIGNvbnN0IHRhc2tEdWVEYXRlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tQcmlvcml0eVN0YXR1cyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza1Byb2plY3RBc3NvY2lhdGVkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrRWRpdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICBjb25zdCB0YXNrRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIFxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHRhc2stY29udGFpbmVyYCk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke2FycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrSW5kZXh9YCk7XG4gICAgICAgIHRhc2tUaXRsZS50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrVGl0bGU7XG4gICAgICAgIHRhc2tEdWVEYXRlLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tEYXRlRHVlO1xuICAgICAgICB0YXNrRGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0YXNrUHJpb3JpdHlTdGF0dXMudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1ByaW9yaXR5U3RhdHVzO1xuICAgICAgICB0YXNrUHJvamVjdEFzc29jaWF0ZWQudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza1Byb2plY3RBc3NvY2lhdGVkO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0YDtcbiAgICAgICAgdGFza0VkaXRCdXR0b24uY2xhc3NMaXN0LmFkZChgZWRpdC10YXNrLWJ0bmApO1xuICAgICAgICB0YXNrRGVsZXRlQnV0dG9uLnRleHRDb250ZW50ID0gYGRlbGV0ZWA7XG4gICAgICAgIHRhc2tEZWxldGVCdXR0b24uY2xhc3NMaXN0LmFkZChgZGVsZXRlLXRhc2stYnRuYCk7XG5cbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrVGl0bGUpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEdWVEYXRlKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVzY3JpcHRpb24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tQcmlvcml0eVN0YXR1cyk7XG4gICAgICAgIGlmICh0b0Rpc3BsYXlQcm9qZWN0QXNzb2NpYXRpb24pIHtcbiAgICAgICAgICAgIG5ld1Rhc2tDb250YWluZXIuc2V0QXR0cmlidXRlKGBpZGAsIGBvdmVydmlldy10YXNrLWNvbnRhaW5lcmApO1xuICAgICAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgICAgICB9XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0VkaXRCdXR0b24pO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZWxldGVCdXR0b24pO1xuXG4gICAgICAgIGFsbFRhc2tzQ29udGFpbmVyLmFwcGVuZENoaWxkKG5ld1Rhc2tDb250YWluZXIpO1xuICAgIH1cbiAgICBcbiAgICBjb250YWluZXIuYXBwZW5kQ2hpbGQoYWxsVGFza3NDb250YWluZXIpO1xuICAgIHJldHVybiBjb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheVByb2plY3QocHJvamVjdE9iamVjdCkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBjb25zdCBwcm9qZWN0SW5mb0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IHByb2plY3RJbmZvSGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlTGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBsYWJlbGApO1xuICAgIGNvbnN0IHByb2plY3RUaXRsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGgyYCk7XG4gICAgLy8gY29uc3QgcHJvamVjdER1ZUxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgbGFiZWxgKTtcbiAgICBjb25zdCBwcm9qZWN0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgY29uc3QgcHJvamVjdEVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgXG4gICAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWNvbnRhaW5lcmApO1xuICAgIHByb2plY3RJbmZvQ29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtaW5mby1jb250YWluZXJgKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWluZm8taGVhZGVyYCk7XG4gICAgcHJvamVjdFRpdGxlTGFiZWwuY2xhc3NMaXN0LmFkZChgcHJvamVjdC10aXRsZS1oZWFkZXJgKTtcbiAgICAvLyBwcm9qZWN0RHVlTGFiZWwuY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kYXRlLWhlYWRlcmApO1xuICAgIHByb2plY3REdWVEYXRlLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtZGF0ZS1kdWVgKTtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24uY2xhc3NMaXN0LmFkZChgcHJvamVjdC1kZXNjcmlwdGlvbmApO1xuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke3Byb2plY3RPYmplY3QucHJvamVjdEluZGV4fWApO1xuICAgIHByb2plY3RUaXRsZUxhYmVsLnRleHRDb250ZW50ID0gYHByb2plY3Q6YDtcbiAgICBwcm9qZWN0VGl0bGUudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAvLyBwcm9qZWN0RHVlTGFiZWwudGV4dENvbnRlbnQgPSBgZHVlOmA7XG4gICAgcHJvamVjdER1ZURhdGUudGV4dENvbnRlbnQgPSBgZHVlOiAke3Byb2plY3RPYmplY3QucHJvamVjdERhdGVEdWV9YDtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBgZGVzY3JpcHRpb246ICR7cHJvamVjdE9iamVjdC5wcm9qZWN0RGVzY3JpcHRpb259YDtcbiAgICBwcm9qZWN0RWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0IHByb2plY3RgO1xuICAgIHByb2plY3REZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBgZGVsZXRlIHByb2plY3RgO1xuICAgIHByb2plY3RFZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoYGVkaXQtcHJvamVjdC1idG5gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGRlbGV0ZS1wcm9qZWN0LWJ0bmApO1xuXG4gICAgcHJvamVjdFRpdGxlTGFiZWwuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlKTtcbiAgICAvLyBwcm9qZWN0RHVlTGFiZWwuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuXG4gICAgcHJvamVjdEluZm9IZWFkZXIuYXBwZW5kQ2hpbGQocHJvamVjdFRpdGxlTGFiZWwpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3REdWVEYXRlKTtcbiAgICAvLyBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RHVlTGFiZWwpO1xuICAgIHByb2plY3RJbmZvSGVhZGVyLmFwcGVuZENoaWxkKHByb2plY3RFZGl0QnV0dG9uKTtcbiAgICBwcm9qZWN0SW5mb0hlYWRlci5hcHBlbmRDaGlsZChwcm9qZWN0RGVsZXRlQnV0dG9uKTtcblxuICAgIHByb2plY3RJbmZvQ29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJbmZvSGVhZGVyKTtcbiAgICAvLyBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RHVlRGF0ZSk7XG4gICAgcHJvamVjdEluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcbiAgICAvLyBwcm9qZWN0SW5mb0NvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0RWRpdEJ1dHRvbik7XG4gICAgLy8gcHJvamVjdEluZm9Db250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlbGV0ZUJ1dHRvbik7XG5cbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RJbmZvQ29udGFpbmVyKTtcblxuICAgIHJldHVybiBwcm9qZWN0Q29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlFeGlzdGluZ1Byb2plY3QocHJvamVjdFRvRGlzcGxheU9iamVjdCwgcHJvamVjdFRhc2tzQXJyYXkpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyRGlzcGxheWVkID0gZGlzcGxheVByb2plY3QocHJvamVjdFRvRGlzcGxheU9iamVjdCk7XG4gICAgY29uc3QgcHJvamVjdFRhc2tzID0gZGlzcGxheVRhc2tzKHByb2plY3RUYXNrc0FycmF5LCBwcm9qZWN0Q29udGFpbmVyRGlzcGxheWVkLCBmYWxzZSk7XG4gICAgcmV0dXJuIHByb2plY3RUYXNrc1xufVxuXG4vLyB0aGlzIFwibW9kdWxlXCIgcmUtbG9hZHMgdGhlIGJ1dHRvbnMgYW5kIHNlbGVjdG9ycyBldmVyeSBwYWdlTG9hZCB3aXRoIHVwZGF0ZWQgcHJvamVjdHNDcmVhdGVkIGRhdGFcbmZ1bmN0aW9uIHByb2plY3RCdXR0b25zQW5kU2VsZWN0b3JzSGFuZGxlcihwcm9qZWN0c0NyZWF0ZWRBcnJheSkge1xuICAgIGNvbnN0IHByb2plY3RMaXN0SGVhZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWxpc3RgKTtcbiAgICBjb25zdCBhZGRUYXNrUHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtYXNzb2NpYXRlZGApO1xuICAgIGNvbnN0IGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXQtcHJvamVjdC1hc3NvY2lhdGVkYCk7XG4gICAgY29uc3QgcHJvamVjdHNBcnJheSA9IHByb2plY3RzQ3JlYXRlZEFycmF5O1xuXG4gICAgZnVuY3Rpb24gcmVtb3ZlRXhpc3RpbmdFbGVtZW50cyhwcm9qZWN0TGlzdCwgYWRkU2VsZWN0b3IsIGVkaXRTZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBhcnJheU9mQ29udGFpbmVycyA9IFtwcm9qZWN0TGlzdCwgYWRkU2VsZWN0b3IsIGVkaXRTZWxlY3Rvcl07XG5cbiAgICAgICAgYXJyYXlPZkNvbnRhaW5lcnMuZm9yRWFjaCggKGNvbnRhaW5lcikgPT4ge1xuICAgICAgICAgICAgd2hpbGUgKGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgICAgICAgICAgY29udGFpbmVyLnJlbW92ZUNoaWxkKGNvbnRhaW5lci5maXJzdENoaWxkKVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpIHtcblxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShgaWRgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLnNldEF0dHJpYnV0ZShgZGF0YS1pbmRleC1udW1iZXJgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RJbmRleCk7XG4gICAgICAgICAgICBuZXdQcm9qZWN0QnV0dG9uLmNsYXNzTGlzdC5hZGQoYHByb2plY3RMaXN0QnV0dG9uYCk7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIHByb2plY3RMaXN0SGVhZC5hcHBlbmRDaGlsZChuZXdQcm9qZWN0QnV0dG9uKTtcbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qZWN0c1RvU2VsZWN0b3JzKCkge1xuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3RvciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYG9wdGlvbmApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYGRlZmF1bHRgKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcbiAgICAgICAgYWRkVGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChkZWZhdWx0UHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgZGVmYXVsdGApO1xuICAgICAgICBkZWZhdWx0UHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXcgKGRlZmF1bHQpYDtcbiAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yKTtcbiAgICAgICAgXG4gICAgICAgIHByb2plY3RzQXJyYXkuZm9yRWFjaCggKHByb2plY3RPYmplY3QpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgY29uc3QgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgICAgIHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICBcbiAgICAgICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckFkZFRhc2tTZWxlY3Rvcik7XG4gICAgICAgICAgICBlZGl0VGFza1Byb2plY3RTZWxlY3Rvci5hcHBlbmRDaGlsZChwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIH0pXG4gICAgfVxuICAgIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3RIZWFkLCBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLCBlZGl0VGFza1Byb2plY3RTZWxlY3Rvcik7XG4gICAgYXBwZW5kUHJvamVjdEJ1dHRvbnNUb1Byb2plY3RMaXN0KCk7XG4gICAgYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpO1xufVxuXG5leHBvcnQge1xuICAgIGxvYWRNYWluQ29udGVudCxcbn0iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7fSBmcm9tICcuL2RhdGFNb2RhbEhhbmRsZXIuanMnXG5pbXBvcnQgeyBnZXRPYmplY3RBcnJheXMgfSBmcm9tICcuL29iamVjdERhdGFNYW5hZ2VtZW50LmpzJ1xuaW1wb3J0IHsgbG9hZE1haW5Db250ZW50IH0gZnJvbSAnLi9wYWdlTG9hZGVyLmpzJ1xuXG5jb25zdCBuYXZDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjbmF2LWNvbnRhaW5lcmApO1xuY29uc3QgcHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWJ1dHRvbmApO1xuY29uc3QgcHJvamVjdExpc3RDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1saXN0YCk7XG5cbm5hdkNvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHBhZ2VTZWxlY3Rvcik7XG5wcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IGNvbnNvbGUubG9nKGUudGFyZ2V0LnRleHRDb250ZW50KSk7XG5wcm9qZWN0TGlzdENvbnRhaW5lci5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIHByb2plY3RTZWxlY3Rvcik7XG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uKCkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGxvYWRNYWluQ29udGVudChjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHMsIG51bGwsIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcywgYG92ZXJ2aWV3YCk7XG59KSgpO1xuXG5mdW5jdGlvbiBwYWdlU2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IHBhZ2VTZWxlY3RlZFRpdGxlID0gZS50YXJnZXQudGV4dENvbnRlbnQ7XG4gICAgaWYgKHBhZ2VTZWxlY3RlZFRpdGxlID09PSBgb3ZlcnZpZXdgKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgICAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIHBhZ2VTZWxlY3RlZFRpdGxlKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIHByb2plY3RTZWxlY3RvcihlKSB7XG4gICAgY29uc3QgY3VycmVudE9iamVjdEFycmF5ID0gZ2V0T2JqZWN0QXJyYXlzKCk7XG4gICAgY29uc3QgcHJvamVjdENsaWNrZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkSW5kZXggPSBlLnRhcmdldC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuXG4gICAgbGV0IGFzc29jaWF0ZWRUYXNrc1RvTG9hZCA9IFtdO1xuICAgIGN1cnJlbnRPYmplY3RBcnJheS50YXNrcy5maWx0ZXIoICh0YXNrT2JqZWN0KSA9PiB7XG4gICAgICAgIGlmICh0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9PT0gcHJvamVjdENsaWNrZWRUaXRsZSkge1xuICAgICAgICAgICAgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLnB1c2godGFza09iamVjdCk7XG4gICAgICAgIH1cbiAgICB9KVxuXG4gICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RDbGlja2VkSW5kZXhdLCBhc3NvY2lhdGVkVGFza3NUb0xvYWQsIHByb2plY3RDbGlja2VkVGl0bGUpO1xufSJdLCJzb3VyY2VSb290IjoiIn0=