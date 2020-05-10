import React, { useState, useEffect } from 'react'
import './AddTask.css'
import ShowTaskList from './ShowTaskList'

function AddTask (props) {
  const { listName, listItemId, handleUserTaskRequest } = props

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
  }, [])

  const getTaskItems = async () => {
    try {
      const response = await window.fetch(`http://localhost:2809/task/${listItemId}`)
      const data = await response.json()
      console.log('From UseEffect -AddTask: ', data)
      setTasks(data[0].tasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleInputChange = (event) => {
    setTaskName(event.target.value)
  }

  const addSetTasks = (task) => {
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
      console.log('Data is :', data.tasks[tasks.length])
      const newTask = { _id: data.tasks[tasks.length]._id, taskName: data.tasks[tasks.length].taskName }
      console.log('Displaying: ', newTask)
      setTasks([...tasks, newTask])
      setTaskName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }
  // {(event) => handleCreateTask(event, tasks.taskName)}
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
      <div>
        {tasks.length && tasks.map(task => (
          <ShowTaskList
            key={task._id}
            task={task}
            listItemId={listItemId}
            tasks={tasks}
            addSetTasks={addSetTasks}
            handleUserRequestTask={handleUserTaskRequest}
          />
        ))}
      </div>
    </div>
  )
}

export default AddTask
