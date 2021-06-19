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
        const currentPage = mainContainer.firstChild.firstChild.textContent;
        if (e.target.className === `edit-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditTaskModal(taskSelectedIndex, currentPage);
        } else if (e.target.className === `delete-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            (0,_objectDataManagement_js__WEBPACK_IMPORTED_MODULE_0__.deleteTaskObject)(taskSelectedIndex, currentPage);
        } else if (e.target.className === `edit-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditProjectModal(projectSelectedTitle, projectSelectedIndex);
        } else if (e.target.className === `delete-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
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
        newTaskContainer.appendChild(taskProjectAssociated);
        newTaskContainer.appendChild(taskEditButton);
        newTaskContainer.appendChild(taskDeleteButton);

        allTasksContainer.appendChild(newTaskContainer);
    }
    
    container.appendChild(allTasksContainer);
    return container
}

function displayProject(projectObject) {
    const projectContainer = document.createElement(`div`);
    const projectTitle = document.createElement(`h2`);
    const projectDueDate = document.createElement(`p`);
    const projectDescription = document.createElement(`p`);
    const projectEditButton = document.createElement(`button`);
    const projectDeleteButton = document.createElement(`button`);
    
    projectContainer.classList.add(`project-container`);
    projectContainer.setAttribute(`data-index-number`, `${projectObject.projectIndex}`);
    projectTitle.textContent = projectObject.projectTitle;
    projectDueDate.textContent = projectObject.projectDateDue;
    projectDescription.textContent = projectObject.projectDescription;
    projectEditButton.textContent = `edit project`;
    projectDeleteButton.textContent = `delete project`;
    projectEditButton.classList.add(`edit-project-btn`);
    projectDeleteButton.classList.add(`delete-project-btn`);

    projectContainer.appendChild(projectTitle);
    projectContainer.appendChild(projectDueDate);
    projectContainer.appendChild(projectDescription);
    projectContainer.appendChild(projectEditButton);
    projectContainer.appendChild(projectDeleteButton);

    return projectContainer
}

function displayExistingProject(projectToDisplayObject, projectTasksArray) {
    const projectContainerDisplayed = displayProject(projectToDisplayObject);
    const projectTasks = displayTasks(projectTasksArray, projectContainerDisplayed);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvZGF0YU1vZGFsSGFuZGxlci5qcyIsIndlYnBhY2s6Ly90b2RvLWxpc3QvLi9zcmMvb2JqZWN0RGF0YU1hbmFnZW1lbnQuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL3BhZ2VMb2FkZXIuanMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG9kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG9kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFzTDs7QUFFdEw7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVksK0VBQXFCO0FBQ2pDO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQSxZQUFZLDRFQUFrQjtBQUM5QjtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBLFlBQVksMEVBQWdCO0FBQzVCLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxTQUFT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eUNBQXlDO1dBQ2pGO1dBQ0E7V0FDQSxFOzs7OztXQ1BBLHdGOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHNEQUFzRCxrQkFBa0I7V0FDeEU7V0FDQSwrQ0FBK0MsY0FBYztXQUM3RCxFOzs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNxQjtBQUNWOztBQUVqRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHlFQUFlO0FBQzlDLElBQUksK0RBQWU7QUFDbkIsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQSxtQ0FBbUMseUVBQWU7QUFDbEQsUUFBUSwrREFBZTtBQUN2QjtBQUNBOztBQUVBO0FBQ0EsK0JBQStCLHlFQUFlO0FBQzlDO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUwsSUFBSSxnRUFBZTtBQUNuQixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBnZXRPYmplY3RBcnJheXMsIGluc3RhbnRpYXRlTmV3VGFzaywgaW5zdGFudGlhdGVOZXdQcm9qZWN0LCBmaW5hbGl6ZVRhc2tFZGl0cywgZmluYWxpemVQcm9qZWN0RWRpdHMsIGRlbGV0ZVRhc2tPYmplY3QsIGRlbGV0ZVByb2plY3RPYmplY3QgfSBmcm9tICcuL29iamVjdERhdGFNYW5hZ2VtZW50LmpzJ1xuXG4vLyBtb2R1bGUgY29udGFpbnMgZnVuY3Rpb25zIHRvIG9wZW4sIGNsb3NlIGFuZCBzdWJtaXQgYWRkVGFzayBhbmQgYWRkUHJvamVjdCBmb3JtIG1vZGFsc1xuLy8gY29uc3QgbmV3T2JqZWN0TW9kYWxNb2R1bGUgPSAoZnVuY3Rpb24oKSB7XG5cbiAgICBjb25zdCBhZGRUYXNrQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFRhc2tCdXR0b25gKTtcbiAgICBjb25zdCBhZGRQcm9qZWN0QnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2FkZFByb2plY3RCdXR0b25gKTtcbiAgICBhZGRUYXNrQnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcbiAgICBhZGRQcm9qZWN0QnV0dG9uLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgb3Blbk5ld09iamVjdE1vZGFsKTtcbiAgICBcbiAgICBjb25zdCBwcm9qZWN0VXNlcklucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLnByb2plY3RVc2VySW5wdXRzYCk7XG4gICAgY29uc3QgdGFza1VzZXJJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC50YXNrVXNlcklucHV0c2ApO1xuICAgIFxuICAgIGZ1bmN0aW9uIG9wZW5OZXdPYmplY3RNb2RhbChlKSB7XG4gICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGNvbnN0IGFkZE9iamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm1vZGFsYCk7XG4gICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gYGFkZFRhc2tCdXR0b25gKSB7XG4gICAgICAgICAgICBhZGRPYmplY3RNb2RhbFswXS5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFkZE9iamVjdE1vZGFsWzJdLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgICAgICB9XG4gICAgfVxuICAgIFxuICAgIGNvbnN0IHN1Ym1pdFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkUHJvamVjdFN1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbnN0IHN1Ym1pdFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjYWRkVGFza1N1Ym1pdEJ1dHRvbmApO1xuICAgIGNvbnN0IGNhbmNlbFByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdGApO1xuICAgIGNvbnN0IGNhbmNlbFRhc2tCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsVGFza2ApO1xuICAgIFxuICAgIGNhbmNlbFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY2xvc2VOZXdPYmplY3RNb2RhbChlLnRhcmdldC5pZCkpO1xuICAgIGNhbmNlbFRhc2tCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4gY2xvc2VOZXdPYmplY3RNb2RhbChlLnRhcmdldC5pZCkpO1xuICAgIFxuICAgIHN1Ym1pdFByb2plY3RCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBpZiAoY2hlY2tGb3JtVmFsaWRhdGlvbihwcm9qZWN0VXNlcklucHV0KSkge1xuICAgICAgICAgICAgaW5zdGFudGlhdGVOZXdQcm9qZWN0KHByb2plY3RVc2VySW5wdXQpO1xuICAgICAgICAgICAgc3VibWl0TmV3T2JqZWN0Rm9ybShlKTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgc3VibWl0VGFza0J1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKHRhc2tVc2VySW5wdXQpKSB7XG4gICAgICAgICAgICBpbnN0YW50aWF0ZU5ld1Rhc2sodGFza1VzZXJJbnB1dCk7XG4gICAgICAgICAgICBzdWJtaXROZXdPYmplY3RGb3JtKGUpO1xuICAgICAgICB9XG4gICAgfSlcbiAgICBcbiAgICBmdW5jdGlvbiBzdWJtaXROZXdPYmplY3RGb3JtKGV2ZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIGNsb3NlTmV3T2JqZWN0TW9kYWwoZXZlbnQudGFyZ2V0LmlkKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gY2xvc2VOZXdPYmplY3RNb2RhbChidXR0b25JRCkge1xuICAgICAgICBjb25zdCBtb2RhbFRvQ2xvc2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubW9kYWxgKTtcbiAgICAgICAgY29uc3QgZm9ybVRvUmVzZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAuZm9ybUZpZWxkYCk7XG4gICAgICAgIGlmIChidXR0b25JRCA9PT0gYGFkZFByb2plY3RTdWJtaXRCdXR0b25gIHx8IGJ1dHRvbklEID09PSBgY2FuY2VsUHJvamVjdGApIHtcbiAgICAgICAgICAgIG1vZGFsVG9DbG9zZVsyXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMl0ucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG1vZGFsVG9DbG9zZVswXS5zdHlsZS5kaXNwbGF5ID0gYG5vbmVgO1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMF0ucmVzZXQoKTtcbiAgICAgICAgfVxuICAgIH1cbi8vIH0pKCk7XG5cbi8vIG1vZHVsZSBjb250YWlucyBmdW5jdGlvbnMgdG8gb3BlbiwgY2xvc2UgYW5kIHN1Ym1pdCBlZGl0VGFzayBhbmQgZWRpdFByb2plY3QgZm9ybSBtb2RhbHNcbi8vIGNvbnN0IGVkaXRPYmplY3RNb2RhbE1vZHVsZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBtYWluQ29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI21haW4tY29udGVudGApO1xuICAgIG1haW5Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBjb25zdCBjdXJyZW50UGFnZSA9IG1haW5Db250YWluZXIuZmlyc3RDaGlsZC5maXJzdENoaWxkLnRleHRDb250ZW50O1xuICAgICAgICBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZWRpdC10YXNrLWJ0bmApIHtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tTZWxlY3RlZEluZGV4ID0gZS50YXJnZXQucGFyZW50RWxlbWVudC5kYXRhc2V0LmluZGV4TnVtYmVyO1xuICAgICAgICAgICAgb3BlbkVkaXRUYXNrTW9kYWwodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBkZWxldGUtdGFzay1idG5gKSB7XG4gICAgICAgICAgICBjb25zdCB0YXNrU2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIGRlbGV0ZVRhc2tPYmplY3QodGFza1NlbGVjdGVkSW5kZXgsIGN1cnJlbnRQYWdlKTtcbiAgICAgICAgfSBlbHNlIGlmIChlLnRhcmdldC5jbGFzc05hbWUgPT09IGBlZGl0LXByb2plY3QtYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RTZWxlY3RlZFRpdGxlLCBwcm9qZWN0U2VsZWN0ZWRJbmRleCk7XG4gICAgICAgIH0gZWxzZSBpZiAoZS50YXJnZXQuY2xhc3NOYW1lID09PSBgZGVsZXRlLXByb2plY3QtYnRuYCkge1xuICAgICAgICAgICAgY29uc3QgcHJvamVjdFNlbGVjdGVkVGl0bGUgPSBlLnRhcmdldC5wYXJlbnROb2RlLmZpcnN0Q2hpbGQudGV4dENvbnRlbnQ7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0U2VsZWN0ZWRJbmRleCA9IGUudGFyZ2V0LnBhcmVudEVsZW1lbnQuZGF0YXNldC5pbmRleE51bWJlcjtcbiAgICAgICAgICAgIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFNlbGVjdGVkVGl0bGUsIHByb2plY3RTZWxlY3RlZEluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gb3BlbkVkaXRUYXNrTW9kYWwodGFza1RvRWRpdEluZGV4LCBwYWdlRGlzcGxheWVkVGl0bGUpIHtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZWRpdFRhc2tNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0VGFza01vZGFsYCk7XG4gICAgICAgIGVkaXRUYXNrTW9kYWwuc3R5bGUuZGlzcGxheSA9IGBibG9ja2A7XG4gICAgICAgIFxuICAgICAgICAvLyBwcmUtcG9wdWxhdGUgdGhlIHRleHQgaW5wdXRzIHdpdGggZXhpc3RpbmcgZGF0YVxuICAgICAgICBjb25zdCBlZGl0VGFza0lucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0VGFza0lucHV0c2ApO1xuICAgICAgICBlZGl0VGFza0lucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza1RpdGxlfWApO1xuICAgICAgICBlZGl0VGFza0lucHV0c1sxXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnRhc2tzW3Rhc2tUb0VkaXRJbmRleF0udGFza0RhdGVEdWV9YCk7XG4gICAgICAgIGVkaXRUYXNrSW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkudGFza3NbdGFza1RvRWRpdEluZGV4XS50YXNrRGVzY3JpcHRpb259YCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb25maXJtVGFza0VkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRUYXNrU3VibWl0QnV0dG9uYCk7XG4gICAgICAgIGNvbmZpcm1UYXNrRWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGlmIChjaGVja0Zvcm1WYWxpZGF0aW9uKGVkaXRUYXNrSW5wdXRzKSkge1xuICAgICAgICAgICAgICAgIGZpbmFsaXplVGFza0VkaXRzKGVkaXRUYXNrSW5wdXRzLCB0YXNrVG9FZGl0SW5kZXgsIHBhZ2VEaXNwbGF5ZWRUaXRsZSk7XG4gICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFRhc2tNb2RhbCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgY2FuY2VsVGFza0VkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFRhc2tFZGl0YCk7XG4gICAgICAgIGNhbmNlbFRhc2tFZGl0cy5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiB7XG4gICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBjbG9zZUVkaXRPckRlbGV0ZU1vZGFsKGVkaXRUYXNrTW9kYWwpO1xuICAgICAgICB9KVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5FZGl0UHJvamVjdE1vZGFsKHByb2plY3RUb0VkaXRUaXRsZSwgcHJvamVjdFRvRWRpdEluZGV4KSB7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcblxuICAgICAgICBjb25zdCBlZGl0UHJvamVjdE1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0TW9kYWxgKTtcbiAgICAgICAgZWRpdFByb2plY3RNb2RhbC5zdHlsZS5kaXNwbGF5ID0gYGJsb2NrYDtcbiAgICAgICAgXG4gICAgICAgIC8vIHByZS1wb3B1bGF0ZSB0aGUgZWRpdCBmb3JtIHdpdGggZXhpc3RpbmcgZGF0YVxuICAgICAgICBjb25zdCBlZGl0UHJvamVjdElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5lZGl0UHJvamVjdElucHV0c2ApO1xuICAgICAgICBlZGl0UHJvamVjdElucHV0c1swXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdFRpdGxlfWApO1xuICAgICAgICBlZGl0UHJvamVjdElucHV0c1sxXS5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYCR7Y3VycmVudE9iamVjdEFycmF5LnByb2plY3RzW3Byb2plY3RUb0VkaXRJbmRleF0ucHJvamVjdERhdGVEdWV9YCk7XG4gICAgICAgIGVkaXRQcm9qZWN0SW5wdXRzWzJdLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBgJHtjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHNbcHJvamVjdFRvRWRpdEluZGV4XS5wcm9qZWN0RGVzY3JpcHRpb259YCk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjb25maXJtUHJvamVjdEVkaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2VkaXRQcm9qZWN0U3VibWl0QnV0dG9uYCk7XG4gICAgICAgIGNvbmZpcm1Qcm9qZWN0RWRpdHMuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgaWYgKGNoZWNrRm9ybVZhbGlkYXRpb24oZWRpdFByb2plY3RJbnB1dHMpKSB7XG4gICAgICAgICAgICAgICAgZmluYWxpemVQcm9qZWN0RWRpdHMoZWRpdFByb2plY3RJbnB1dHMsIHByb2plY3RUb0VkaXRJbmRleCwgcHJvamVjdFRvRWRpdFRpdGxlKTtcbiAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChlZGl0UHJvamVjdE1vZGFsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIFxuICAgICAgICBjb25zdCBjYW5jZWxQcm9qZWN0RWRpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY2FuY2VsUHJvamVjdEVkaXRgKTtcbiAgICAgICAgY2FuY2VsUHJvamVjdEVkaXRzLmFkZEV2ZW50TGlzdGVuZXIoYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZWRpdFByb2plY3RNb2RhbCk7XG4gICAgICAgIH0pXG4gICAgICAgIFxuICAgIH1cblxuICAgIGZ1bmN0aW9uIG9wZW5EZWxldGVQcm9qZWN0TW9kYWwocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgICAgIGNvbnNvbGUubG9nKHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNb2RhbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNjb25maXJtRGVsZXRlUHJvamVjdGApXG4gICAgICAgIGNvbnN0IGRlbGV0ZVByb2plY3RNZXNzYWdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NvbmZpcm0tZGVsZXRlLXRleHRgKTtcbiAgICAgICAgZGVsZXRlUHJvamVjdE1lc3NhZ2UudGV4dENvbnRlbnQgPSBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgcHJvamVjdCBcIiR7cHJvamVjdFRvRGVsZXRlVGl0bGV9XCIgYW5kIGFsbCBvZiBpdHMgdGFza3M/YDtcbiAgICAgICAgXG4gICAgICAgIGNvbnN0IGNvbmZpcm1EZWxldGVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjY29uZmlybVByb2plY3REZWxldGVgKTtcbiAgICAgICAgY29uc3QgY2FuY2VsRGVsZXRlQnV0dG9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI2NhbmNlbFByb2plY3REZWxldGVgKTtcbiAgICAgICAgXG4gICAgICAgIGNvbmZpcm1EZWxldGVCdXR0b24uYWRkRXZlbnRMaXN0ZW5lciggYGNsaWNrYCwgKGUpID0+IHtcbiAgICAgICAgICAgIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwoZGVsZXRlUHJvamVjdE1vZGFsKTtcbiAgICAgICAgICAgIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KTtcbiAgICAgICAgfSlcbiAgICAgICAgXG4gICAgICAgIGNhbmNlbERlbGV0ZUJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKCBgY2xpY2tgLCAoZSkgPT4ge1xuICAgICAgICAgICAgY2xvc2VFZGl0T3JEZWxldGVNb2RhbChkZWxldGVQcm9qZWN0TW9kYWwpO1xuICAgICAgICB9KVxuICAgICAgICBcbiAgICAgICAgZGVsZXRlUHJvamVjdE1vZGFsLnN0eWxlLmRpc3BsYXkgPSBgYmxvY2tgO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlRWRpdE9yRGVsZXRlTW9kYWwobW9kYWxUb0Nsb3NlKSB7XG4gICAgICAgIGNvbnN0IGZvcm1Ub1Jlc2V0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLmZvcm1GaWVsZGApO1xuICAgICAgICBtb2RhbFRvQ2xvc2Uuc3R5bGUuZGlzcGxheSA9IGBub25lYDtcbiAgICAgICAgaWYgKG1vZGFsVG9DbG9zZSA9PT0gZWRpdFRhc2tNb2RhbCkge1xuICAgICAgICAgICAgZm9ybVRvUmVzZXRbMV0ucmVzZXQoKTtcbiAgICAgICAgfSBlbHNlIGlmIChtb2RhbFRvQ2xvc2UgPT09IGVkaXRQcm9qZWN0TW9kYWwpIHtcbiAgICAgICAgICAgIGZvcm1Ub1Jlc2V0WzNdLnJlc2V0KCk7XG4gICAgICAgIH1cbiAgICB9XG4vLyB9KSgpO1xuXG5mdW5jdGlvbiBjaGVja0Zvcm1WYWxpZGF0aW9uKGlucHV0Tm9kZUxpc3QpIHtcbiAgICBsZXQgaXNWYWxpZCA9IHRydWU7XG4gICAgaW5wdXROb2RlTGlzdC5mb3JFYWNoKCBpbnB1dEZpZWxkID0+IHtcbiAgICAgICAgaWYgKGlucHV0RmllbGQudmFsaWRpdHkudmFsdWVNaXNzaW5nKSB7XG4gICAgICAgICAgICBpc1ZhbGlkID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9KVxuICAgIHJldHVybiBpc1ZhbGlkXG59IiwiaW1wb3J0IHsgbG9hZE1haW5Db250ZW50IH0gZnJvbSAnLi9wYWdlTG9hZGVyLmpzJ1xuXG5sZXQgcHJvamVjdHNDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgcHJvamVjdFRpdGxlOiBgdG9kbyBsaXN0YCxcbiAgICAgICAgcHJvamVjdERhdGVEdWU6IGAyMDIxLTA2LTIwYCxcbiAgICAgICAgcHJvamVjdERlc2NyaXB0aW9uOiBgdGhpcyBpcyBhIHByb2plY3QgZm9yIHRoZSBvZGluIHByb2plY3RgLFxuICAgICAgICBwcm9qZWN0SW5kZXg6IDAsXG4gICAgfSxcbiAgICB7XG4gICAgICAgIHByb2plY3RUaXRsZTogYGtlZXAgZ3JpbmRpbmdgLFxuICAgICAgICBwcm9qZWN0RGF0ZUR1ZTogYDIwMjEtMDYtMjBgLFxuICAgICAgICBwcm9qZWN0RGVzY3JpcHRpb246IGB0aGlzIGlzIGEgdGVzdCBwcm9qZWN0IGZvciBteSBidWdneSB0b2RvIGxpc3QgYXBwYCxcbiAgICAgICAgcHJvamVjdEluZGV4OiAxLFxuICAgIH0sXG5dO1xuXG5sZXQgdGFza3NDcmVhdGVkID0gW1xuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgcmVmYWN0b3IgY29kZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0yMGAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMCxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgbWFrZSBwcm9ncmVzc2AsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xMmAsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYHRvZG8gbGlzdGAsXG4gICAgICAgIHRhc2tJbmRleDogMSxcbiAgICB9LFxuICAgIHtcbiAgICAgICAgdGFza1RpdGxlOiBgZG8gbW9yZWAsXG4gICAgICAgIHRhc2tEYXRlRHVlOiBgMjAyMS0wNi0xM2AsXG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbjogYHRoaXMgaXMgYSB0ZXN0YCxcbiAgICAgICAgdGFza1ByaW9yaXR5U3RhdHVzOiBgaGlnaGAsXG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZDogYGRlZmF1bHRgLFxuICAgICAgICB0YXNrSW5kZXg6IDIsXG4gICAgfVxuXTtcblxuZnVuY3Rpb24gZ2V0T2JqZWN0QXJyYXlzKCkge1xuICAgIGNvbnN0IHRhc2tBcnJheXMgPSB7XG4gICAgICAgIHByb2plY3RzOiBwcm9qZWN0c0NyZWF0ZWQsXG4gICAgICAgIHRhc2tzOiB0YXNrc0NyZWF0ZWRcbiAgICB9XG4gICAgcmV0dXJuIHRhc2tBcnJheXNcbn1cblxuY2xhc3MgUHJvamVjdCB7XG4gICAgY29uc3RydWN0b3IocHJvamVjdFRpdGxlLCBwcm9qZWN0RGF0ZUR1ZSwgcHJvamVjdERlc2NyaXB0aW9uLCBwcm9qZWN0SW5kZXgpIHtcbiAgICAgICAgdGhpcy5wcm9qZWN0VGl0bGUgPSBwcm9qZWN0VGl0bGU7XG4gICAgICAgIHRoaXMucHJvamVjdERhdGVEdWUgPSBwcm9qZWN0RGF0ZUR1ZTtcbiAgICAgICAgdGhpcy5wcm9qZWN0RGVzY3JpcHRpb24gPSBwcm9qZWN0RGVzY3JpcHRpb247XG4gICAgICAgIHRoaXMucHJvamVjdEluZGV4ID0gcHJvamVjdEluZGV4O1xuICAgIH1cbn1cblxuY2xhc3MgVGFzayB7XG4gICAgY29uc3RydWN0b3IodGFza1RpdGxlLCB0YXNrRGF0ZUR1ZSwgdGFza0Rlc2NyaXB0aW9uLCB0YXNrUHJpb3JpdHlTdGF0dXMsIHRhc2tQcm9qZWN0QXNzb2NpYXRlZCwgdGFza0luZGV4KSB7XG4gICAgICAgIHRoaXMudGFza1RpdGxlID0gdGFza1RpdGxlO1xuICAgICAgICB0aGlzLnRhc2tEYXRlRHVlID0gdGFza0RhdGVEdWU7XG4gICAgICAgIHRoaXMudGFza0Rlc2NyaXB0aW9uID0gdGFza0Rlc2NyaXB0aW9uO1xuICAgICAgICB0aGlzLnRhc2tQcmlvcml0eVN0YXR1cyA9IHRhc2tQcmlvcml0eVN0YXR1cztcbiAgICAgICAgdGhpcy50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSB0YXNrUHJvamVjdEFzc29jaWF0ZWQ7XG4gICAgICAgIHRoaXMudGFza0luZGV4ID0gdGFza0luZGV4O1xuICAgIH1cbn1cblxuZnVuY3Rpb24gaW5zdGFudGlhdGVOZXdUYXNrKG5ld1Rhc2tNb2RhbElucHV0cywgcGFnZVRvUmVmcmVzaCkge1xuICAgIFxuICAgIGNvbnN0IG5ld1Rhc2tJbnB1dEFycmF5ID0gQXJyYXkuZnJvbShuZXdUYXNrTW9kYWxJbnB1dHMpO1xuICAgIGNvbnN0IG5ld1Rhc2tUaXRsZSA9IG5ld1Rhc2tJbnB1dEFycmF5WzBdLnZhbHVlO1xuICAgIGNvbnN0IG5ld1Rhc2tEYXRlRHVlID0gbmV3VGFza0lucHV0QXJyYXlbMV0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0Rlc2NyaXB0aW9uID0gbmV3VGFza0lucHV0QXJyYXlbMl0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1ByaW9yaXR5U3RhdHVzID0gbmV3VGFza0lucHV0QXJyYXlbM10udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza1Byb2plY3RBc3NvY2lhdGVkID0gbmV3VGFza0lucHV0QXJyYXlbNF0udmFsdWU7XG4gICAgY29uc3QgbmV3VGFza0luZGV4ID0gdGFza3NDcmVhdGVkLmxlbmd0aDtcbiAgICBcbiAgICBjb25zdCBuZXdUYXNrID0gbmV3IFRhc2sobmV3VGFza1RpdGxlLCBuZXdUYXNrRGF0ZUR1ZSwgbmV3VGFza0Rlc2NyaXB0aW9uLCBuZXdUYXNrUHJpb3JpdHlTdGF0dXMsIG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCwgbmV3VGFza0luZGV4KTtcbiAgICB0YXNrc0NyZWF0ZWQucHVzaChuZXdUYXNrKTtcblxuICAgIGNvbnN0IHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkID0gcHJvamVjdHNDcmVhdGVkLmZpbmQob2JqZWN0ID0+IG9iamVjdC5wcm9qZWN0VGl0bGUgPT09IG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKG5ld1Rhc2tQcm9qZWN0QXNzb2NpYXRlZCk7XG4gICAgXG4gICAgbG9hZENvbnRlbnRIZWxwZXIocHJvamVjdEFzc29jaWF0ZWRUb0xvYWQsIHRhc2tzVG9Mb2FkKTtcbn1cbiAgICAgICAgXG5mdW5jdGlvbiBpbnN0YW50aWF0ZU5ld1Byb2plY3QobmV3UHJvamVjdE1vZGFsSW5wdXRzKSB7XG4gICAgY29uc3QgbmV3UHJvamVjdElucHV0QXJyYXkgPSBBcnJheS5mcm9tKG5ld1Byb2plY3RNb2RhbElucHV0cyk7XG4gICAgY29uc3QgbmV3UHJvamVjdFRpdGxlID0gbmV3UHJvamVjdElucHV0QXJyYXlbMF0udmFsdWU7XG4gICAgY29uc3QgbmV3UHJvamVjdERhdGVEdWUgPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsxXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0RGVzY3JpcHRpb24gPSBuZXdQcm9qZWN0SW5wdXRBcnJheVsyXS52YWx1ZTtcbiAgICBjb25zdCBuZXdQcm9qZWN0SW5kZXggPSBwcm9qZWN0c0NyZWF0ZWQubGVuZ3RoO1xuICAgIFxuICAgIGNvbnN0IG5ld1Byb2plY3QgPSBuZXcgUHJvamVjdChuZXdQcm9qZWN0VGl0bGUsIG5ld1Byb2plY3REYXRlRHVlLCBuZXdQcm9qZWN0RGVzY3JpcHRpb24sIG5ld1Byb2plY3RJbmRleCk7XG4gICAgcHJvamVjdHNDcmVhdGVkLnB1c2gobmV3UHJvamVjdCk7XG5cbiAgICBsb2FkTWFpbkNvbnRlbnQocHJvamVjdHNDcmVhdGVkLCBuZXdQcm9qZWN0LCBudWxsLCBgbmV3IHByb2plY3RgKTtcbn1cblxuZnVuY3Rpb24gZmluYWxpemVUYXNrRWRpdHMoZWRpdE1vZGFsSW5wdXRzLCB0YXJnZXRJbmRleCwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICBjb25zdCBlZGl0ZWRUYXNrVGl0bGUgPSBlZGl0TW9kYWxJbnB1dHNbMF0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza0RhdGVEdWUgPSBlZGl0TW9kYWxJbnB1dHNbMV0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkVGFza0Rlc2NyaXB0aW9uID0gZWRpdE1vZGFsSW5wdXRzWzJdLnZhbHVlO1xuICAgIGNvbnN0IGVkaXRlZFRhc2tQcmlvcml0eVN0YXR1cyA9IGVkaXRNb2RhbElucHV0c1szXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRUYXNrUHJvamVjdEFzc29jYWl0ZWQgPSBlZGl0TW9kYWxJbnB1dHNbNF0udmFsdWU7XG5cbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tUaXRsZSA9IGVkaXRlZFRhc2tUaXRsZTtcbiAgICB0YXNrc0NyZWF0ZWRbdGFyZ2V0SW5kZXhdLnRhc2tEYXRlRHVlID0gZWRpdGVkVGFza0RhdGVEdWU7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrRGVzY3JpcHRpb24gPSBlZGl0ZWRUYXNrRGVzY3JpcHRpb247XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrUHJpb3JpdHlTdGF0dXMgPSBlZGl0ZWRUYXNrUHJpb3JpdHlTdGF0dXM7XG4gICAgdGFza3NDcmVhdGVkW3RhcmdldEluZGV4XS50YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBlZGl0ZWRUYXNrUHJvamVjdEFzc29jYWl0ZWQ7XG5cbiAgICBjb25zdCBwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCA9IHByb2plY3RzQ3JlYXRlZC5maW5kKG9iamVjdCA9PiBvYmplY3QucHJvamVjdFRpdGxlID09PSBjdXJyZW50UGFnZURpc3BsYXllZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVRhc2tPYmplY3QoaW5kZXhPZlRhc2tUb0RlbGV0ZSwgY3VycmVudFBhZ2VEaXNwbGF5ZWQpIHtcbiAgICB0YXNrc0NyZWF0ZWQuc3BsaWNlKGluZGV4T2ZUYXNrVG9EZWxldGUsIDEpO1xuICAgIHVwZGF0ZVRhc2tJbmRleChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZVRhc2tJbmRleChpbmRleE9mVGFza1RvRGVsZXRlLCBjdXJyZW50UGFnZURpc3BsYXllZCkge1xuICAgIGZvciAobGV0IGkgPSBpbmRleE9mVGFza1RvRGVsZXRlOyBpIDwgdGFza3NDcmVhdGVkLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIHRhc2tzQ3JlYXRlZFtpXS50YXNrSW5kZXggPSBpO1xuICAgIH1cbiAgICBjb25zdCBwcm9qZWN0QXNzb2NpYXRlZFRvTG9hZCA9IHByb2plY3RzQ3JlYXRlZC5maW5kKG9iamVjdCA9PiBvYmplY3QucHJvamVjdFRpdGxlID09PSBjdXJyZW50UGFnZURpc3BsYXllZCk7XG4gICAgY29uc3QgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGN1cnJlbnRQYWdlRGlzcGxheWVkKTtcblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RBc3NvY2lhdGVkVG9Mb2FkLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGZpbmFsaXplUHJvamVjdEVkaXRzKGVkaXRQcm9qZWN0TW9kYWxJbnB1dHMsIHRhcmdldFByb2plY3RJbmRleCwgZXhpc3RpbmdQcm9qZWN0VGl0bGUpIHtcblxuICAgIGxldCB0YXNrc1RvTG9hZCA9IG51bGw7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdFRpdGxlID0gZWRpdFByb2plY3RNb2RhbElucHV0c1swXS52YWx1ZTtcbiAgICBjb25zdCBlZGl0ZWRQcm9qZWN0RGF0ZUR1ZSA9IGVkaXRQcm9qZWN0TW9kYWxJbnB1dHNbMV0udmFsdWU7XG4gICAgY29uc3QgZWRpdGVkUHJvamVjdERlc2NyaXB0aW9uID0gZWRpdFByb2plY3RNb2RhbElucHV0c1syXS52YWx1ZTtcblxuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3RUaXRsZSA9IGVkaXRlZFByb2plY3RUaXRsZTtcbiAgICBwcm9qZWN0c0NyZWF0ZWRbdGFyZ2V0UHJvamVjdEluZGV4XS5wcm9qZWN0RGF0ZUR1ZSA9IGVkaXRlZFByb2plY3REYXRlRHVlO1xuICAgIHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLnByb2plY3REZXNjcmlwdGlvbiA9IGVkaXRlZFByb2plY3REZXNjcmlwdGlvblxuXG4gICAgLy8gaWYgYSBwcm9qZWN0J3MgdGl0bGUgY2hhbmdlcywgdGhpcyB1cGRhdGVzIGFsbCBhc3NvY2lhdGVkIHRhc2tzJyB0YXNrUHJvamVjdEFzc29jaWF0ZWQgZGF0YSB0byB0aGUgbmV3IHByb2plY3QgdGl0bGUgXG4gICAgaWYgKGVkaXRlZFByb2plY3RUaXRsZSAhPT0gZXhpc3RpbmdQcm9qZWN0VGl0bGUpIHtcbiAgICAgICAgdGFza3NUb0xvYWQgPSB0YXNrRmlsdGVyKGV4aXN0aW5nUHJvamVjdFRpdGxlKTtcbiAgICAgICAgdGFza3NUb0xvYWQuZm9yRWFjaCggdGFza09iamVjdCA9PiB7XG4gICAgICAgICAgICB0YXNrT2JqZWN0LnRhc2tQcm9qZWN0QXNzb2NpYXRlZCA9IGVkaXRlZFByb2plY3RUaXRsZTtcbiAgICAgICAgfSlcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXNrc1RvTG9hZCA9IHRhc2tGaWx0ZXIoZXhpc3RpbmdQcm9qZWN0VGl0bGUpO1xuICAgIH1cblxuICAgIGxvYWRDb250ZW50SGVscGVyKHByb2plY3RzQ3JlYXRlZFt0YXJnZXRQcm9qZWN0SW5kZXhdLCB0YXNrc1RvTG9hZCk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVByb2plY3RPYmplY3QocHJvamVjdFRvRGVsZXRlVGl0bGUsIHByb2plY3RUb0RlbGV0ZUluZGV4KSB7XG4gICAgbGV0IHRhc2tJbmRleEZvckRlbGV0aW9uID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKG9iamVjdCwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKG9iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IHByb2plY3RUb0RlbGV0ZVRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrSW5kZXhGb3JEZWxldGlvbi5wdXNoKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgXG4gICAgLy8gZGVsZXRlcyB0aGUgdGFza3MgYXNzb2NpYXRlZCB3aXRoIHRoZSBkZWxldGVkIHByb2plY3QgYW5kIHVwZGF0ZXMgdGhlIHJlbWFpbmluZyB0YXNrIGluZGljZXNcbiAgICBmb3IgKGxldCBpID0gdGFza0luZGV4Rm9yRGVsZXRpb24ubGVuZ3RoOyBpID49IDE7IGktLSkge1xuICAgICAgICB0YXNrc0NyZWF0ZWQuc3BsaWNlKHRhc2tJbmRleEZvckRlbGV0aW9uW2ktMV0sIDEpO1xuICAgICAgICBmb3IgKGxldCBqID0gaSAtIDE7IGogPCB0YXNrc0NyZWF0ZWQubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgICAgIHRhc2tzQ3JlYXRlZFtqXS50YXNrSW5kZXggPSBqO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJvamVjdHNDcmVhdGVkLnNwbGljZShwcm9qZWN0VG9EZWxldGVJbmRleCwgMSk7XG5cbiAgICB1cGRhdGVQcm9qZWN0SW5kZXgocHJvamVjdFRvRGVsZXRlSW5kZXgpO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVQcm9qZWN0SW5kZXgoaW5kZXhPZkRlbGV0ZWRQcm9qZWN0KSB7XG4gICAgZm9yIChsZXQgaSA9IGluZGV4T2ZEZWxldGVkUHJvamVjdDsgaSA8IHByb2plY3RzQ3JlYXRlZC5sZW5ndGg7IGkrKykge1xuICAgICAgICBwcm9qZWN0c0NyZWF0ZWRbaV0ucHJvamVjdEluZGV4ID0gaTtcbiAgICB9XG5cbiAgICBsb2FkQ29udGVudEhlbHBlcihudWxsLCB0YXNrc0NyZWF0ZWQpO1xufVxuXG5mdW5jdGlvbiB0YXNrRmlsdGVyKHByb2plY3RBc3NvY2lhdGVkVGl0bGUpIHtcbiAgICBsZXQgdGFza3NBc3NvY2lhdGVkID0gW107XG4gICAgdGFza3NDcmVhdGVkLmZpbHRlciggKHRhc2tPYmplY3QpID0+IHtcbiAgICAgICAgaWYgKHRhc2tPYmplY3QudGFza1Byb2plY3RBc3NvY2lhdGVkID09PSBwcm9qZWN0QXNzb2NpYXRlZFRpdGxlKSB7XG4gICAgICAgICAgICB0YXNrc0Fzc29jaWF0ZWQucHVzaCh0YXNrT2JqZWN0KTtcbiAgICAgICAgfVxuICAgIH0pXG4gICAgcmV0dXJuIHRhc2tzQXNzb2NpYXRlZFxufVxuXG5mdW5jdGlvbiBsb2FkQ29udGVudEhlbHBlcihwcm9qZWN0T2JqZWN0VG9Mb2FkLCB0YXNrc0FycmF5VG9Mb2FkKSB7XG4gICAgaWYgKCFwcm9qZWN0T2JqZWN0VG9Mb2FkKSB7XG4gICAgICAgIGxvYWRNYWluQ29udGVudChwcm9qZWN0c0NyZWF0ZWQsIG51bGwsIHRhc2tzQ3JlYXRlZCwgYG92ZXJ2aWV3YCk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KHByb2plY3RzQ3JlYXRlZCwgcHJvamVjdE9iamVjdFRvTG9hZCwgdGFza3NBcnJheVRvTG9hZCwgcHJvamVjdE9iamVjdFRvTG9hZC5wcm9qZWN0VGl0bGUpO1xuICAgIH1cbn1cblxuZXhwb3J0IHtcbiAgICBnZXRPYmplY3RBcnJheXMsXG4gICAgaW5zdGFudGlhdGVOZXdUYXNrLFxuICAgIGluc3RhbnRpYXRlTmV3UHJvamVjdCxcbiAgICBmaW5hbGl6ZVRhc2tFZGl0cyxcbiAgICBmaW5hbGl6ZVByb2plY3RFZGl0cyxcbiAgICBkZWxldGVUYXNrT2JqZWN0LFxuICAgIGRlbGV0ZVByb2plY3RPYmplY3QsXG59IiwiY29uc3QgbWFpbkNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNtYWluLWNvbnRlbnRgKTtcblxuZnVuY3Rpb24gbG9hZE1haW5Db250ZW50KHByb2plY3RzQXJyYXksIHByb2plY3RUb0xvYWQsIHRhc2tzQXJyYXksIHBhZ2VUb0Rpc3BsYXkpIHtcbiAgICB3aGlsZSAobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICAgIG1haW5Db250YWluZXIucmVtb3ZlQ2hpbGQobWFpbkNvbnRhaW5lci5maXJzdENoaWxkKVxuICAgIH1cbiAgICBpZiAocGFnZVRvRGlzcGxheSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3NPdmVydmlldyh0YXNrc0FycmF5KTtcbiAgICAgICAgbWFpbkNvbnRhaW5lci5hcHBlbmRDaGlsZChjb250YWluZXJUb0Rpc3BsYXkpO1xuICAgIH0gZWxzZSBpZiAocGFnZVRvRGlzcGxheSA9PT0gYG5ldyBwcm9qZWN0YCkge1xuICAgICAgICBjb25zdCBjb250YWluZXJUb0Rpc3BsYXkgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0VG9Mb2FkKVxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclRvRGlzcGxheSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyVG9EaXNwbGF5ID0gZGlzcGxheUV4aXN0aW5nUHJvamVjdChwcm9qZWN0VG9Mb2FkLCB0YXNrc0FycmF5KVxuICAgICAgICBtYWluQ29udGFpbmVyLmFwcGVuZENoaWxkKGNvbnRhaW5lclRvRGlzcGxheSk7XG4gICAgfVxuICAgIHByb2plY3RCdXR0b25zQW5kU2VsZWN0b3JzSGFuZGxlcihwcm9qZWN0c0FycmF5KVxufVxuXG5mdW5jdGlvbiBkaXNwbGF5VGFza3NPdmVydmlldyhhcnJheU9mVGFza09iamVjdHMpIHtcbiAgICBjb25zdCBvdmVydmlld0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGRpdmApO1xuICAgIGNvbnN0IG92ZXJ2aWV3VGl0bGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBoMmApO1xuICAgIG92ZXJ2aWV3VGl0bGUudGV4dENvbnRlbnQgPSBgb3ZlcnZpZXdgO1xuICAgIG92ZXJ2aWV3Q29udGFpbmVyLmNsYXNzTGlzdC5hZGQoYHByb2plY3QtY29udGFpbmVyYCk7XG4gICAgb3ZlcnZpZXdDb250YWluZXIuYXBwZW5kQ2hpbGQob3ZlcnZpZXdUaXRsZSk7XG4gICAgXG4gICAgY29uc3QgdGFza3NUb0Rpc3BsYXkgPSBkaXNwbGF5VGFza3MoYXJyYXlPZlRhc2tPYmplY3RzLCBvdmVydmlld0NvbnRhaW5lcilcbiAgICBcbiAgICByZXR1cm4gdGFza3NUb0Rpc3BsYXlcbn1cblxuZnVuY3Rpb24gZGlzcGxheVRhc2tzKGFycmF5T2ZUYXNrT2JqZWN0cywgY29udGFpbmVyKSB7XG4gICAgY29uc3QgYWxsVGFza3NDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICBhbGxUYXNrc0NvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LXRhc2tzLWNvbnRhaW5lcmApO1xuICAgIFxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYXJyYXlPZlRhc2tPYmplY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2tDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBkaXZgKTtcbiAgICAgICAgY29uc3QgdGFza1RpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDNgKTtcbiAgICAgICAgY29uc3QgdGFza0R1ZURhdGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tEZXNjcmlwdGlvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICAgICAgY29uc3QgdGFza1ByaW9yaXR5U3RhdHVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgcGApO1xuICAgICAgICBjb25zdCB0YXNrUHJvamVjdEFzc29jaWF0ZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgICAgIGNvbnN0IHRhc2tFZGl0QnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgICAgIGNvbnN0IHRhc2tEZWxldGVCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICAgICAgXG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuY2xhc3NMaXN0LmFkZChgdGFzay1jb250YWluZXJgKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgYCR7YXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tJbmRleH1gKTtcbiAgICAgICAgdGFza1RpdGxlLnRleHRDb250ZW50ID0gYXJyYXlPZlRhc2tPYmplY3RzW2ldLnRhc2tUaXRsZTtcbiAgICAgICAgdGFza0R1ZURhdGUudGV4dENvbnRlbnQgPSBhcnJheU9mVGFza09iamVjdHNbaV0udGFza0RhdGVEdWU7XG4gICAgICAgIHRhc2tEZXNjcmlwdGlvbi50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrRGVzY3JpcHRpb247XG4gICAgICAgIHRhc2tQcmlvcml0eVN0YXR1cy50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrUHJpb3JpdHlTdGF0dXM7XG4gICAgICAgIHRhc2tQcm9qZWN0QXNzb2NpYXRlZC50ZXh0Q29udGVudCA9IGFycmF5T2ZUYXNrT2JqZWN0c1tpXS50YXNrUHJvamVjdEFzc29jaWF0ZWQ7XG4gICAgICAgIHRhc2tFZGl0QnV0dG9uLnRleHRDb250ZW50ID0gYGVkaXRgO1xuICAgICAgICB0YXNrRWRpdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBlZGl0LXRhc2stYnRuYCk7XG4gICAgICAgIHRhc2tEZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBgZGVsZXRlYDtcbiAgICAgICAgdGFza0RlbGV0ZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBkZWxldGUtdGFzay1idG5gKTtcblxuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tUaXRsZSk7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza0R1ZURhdGUpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tEZXNjcmlwdGlvbik7XG4gICAgICAgIG5ld1Rhc2tDb250YWluZXIuYXBwZW5kQ2hpbGQodGFza1ByaW9yaXR5U3RhdHVzKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrUHJvamVjdEFzc29jaWF0ZWQpO1xuICAgICAgICBuZXdUYXNrQ29udGFpbmVyLmFwcGVuZENoaWxkKHRhc2tFZGl0QnV0dG9uKTtcbiAgICAgICAgbmV3VGFza0NvbnRhaW5lci5hcHBlbmRDaGlsZCh0YXNrRGVsZXRlQnV0dG9uKTtcblxuICAgICAgICBhbGxUYXNrc0NvbnRhaW5lci5hcHBlbmRDaGlsZChuZXdUYXNrQ29udGFpbmVyKTtcbiAgICB9XG4gICAgXG4gICAgY29udGFpbmVyLmFwcGVuZENoaWxkKGFsbFRhc2tzQ29udGFpbmVyKTtcbiAgICByZXR1cm4gY29udGFpbmVyXG59XG5cbmZ1bmN0aW9uIGRpc3BsYXlQcm9qZWN0KHByb2plY3RPYmplY3QpIHtcbiAgICBjb25zdCBwcm9qZWN0Q29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgZGl2YCk7XG4gICAgY29uc3QgcHJvamVjdFRpdGxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgaDJgKTtcbiAgICBjb25zdCBwcm9qZWN0RHVlRGF0ZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYHBgKTtcbiAgICBjb25zdCBwcm9qZWN0RGVzY3JpcHRpb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBwYCk7XG4gICAgY29uc3QgcHJvamVjdEVkaXRCdXR0b24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBidXR0b25gKTtcbiAgICBjb25zdCBwcm9qZWN0RGVsZXRlQnV0dG9uID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgYnV0dG9uYCk7XG4gICAgXG4gICAgcHJvamVjdENvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0LWNvbnRhaW5lcmApO1xuICAgIHByb2plY3RDb250YWluZXIuc2V0QXR0cmlidXRlKGBkYXRhLWluZGV4LW51bWJlcmAsIGAke3Byb2plY3RPYmplY3QucHJvamVjdEluZGV4fWApO1xuICAgIHByb2plY3RUaXRsZS50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgIHByb2plY3REdWVEYXRlLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0RGF0ZUR1ZTtcbiAgICBwcm9qZWN0RGVzY3JpcHRpb24udGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3REZXNjcmlwdGlvbjtcbiAgICBwcm9qZWN0RWRpdEJ1dHRvbi50ZXh0Q29udGVudCA9IGBlZGl0IHByb2plY3RgO1xuICAgIHByb2plY3REZWxldGVCdXR0b24udGV4dENvbnRlbnQgPSBgZGVsZXRlIHByb2plY3RgO1xuICAgIHByb2plY3RFZGl0QnV0dG9uLmNsYXNzTGlzdC5hZGQoYGVkaXQtcHJvamVjdC1idG5gKTtcbiAgICBwcm9qZWN0RGVsZXRlQnV0dG9uLmNsYXNzTGlzdC5hZGQoYGRlbGV0ZS1wcm9qZWN0LWJ0bmApO1xuXG4gICAgcHJvamVjdENvbnRhaW5lci5hcHBlbmRDaGlsZChwcm9qZWN0VGl0bGUpO1xuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdER1ZURhdGUpO1xuICAgIHByb2plY3RDb250YWluZXIuYXBwZW5kQ2hpbGQocHJvamVjdERlc2NyaXB0aW9uKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3RFZGl0QnV0dG9uKTtcbiAgICBwcm9qZWN0Q29udGFpbmVyLmFwcGVuZENoaWxkKHByb2plY3REZWxldGVCdXR0b24pO1xuXG4gICAgcmV0dXJuIHByb2plY3RDb250YWluZXJcbn1cblxuZnVuY3Rpb24gZGlzcGxheUV4aXN0aW5nUHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0LCBwcm9qZWN0VGFza3NBcnJheSkge1xuICAgIGNvbnN0IHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQgPSBkaXNwbGF5UHJvamVjdChwcm9qZWN0VG9EaXNwbGF5T2JqZWN0KTtcbiAgICBjb25zdCBwcm9qZWN0VGFza3MgPSBkaXNwbGF5VGFza3MocHJvamVjdFRhc2tzQXJyYXksIHByb2plY3RDb250YWluZXJEaXNwbGF5ZWQpO1xuICAgIHJldHVybiBwcm9qZWN0VGFza3Ncbn1cblxuLy8gdGhpcyBcIm1vZHVsZVwiIHJlLWxvYWRzIHRoZSBidXR0b25zIGFuZCBzZWxlY3RvcnMgZXZlcnkgcGFnZUxvYWQgd2l0aCB1cGRhdGVkIHByb2plY3RzQ3JlYXRlZCBkYXRhXG5mdW5jdGlvbiBwcm9qZWN0QnV0dG9uc0FuZFNlbGVjdG9yc0hhbmRsZXIocHJvamVjdHNDcmVhdGVkQXJyYXkpIHtcbiAgICBjb25zdCBwcm9qZWN0TGlzdEhlYWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1saXN0YCk7XG4gICAgY29uc3QgYWRkVGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNwcm9qZWN0LWFzc29jaWF0ZWRgKTtcbiAgICBjb25zdCBlZGl0VGFza1Byb2plY3RTZWxlY3RvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYCNlZGl0LXByb2plY3QtYXNzb2NpYXRlZGApO1xuICAgIGNvbnN0IHByb2plY3RzQXJyYXkgPSBwcm9qZWN0c0NyZWF0ZWRBcnJheTtcblxuICAgIGZ1bmN0aW9uIHJlbW92ZUV4aXN0aW5nRWxlbWVudHMocHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3QgYXJyYXlPZkNvbnRhaW5lcnMgPSBbcHJvamVjdExpc3QsIGFkZFNlbGVjdG9yLCBlZGl0U2VsZWN0b3JdO1xuXG4gICAgICAgIGFycmF5T2ZDb250YWluZXJzLmZvckVhY2goIChjb250YWluZXIpID0+IHtcbiAgICAgICAgICAgIHdoaWxlIChjb250YWluZXIuZmlyc3RDaGlsZCkge1xuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5yZW1vdmVDaGlsZChjb250YWluZXIuZmlyc3RDaGlsZClcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qZWN0QnV0dG9uc1RvUHJvamVjdExpc3QoKSB7XG5cbiAgICAgICAgcHJvamVjdHNBcnJheS5mb3JFYWNoKCAocHJvamVjdE9iamVjdCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3UHJvamVjdEJ1dHRvbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoYGJ1dHRvbmApO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi50ZXh0Q29udGVudCA9IHByb2plY3RPYmplY3QucHJvamVjdFRpdGxlO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGlkYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5zZXRBdHRyaWJ1dGUoYGRhdGEtaW5kZXgtbnVtYmVyYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0SW5kZXgpO1xuICAgICAgICAgICAgbmV3UHJvamVjdEJ1dHRvbi5jbGFzc0xpc3QuYWRkKGBwcm9qZWN0TGlzdEJ1dHRvbmApO1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBwcm9qZWN0TGlzdEhlYWQuYXBwZW5kQ2hpbGQobmV3UHJvamVjdEJ1dHRvbik7XG4gICAgICAgIH0pXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvamVjdHNUb1NlbGVjdG9ycygpIHtcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGBvcHRpb25gKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3Iuc2V0QXR0cmlidXRlKGB2YWx1ZWAsIGBkZWZhdWx0YCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3IChkZWZhdWx0KWA7XG4gICAgICAgIGFkZFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQoZGVmYXVsdFByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgIGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgYGRlZmF1bHRgKTtcbiAgICAgICAgZGVmYXVsdFByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gYG92ZXJ2aWV3IChkZWZhdWx0KWA7XG4gICAgICAgIGVkaXRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKGRlZmF1bHRQcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvcik7XG4gICAgICAgIFxuICAgICAgICBwcm9qZWN0c0FycmF5LmZvckVhY2goIChwcm9qZWN0T2JqZWN0KSA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnNldEF0dHJpYnV0ZShgdmFsdWVgLCBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZSk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yQWRkVGFza1NlbGVjdG9yLnRleHRDb250ZW50ID0gcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGU7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIGNvbnN0IHByb2plY3RGb3JFZGl0VGFza1NlbGVjdG9yID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChgb3B0aW9uYCk7XG4gICAgICAgICAgICBwcm9qZWN0Rm9yRWRpdFRhc2tTZWxlY3Rvci5zZXRBdHRyaWJ1dGUoYHZhbHVlYCwgcHJvamVjdE9iamVjdC5wcm9qZWN0VGl0bGUpO1xuICAgICAgICAgICAgcHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IudGV4dENvbnRlbnQgPSBwcm9qZWN0T2JqZWN0LnByb2plY3RUaXRsZTtcbiAgICAgICAgXG4gICAgICAgICAgICBhZGRUYXNrUHJvamVjdFNlbGVjdG9yLmFwcGVuZENoaWxkKHByb2plY3RGb3JBZGRUYXNrU2VsZWN0b3IpO1xuICAgICAgICAgICAgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IuYXBwZW5kQ2hpbGQocHJvamVjdEZvckVkaXRUYXNrU2VsZWN0b3IpO1xuICAgICAgICB9KVxuICAgIH1cbiAgICByZW1vdmVFeGlzdGluZ0VsZW1lbnRzKHByb2plY3RMaXN0SGVhZCwgYWRkVGFza1Byb2plY3RTZWxlY3RvciwgZWRpdFRhc2tQcm9qZWN0U2VsZWN0b3IpO1xuICAgIGFwcGVuZFByb2plY3RCdXR0b25zVG9Qcm9qZWN0TGlzdCgpO1xuICAgIGFwcGVuZFByb2plY3RzVG9TZWxlY3RvcnMoKTtcbn1cblxuZXhwb3J0IHtcbiAgICBsb2FkTWFpbkNvbnRlbnQsXG59IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge30gZnJvbSAnLi9kYXRhTW9kYWxIYW5kbGVyLmpzJ1xuaW1wb3J0IHsgZ2V0T2JqZWN0QXJyYXlzIH0gZnJvbSAnLi9vYmplY3REYXRhTWFuYWdlbWVudC5qcydcbmltcG9ydCB7IGxvYWRNYWluQ29udGVudCB9IGZyb20gJy4vcGFnZUxvYWRlci5qcydcblxuY29uc3QgbmF2Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI25hdi1jb250YWluZXJgKTtcbmNvbnN0IHByb2plY3RCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAjcHJvamVjdC1idXR0b25gKTtcbmNvbnN0IHByb2plY3RMaXN0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgI3Byb2plY3QtbGlzdGApO1xuXG5uYXZDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBwYWdlU2VsZWN0b3IpO1xucHJvamVjdEJ1dHRvbi5hZGRFdmVudExpc3RlbmVyKGBjbGlja2AsIChlKSA9PiBjb25zb2xlLmxvZyhlLnRhcmdldC50ZXh0Q29udGVudCkpO1xucHJvamVjdExpc3RDb250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcihgY2xpY2tgLCBwcm9qZWN0U2VsZWN0b3IpO1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbigpIHtcbiAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICBsb2FkTWFpbkNvbnRlbnQoY3VycmVudE9iamVjdEFycmF5LnByb2plY3RzLCBudWxsLCBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MsIGBvdmVydmlld2ApO1xufSkoKTtcblxuZnVuY3Rpb24gcGFnZVNlbGVjdG9yKGUpIHtcbiAgICBjb25zdCBwYWdlU2VsZWN0ZWRUaXRsZSA9IGUudGFyZ2V0LnRleHRDb250ZW50O1xuICAgIGlmIChwYWdlU2VsZWN0ZWRUaXRsZSA9PT0gYG92ZXJ2aWV3YCkge1xuICAgICAgICBjb25zdCBjdXJyZW50T2JqZWN0QXJyYXkgPSBnZXRPYmplY3RBcnJheXMoKTtcbiAgICAgICAgbG9hZE1haW5Db250ZW50KGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0cywgbnVsbCwgY3VycmVudE9iamVjdEFycmF5LnRhc2tzLCBwYWdlU2VsZWN0ZWRUaXRsZSk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBwcm9qZWN0U2VsZWN0b3IoZSkge1xuICAgIGNvbnN0IGN1cnJlbnRPYmplY3RBcnJheSA9IGdldE9iamVjdEFycmF5cygpO1xuICAgIGNvbnN0IHByb2plY3RDbGlja2VkVGl0bGUgPSBlLnRhcmdldC50ZXh0Q29udGVudDtcbiAgICBjb25zdCBwcm9qZWN0Q2xpY2tlZEluZGV4ID0gZS50YXJnZXQuZGF0YXNldC5pbmRleE51bWJlcjtcblxuICAgIGxldCBhc3NvY2lhdGVkVGFza3NUb0xvYWQgPSBbXTtcbiAgICBjdXJyZW50T2JqZWN0QXJyYXkudGFza3MuZmlsdGVyKCAodGFza09iamVjdCkgPT4ge1xuICAgICAgICBpZiAodGFza09iamVjdC50YXNrUHJvamVjdEFzc29jaWF0ZWQgPT09IHByb2plY3RDbGlja2VkVGl0bGUpIHtcbiAgICAgICAgICAgIGFzc29jaWF0ZWRUYXNrc1RvTG9hZC5wdXNoKHRhc2tPYmplY3QpO1xuICAgICAgICB9XG4gICAgfSlcblxuICAgIGxvYWRNYWluQ29udGVudChjdXJyZW50T2JqZWN0QXJyYXkucHJvamVjdHMsIGN1cnJlbnRPYmplY3RBcnJheS5wcm9qZWN0c1twcm9qZWN0Q2xpY2tlZEluZGV4XSwgYXNzb2NpYXRlZFRhc2tzVG9Mb2FkLCBwcm9qZWN0Q2xpY2tlZFRpdGxlKTtcbn0iXSwic291cmNlUm9vdCI6IiJ9