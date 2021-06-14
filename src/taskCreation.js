import { appendProjectToProjectList } from './displayNewItems.js'
import { regenerateProjectTasks } from './index.js'
import { openEditTaskModal, openEditProjectModal } from './pageLoad.js'

const projectsCreated = [];
const tasksCreated = [
    {
        title: `refactor code`,
        dateDue: `2021-06-20`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `make progress`,
        dateDue: `2021-06-12`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `todo list`,
    },
    {
        title: `do more`,
        dateDue: `2021-06-13`,
        description: `this is a test`,
        priorityStatus: `high`,
        projectAssociated: `default`,
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
    constructor(title, dateDue, description, priorityStatus, projectAssociated) {
        this.title = title;
        this.dateDue = dateDue;
        this.description = description;
        this.priorityStatus = priorityStatus;
        this.projectAssociated = projectAssociated; 
    }
}

function createNewProject(titleValue, dateDueValue, descriptionValue, projectIndexValue) {
    const newProject = new Project(titleValue, dateDueValue, descriptionValue, projectIndexValue);
    projectsCreated.push(newProject);
    appendProjectToProjectList(newProject.projectTitle);
    console.log(newProject);
}

function createNewTask(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated) {
    const newTask = new Task(titleValue, dateDueValue, descriptionValue, priorityStatusValue, projectAssociated);
    tasksCreated.push(newTask);
}

function editTaskObject(title, projectAssociated, pageTitle) {
    const currentObjectArray = getObjectArrays();
    let objectIndex;
    const objectToEdit = currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            objectIndex = index;
            return object
        }
    })
    openEditTaskModal(objectToEdit, objectIndex, pageTitle);
}

function finalizeTaskEdits(editInputs, targetIndex) {
    tasksCreated[targetIndex].title = editInputs[0].value;
    tasksCreated[targetIndex].dateDue = editInputs[1].value;
    tasksCreated[targetIndex].description = editInputs[2].value;
    tasksCreated[targetIndex].priorityStatus = editInputs[3].value;
    tasksCreated[targetIndex].projectAssociated = editInputs[4].value;
}

function deleteTaskObject(title, projectAssociated, pageTitle) {
    const currentObjectArray = getObjectArrays();
    console.log(currentObjectArray);
    let objectToDeleteIndex = null;
    currentObjectArray.tasks.filter( (object, index) => {
        if (object.title === title && object.projectAssociated === projectAssociated) {
            objectToDeleteIndex = index;
        }
    })
    console.log(objectToDeleteIndex);
    tasksCreated.splice(objectToDeleteIndex, 1);
    regenerateProjectTasks(pageTitle);
}

function editProjectObject(objectTitle, objectArrayIndex) {
    console.log(objectArrayIndex)
    const currentObjectArray = getObjectArrays();
    const objectToEdit = projectsCreated[objectArrayIndex];
    openEditProjectModal(objectToEdit, objectArrayIndex, objectTitle, currentObjectArray)
}

function finalizeProjectEdits(editInputs, targetIndex, existingTitle, existingTaskObjectArray) {

    const newProjectTitle = editInputs[0].value;

    projectsCreated[targetIndex].projectTitle = editInputs[0].value;
    projectsCreated[targetIndex].projectDateDue = editInputs[1].value;
    projectsCreated[targetIndex].projectDescription = editInputs[2].value;
    
    if (newProjectTitle !== existingTitle) {
        updateProjectListAndProjectSelectors(newProjectTitle, existingTitle);
        updateTasksWithNewProjectTitle(newProjectTitle, existingTitle, existingTaskObjectArray);
    }

    regenerateProjectTasks(newProjectTitle);
}

function updateTasksWithNewProjectTitle(newTitle, oldProjectTitle, oldTaskObjectArray) {
    const tasksToFilterArray = Array.from(oldTaskObjectArray.tasks);
    tasksToFilterArray.filter( (task, index) => {
        if (task.projectAssociated === oldProjectTitle) {
            tasksCreated[index].projectAssociated = newTitle;
        }
    })
}

function deleteProjectObject(projectToDeleteTitle) {
    const currentObjectArray = getObjectArrays();
    console.log(currentObjectArray);
    
    let taskIndexForDeletion = [];
    currentObjectArray.tasks.filter( (object, index) => {
        if (object.projectAssociated === projectToDeleteTitle) {
            taskIndexForDeletion.push(index);
        }
    })
    for (let i = taskIndexForDeletion.length; i >= 1; i--) {
        tasksCreated.splice(taskIndexForDeletion[i-1], 1);
    }

    currentObjectArray.projects.filter( (object, index) => {
        if (object.projectTitle === projectToDeleteTitle) {
            projectsCreated.splice(index, 1);
        }
    })
    console.log(currentObjectArray);

    updateProjectListAndProjectSelectors(null, projectToDeleteTitle);
    regenerateProjectTasks(`overview`);
}

function updateProjectListAndProjectSelectors(newTitle, existingTitle) {
    
    const projectSelectorNewTasks = document.querySelector(`#project-associated`);
    const projectSelectorEditTasks = document.querySelector(`#edit-project-associated`);
    const projectButtonList = document.querySelector(`#project-list`);
    
    // newTask selector and editTask selector will have the same index
    const selectorArrayForNewTask = Array.from(projectSelectorNewTasks.options)
    const selectorArrayForEditTask = Array.from(projectSelectorEditTasks.options)
    const projectButtonListArray = Array.from(projectButtonList.children)

    // const newTaskSelectorIndex = filterForUpdatesNeeded(selectorArrayForNewTask, existingTitle, `selector`);
    // const buttonListIndex = filterForUpdatesNeeded(projectButtonListArray, existingTitle, `button`);

    if (newTitle) {
        projectSelectorNewTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
        projectSelectorNewTasks.options[newTaskSelectorIndex].textContent = newTitle;
        projectSelectorEditTasks.options[newTaskSelectorIndex].setAttribute(`value`, `${newTitle}`);
        projectSelectorEditTasks.options[newTaskSelectorIndex].textContent = newTitle;
        projectButtonList.children[buttonListIndex].textContent = newTitle;
    } else if (!newTitle) {
        selectorArrayForNewTask.filter( (option, index) => {
            if (option.value === existingTitle) {
                projectSelectorNewTasks.options[index].remove();
            }
        })
        selectorArrayForEditTask.filter( (option, index) => {
            if (option.value === existingTitle) {
                projectSelectorEditTasks.options[index].remove();
            }
        })
        projectButtonListArray.filter( (option, index) => {
            if (option.textContent === existingTitle) {
                projectButtonList.children[index].remove();
            }
        })
    }
}

// filters for buttons and selectors to update/remove upon projectTitle edits or project deletions
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
    createNewProject,
    createNewTask,
    editTaskObject,
    editProjectObject,
    deleteTaskObject,
    deleteProjectObject,
    finalizeTaskEdits,
    finalizeProjectEdits,
}