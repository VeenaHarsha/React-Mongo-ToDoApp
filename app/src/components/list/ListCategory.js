import React, { useState, useEffect } from 'react'
import './ListCategory.css'

function ListCategory () {
  const [listName, setListName] = useState('')

  const initialList = [
    { listName: 'New List One' },
    { listName: 'New List Two' }
  ]
  const [items, setItems] = useState([initialList])

  useEffect(() => function () {
    const addListCategory = async () => {
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({ listName: listName })
      }
      try {
        const response = await window.fetch('http://localhost:2809/list/add/', options)
        const newListCat = [...items, ...[{ _id: response.body._id, listName: response.body.listName }]]
        setItems(newListCat)
        // setName(await response.json())
      } catch (err) {
        console.log('Error:', err)
      }
    }

    addListCategory()
  }, [items, listName])

  return (
    <div className='l-main-div'>
      <form>
        <input
          type='text'
          className='list-input'
          placeholder='Add List Category..'
          onChange={(e) => setListName(e.target.value)}
          value={listName}
        />
      </form>
      <h3>{listName}</h3>
    </div>
  )
}

export default ListCategory
/*
<p> {name} </p>
        <div className='list-items'>
          <ul>
            {items.map(item => (
              <li key='item.id'> {item.title}
                <img src={require('./../../images/edit.png')} alt='Edit' />
                <img src={require('./../../images/delete.png')} alt='Delete' />
              </li>
            ))}
          </ul>
        </div>

    window.fetch('http://localhost:2809/list/add', {
      method: 'POST',
      body: JSON.stringify({
        listName: name
      }),
      headers: {
        'content-type': 'Application/json; charset=UTF-8'
      }
    })
      .then(response => response.json())
      .then(json => setName(json.listName))
        */
