import React, { useEffect, useContext } from 'react'
import './ListItems.css'
import { ListItemContext } from './ListItemContext'

function ListItems () {
  const [listItems, setListItems] = useContext(ListItemContext)

  const updateList = async (id, listName) => {
    console.log('U clicked on update')
    const options = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ listName: listName })
    }
    try {
      const response = await window.fetch(`http://localhost:2809/list/update/${id}`, options)
      const data = await response.json()
      console.log('Data IS:', data.listName)
      listItems.map(item => {
        if (item.key === id) {
          item.listName = data.listName
        }
      })
    } catch (err) {
      console.log('Error:', err)
    }
  }

  const deleteList = async id => {
    const options = { method: 'DELETE' }
    try {
      await window.fetch(`http://localhost:2809/list/${id}`, options)
      setListItems(listItems.filter(item => item._id !== id))
    } catch (err) {
      console.log('Error:', err)
    }
  }

  useEffect(() => {
    const getListItems = async () => {
      try {
        const response = await window.fetch('http://localhost:2809/list/')
        const data = await response.json()
        await setListItems(data)
      } catch (err) {
        console.log('Error:', err)
      }
    }
    getListItems()
  }, [updateList])

  return (
    <div className='list-items'>
      <ul>
        {listItems.map(item => (
          <li className='list-item' key={item._id}>
            {/* <p>{item.listName}</p> */}
            <input
              type='text'
              className='list-item-label'
              onChange={(e) => updateList(item._id, e.target.value)}
              value={item.listName}
            />
            {/* <img className='imgEdit' onClick={() => updateList(item._id, item.listName)} src={require('./../../images/edit.png')} alt='Edit' /> */}
            <img className='imgDel' onClick={() => deleteList(item._id)} src={require('./../../images/delete.png')} alt='Delete' />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ListItems
