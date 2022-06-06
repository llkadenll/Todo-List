import React, { useState } from "react"
import ToDoList from "./components/ToDoList"
import {v4 as uuidv4} from "uuid"
// import NewTask from "./components/NewTask"

export default function App() {

  const [taskList, setTaskList] = useState([])
  const [task, setTask] = useState("")

  function handleChange(event) {
    const fieldValue = event.target.value
    setTask(fieldValue)
  }

  function handleAddTask(event) {
    event.preventDefault()
    if (task === "") return
    setTaskList(prevState => 
      [...prevState, { id: uuidv4(), name: task, completed: false }]
    )
    setTask("")
  }

  function toggleCompleted(id) {
    setTaskList(prevState => {
      return prevState.map(task => {
        return task.id === id ? {...task, completed: !task.completed} : task
      })
    })
  }

  function handleClearTasks() {
    const newTaskList = taskList.filter(task => !task.completed)
    setTaskList(newTaskList)
  }

  return (
    <>
      <ToDoList taskList={taskList} toggleCompleted={toggleCompleted} />
      {/* <NewTask handleChange={handleChange} handleAddTask={handleAddTask} /> */}
      <form onSubmit={handleAddTask}>
        <input
          type="text"
          placeholder="Task name"
          value={task}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleAddTask()
            }
          }}
          onChange={handleChange}
        />
        <button>Add</button>
      </form>
      <button onClick={handleClearTasks}>Clear completed tasks</button>
    </>
  )
}