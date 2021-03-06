import { format } from 'date-fns'
import { loadMainContent } from './pageLoader.js'

let projectsCreated = [
    {
        projectTitle: `javascript in the real world`,
        projectDateDue: `06/30/2021`,
        projectDescription: `this is the next section in the odin project's full stack javascript course, following completion of the todo list project`,
        projectIndex: 0,
    },
    {
        projectTitle: `asynchronous javascript and APIs`,
        projectDateDue: `07/22/2021`,
        projectDescription: `this section follows "javascript in the real world" in TOP's full stack javascript course`,
        projectIndex: 1,
    },
];

let tasksCreated = [
    {
        taskTitle: `wrap up the todo list project`,
        taskDateDue: `06/23/2021`,
        taskDescription: `move on and return to this project at a later date to improve its code, design and functionality`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `default`,
        taskIndex: 0,
    },
    {
        taskTitle: `linting`,
        taskDateDue: `06/23/2021`,
        taskDescription: `first topic in this project's section`,
        taskPriorityStatus: `high`,
        taskProjectAssociated: `javascript in the real world`,
        taskIndex: 1,
    },
    {
        taskTitle: `dynamic user interface interactions`,
        taskDateDue: `06/24/2021`,
        taskDescription: `second topic in this project's section`,
        taskPriorityStatus: `low`,
        taskProjectAssociated: `javascript in the real world`,
        taskIndex: 2,
    },
    {
        taskTitle: `forms`,
        taskDateDue: `06/24/2021`,
        taskDescription: `third topic in this project's section`,
        taskPriorityStatus: `medium`,
        taskProjectAssociated: `javascript in the real world`,
        taskIndex: 3,
    },
    {
        taskTitle: `ES?`,
        taskDateDue: `06/25/2021`,
        taskDescription: `final topic in this project's section`,
        taskPriorityStatus: `low`,
        taskProjectAssociated: `javascript in the real world`,
        taskIndex: 4,
    },
    {
        taskTitle: `weather app`,
        taskDateDue: `07/22/2021`,
        taskDescription: `the culminating project for this section`,
        taskPriorityStatus: `medium`,
        taskProjectAssociated: `asynchronous javascript and APIs`,
        taskIndex: 5,
    },
];

if (window.localStorage.length) {
    projectsCreated = JSON.parse(window.localStorage.getItem(`projectsCreated`));
    tasksCreated = JSON.parse(window.localStorage.getItem(`tasksCreated`));
}

function updateLocalStorage(objectType) {
    if (objectType === `task`) {
        window.localStorage.removeItem(`tasksCreated`);
        window.localStorage.setItem(`tasksCreated`, JSON.stringify(tasksCreated));
    } else {
        window.localStorage.removeItem(`projectsCreated`);
        window.localStorage.setItem(`projectsCreated`, JSON.stringify(projectsCreated));
    }
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

function instantiateNewTask(newTaskModalInputs) {
    
    const newTaskInputArray = Array.from(newTaskModalInputs);
    const newTaskTitle = newTaskInputArray[0].value;
    const newTaskDateDue = reformatDateDue(newTaskInputArray[1].value);
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
    const newProjectDateDue = reformatDateDue(newProjectInputArray[1].value);
    const newProjectDescription = newProjectInputArray[2].value;
    const newProjectIndex = projectsCreated.length;
    
    const newProject = new Project(newProjectTitle, newProjectDateDue, newProjectDescription, newProjectIndex);
    projectsCreated.push(newProject);

    updateLocalStorage(`project`);
    loadMainContent(projectsCreated, newProject, null, isDisplayed);
}

function finalizeTaskEdits(editModalInputs, targetIndex, currentPageDisplayed) {
    const editedTaskTitle = editModalInputs[0].value;
    const editedTaskDateDue = reformatDateDue(editModalInputs[1].value);
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
    const editedProjectDateDue = reformatDateDue(editProjectModalInputs[1].value);
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
        updateLocalStorage(`task`);
    } else {
        tasksToLoad = taskFilter(existingProjectTitle);
    }

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
        loadMainContent(projectsCreated, null, tasksCreated, `overview`);
    } else {
        loadMainContent(projectsCreated, projectObjectToLoad, tasksArrayToLoad, projectObjectToLoad.projectTitle);
    }
}

function reformatDateDue(dateString) {
    const year = dateString.slice(0, 4);
    const month = +dateString.slice(5, 7) - 1;
    const day = dateString.slice(8,10);
    return format(new Date(year, month, day), 'MM/dd/yyyy')
}

export {
    getObjectArrays,
    instantiateNewTask,
    instantiateNewProject,
    finalizeTaskEdits,
    finalizeProjectEdits,
    deleteTaskObject,
    deleteProjectObject,
}