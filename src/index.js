import {} from './dataModalHandler.js'
import { getObjectArrays } from './objectDataManagement.js'
import { loadMainContent } from './pageLoader.js'

const navContainer = document.querySelector(`#nav-container`);
const projectButton = document.querySelector(`#project-button`);
const projectListContainer = document.querySelector(`#project-list`);

navContainer.addEventListener(`click`, pageSelector);
projectButton.addEventListener(`click`, (e) => console.log(e.target.textContent));
projectListContainer.addEventListener(`click`, projectSelector);

const loadPage = (function() {
    const currentObjectArray = getObjectArrays();
    loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, `overview`);
})();

function pageSelector(e) {
    const pageSelectedTitle = e.target.textContent;
    if (pageSelectedTitle === `overview`) {
        const currentObjectArray = getObjectArrays();
        loadMainContent(currentObjectArray.projects, null, currentObjectArray.tasks, pageSelectedTitle);
    }
}

function projectSelector(e) {
<<<<<<< HEAD
    const projectSelected = e.target.textContent;
    regenerateProjectTasks(projectSelected);
}

function regenerateProjectTasks(pageTitle) {
    console.log(`regenerateTasks`);
    const currentObjectArray = getObjectArrays();
    if (pageTitle === `overview`) {
        loadMainContent(mainContainer, displayTasksOverview(currentObjectArray.tasks));
    } else {
        const projectDisplayedObject = currentObjectArray.projects.filter( object => {
            if (object.projectTitle === pageTitle) {
                return object;
            }
        })
        const filterTasks = currentObjectArray.tasks.filter( object => {
            if (object.projectAssociated === pageTitle) {
                return object
            }
        })
        console.log(projectDisplayedObject[0]);
        loadMainContent(mainContainer, displayExistingProject(projectDisplayedObject[0], filterTasks));
    }
}

const createTaskAndProjectModule = (function() {

    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);

    function checkFormValidation(inputNodeList) {
        let isValid = true;
        inputNodeList.forEach( inputField => {
            if (inputField.validity.valueMissing) {
                isValid = false;
            }
        })
        return isValid
    }

    function instantiateNewProject() {
        const projectInputArray = Array.from(projectUserInput);
        const currentObjectArray = getObjectArrays();
        const projectIndex = currentObjectArray.projects.length;
        createNewProject(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value, projectIndex);
        loadMainContent(mainContainer, displayNewProject(currentObjectArray.projects[projectIndex]));
        appendNewProjectToSelector(projectInputArray[0].value);
        attachDataToProjectButton(projectIndex);
    }

    function attachDataToProjectButton(indexNumber) {
        const newProjectButton = projectListContainer.lastChild;
        newProjectButton.setAttribute(`data-index-number`, indexNumber);
    }

    function appendNewProjectToSelector(newProjectTitle) {
        const addTaskProjectSelector = document.querySelector(`#project-associated`);
        const editTaskProjectSelector = document.querySelector(`#edit-project-associated`);
        
        const projectForAddTaskSelector = document.createElement(`option`);
        projectForAddTaskSelector.setAttribute(`value`, newProjectTitle);
        projectForAddTaskSelector.textContent = newProjectTitle;
        
        const projectForEditTaskSelector = document.createElement(`option`);
        projectForEditTaskSelector.setAttribute(`value`, newProjectTitle);
        projectForEditTaskSelector.textContent = newProjectTitle;

        addTaskProjectSelector.appendChild(projectForAddTaskSelector);
        editTaskProjectSelector.appendChild(projectForEditTaskSelector);
    }

    function instantiateNewTask() {
        const taskInputArray = Array.from(taskUserInput);
        const currentPageDisplayed = mainContainer.firstChild.firstChild.textContent;
        createNewTask(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value, taskInputArray[4].value);
        const currentObjectArray = getObjectArrays();
        const newTaskIndex = currentObjectArray.tasks.length - 1;
        if (currentPageDisplayed === `overview`) {
            loadMainContent(mainContainer, displayTasksOverview(currentObjectArray.tasks));
        } else if (currentPageDisplayed === currentObjectArray.tasks[newTaskIndex].projectAssociated) {
            regenerateProjectTasks(currentPageDisplayed);
        }
    }

    const submitProjectButton = document.querySelector(`#addProjectSubmitButton`);
    const submitTaskButton = document.querySelector(`#addTaskSubmitButton`);
    const cancelProjectButton = document.querySelector(`#cancelProject`);
    const cancelTaskButton = document.querySelector(`#cancelTask`);

    cancelProjectButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));
    cancelTaskButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));

    submitProjectButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(projectUserInput)) {
            instantiateNewProject();
            submitForm(e);
=======
    const currentObjectArray = getObjectArrays();
    const projectClickedTitle = e.target.textContent;
    const projectClickedIndex = e.target.dataset.indexNumber;

    let associatedTasksToLoad = [];
    currentObjectArray.tasks.filter( (taskObject) => {
        if (taskObject.taskProjectAssociated === projectClickedTitle) {
            associatedTasksToLoad.push(taskObject);
>>>>>>> majorRefactor
        }
    })

    loadMainContent(currentObjectArray.projects, currentObjectArray.projects[projectClickedIndex], associatedTasksToLoad, projectClickedTitle);
}