import React from 'react'

function TaskEditForm (props) {
  const { selectedTask, handleUserTaskRequest, showTaskEditForm, handleSetTaskEditForm } = props

  const handleInputChange = (event) => {
    const target = event.target
    const name = target.name
    const value = target.type === 'checkbox' ? target.checked : target.value
    // props.setSelectedTask({ ...selectedTask, [name]: value })
    handleUserTaskRequest(true, { ...selectedTask, [name]: value })
  }

  const handleTaskUpdate = async (event) => {
    event.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        taskId: selectedTask._id,
        taskName: selectedTask.taskName,
        notes: selectedTask.notes,
        dueDate: selectedTask.dueDate,
        priority: selectedTask.priority,
        completed: selectedTask.completed
      })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/task/update/${props.selectedList}`, options)
      await response.json()
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const clickHandler = () => {
    handleSetTaskEditForm(false)
  }

  return (
    <div className='task-form-container' style={{ display: showTaskEditForm ? 'block' : 'none' }}>
      <form onSubmit={handleTaskUpdate}>
        <div>
          <input
            type='checkbox'
            name='completed'
            checked={selectedTask.completed}
            onChange={handleInputChange}
          />
          <label>
            Completed
          </label>
        </div>
        <div>
          <label>Task Name</label>
          <input
            type='text'
            name='taskName'
            placeholder='Add Task'
            onChange={handleInputChange}
            value={selectedTask.taskName}
          />
        </div>
        <div>
          <label>Notes</label>
          <textarea
            name='notes'
            placeholder='Add Notes'
            value={selectedTask.notes}
            onChange={handleInputChange}
          />
        </div>
        <label> Priority </label>
        <select
          name='priority'
          value={selectedTask.priority}
          onChange={handleInputChange}
        >
          <option value='high'> High </option>
          <option value='mid'> Mid </option>
          <option value='low'> Low </option>
        </select>
        <label>Due Date </label>
        <input
          type='date'
          name='dueDate'
          defaultValue={selectedTask.dueDate}
          onChange={handleInputChange}
        />
        <button onClick={clickHandler}>Update</button>
        <button onClick={clickHandler}>Close</button>
      </form>
    </div>
  )
}

export default TaskEditForm
