const recordButton = document.querySelector('.record');
const input = document.querySelector(".input");
const taskBody = document.querySelector(".todo-body");
let taskListLocal = [];
let taskList = [];
let currentFilter = 'All';

const createTaskLocal = function () {
   taskListLocal = JSON.parse(localStorage.getItem('tasks'));
   taskListLocal.forEach(item => {
      createTask(item.name, item.isChecked);
   })
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
   createTask(input.value);
   updateLocal();
});
input.addEventListener('keypress', (event) => {
   if (event.keyCode === 13) {
      if (event.target.value.trim() === '') return;
      createTask(event.target.value);
      updateLocal();
   }
})

const createTask = function (text, isChecked) {

   let task = document.createElement('div');
   task.classList.add('task');
   if (isChecked) {
      task.classList.add('checked');
   }

   const taskText = document.createElement('p');
   taskText.innerHTML = text;
   taskText.addEventListener('click', () => {
      task.classList.toggle('checked');
      filterTask(currentFilter);
      updateLocal();
   })

   const deleteTask = document.createElement('span');
   deleteTask.innerHTML = '&#215;';
   deleteTask.addEventListener('click', () => {
      task.classList.add('delete');
      setTimeout(() => {
         taskList.splice(taskList.indexOf(task), 1);
         taskBody.removeChild(task);
         updateLocal();
      }, 200);
   })

   task.appendChild(taskText);
   task.appendChild(deleteTask);
   taskBody.appendChild(task);
   taskList.push(task);

   input.value = '';
}

createTaskLocal();

const filterTask = function (value) {
   taskBody.innerHTML = '';

   switch (value) {
      case 'All': {
         taskList.forEach(item => {
            taskBody.appendChild(item);
         })
         break
      }

      case 'Completed': {
         taskList.forEach(item => {
            if (item.classList.contains('checked')) {
               taskBody.appendChild(item)
            }
         })
         break
      }

      case 'Uncompleted': {
         taskList.forEach(item => {
            if (!item.classList.contains('checked')) {
               taskBody.appendChild(item)
            }
         })
         break
      }

   }
}

const filterBtns = Array.from(document.querySelectorAll('.filter'));

filterBtns.forEach(item => {
   if (item.innerHTML === 'All') {
      item.classList.add('active');
   }
   item.addEventListener('click', (event) => {
      filterBtns.forEach(filterBtn => {
         filterBtn.classList.remove('active');
      })
      item.classList.add('active');
      currentFilter = event.target.innerHTML;
      filterTask(event.target.innerHTML);
   });
})
