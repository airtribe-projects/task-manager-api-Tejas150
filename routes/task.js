const express = require('express')
const router = express.Router()
const taskController = require('../controllers/task')

router.get('/', taskController.getTasks)
router.get('/:id', taskController.getTaskById)
router.post('/', taskController.createTask)
router.put('/:id', taskController.updateTask)
router.delete('/:id', taskController.deleteTask)
router.get('/priority/:level', taskController.getTasksByPriority)

module.exports = router
