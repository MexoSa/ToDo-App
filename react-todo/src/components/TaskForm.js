export default function TaskForm({ newTaskValue, setNewTaskValue, createTask }) {
   return (
      <>
         <h2>What need to do?</h2>
         <form className="TaskForm">
            <input value={newTaskValue} onChange={(e) => setNewTaskValue(e.target.value)} />
            <button className="btn-active" onClick={(e) => createTask(e, newTaskValue)}>Add</button>
         </form>
      </>
   )
}