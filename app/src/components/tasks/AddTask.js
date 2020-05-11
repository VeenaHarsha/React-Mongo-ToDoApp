import React, { useState, useEffect } from 'react'
import './AddTask.css'

function AddTask (props) {
  const { listName, listItemId, handleUserTaskRequest, handleSetTaskEditForm } = props

  const [taskName, setTaskName] = useState('')
  const [tasks, setTasks] = useState([{
    taskName: '',
    completed: false,
    dueDate: '',
    priority: 'low',
    notes: ''
  }])

  useEffect(() => {
    console.log('TaskItems - UseEffect- Running')
    getTaskItems()
  }, [listItemId])

  const getTaskItems = async () => {
    try {
      const response = await window.fetch(`http://localhost:2809/task/${listItemId}`)
      const data = await response.json()
      setTasks(data[0].tasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleInputChange = (event) => {
    setTaskName(event.target.value)
  }

  const handleAddTasks = (task) => {
    setTasks(task)
  }

  const handleCreateTask = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ taskName: taskName })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/task/${listItemId}`, options)
      const data = await response.json()
      const newTask = { _id: data.tasks[tasks.length]._id, taskName: data.tasks[tasks.length].taskName }
      setTasks([...tasks, newTask])
      setTaskName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleTaskDelete = async (taskId) => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ taskId: taskId })
    }
    try {
      await window.fetch(`http://localhost:2809/task/${listItemId}`, options)
      const filteredTasks = tasks.filter(t => t._id !== taskId)
      handleAddTasks(filteredTasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleClick = (flag, task) => {
    handleSetTaskEditForm(true)
    handleUserTaskRequest(flag, task)
  }

  const buttonHandler = (event, filterType) => {
    event.preventDefault()
    const activeItems = tasks.filter(task => !task.completed)
    const completedItems = tasks.filter(task => task.completed)
    filterType === 'active' ? handleAddTasks(activeItems) : handleAddTasks(completedItems)
  }

  const handleClearCompletedTasks = () => {
    const compTasks = tasks.filter(task => task.completed)
    compTasks.forEach((task) => {
      handleTaskDelete(task._id)
    })
  }

  return (
    <div>
      <h3>{listName}</h3>
      <div className='list-cat-div'>
        <form onSubmit={handleCreateTask}>
          <input
            type='text'
            className='list-cat-input'
            name='taskName'
            placeholder='Add Task..'
            onChange={handleInputChange}
            value={taskName}
          />
        </form>
      </div>
      {tasks.length && tasks.map(task => (
        <div key={task._id} className='task-item'>
          <div className='pValue' onClick={() => handleClick(true, task)}> {task.taskName}
            {task.dueDate && <p><small>Due on: {task.dueDate}</small></p>}
          </div>
          <img className='imgDel' onClick={() => handleTaskDelete(task._id)} src={require('./../../images/delete.png')} alt='Delete' />
        </div>
      ))}
      <div className='flex-footer'>
        <div className='btn-show'>
          <button onClick={(e) => buttonHandler(e, 'active')}>Active</button>
          <button onClick={(e) => buttonHandler(e, 'completed')}>Completed</button>
        </div>
        <div className='btn-clear'>
          <button onClick={handleClearCompletedTasks}>Clear Completed </button>
        </div>
      </div>
    </div>
  )
}

export default AddTask
