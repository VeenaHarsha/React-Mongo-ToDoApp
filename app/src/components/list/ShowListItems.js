import React, { useState } from 'react'
import './ShowListItems.css'

function ShowListItems (props) {
  const [editMe, setEditMe] = useState(false)
  const [listName, setListName] = useState(props.listName)
  const { listItems, listItem, handleUserListRequest } = props

  const handleClick = (flag, selListItem, selListName) => {
    handleUserListRequest(flag, selListItem, selListName)
  }

  const handleListUpdate = async (event) => {
    event.preventDefault()
    const listId = listItem._id
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
      listItems.map(item => {
        if (item._id === listId) {
          item.listName = data.listName
        }
      })
      props.addListItem(listItems)
      setEditMe(false)
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const handleListDelete = async id => {
    const options = { method: 'DELETE' }
    try {
      await window.fetch(`http://localhost:2809/list/${id}`, options)
      const newList = listItems.filter(list => list._id !== id)
      props.addListItem(newList)
    } catch (err) {
      console.log('Error:', err)
    }
  }
  return (
    <>
      {editMe
        ? (<form className='form-div' onSubmit={handleListUpdate}>
          <input
            type='text'
            className='list-item-update'
            onChange={(event) => setListName(event.target.value)}
            onBlur={() => setEditMe(false)}
            defaultValue={listItem.listName}
          />
           </form>
        )
        : (
          <div className='list-item'>
            <p className='listPValue' onClick={() => handleClick(true, listItem._id, listItem.listName)}>{listItem.listName}</p>
            <img className='imgEdit' onClick={() => setEditMe(true)} src={require('./../../images/edit.png')} alt='Edit' />
            <img className='imgDel' onClick={() => handleListDelete(props.listItem._id)} src={require('./../../images/delete.png')} alt='Delete' />
          </div>)}
    </>
  )
}

export default ShowListItems
