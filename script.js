// constants
const selectedBgColor = 'rgb(128, 128, 128)';
const listTask = '#lista-tarefas';

function removeSelectedListItem() {
  const list = document.querySelectorAll('li');
  for (let index = 0; index < list.length; index += 1) {
    if (list[index].style.backgroundColor === selectedBgColor) {
      list[index].style.backgroundColor = 'white';
      return;
    }
  }
}

function clickListItem(event) {
  const { target } = event;
  removeSelectedListItem();
  target.style.backgroundColor = selectedBgColor;
}

function markListItem(event) {
  const { target } = event;
  // const decoration = target.style.textDecoration;
  if (target.classList < 1) target.classList.add('completed');
  else target.classList.remove('completed');
}

function createTask(string) {
  const taskList = document.querySelector(listTask);
  const task = document.createElement('li');
  task.innerText = string;
  taskList.appendChild(task);
  task.addEventListener('click', clickListItem);
  task.addEventListener('dblclick', markListItem);
  return task;
}

function createTaskPress() {
  const input = document.querySelector('#texto-tarefa');
  if (input.value !== '') {
    createTask(input.value);
    input.value = '';
  }
}

function removeAllTasks() {
  const list = document.querySelector(listTask).children;
  const listLength = list.length;
  for (let index = listLength - 1; index >= 0; index -= 1) {
    list[index].remove();
  }
}

function isCompletedTask(task) {
  const classes = task.classList;
  for (let index = 0; index < classes.length; index += 1) {
    if (classes[index] === 'completed') return true;
  }
  return false;
}

function removeLinedTasks() {
  const list = document.querySelector(listTask).children;
  const listLength = list.length;
  for (let index = listLength - 1; index >= 0; index -= 1) {
    if (isCompletedTask(list[index])) list[index].remove();
  }
}

function saveAllTasks() {
  let stringList = '';
  const list = document.querySelector(listTask).children;
  for (let index = 0; index < list.length; index += 1) {
    stringList += `${list[index].innerText}`;
    if (isCompletedTask(list[index])) stringList += '.completed';
    if (index < list.length - 1) stringList += '/final/';
  }
  window.localStorage.setItem('lista', stringList);
}

function checkClassLoad(tasks, index) {
  if (tasks[index].split('.')[1] === 'completed') {
    const task = createTask((tasks[index].split('.')[0]));
    task.classList.add('completed');
  } else createTask(tasks[index]);
}

function loadAllTasks() {
  const local = window.localStorage.getItem('lista');
  if (local !== null) {
    const tasks = local.split('/final/');
    // const tasks = window.localStorage.getItem('lista').split(' ');
    for (let index = 0; index < tasks.length; index += 1) {
      checkClassLoad(tasks, index);
    }
  }
}

function findColored() {
  const taskList = document.querySelector(listTask).children;
  for (let index = 0; index < taskList.length; index += 1) {
    if (taskList[index].style.backgroundColor === selectedBgColor) {
      return index;
    }
  }
}

function moveTaskUp() {
  // verificar se alguma tarefa esta marcada
  const coloredIndex = findColored();
  if (coloredIndex !== undefined && coloredIndex > 0) {
    // selecionando a lista de tarefas
    const taskList = document.querySelector(listTask);
    // selecionando a tarefa que esta a cima da selecionada
    const upperTask = taskList.children[coloredIndex - 1];
    // removendo a tarefa superior para que a de baixo suba
    upperTask.remove();
    // adicionando a tarefa removida apos a que subiu
    taskList.insertBefore(upperTask, taskList.children[coloredIndex]);
  } else window.alert('problema na seleção');
}

function moveTaskDown() {
  const coloredIndex = findColored();
  const taskList = document.querySelector(listTask);
  if (coloredIndex !== undefined && coloredIndex < taskList.children.length - 1) {
    // const belowTask = taskList.children[coloredIndex + 1];
    const selectedTask = taskList.children[coloredIndex];
    selectedTask.remove();
    taskList.insertBefore(selectedTask, taskList.children[coloredIndex + 1]);
  } else window.alert('problema na seleção');
}

function removeSelected() {
  const coloredIndex = findColored();
  const taskList = document.querySelector(listTask);
  taskList.children[coloredIndex].remove();
}

const makeTask = document.querySelector('#criar-tarefa');
makeTask.addEventListener('click', createTaskPress);
const eraseAll = document.querySelector('#apaga-tudo');
eraseAll.addEventListener('click', removeAllTasks);
const removeFinished = document.querySelector('#remover-finalizados');
removeFinished.addEventListener('click', removeLinedTasks);
const saveTask = document.querySelector('#salvar-tarefas');
saveTask.addEventListener('click', saveAllTasks);
const moveUp = document.querySelector('#mover-cima');
moveUp.addEventListener('click', moveTaskUp);
const moveDown = document.querySelector('#mover-baixo');
moveDown.addEventListener('click', moveTaskDown);
const removeSelect = document.querySelector('#remover-selecionado');
removeSelect.addEventListener('click', removeSelected);

loadAllTasks();
