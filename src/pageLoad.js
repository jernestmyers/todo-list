function loadHeader(container) {
    const headerTitle = document.createElement(`h1`);
    headerTitle.textContent = `done.`;
    container.appendChild(headerTitle);
}

function loadLeftBar(container) {
    const addTask = document.createElement(`p`);
    const addProject = document.createElement(`p`);
    addTask.textContent = `add task`;
    addProject.textContent = `add project`;

    container.appendChild(addProject);
    container.appendChild(addTask);
}

function loadMainContent(container) {
    const testText = document.createElement(`p`);
    testText.textContent = `blah blah test blah test blah test test`;
    container.appendChild(testText);
}

export { 
    loadHeader,
    loadLeftBar,
    loadMainContent
}