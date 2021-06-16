import { checkFormValidation, closeEditOrDeleteModal } from './pageLoad.js'
import { loadMainContent } from './displayNewItems.js'

const projectsCreated = [];
const tasksCreated = [
    {
        title: `refactor code`,
        dateDue: `2021-06-20`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
        taskIndex: 0,
    },
    {
        title: `make progress`,
        dateDue: `2021-06-12`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
        taskIndex: 1,
    },
    {
        title: `do more`,
        dateDue: `2021-06-13`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `default`,
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
    constructor(title, dateDue, description) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
    }
}

class Task {
    constructor(title, dateDue, description, priorityStatus, projectAssociated, taskIndex) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
        this.priorityStatus = priorityStatus;
        this.projectAssociated = projectAssociated;
        this.taskIndex = taskIndex;
    }
}

function createNewProject(titleValue, dateDueValue, descriptionValue) {
    const newProject = new Project(titleValue, dateDueValue, descriptionValue);
    projectsCreated.push(newProject);
    appendProjectToProjectList(newProject.title);
}

function createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated, taskIndex) {
    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated, taskIndex);
    tasksCreated.push(newTask);
    console.log(tasksCreated);
    loadMainContent(projectsCreated, tasksCreated, `overview`);
}

function instantiateNewTask(newTaskModalInputs) {
    const taskInputArray = Array.from(newTaskModalInputs);
    // const currentPageDisplayed = mainContainer.firstChild.firstChild.textContent;
    const newTaskIndex = tasksCreated.length;
    createNewTask(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value, taskInputArray[4].value, newTaskIndex);
    // if (currentPageDisplayed === `overview`) {
    //     loadMainContent(mainContainer, displayTasksOverview(currentObjectArray.tasks));
    // } else if (currentPageDisplayed === currentObjectArray.tasks[newTaskIndex].projectAssociated) {
    //     regenerateProjectTasks(currentPageDisplayed);
    // }
}

function instantiateNewProject(newProjectModalInputs) {
    const projectInputArray = Array.from(projectUserInput);
    createNewProject(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value);
    currentObjectArray = getObjectArrays();
    let projectIndex = currentObjectArray.projects.length - 1;
    loadMainContent(mainContainer, displayNewProject(currentObjectArray.projects[projectIndex]));
    appendNewProjectToSelector(projectInputArray[0].value);
    attachDataToProjectButton(projectIndex);
}

// function editTaskObject(title, projectAssociated, pageTitle) {
//     let currentObjectArray = getObjectArrays();
//     let objectIndex;
//     const objectToEdit = currentObjectArray.tasks.filter( (object, index) => {
//         if (object.title === title && object.projectAssociated === projectAssociated) {
//             objectIndex = index;
//             return object
//         }
//     })
//     openEditTaskModal(objectToEdit, objectIndex, pageTitle);
// }

const mainContainer = document.querySelector(`#main-content`);
mainContainer.addEventListener(`click`, (e) => {
    if (e.target.className === `edit-task-btn`) {
        openEditTaskModal(e.target.dataset.indexNumber, `overview`);
        console.log(e.target.dataset.indexNumber);
    }
    else if (e.target.className === `delete-task-btn`) {
        deleteTaskObject(e.target.dataset.indexNumber, `overview`);
        console.log(e.target.dataset.indexNumber);
    }
});

function openEditTaskModal(taskIndex, pageDisplayedTitle) {

    // const currentObjectArray = getObjectArrays();
    
    const editTaskModal = document.querySelector(`#editTaskModal`);
    const editFormInputs = document.querySelectorAll(`.editTaskInputs`);
    const statusOption = document.querySelector(`#existing-status`);
    const projectOption = document.querySelector(`#existing-project`);
    
    // pre-populate the edit form with existing data
    editFormInputs[0].setAttribute(`value`, `${tasksCreated[taskIndex].title}`);
    editFormInputs[1].setAttribute(`value`, `${tasksCreated[taskIndex].dateDue}`);
    editFormInputs[2].setAttribute(`value`, `${tasksCreated[taskIndex].description}`);
    statusOption.setAttribute(`value`, `${tasksCreated[taskIndex].priorityStatus}`);
    statusOption.textContent = `${tasksCreated[taskIndex].priorityStatus} priority`;
    if (tasksCreated[taskIndex].projectAssociated === `default`) {
        projectOption.setAttribute(`value`, `default`);
        projectOption.textContent = `overview (${tasksCreated[taskIndex].projectAssociated})`;
    } else {
        projectOption.setAttribute(`value`, `${tasksCreated[taskIndex].projectAssociated}`);
        projectOption.textContent = tasksCreated[taskIndex].projectAssociated;
    }
    
    const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
    confirmEdits.addEventListener(`click`, (e) => {
        if (checkFormValidation(editFormInputs)) {
            finalizeTaskEdits(editFormInputs, taskIndex, pageDisplayedTitle);
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
            // regenerateProjectTasks(pageTitle);
        }
    });
    
    const cancelTaskEdits = document.querySelector(`#cancelTaskEdit`);
        cancelTaskEdits.addEventListener(`click`, (e) => {
            e.preventDefault();
            closeEditOrDeleteModal(editTaskModal);
        })
        
        editTaskModal.style.display = `block`;
    }

function finalizeTaskEdits(editInputs, targetIndex, currentPageDisplayed) {

    tasksCreated[targetIndex].title = editInputs[0].value;
    tasksCreated[targetIndex].dateDue = editInputs[1].value;
    tasksCreated[targetIndex].description = editInputs[2].value;
    tasksCreated[targetIndex].priorityStatus = editInputs[3].value;
    tasksCreated[targetIndex].projectAssociated = editInputs[4].value;
    loadMainContent(projectsCreated, tasksCreated, currentPageDisplayed);
}

function deleteTaskObject(indexOfTaskToDelete, currentPageDisplayed) {
    console.log(tasksCreated);
    tasksCreated.splice(indexOfTaskToDelete, 1);
    // regenerateProjectTasks(pageTitle);
    updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed);
}

function updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed) {
    for (let i = indexOfTaskToDelete; i < tasksCreated.length; i++) {
        tasksCreated[i].taskIndex = i;
    }
    loadMainContent(projectsCreated, tasksCreated, currentPageDisplayed);
    console.log(tasksCreated);
}

// function editProjectObject(objectTitle, objectDataToFilter) {
//     let currentObjectArray = getObjectArrays();
//     let objectIndex = null;
//     const objectToEdit = currentObjectArray.projects.filter( (object, index) => {
//             if (object.title === objectTitle && object.description === objectDataToFilter) {
//                 objectIndex = index;
//                 return object
//             }
//         });
//     openEditProjectModal(objectToEdit, objectIndex, objectTitle, currentObjectArray)
// }

// function finalizeProjectEdits(editInputs, targetIndex, existingTitle, existingTaskObjectArray) {

//     const newProjectTitle = editInputs[0].value;

//     projectsCreated[targetIndex].title = editInputs[0].value;
//     projectsCreated[targetIndex].dateDue = editInputs[1].value;
//     projectsCreated[targetIndex].description = editInputs[2].value;
    
//     if (newProjectTitle !== existingTitle) {
//         updateProjectListAndProjectSelectors(newProjectTitle, existingTitle);
//         updateTasksWithNewProjectTitle(newProjectTitle, existingTitle, existingTaskObjectArray);
//     }

//     regenerateProjectTasks(newProjectTitle);
// }

// function updateTasksWithNewProjectTitle(newTitle, oldProjectTitle, oldTaskObjectArray) {
//     const tasksToFilterArray = Array.from(oldTaskObjectArray.tasks);
//     tasksToFilterArray.filter( (task, index) => {
//         if (task.projectAssociated === oldProjectTitle) {
//             tasksCreated[index].projectAssociated = newTitle;
//         }
//     })
// }

// // function deleteProjectObject(projectTitle) {
// //     const currentObjectArray = getObjectArrays();
// //     let projectObjectToDeleteIndex = null;
// //     currentObjectArray.projects.filter( (object, index) => {
// //         if (object.title === projectTitle) {
// //             projectObjectToDeleteIndex = index;
// //         }
// //     })
    
// //     let taskIndexForDeletion = [];
// //     currentObjectArray.tasks.filter( (object, index) => {
// //         if (object.projectAssociated === projectTitle) {
// //             taskIndexForDeletion.push(index);
// //         }
// //     })
// //     for (let i = taskIndexForDeletion.length; i >= 1; i--) {
// //         tasksCreated.splice(taskIndexForDeletion[i-1], 1);
// //     }
// //     console.log(currentObjectArray);
// //     console.log(`indexToDelete: ${projectObjectToDeleteIndex}`);
// //     projectsCreated.splice(projectObjectToDeleteIndex, 1);
// //     updateProjectListAndProjectSelectors(null, projectTitle);
// //     regenerateProjectTasks(`overview`);
// // }

// function deleteProjectObject(projectTitle) {
//     const currentObjectArray = getObjectArrays();
//     // let projectObjectToDeleteIndex = null;
//     console.log(currentObjectArray);
    
//     let taskIndexForDeletion = [];
//     currentObjectArray.tasks.filter( (object, index) => {
//         if (object.projectAssociated === projectTitle) {
//             taskIndexForDeletion.push(index);
//         }
//     })
//     for (let i = taskIndexForDeletion.length; i >= 1; i--) {
//         tasksCreated.splice(taskIndexForDeletion[i-1], 1);
//     }

//     currentObjectArray.projects.filter( (object, index) => {
//         if (object.title === projectTitle) {
//             // projectObjectToDeleteIndex = index;
//             projectsCreated.splice(index, 1);
//         }
//     })
//     console.log(currentObjectArray);

//     // console.log(`indexToDelete: ${projectObjectToDeleteIndex}`);
//     updateProjectListAndProjectSelectors(null, projectTitle);
//     regenerateProjectTasks(`overview`);
// }

// function updateProjectListAndProjectSelectors(newTitle, existingTitle) {
    
//     const projectSelectorNewTasks = document.querySelector(`#project-associated`);
//     const projectSelectorEditTasks = document.querySelector(`#edit-project-associated`);
//     const projectButtonList = document.querySelector(`#project-list`);
    
//     // newTask selector and editTask selector will have the same index
//     const selectorArrayForNewTask = Array.from(projectSelectorNewTasks.options)
//     const selectorArrayForEditTask = Array.from(projectSelectorEditTasks.options)
//     const projectButtonListArray = Array.from(projectButtonList.children)

//     const newTaskSelectorIndex = filterForUpdatesNeeded(selectorArrayForNewTask, existingTitle, `selector`);
//     const buttonListIndex = filterForUpdatesNeeded(projectButtonListArray, existingTitle, `button`);
//     console.log(newTaskSelectorIndex);
//     console.log(buttonListIndex);

//     if (newTitle) {
//         projectSelectorNewTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
//         projectSelectorNewTasks.options[newTaskSelectorIndex].textContent = newTitle;
//         projectSelectorEditTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
//         projectSelectorEditTasks.options[newTaskSelectorIndex].textContent = newTitle;
//         projectButtonList.children[buttonListIndex].textContent = newTitle;
//     } else if (!newTitle) {
//         selectorArrayForNewTask.filter( (option, index) => {
//             if (option.value === existingTitle) {
//                 projectSelectorNewTasks.options[index].remove();
//             }
//         })
//         selectorArrayForEditTask.filter( (option, index) => {
//             if (option.value === existingTitle) {
//                 projectSelectorEditTasks.options[index].remove();
//             }
//         })
//         projectButtonListArray.filter( (option, index) => {
//             if (option.textContent === existingTitle) {
//                 projectButtonList.children[index].remove();
//             }
//         })
//         // projectSelectorEditTasks.options[index].remove();
//         // projectSelectorNewTasks.removeChild(projectSelectorNewTasks.options[newTaskSelectorIndex]);
//         // projectSelectorEditTasks.removeChild(projectSelectorEditTasks.options[newTaskSelectorIndex]);
//         // projectButtonList.removeChild(projectButtonList.children[buttonListIndex]);
//     }
// }

// // filters for buttons and selectors to update/remove upon projectTitle edits or project deletions
// function filterForUpdatesNeeded(arrayToFilter, existingTitle, elementType) {
//     let indexToEdit = null;
//     arrayToFilter.filter( (option, index) => {
//         if (elementType === `selector`) {
//             if (option.value === existingTitle) {
//                 indexToEdit = index;
//             }
//         } else if (elementType === `button`) {
//             if (option.textContent === existingTitle) {
//                 indexToEdit = index;
//             }
//         }
//     })
//     return indexToEdit
// }

export {
    // getObjectArrays,
    instantiateNewTask,
    finalizeTaskEdits,
    deleteTaskObject,
}