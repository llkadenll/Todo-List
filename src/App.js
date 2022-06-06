import React, { useState, useEffect } from "react"
import ToDoList from "./components/ToDoList"
import {v4 as uuidv4} from "uuid"
// import NewTask from "./components/NewTask"

const LOCAL_STORAGE_KEY = "todoApp.todos"

export default function App() {

  const [taskList, setTaskList] = useState([])
  const [task, setTask] = useState("")

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if (storedTasks) setTaskList(storedTasks)
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(taskList))
  }, [taskList])

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
    <div className="app">
      <div className="app-title">TO DO LIST</div>
      <div>
        <ToDoList taskList={taskList} toggleCompleted={toggleCompleted} />
        {/* <NewTask handleChange={handleChange} handleAddTask={handleAddTask} /> */}
        <div className="bottom-section">
          <div className="bottom-ui">
            <div className="form-ui">
              <form onSubmit={handleAddTask}>
                <input
                  className="add-task"
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
                <button className="add-button">Add</button>
              </form>
            </div>
            <button className="clear-button" onClick={handleClearTasks}>Clear completed tasks</button>
          </div>
        </div>
      </div>
    </div>
  )
}