
export default function ToDoList({toDoList, setToDoList}) {

  const checkHandler = (key) => {
    let tempArr = toDoList.slice()
    tempArr[key].isDone = !tempArr[key].isDone
    setToDoList(tempArr)
    
  }

  return (
    <div>
      <ul>
      {toDoList.map((todo, key) => {
        return <li key={key}><input type="checkbox" onChange={() => checkHandler(key)} />{todo.todo}</li>
      })}
      </ul>
    </div>
    
    
  )
}
