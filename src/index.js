import { loadMainContent, openModal } from './pageLoad.js'
import { getObjectArrays, createNewProject, createNewTask } from './taskCreation.js'
import { displayNewProject, displayTasksOverview } from './displayNewItems.js'

const addTaskContainer = document.querySelector(`#add-task-container`);
const navContainer = document.querySelector(`#nav-container`);
const projectListContainer = document.querySelector(`#project-container`);
const mainContainer = document.querySelector(`#main-content`);

addTaskContainer.addEventListener(`click`, openModal);
navContainer.addEventListener(`click`, (e) => console.log(e.target.textContent));
projectListContainer.addEventListener(`click`, (e) => console.log(e.target.textContent));
// console.log(currentObjectArray.projects);
let currentObjectArray = getObjectArrays();
loadMainContent(mainContainer, currentObjectArray.tasks, displayTasksOverview(currentObjectArray.tasks));


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
        // console.log(projectInputArray);
        createNewProject(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value);
        currentObjectArray = getObjectArrays();
        let projectIndex = currentObjectArray.projects.length - 1;
        console.log(projectIndex);
        console.log(currentObjectArray.projects[projectIndex]);
        loadMainContent(mainContainer, projectIndex, displayNewProject(currentObjectArray.projects[projectIndex]));
        // const title = currentObjectArray.projects.find( (item, index) => item[index].title === projectInputArray[0].value);
        // console.log(title);
        // loadMainContent(mainContainer, currentObjectArray.projects);
        // console.log(currentObjectArray);
        // console.log(currentObjectArray.projects);
        // console.log(currentObjectArray.projects[0]);
        // console.log(currentObjectArray.projects[0].title);
    }

    function instantiateNewTask() {
        const taskInputArray = Array.from(taskUserInput);
        // console.log(taskInputArray);
        createNewTask(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value);
        currentObjectArray = getObjectArrays();
        loadMainContent(mainContainer, currentObjectArray.tasks);
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
        }
    })

    submitTaskButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(taskUserInput)) {
            instantiateNewTask();
            submitForm(e);
        }
    })

    function submitForm(event) {
        event.preventDefault();
        closeFormModal(event.target.id);
    }

    function closeFormModal(buttonID) {
        const modalToClose = document.querySelectorAll(`.modal`);
        const formToReset = document.querySelectorAll(`.formField`);
        if (buttonID === `addProjectSubmitButton` || buttonID === `cancelProject`) {
            modalToClose[1].style.display = `none`;
            formToReset[1].reset();
        } else {
            modalToClose[0].style.display = `none`;
            formToReset[0].reset();
        }
    }

})();