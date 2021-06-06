import { loadHeader, loadLeftBar, loadMainContent } from './pageLoad.js'
import { createNewProject, createNewTask } from './taskCreation.js'

const headerContainer = document.querySelector(`#page-header`);
const leftContainer = document.querySelector(`#left-container`);
const mainContainer = document.querySelector(`#main-content`);

loadHeader(headerContainer);
loadLeftBar(leftContainer);
loadMainContent(mainContainer);


const createProjectModule = (function() {

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
        console.log(projectInputArray);
        createNewProject(projectInputArray[0].value, projectInputArray[1].value, projectInputArray[2].value);
    }

    function instantiateNewTask() {
        const taskInputArray = Array.from(taskUserInput);
        console.log(taskInputArray);
        createNewTask(taskInputArray[0].value, taskInputArray[1].value, taskInputArray[2].value, taskInputArray[3].value);
    }

    const submitProjectButton = document.querySelector(`#addProjectSubmitButton`);
    const submitTaskButton = document.querySelector(`#addTaskSubmitButton`);
    const cancelProjectButton = document.querySelector(`#cancelProject`);
    const cancelTaskButton = document.querySelector(`#cancelTask`);

    cancelProjectButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));
    cancelTaskButton.addEventListener(`click`, (e) => closeFormModal(e.target.id));

    submitProjectButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(projectUserInput)) {
            e.preventDefault();
            instantiateNewProject();
            closeFormModal(e.target.id);
        }
    })

    submitTaskButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(taskUserInput)) {
            e.preventDefault();
            instantiateNewTask();
            closeFormModal(e.target.id);
        }
    })

    function closeFormModal(buttonID) {
        const modalToClose = document.querySelectorAll(`.modal`);
        const formToReset = document.querySelectorAll(`.formField`);
        console.log(`cancel`);
        if (buttonID === `addProjectSubmitButton` || buttonID === `cancelProject`) {
            modalToClose[1].style.display = `none`;
            formToReset[1].reset();
        } else {
            modalToClose[0].style.display = `none`;
            formToReset[0].reset();
        }
    }

})();