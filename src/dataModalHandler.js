import { getObjectArrays, instantiateNewTask, instantiateNewProject, finalizeTaskEdits, finalizeProjectEdits, deleteTaskObject, deleteProjectObject } from './objectDataManagement.js'

// module contains functions to open, close and submit addTask and addProject form modals
const newObjectModalModule = (function() {

    const addTaskContainer = document.querySelector(`#add-task-container`);
    addTaskContainer.addEventListener(`click`, openNewObjectModal);
    
    const projectUserInput = document.querySelectorAll(`.projectUserInputs`);
    const taskUserInput = document.querySelectorAll(`.taskUserInputs`);
    
    function openNewObjectModal(e) {
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
            instantiateNewProject(projectUserInput);
            submitNewObjectForm(e);
        }
    })
    
    submitTaskButton.addEventListener(`click`, (e) => {
        if (checkFormValidation(taskUserInput)) {
            instantiateNewTask(taskUserInput);
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
})();

// module contains functions to open, close and submit editTask and editProject form modals
const editObjectModalModule = (function() {
    const mainContainer = document.querySelector(`#main-content`);
    mainContainer.addEventListener(`click`, (e) => {
        const currentPage = mainContainer.firstChild.firstChild.textContent;
        if (e.target.className === `edit-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditTaskModal(taskSelectedIndex, currentPage);
        } else if (e.target.className === `delete-task-btn`) {
            const taskSelectedIndex = e.target.parentElement.dataset.indexNumber;
            deleteTaskObject(taskSelectedIndex, currentPage);
        } else if (e.target.id === `edit-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openEditProjectModal(projectSelectedTitle, projectSelectedIndex);
        } else if (e.target.id === `delete-project-btn`) {
            const projectSelectedTitle = e.target.parentNode.firstChild.textContent;
            const projectSelectedIndex = e.target.parentElement.dataset.indexNumber;
            openDeleteProjectModal(projectSelectedTitle, projectSelectedIndex);
        }
    });

    function openEditTaskModal(taskToEditIndex, pageDisplayedTitle) {
        
        const currentObjectArray = getObjectArrays();
        
        const editTaskModal = document.querySelector(`#editTaskModal`);
        editTaskModal.style.display = `block`;
        
        // pre-populate the text inputs with existing data
        const editTaskInputs = document.querySelectorAll(`.editTaskInputs`);
        editTaskInputs[0].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskTitle}`);
        editTaskInputs[1].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDateDue}`);
        editTaskInputs[2].setAttribute(`value`, `${currentObjectArray.tasks[taskToEditIndex].taskDescription}`);
        
        const confirmEdits = document.querySelector(`#editTaskSubmitButton`);
        confirmEdits.addEventListener(`click`, (e) => {
            if (checkFormValidation(editTaskInputs)) {
                finalizeTaskEdits(editTaskInputs, taskToEditIndex, pageDisplayedTitle);
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
        
        const currentObjectArray = getObjectArrays();

        const editProjectModal = document.querySelector(`#editProjectModal`);
        editProjectModal.style.display = `block`;
        
        // pre-populate the edit form with existing data
        const editProjectInputs = document.querySelectorAll(`.editProjectInputs`);
        editProjectInputs[0].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectTitle}`);
        editProjectInputs[1].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDateDue}`);
        editProjectInputs[2].setAttribute(`value`, `${currentObjectArray.projects[projectToEditIndex].projectDescription}`);
        
        const confirmEdits = document.querySelector(`#editProjectSubmitButton`);
        confirmEdits.addEventListener(`click`, (e) => {
            if (checkFormValidation(editProjectInputs)) {
                finalizeProjectEdits(editProjectInputs, projectToEditIndex, projectToEditTitle);
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
            deleteProjectObject(projectToDeleteTitle, projectToDeleteIndex);
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
})();

function checkFormValidation(inputNodeList) {
    let isValid = true;
    inputNodeList.forEach( inputField => {
        if (inputField.validity.valueMissing) {
            isValid = false;
        }
    })
    return isValid
}