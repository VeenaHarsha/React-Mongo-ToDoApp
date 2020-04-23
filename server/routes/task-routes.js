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

router.post('/add/:listId', async (req, res) => {
  const listId = req.params.listId
  const newTask = (
    {
      taskName: req.body.taskName,
      completed: req.body.completed,
      dueDate: req.body.dueDate,
      notes: req.body.notes,
      priority: req.body.priority
    }
  )
  try {
    const todo = await ToDoModel.findOne({ _id: listId })
    todo.tasks.push(newTask)
    await todo.save()
    res.status(200).json('Task added!')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

router.delete('/:taskId', async (req, res) => {
  // const listId = 
  try {

  //   await.ToDoModel.update(
  //     {'_id': ObjectId("5150a1199fac0e6910000002")}, 
  //     { $pull: { "tasks" : { _id: req.params.taskId } } },
  // false,
  // true 
  // )
    console.log(ToDoModel.tasks)
    const task = await ToDoModel.findById(req.params.taskId)
    console.log('TASKKK:', task)
    // todo.tasks.pop(taskId)
    res.status(200).json('Task Deleted')
  } catch (err) {
    res.status(500).json('Error:' + err)
  }
})

module.exports = router
