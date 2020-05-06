import React, { useState, useEffect } from 'react'
import './AddTask.css'

function AddTask (props) {
  // const [listItems, setListItems] = useState(props.listItems)
  const { listName, listItemId } = props
  const { handleUserRequestTask } = props

  const [tasks, setTasks] = useState([{
    taskName: '',
    completed: false,
    dueDate: '',
    priority: 'low',
    notes: ''
  }])

  const getTaskItems = async () => {
    try {
      const response = await window.fetch(`http://localhost:2809/task/${listItemId}`)
      const data = await response.json()
      setTasks(data[0].tasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }
  useEffect(() => {
    console.log('TaskItems - UseEffect- Running')
    getTaskItems()
  }, [listItemId])

  const handleInputChange = (event) => {
    const target = event.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setTasks({ ...tasks, [name]: value })
  }

  const handleCreateTask = async (event, taskName) => {
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
      setTasks(data.tasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleTaskDelete = async (listItemId, taskId) => {
    console.log('Am From DeleteHandler: ', listItemId, taskId)
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ taskId: taskId })
    }
    try {
      await window.fetch(`http://localhost:2809/task/${listItemId}`, options)
      // setListItems(listItems.filter(item => item._id !== id))
      setTasks(tasks.filter(task => task._id !== taskId))
    } catch (err) {
      console.log('Error:', err)
    }
  }
  const handleClick = (flag, task) => {
    handleUserRequestTask(flag, task)
  }
  return (
    <div>
      <h3>{listName}</h3>
      <div className='list-cat-div'>
        <form onSubmit={(event) => handleCreateTask(event, tasks.taskName)}>
          <input
            type='text'
            className='list-cat-input'
            name='taskName'
            placeholder='Add Task..'
            onChange={handleInputChange}
            value={tasks.taskName}
          />
        </form>
      </div>
      <div>
        {tasks.map(task => (
          <div className='list-item' key={task._id}>
            <p className='pValue' onClick={() => handleClick(true, task)}> {task.taskName} </p>
            <img className='imgDel' onClick={() => handleTaskDelete(listItemId, task._id)} src={require('./../../images/delete.png')} alt='Delete' />
          </div>
        ))}
      </div>
    </div>
  )
}

// tasks.length &&

export default AddTask
