import React, { useState, useEffect } from 'react'
import AddListItem from './list/AddListItem'
import AddTask from './tasks/AddTask'
import ShowListItems from './list/ShowListItems'
import TaskEditForm from './tasks/TaskEditForm'

function ToDoApp () {
  const [listItems, setListItems] = useState([
    {
      listName: '',
      tasks: [
        {
          taskName: '',
          isCompleted: false,
          dueDate: '',
          priority: 'low',
          notes: ''
        }
      ]
    }
  ])

  const [userRequest, setUserRequest] = useState({
    showTask: false,
    selectedList: '',
    selListName: ''
  })
  const [userRequestTask, setUserRequestTask] = useState({
    showEditTask: false,
    selectedTask: {}
  })

  const getListItems = async () => {
    try {
      const response = await window.fetch('http://localhost:2809/list/')
      const data = await response.json()
      setListItems(data)
    } catch (err) {
      console.log('Error:', err)
    }
  }
  useEffect(() => {
    console.log('List Items - UseEffect- Running')
    getListItems()
  }, [])

  const onSetUserRequest = (flag, selList, selListName) => {
    console.log('We reached Safe :', flag, selList, selListName)
    setUserRequest({
      showTask: flag,
      selectedList: selList,
      selListName: selListName
    })
  }
  const onSetUserRequestTask = (flag, selTask) => {
    setUserRequestTask({
      showEditTask: flag,
      selectedTask: selTask
    })
  }
  return (
    <div>
      <div className='header'>
        <h1>To Do App </h1>
      </div>
      <div className='row'>
        <div className='column side'>
          <AddListItem
            listItems={listItems}
          />
          {listItems.length && listItems.map(lItem => (
            <div key={lItem._id}>
              <ShowListItems
                handleUserRequest={onSetUserRequest}
                listItem={lItem}
                listItems={listItems}
              />
            </div>
          ))}

        </div>
        <div className='column middle'>
          {userRequest.showTask &&
            <AddTask
              listName={userRequest.selListName}
              listItems={listItems}
              listItemId={userRequest.selectedList}
              handleUserRequestTask={onSetUserRequestTask}
            />}
        </div>
        <div className='column side'>
          {userRequestTask.showEditTask &&
            <TaskEditForm
              task={userRequestTask.selectedTask}
              listItemId={userRequest.selectedList}
            />}
        </div>
      </div>
    </div>
  )
}

export default ToDoApp
