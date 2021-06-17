import { loadMainContent, projectButtonsAndSelectorsHandler } from './displayNewItems.js'

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
    console.log(tasksCreated)
    console.log(tasksToLoad)
    
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
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
        loadMainContent(projectsCreated, null, tasksCreated, `overview`);
    } else {
        loadMainContent(projectsCreated, projectObjectToLoad, tasksArrayToLoad, projectObjectToLoad.projectTitle);
    }
}
        
function instantiateNewProject(newProjectModalInputs) {
    const newProjectInputArray = Array.from(newProjectModalInputs);
    const newProjectTitle = newProjectInputArray[0].value;
    const newProjectDateDue = newProjectInputArray[1].value;
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);
    console.log(newProject);

    loadMainContent(projectsCreated, newProject, null, `new project`);
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

    console.log(`edit task`);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
    // loadMainContent(projectsCreated, tasksCreated, `overview`);
    console.log(tasksCreated);
}

function deleteTaskObject(indexOfTaskToDelete, currentPageDisplayed) {
    console.log(tasksCreated);
    tasksCreated.splice(indexOfTaskToDelete, 1);
    updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed);
}

function updateTaskIndex(indexOfTaskToDelete, currentPageDisplayed) {
    for (let i = indexOfTaskToDelete; i < tasksCreated.length; i++) {
        tasksCreated[i].taskIndex = i;
    }
    const projectAssociatedToLoad = projectsCreated.find(object => object.projectTitle === currentPageDisplayed);
    const tasksToLoad = taskFilter(currentPageDisplayed);

    console.log(tasksCreated);
    loadContentHelper(projectAssociatedToLoad, tasksToLoad);
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
    
    console.log(projectsCreated);
    console.log(tasksCreated);

    updateProjectIndex(projectToDeleteIndex);
}

function updateProjectIndex(indexOfDeletedProject) {
    for (let i = indexOfDeletedProject; i < projectsCreated.length; i++) {
        projectsCreated[i].projectIndex = i;
    }

    console.log(projectsCreated);
    loadContentHelper(null, tasksCreated);
}

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
    instantiateNewProject,
    finalizeTaskEdits,
    deleteTaskObject,
    deleteProjectObject,
}