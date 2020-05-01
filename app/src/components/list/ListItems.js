import React, { useState } from 'react'
import './ListItems.css'
import AddTask from '../tasks/AddTask'

function ListItems (props) {
  const [editMe, setEditMe] = useState(false)

  function changeToEdit (newVal) {
    setEditMe(newVal)
  }
  function showAddTask (selectedList) {
    return (<AddTask selectedList={selectedList} />)
  }
  function renderListItem () {
    if (!editMe) {
      return (<p onClick={showAddTask(props.listItem)}>{props.listItem.listName}</p>)
    } else {
      return (
        <input
          type='text'
          className='list-item-input'
          onChange={(e) => props.onUpdateList(props.listItem._id, e.target.value)}
          onBlur={() => changeToEdit(false)}
          value={props.listItem.listName}
        />)
    }
  }
  return (
    <div className='list-item'>
      {renderListItem()}
      <img className='imgEdit' onClick={() => changeToEdit(true)} src={require('./../../images/edit.png')} alt='Edit' />
      <img className='imgDel' onClick={() => props.onDeleteList(props.listItem._id)} src={require('./../../images/delete.png')} alt='Delete' />
    </div>
  )
}

export default ListItems
/*
 <img className='imgEdit' onClick={() => props.onUpdateList(props.listItem._id, props.listItem.listName)} src={require('./../../images/edit.png')} alt='Edit' />
*/
