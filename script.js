const recordButton = document.querySelector('.record');
const input = document.querySelector(".input");
const taskBody = document.querySelector(".todo-body");
const filterBtns = Array.from(document.querySelectorAll('.filter'));
let taskListLocal = [];
let taskList = [];
let currentFilter = 'all';

const createTaskLocal = function () {
   taskListLocal = JSON.parse(localStorage.getItem('tasks'));
   taskListLocal.forEach(item => {
      createTask(new Task(item.name, item.isChecked));
   })
}

//вместо classList.contains getStatus() ??
const getStatus = function () {
   return this.classList.contains
}

const updateLocal = function () {
   taskListLocal = taskList.map(item => {
      return {
         name: item.firstChild.innerHTML,
         isChecked: item.classList.contains('checked'),
      }
   });
   localStorage.setItem('tasks', JSON.stringify(taskListLocal));
}

recordButton.addEventListener('click', () => {
   if (input.value.trim() === '') return;
   createTask(new Task(input.value));
   filterTask();
   updateLocal();
});

input.addEventListener('keypress', (event) => {
   if (event.keyCode === 13) {
      if (event.target.value.trim() === '') return;
      createTask(new Task(event.target.value));
      filterTask();
      updateLocal();
   }
})

//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
function Task(text, checked) {
   this.isChecked = function () {
      if (checked) {
         this.task.classList.add('checked');
      }
   };
   this.createDOMStructure = function () {
      this.task = document.createElement('div');
      this.task.classList.add('task');
      this.checkedBtn = document.createElement('span');
      this.checkedBtn.innerHTML = '&#10004;';
      this.taskText = document.createElement('p');
      this.taskText.setAttribute('contenteditable', "true");
      this.taskText.innerHTML = text;
      this.deleteBtn = document.createElement('span');
      this.deleteBtn.innerHTML = '&#215;';
      this.task.appendChild(this.taskText);
      this.task.appendChild(this.checkedBtn);
      this.task.appendChild(this.deleteBtn);
      taskBody.appendChild(this.task);
   }
   this.completeTask = function () {
      this.checkedBtn.addEventListener('click', () => {
         this.task.classList.toggle('checked');
         setTimeout(() => {
            filterTask();
            updateLocal();
         }, 400);
      })
   }
   this.changeTask = function () {
      this.taskText.addEventListener('blur', () => {
         updateLocal();
      })
   }
   this.deleteTask = function () {
      this.deleteBtn.addEventListener('click', () => {
         this.task.classList.add('delete');
         setTimeout(() => {
            taskList.splice(taskList.indexOf(this.task), 1);
            taskBody.removeChild(this.task);
            updateLocal();
         }, 300);
      })
   }
   this.pushTaskToTaskList = function () {
      taskList.push(this.task);
   }
}

const createTask = function (newTask) {
   newTask.createDOMStructure();
   newTask.isChecked();
   newTask.changeTask();
   newTask.deleteTask();
   newTask.completeTask();
   newTask.pushTaskToTaskList();
   input.value = '';
}
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

// const createTask = function (text, isChecked) {

//    let task = document.createElement('div');
//    task.classList.add('task');
//    if (isChecked) {
//       task.classList.add('checked');
//    }

//    const checked = document.createElement('span');
//    checked.innerHTML = '&#10004;';
//    checked.addEventListener('click', () => {
//       task.classList.toggle('checked');
//       setTimeout(() => {
//          filterTask();
//          updateLocal();
//       }, 400);
//    })

//    const taskText = document.createElement('p');
//    taskText.setAttribute('contenteditable', "true");
//    taskText.innerHTML = text;
// blur - потеря фокуса
//    taskText.addEventListener('blur', () => {
//       updateLocal();
//    })

//    const deleteTask = document.createElement('span');
//    deleteTask.innerHTML = '&#215;';
//    deleteTask.addEventListener('click', () => {
//       task.classList.add('delete');
//       setTimeout(() => {
//          taskList.splice(taskList.indexOf(task), 1);
//          taskBody.removeChild(task);
//          updateLocal();
//       }, 300);
//    })

//    task.appendChild(taskText);
//    task.appendChild(checked);
//    task.appendChild(deleteTask);
//    taskBody.appendChild(task);
//    taskList.push(task);

//    input.value = '';
// }

createTaskLocal();

const filterTask = function () {
   taskBody.innerHTML = '';

   switch (currentFilter) {
      case 'all': {
         taskList.forEach(item => {
            taskBody.appendChild(item);
         })
         break
      }

      case 'completed': {
         taskList.forEach(item => {
            if (item.classList.contains('checked')) {
               taskBody.appendChild(item)
            }
         })
         break
      }

      case 'uncompleted': {
         taskList.forEach(item => {
            if (!item.classList.contains('checked')) {
               taskBody.appendChild(item)
            }
         })
         break
      }

   }
}

filterBtns.forEach(item => {
   if (item.classList.contains('all')) {
      item.classList.add('active');
   }
   item.addEventListener('click', () => {
      filterBtns.forEach(filterBtn => {
         filterBtn.classList.remove('active');
      })
      item.classList.add('active');
      if (item.classList.contains('all')) {
         currentFilter = 'all';
      } else if (item.classList.contains('completed')) {
         currentFilter = 'completed';
      } else if (item.classList.contains('uncompleted')) {
         currentFilter = 'uncompleted';
      }
      taskBody.classList.add('change');
      setTimeout(() => {
         filterTask();
         taskBody.classList.remove('change');
      }, 400);
   });
})
