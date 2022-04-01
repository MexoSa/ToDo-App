import { useEffect, useState } from 'react';
import TaskForm from './TaskForm';
import TaskBody from './TaskBody';

export default function ToDoContainer() {
   const [newTaskValue, setNewTaskValue] = useState('');
   const [tasks, setTasks] = useState([]);
   const filterButtons = ['All', 'Completed', 'Uncompleted'];
   let [flag, setFlag] = useState('All');
   const [filterTasks, setFilterTasks] = useState(tasks);

   function checkedTask(task) {
      const newTasks = tasks.map(t => {
         if (t.id === task.id) {
            t.isComplete = !t.isComplete;
         }
         return t;
      });
      setTasks(newTasks);
   }

   function changeTaskValue(e, task) {
      e.target.setAttribute('contenteditable', "true");
      e.target.focus();
      e.target.addEventListener('blur', () => {
         if (e.target.innerText.trim() === '') {
            e.target.focus();
            return
         }
         e.target.setAttribute('contenteditable', "false");
         const newTasks = tasks.map(t => {
            if (t.id === task.id) {
               t.value = e.target.innerHTML;
            }
            return t;
         });
         setTasks(newTasks);
      })
   }

   function deleteTask(e, task) {
      e.target.closest('.task').classList.add('deleted');
      const newTasks = tasks.filter(t => t.id !== task.id);
      setTasks(newTasks);
   }

   function filterTask(button) {
      setFlag(button);
      if (button === 'All') {
         setFilterTasks(tasks);
      } else if (button === 'Completed') {
         const newTasks = [...tasks].filter(t => t.isComplete);
         setFilterTasks(newTasks);
      } else if (button === 'Uncompleted') {
         const newTasks = [...tasks].filter(t => !t.isComplete);
         setFilterTasks(newTasks);
      }
   }

   function createTask(e, value) {
      e.preventDefault();
      if (value.trim() === '') {
         setNewTaskValue('');
         return
      }
      setTasks((prevTasks => {
         return [...prevTasks, {
            id: tasks.length + 1,
            value: value,
            isComplete: false
         }]
      }));
      setNewTaskValue('');
   }


   useEffect(() => {
      setTimeout(() => {
         filterTask(flag);
      }, 200);
   }, [tasks]);

   return (
      <div className='ToDoContainer' >
         <TaskForm newTaskValue={newTaskValue} setNewTaskValue={setNewTaskValue} createTask={createTask} />
         <TaskBody tasks={filterTasks} checkedTask={checkedTask} deleteTask={deleteTask} changeTaskValue={changeTaskValue} />
         <div className='TaskFilter'>
            {
               filterButtons.map(button => {
                  return (
                     <button key={button} className={`filter ${button === flag ? 'active' : ''}`} onClick={() => filterTask(button)}>{button}</button>
                  )
               })
            }
         </div>
      </div>
   );
}
