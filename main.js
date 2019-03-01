// Define UI Variables
const FORM = document.getElementById('task-form');
const TASK_LIST = document.querySelector('.collection');
const CLEAR_BTN = document.querySelector('.clear-tasks');
const FILTER = document.getElementById('filter');
const TASK_INPUT = document.getElementById('task');

// Load All Event Listeners
loadEventListeners();

function loadEventListeners(){
  // Add task event
  FORM.addEventListener('submit', addTask);
}

// Add Task Function
function addTask(e){
  // prevent submit if no input exists
  if(TASK_INPUT.value === ''){console.log('add a task')};

  // create li element with text content of TASK_INPUT.value
  const LI = document.createElement('li');
  LI.textContent = TASK_INPUT.value;
  // add materialize class to li element
  LI.classList.add('collection-item');
  // create a link tag
  const LINK = document.createElement('a');
  // add martialize classes to link tag
  LINK.classList.add('delete-item','secondary-content');
  // add innerhtml icon to link tag
  LINK.innerHTML = '<i class="small material-icons">remove_circle_outline</i>';
  // append link to li element
  LI.appendChild(LINK);
  // append li element to TASK_LIST
  TASK_LIST.appendChild(LI);

  // clear TASK_INPUT
  TASK_INPUT.value = '';

  // add task to local storage

  e.preventDefault();
}