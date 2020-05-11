import React, { useState, useEffect } from 'react'
import AddListItem from './list/AddListItem'
import AddTask from './tasks/AddTask'
import ShowListItems from './list/ShowListItems'
import TaskEditForm from './tasks/TaskEditForm'

function ToDoApp () {
  const [listName, setListName] = useState('')
  const [showTaskEditForm, setshowTaskEditForm] = useState(false)
  const [listItems, setListItems] = useState([
    {
      listName: '',
      tasks: [
        {
          taskName: '',
          completed: false,
          dueDate: null,
          priority: 'low',
          notes: ''
        }
      ]
    }
  ])

  const [userListRequest, setUserListRequest] = useState({
    showTask: false,
    selectedList: '',
    selListName: ''
  })
  const [userTaskRequest, setUserTaskRequest] = useState({
    showEditTask: false,
    selectedTask: {}
  })

  useEffect(() => {
    getListItems()
  }, [])

  const getListItems = async () => {
    try {
      const response = await window.fetch('http://localhost:2809/list/')
      const data = await response.json()
      setListItems(data)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const onSetUserListRequest = (flag, selList, selListName) => {
    setUserListRequest({
      showTask: flag,
      selectedList: selList,
      selListName: selListName
    })
  }
  const onSetUserTaskRequest = (flag, selTask) => {
    setUserTaskRequest({
      showEditTask: flag,
      selectedTask: selTask
    })
  }

  const addListItem = (list) => {
    setListItems(list)
  }

  const addListName = (newListName) => {
    setListName(newListName)
  }

  const handleSetTaskEditForm = (flag) => {
    setshowTaskEditForm(flag)
  }

  return (
    <div>
      <div className='header'>
        <h1>To Do App </h1>
      </div>
      <div className='row'>
        <div className='column side'>
          <AddListItem
            addListItem={addListItem}
            addListName={addListName}
            listName={listName}
            listItems={listItems}
          />
          <div>
            {listItems.length && listItems.map(lItem => (
              <ShowListItems
                key={lItem._id}
                handleUserListRequest={onSetUserListRequest}
                listItem={lItem}
                listItems={listItems}
                addListItem={addListItem}
                addListName={addListName}
                showTaskEditForm={showTaskEditForm}
                handleSetTaskEditForm={handleSetTaskEditForm}
              />
            ))}
          </div>
        </div>
        <div className='column middle'>
          {userListRequest.showTask &&
            <AddTask
              listName={userListRequest.selListName}
              listItems={listItems}
              listItemId={userListRequest.selectedList}
              handleUserTaskRequest={onSetUserTaskRequest}
              handleSetTaskEditForm={handleSetTaskEditForm}
            />}
        </div>
        <div className='column side'>
          {userTaskRequest.showEditTask &&
            <TaskEditForm
              showTaskEditForm={showTaskEditForm}
              handleSetTaskEditForm={handleSetTaskEditForm}
              selectedTask={userTaskRequest.selectedTask}
              selectedList={userListRequest.selectedList}
              handleUserTaskRequest={onSetUserTaskRequest}
            />}
        </div>
      </div>
      {/* <div className='flex-footer' /> */}
    </div>
  )
}

export default ToDoApp
