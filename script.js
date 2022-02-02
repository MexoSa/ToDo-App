const recordButton = document.querySelector('.record');
const input = document.querySelector(".input");
const taskBody = document.querySelector(".todo-body");
const filterButtons = Array.from(document.querySelectorAll('.filter'));
let taskListLocal = [];
let taskList = [];
let currentFilter = 'all';

const createTaskLocal = function () {
   taskListLocal = JSON.parse(localStorage.getItem('tasks'));
   taskListLocal.forEach(savedLocalTask => {
      createTask(savedLocalTask.name, savedLocalTask.isChecked);
   })
}

const updateLocal = function () {
   taskListLocal = taskList.map(task => {
      return {
         name: task.firstChild.innerHTML,
         isChecked: task.classList.contains('checked'),
      }
   });
   localStorage.setItem('tasks', JSON.stringify(taskListLocal));
}

recordButton.addEventListener('click', () => {
   if (input.value.trim() === '') return;
   createTask(input.value);
   filterTask();
   updateLocal();
});

input.addEventListener('keypress', (event) => {
   if (event.keyCode === 13) {
      if (event.target.value.trim() === '') return;
      createTask(event.target.value);
      filterTask();
      updateLocal();
   }
})

taskBody.addEventListener('dblclick', (event) => {
   if (event.target.tagName === 'P') {
      event.target.setAttribute('contenteditable', "true");
      event.target.focus();
      event.target.addEventListener('blur', () => {
         event.target.setAttribute('contenteditable', "false");
         updateLocal();
      })
   }
})

taskBody.addEventListener('click', (event) => {
   const currentTask = event.target.closest('div');
   if (event.target.classList.contains('delete')) {
      currentTask.classList.add('delete');
      setTimeout(() => {
         taskList.splice(taskList.indexOf(currentTask), 1);
         taskBody.removeChild(currentTask);
         updateLocal();
      }, 300);
   }
   if (event.target.classList.contains('checked')) {
      currentTask.classList.toggle('checked');
      setTimeout(() => {
         filterTask();
         updateLocal();
      }, 400);
   }
})

const createTask = function (text, isChecked) {
   let task = document.createElement('div');
   task.classList.add('task');
   if (isChecked) {
      task.classList.add('checked');
   }

   const checked = document.createElement('span');
   checked.innerHTML = '&#10004;';
   checked.classList.add('checked');

   const taskText = document.createElement('p');
   taskText.innerHTML = text;

   const deleteTask = document.createElement('span');
   deleteTask.innerHTML = '&#215;';
   deleteTask.classList.add('delete');

   task.appendChild(taskText);
   task.appendChild(checked);
   task.appendChild(deleteTask);
   taskBody.appendChild(task);
   taskList.push(task);

   input.value = '';
   input.focus();
}

const filterTask = function () {
   taskBody.innerHTML = '';

   switch (currentFilter) {
      case 'all': {
         taskList.forEach(task => {
            taskBody.appendChild(task);
         })
         break
      }

      case 'completed': {
         taskList.forEach(task => {
            if (task.classList.contains('checked')) {
               taskBody.appendChild(task)
            }
         })
         break
      }

      case 'uncompleted': {
         taskList.forEach(task => {
            if (!task.classList.contains('checked')) {
               taskBody.appendChild(task)
            }
         })
         break
      }
   }
}

filterButtons.forEach(filterBtn => {
   if (filterBtn.classList.contains('all')) {
      filterBtn.classList.add('active');
   }
   filterBtn.addEventListener('click', () => {
      filterButtons.forEach(filterBtn => {
         filterBtn.classList.remove('active');
      })
      filterBtn.classList.add('active');
      if (filterBtn.classList.contains('all')) {
         currentFilter = 'all';
      } else if (filterBtn.classList.contains('completed')) {
         currentFilter = 'completed';
      } else if (filterBtn.classList.contains('uncompleted')) {
         currentFilter = 'uncompleted';
      }
      taskBody.classList.add('change');
      setTimeout(() => {
         filterTask();
         taskBody.classList.remove('change');
      }, 400);
   });
})

createTaskLocal();
