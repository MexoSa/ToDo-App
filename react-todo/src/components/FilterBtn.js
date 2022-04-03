export default function FilterBtn({ flag, filterTask, value }) {
   return (
      <button key={value} className={`filter ${value === flag ? 'active' : ''}`} onClick={() => filterTask(value)}>{value}</button>
   )
}