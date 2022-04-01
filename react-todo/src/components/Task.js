export default function Task({ task, checkedTask, deleteTask, changeTaskValue }) {
   return (
      <div id={task.id} className={`task ${task.isComplete ? 'checked' : ''}`}>
         <p onDoubleClick={(e) => changeTaskValue(e, task)}>{task.value}</p>
         <button style={{ backgroundColor: "rgb(245, 86, 86)" }} className='delete' onClick={(e) => deleteTask(e, task)}>Delete</button>
         <button style={{ backgroundColor: "rgb(67, 206, 54)" }} className='checked' onClick={() => checkedTask(task)}>Check</button>
      </div>
   )
}