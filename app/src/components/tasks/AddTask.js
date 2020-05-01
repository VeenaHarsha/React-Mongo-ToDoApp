import React, { useState } from 'react'

function AddTask (props) {
  const [taskName, setTaskName] = useState('')

  function addTaskName (e) {
    setTaskName(e.target.value)
  }

  return (
    <div>
      <h3>props.listName</h3>
      <input
        type='text'
        name='taskname'
        placeholder='Add Task'
        onChange={addTaskName}
        value={taskName}
      />
    </div>

  )
}

export default AddTask
