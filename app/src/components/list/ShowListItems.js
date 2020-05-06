import React, { useState } from 'react'
import './ShowListItems.css'

function ShowListItems (props) {
  const [editMe, setEditMe] = useState(false)
  const [listName, setListName] = useState(props.listName)
  const [listItems, setListItems] = useState(props.listItems)
  const { listItem, handleUserRequest } = props

  const handleClick = (flag, selListItem, selListName) => {
    console.log('Am Clicked!!', flag, selListItem, selListName)
    handleUserRequest(flag, selListItem, selListName)
  }

  const handleListUpdate = async (event, listName, listId) => {
    console.log('Am On Update...', listId, listName)
    event.preventDefault()
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listName: listName })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/list/update/${listId}`, options)
      const data = await response.json()
      const newListItems = listItems.map(item => {
        if (item._id === listId) {
          item.listName = data.listName
        }
      })
      setListItems({ listItems: newListItems })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleListDelete = async id => {
    const options = { method: 'DELETE' }
    try {
      await window.fetch(`http://localhost:2809/list/${id}`, options)
      setListItems(listItems.filter(item => item._id !== id))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <>
      {editMe
        ? (<form className='form-div' onSubmit={event => handleListUpdate(event, listName, listItem._id)}>
          <input
            type='text'
            className='list-item-update'
            // onChange={(e) => onUpdateList(e, props.listItem._id, e.target.value)}
            onChange={(event) => setListName(event.target.value)}
            onBlur={() => setEditMe(false)}
            defaultValue={listItem.listName}
          />
           </form>
        )
        : (
          <div className='list-item'>
            {/* <p className='list-item' onClick={handleClicks(listItem)}> {listItem.listName} */}
            <p className='listPValue' onClick={() => handleClick(true, listItem._id, listItem.listName)}>{listItem.listName}</p>
            <img className='imgEdit' onClick={() => setEditMe(true)} src={require('./../../images/edit.png')} alt='Edit' />
            <img className='imgDel' onClick={() => handleListDelete(props.listItem._id)} src={require('./../../images/delete.png')} alt='Delete' />
          </div>)}
    </>
  )
}

export default ShowListItems
