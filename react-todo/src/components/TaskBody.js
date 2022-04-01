import Task from "./Task"

export default function TaskBody({ tasks, checkedTask, deleteTask, changeTaskValue }) {
   return (
      <div className='TaskBody'>
         {tasks.map(task => {
            return (
               <Task task={task} key={task.id} checkedTask={checkedTask} deleteTask={deleteTask} changeTaskValue={changeTaskValue} />
            )
         })}
      </div>
   )
}
