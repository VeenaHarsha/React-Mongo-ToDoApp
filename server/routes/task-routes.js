const router = require('express').Router()
const ToDoModel = require('../models/ToDoSchema')

router.get('/:listId/', async (req, res) => {
  try {
    const listId = req.params.listId
    const tasks = ToDoModel.findById(listId)
    const task = await tasks.find()
    res.status(200).json(task)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.post('/:listId/', async (req, res) => {
  const { taskName } = req.body
  console.log('Am In Task Add...', taskName)
  const id = req.params.listId
  const list = await ToDoModel.findById(id)
  console.log('ToDo is :', list)
  try {
    const newTask = {
      taskName: taskName,
      completed: false,
      dueDate: '',
      priority: 'low',
      notes: ''
    }
    list.tasks.push(newTask)
    await list.save()
    return res.status(200).json(list)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.put('/update/:listId', async (req, res) => {
  console.log('Request Is:', req.body)
  const listId = req.params.listId
  const { taskId, taskName, completed, dueDate, notes, priority } = req.body

  try {
    const list = await ToDoModel.findOne({ _id: listId })
    const index = list.tasks.findIndex(list => list._id == taskId)
    list.tasks[index].taskName = taskName
    list.tasks[index].completed = completed
    list.tasks[index].dueDate = dueDate
    list.tasks[index].notes = notes
    list.tasks[index].priority = priority
    await list.save()
    res.status(200).json(list)
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.delete('/:listId', async (req, res) => {
  console.log('Am in delete: ', req.params.listId)
  const { taskId } = req.body
  const listId = req.params.listId
  console.log('Task Id is: ', taskId)
  try {
    const list = await ToDoModel.findOne({ _id: listId })
    const index = list.tasks.findIndex(list => list._id == taskId)
    console.log('Task to delete:', index)
    await list.tasks.splice(index, 1)
    await list.save
    res.status(200).json([list])
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

module.exports = router
