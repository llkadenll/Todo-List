import React from "react"
import Task from "./Task"
import {v4 as uuidv4} from "uuid"

export default function ToDoList(props) {

  const tasks = props.taskList.map(task => {
    return (
      <Task key={task.id} task={task} toggleCompleted={props.toggleCompleted} />
    )
  })

  return (
    <div className="task-list">
      {tasks}
    </div>
  )
}