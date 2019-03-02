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
  // Delete task event
  TASK_LIST.addEventListener('click', deleteTask);
  // Delete all tasks event
  CLEAR_BTN.addEventListener('click', clearTasks);
  // Filter tasks event
  FILTER.addEventListener('keyup', filterTasks);
}

// Add Task Function
function addTask(e){
  // prevent submit if no input exists
  if(TASK_INPUT.value === '') return;

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

  // store task in local storage
  storeTaskLocalStorage(TASK_INPUT.value);

  // clear TASK_INPUT
  TASK_INPUT.value = '';

  e.preventDefault();
}

// store task function
function storeTaskLocalStorage(task){
  let tasks;
  // check if local storage has tasks 
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  // add task to tasks
  tasks.push(task);
  // update local storage, must be in the form of a string
  // in this case the key is 'tasks' and the value is the the array
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Delete task function
// Use event delegation
function deleteTask(e){
  // select the closest element '.delete-item' to the click event
  let deleteItem = e.target.closest('.delete-item');
  // check if the click event happened on '.delete-item'
  if (!deleteItem) return;
  // delete the parent element of the '.delete-item'
  TASK_LIST.removeChild(deleteItem.parentElement);

  // get 'tasks' from local storage as array
  let tasks = JSON.parse(localStorage.getItem('tasks'));
  // create new array, add items back in except the deleteItem
  let newTasks = tasks.filter(taskItem => taskItem != deleteItem.parentElement.firstChild.textContent);
  // if newTasks is an empty array delete 'tasks' from local storage
  if(newTasks.length == 0){
    localStorage.removeItem('tasks');
    // else update local storage with the new task list
  } else {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }
}

// Clear all tasks function
function clearTasks(){
  while(TASK_LIST.firstChild){
    TASK_LIST.removeChild(TASK_LIST.firstChild);
  }
  // remove all tasks from local storage
  localStorage.removeItem('tasks');
}

// Filter tasks
// because the event is fired on keyup all elements will display if the filter = ''
function filterTasks(e){
  // Get the text entered into the input element to use as filter
  let filterBy = e.target.value.toLowerCase();
  // for each task in the task list
  for(let item of TASK_LIST.children){
    // check if any index of any task matches the filter
    if(item.firstChild.textContent.toLowerCase().indexOf(filterBy) != -1){
      // if it does display the item
      item.style.display = 'block';
    } else {
      // if not then hide the item
      item.style.display = 'none';
    } 
  }
}