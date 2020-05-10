import React from 'react'
import './AddListItem.css'

function AddListItem (props) {
  // const [listName, setListName] = useState('')
  // const [listItems, setListItems] = useState(props.listItems)

  const handleChange = (event) => {
    props.addListName(event.target.value)
  }

  const handleCreateList = async (event) => {
    event.preventDefault()
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({ listName: props.listName })
    }
    try {
      const response = await window.fetch('http://localhost:2809/list/add', options)
      const data = await response.json()
      const newList = [...props.listItems, { _id: data._id, listName: data.listName }]
      props.addListItem(newList)
      props.addListName('')
    } catch (err) {
      console.log('Error:', err)
    }
  }

  return (
    <div className='list-cat-div'>
      <form onSubmit={handleCreateList}>
        <input
          type='text'
          className='list-cat-input'
          placeholder='Add List Category..'
          onChange={handleChange}
          value={props.listName}
        />
      </form>
    </div>
  )
}

export default AddListItem
