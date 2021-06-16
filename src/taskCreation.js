import { loadMainContent } from './displayNewItems.js'

const projectsCreated = [];
const tasksCreated = [
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

function createNewProject(projectTitleValue, projectDateDueValue, projectDescriptionValue, projectIndexValue) {
    const newProject = new Project(projectTitleValue, projectDateDueValue, projectDescriptionValue, projectIndexValue);
    projectsCreated.push(newProject);
    appendProjectToProjectList(newProject.title);
}

function createNewTask(taskTitleValue, taskDateDueValue, taskDescriptionValue, taskPriorityStatusValue, taskProjectAssociatedValue, taskIndexValue) {
    const newTask = new Task(taskTitleValue, taskDateDueValue, taskDescriptionValue, taskPriorityStatusValue, taskProjectAssociatedValue, taskIndexValue);
    tasksCreated.push(newTask);
    console.log(tasksCreated);
    loadMainContent(projectsCreated, tasksCreated, `overview`);
}

function instantiateNewTask(newTaskModalInputs) {
    const taskInputArray = Array.from(newTaskModalInputs);
    const newTaskTitle = taskInputArray[0].value;
    const newTaskDateDue = taskInputArray[1].value;
    const newTaskDescription = taskInputArray[2].value;
    const newTaskPriorityStatus = taskInputArray[3].value;
    const newTaskProjectAssocaited = taskInputArray[4].value;
    // const currentPageDisplayed = mainContainer.firstChild.firstChild.textContent;
    const newTaskIndex = tasksCreated.length;
    createNewTask(newTaskTitle, newTaskDateDue, newTaskDescription, newTaskPriorityStatus, newTaskProjectAssocaited, newTaskIndex);
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

function finalizeTaskEdits(editModalInputs, targetIndex, currentPageDisplayed) {
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = editModalInputs[1].value;
    const editedTaskDescription = editModalInputs[2].value;
    const editedTaskPriorityStatus = editModalInputs[3].value;
    const editedTaskProjectAssocaited = editModalInputs[4].value;
    console.log({editedTaskTitle, editedTaskDateDue});
    tasksCreated[targetIndex].taskTitle = editedTaskTitle;
    tasksCreated[targetIndex].taskDateDue = editedTaskDateDue;
    tasksCreated[targetIndex].taskDescription = editedTaskDescription;
    tasksCreated[targetIndex].taskPriorityStatus = editedTaskPriorityStatus;
    tasksCreated[targetIndex].taskProjectAssociated = editedTaskProjectAssocaited;

    console.log(`edit task`);
    loadMainContent(projectsCreated, tasksCreated, `overview`);
    console.log(tasksCreated);
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
    getObjectArrays,
    instantiateNewTask,
    finalizeTaskEdits,
    deleteTaskObject,
}