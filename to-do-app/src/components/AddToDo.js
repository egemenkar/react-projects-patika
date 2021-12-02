import { useState } from 'react'
import FilterToDos from './FilterToDos'
import ToDoList from './ToDoList'

export default function AddToDo() {
  
  const [todo, setTodo] = useState({todo: "", isDone: false})
  const [toDoList, setToDoList] = useState([])

  const changeHandler = (e) => {
    setTodo({todo: e.target.value, isDone: false})
  }

  const submitHandler = (e) => {
    if(e.key === "Enter") {
      e.preventDefault()
      setToDoList([...toDoList, todo])
      setTodo({todo: "", isDone: false})
    }
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        <input type="text" value={todo.todo} onKeyDown={submitHandler} placeholder="What needs to be done?" onChange={changeHandler} />
      </form>
      <ToDoList toDoList={toDoList} setToDoList={setToDoList} />
      <FilterToDos />
    </div>
  )
}
