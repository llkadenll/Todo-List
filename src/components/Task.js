import React from "react"

export default function Task(props) {

  function handleCompletedChange() {
    props.toggleCompleted(props.task.id)
  }

  console.log(props.task)

  const styles = {
    textDecoration: props.task.completed ? "line-through" : "none"
  }

  return (
    <div className="task">
      <input type="checkbox" id={props.task.id} checked={props.task.completed} onChange={handleCompletedChange} />
      <div className="task-name" style={styles}><label htmlFor={props.task.id}>{props.task.name}</label></div>
    </div>
  )
}