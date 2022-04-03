import FilterBtn from "./FilterBtn"

export default function TaskFilter({ filterButtons, filterTask, flag }) {
   return (
      <div className='TaskFilter'>
         {
            filterButtons.map(button => {
               return (
                  <FilterBtn key={button} flag={flag} filterTask={filterTask} value={button} />
               )
            })
         }
      </div>
   )
}