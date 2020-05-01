import React, { useState } from 'react'
import './ListCategory.css'
import ListItems from './ListItems'

function ListCategory (props) {
  const [listName, setListName] = useState('')

  const addList = (e) => {
    setListName(e.target.value)
  }

  return (
    <div className='list-cat-div'>
      <form onSubmit={(event) => props.onCreateList(event, listName)}>
        <input
          type='text'
          className='list-input'
          placeholder='Add List Category..'
          onChange={addList}
          value={listName}
        />
      </form>
      <div className='list-items'>
        {props.listItems.map(item => (
          <ListItems
            key={item._id}
            onUpdateList={props.onUpdateList}
            onDeleteList={props.onDeleteList}
            listItem={item}
          />
        ))}
      </div>

    </div>
  )
}

export default ListCategory
