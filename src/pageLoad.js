import { displayNewProject, displayTasksOverview } from './displayNewItems.js'

function loadMainContent(container, functionToInvoke) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
    let containerToDisplay = functionToInvoke;
    container.appendChild(containerToDisplay);
}

function openModal(e) {
    const modalToOpen = document.querySelectorAll(`.modal`);
    if (e.target.id === `addTaskButton`) {
        modalToOpen[0].style.display = `block`;
    } else {
        modalToOpen[2].style.display = `block`;
    }
}

function openEditModal(object, index) {
    console.log(`open edit modal`);
    console.log(object);
    console.log(index);
    const modalToOpen = document.querySelector(`#editTaskModal`);
    const formInputs = document.querySelectorAll(`.editTaskInputs`);
    const statusOption = document.querySelector(`#existing-status`);
    const projectOption = document.querySelector(`#existing-project`);

    // console.log(object[index].title);
    // console.log(formInputs[0]);
    formInputs[0].setAttribute(`value`, `${object[0].title}`);
    formInputs[1].setAttribute(`value`, `${object[0].dateDue}`);
    formInputs[2].setAttribute(`value`, `${object[0].description}`);
    statusOption.textContent = `${object[0].priorityStatus} priority`;
    
    if (object[0].projectAssociated === `default`) {
        projectOption.textContent = `overview (${object[0].projectAssociated})`;
    } else {
        projectOption.textContent = object[0].projectAssociated;
    }
    // formInputs[3].setAttribute(`option`, `${object[0].priorityStatus}`);
    // formInputs[4].setAttribute(`value`, `${object[0].projectAssociated}`);
    // console.log(formInputs);
    // console.log(object[index]);
    modalToOpen.style.display = `block`;
}

export { 
    loadMainContent,
    openModal,
    openEditModal,
}