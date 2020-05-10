import React from 'react'

function ShowFooter (props) {
  const { tasks, onTaskDelete, listItemId } = props

  const buttonHandler = (filterType) => {
    const activeItems = tasks.filter(task => !task.completed)
    const completedItems = tasks.filter(task => task.completed)
    if (filterType === 'active') {
      console.log('Active Items r:', activeItems)
      return activeItems
    } else if (filterType === 'completed') {
      console.log('Completed Items r:', completedItems)
      return completedItems
    } else {
      console.log('All Items r:', tasks)
      return tasks
    }
  }
  const handleClearCompletedTasks = () => {
    console.log('Tasks Are:', tasks)
    // const completedTasks = tasks.filter(task => task.completed).length > 0
    const compTasks = tasks.filter(task => task.completed)
    compTasks.forEach((task) => {
      console.log('Tasks:', task._id, listItemId)
      onTaskDelete(listItemId, task._id)
    })
  }
  return (
    <div className='flex-footer'>
      <div className='btn-show'>
        <button onClick={() => buttonHandler('all')}>All</button>
        <button onClick={() => buttonHandler('active')}>Active</button>
        <button onClick={() => buttonHandler('completed')}>Completed</button>
      </div>
      <div className='btn-clear'>
        <button onClick={() => handleClearCompletedTasks}>Clear Completed </button>
      </div>
    </div>
  )
}
export default ShowFooter
