import React from "react"

export default function Task(props) {

  function handleCompletedChange() {
    props.toggleCompleted(props.task.id)
  }

  return (
    <div className="task">
      <input type="checkbox" id={props.task.id} checked={props.task.complete} onChange={handleCompletedChange} />
      <label htmlFor={props.task.id}>{props.task.name}</label>
    </div>
  )
}