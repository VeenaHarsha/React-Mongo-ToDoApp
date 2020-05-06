import React, { useState } from 'react'

function TaskEditForm (props) {
  // const { handleInputChange, listItemId, onUpdateTask, task } = props
  const listId = props.listItemId
  const [task, setTask] = useState(props.task)

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    setTask({ ...task, [name]: value })
  }

  const handleTaskUpdate = async (event, listId, task) => {
    console.log('Am On Task Edit Form Update...', listId, task)
    event.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskId: task._id,
        taskName: task.taskName,
        notes: task.notes,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: task.completed
      })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/task/update/${listId}`, options)
      const data = await response.json()
      console.log('Data Is:', data)
    } catch (err) {
      console.log('Error:', err)
    }
  }
  return (
    <div className='task-form-container'>
      <form onSubmit={(event) => handleTaskUpdate(event, listId, task)}>
        <div>
          <input
            type='checkbox'
            name='isCompleted'
            checked={task.isCompleted}
            onChange={handleInputChange}
          />
          <label>
            Is completed
          </label>
        </div>
        <div>
          <label>
            <input
              type='text'
              name='taskName'
              placeholder='Add Task'
              onChange={handleInputChange}
              value={task.taskName}
            />
          </label>
        </div>
        <div>
          <label>
            <textarea
              name='notes'
              placeholder='Add Notes'
              value={task.notes}
              onChange={handleInputChange}
            />
          </label>
        </div>
        <label> Priority
          <select
            name='priority'
            value={task.priority}
            onChange={handleInputChange}
          >
            <option value='high'> High </option>
            <option value='mid'> Mid </option>
            <option value='low'> Low </option>
          </select>
        </label>
        <label>Due Date
          <input type='date' name='dueDate' value='task.dueDate' />
        </label>
        <button>Update</button>
        {/* <button>Delete</button> */}
      </form>
    </div>
  )
}

export default TaskEditForm
