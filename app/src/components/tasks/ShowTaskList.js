import React, { useEffect } from 'react'
import ShowFooter from './ShowFooter'

function ShowTaskList (props) {
  const { tasks, task, handleUserRequestTask, listItemId } = props

  useEffect(() => {
    getTaskItems()
  }, [listItemId])

  const getTaskItems = async () => {
    try {
      const response = await window.fetch(`http://localhost:2809/task/${listItemId}`)
      const data = await response.json()
      props.addSetTasks(data[0].tasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleTaskDelete = async () => {
    const options = {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ taskId: task._id })
    }
    try {
      await window.fetch(`http://localhost:2809/task/${listItemId}`, options)
      const filteredTasks = tasks.filter(t => t._id !== task._id)
      props.addSetTasks(filteredTasks)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleClick = (flag, task) => {
    console.log('Am clicked:', task)
    handleUserRequestTask(flag, task)
  }

  return (
    <div>
      <div className='task-item'>
        <div className='pValue' onClick={() => handleClick(true, task)}> {task.taskName}
          {task.dueDate && <p><small>Due on: {task.dueDate}</small></p>}
        </div>
        <img className='imgDel' onClick={handleTaskDelete} src={require('./../../images/delete.png')} alt='Delete' />
      </div>
      <div>
        <ShowFooter
          tasks={tasks}
          onTaskDelete={handleTaskDelete}
          listItemId={listItemId}
        />
      </div>
    </div>
  )
}

export default ShowTaskList
