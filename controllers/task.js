const fs = require('fs')
const path = require('path')

const taskFilePath = path.join(__dirname, '../task.json')

const readTasksFromFile = () => {
	try {
		const data = fs.readFileSync(taskFilePath, 'utf8')
		const { tasks } = JSON.parse(data)
		return tasks
	}
	catch (err) {
		throw 'Error occured while reading tasks from file'
	}
}

const writeTasksToFile = (tasks) => {
	try {
		fs.readFile(taskFilePath, 'utf8', (err, data) => {
			if (err) {
				throw err
			}
			const jsonData = JSON.parse(data)
			jsonData.tasks = tasks

			fs.writeFileSync(taskFilePath, JSON.stringify(jsonData, null, 2))

		})
	}
	catch (err) {
		throw 'Error occured while writing tasks into file'
	}
}

const sortTasksByCreationDate = (tasks, order) => {
	try {
		if (order === 'asc') {
			return tasks.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
		} else if (order === 'desc') {
			return tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
		}
	}
	catch(err) {
		throw 'Error occured while sorting tasks'
	}
}

const validateTask = (task) => (
	task.title && task.title.length > 0 &&
	task.description && task.description.length > 0 &&
	typeof task.completed === 'boolean' &&
	['low', 'medium', 'high'].includes(task.priority)
)

const isValidId = (id) => {
    const parsedId = parseInt(id, 10);
    return !isNaN(parsedId) && parsedId > 0 && Number.isInteger(parsedId);
};

module.exports = {

	getTasks: (req, res) => {
		try {
			let tasks = readTasksFromFile()
			const { completed, sort } = req.query
			if (completed) {
				const isCompleted = completed === 'true'
				tasks = tasks.filter(task => task.completed === isCompleted)
			}

			tasks = sortTasksByCreationDate(tasks, sort)

			return res.status(200).json(tasks)
		} catch (err) {
			return res.status(500).json({ error: 'Server Error' })
		}
	},

	getTaskById: (req, res) => {
		try {

			if(!isValidId(req.params.id)) {
				return res.status(400).json({ error: 'Invalid task ID' })
			}

			const tasks = readTasksFromFile()
			const task = tasks.find(t => t.id === parseInt(req.params.id))
			if (!task) {
				return res.status(404).json({ error: 'Task not found' })
			}

			return res.status(200).json(task)
		} catch (err) {

			return res.status(500).json({ error: 'Server Error' })
		}
	},

	createTask: (req, res) => {
		try {
			const { title, description, completed, priority } = req.body

			if (!validateTask({ title, description, completed, priority })) {
				return res.status(400).json({ error: 'Invalid task data' })
			}

			let tasks = readTasksFromFile()
			const newTask = {
				id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
				title,
				description,
				completed,
				priority,
				createdAt: new Date(),
				updatedAt: new Date()
			}

			tasks.push(newTask)
			writeTasksToFile(tasks)

			return res.status(201).json(newTask)
		} catch (err) {
			return res.status(500).json({ error: 'Server Error' })
		}
	},

	updateTask: (req, res) => {
		try {

			if(!isValidId(req.params.id)) {
				return res.status(400).json({ error: 'Invalid task ID' })
			}

			const { title, description, completed, priority } = req.body
			const tasks = readTasksFromFile()

			const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id))
			if (taskIndex === -1) {
				return res.status(404).json({ error: 'Task not found' })
			}

			const updatedTask = {
				...tasks[taskIndex],
				title: title !== undefined ? title : tasks[taskIndex].title,
				description: description !== undefined ? description : tasks[taskIndex].description,
				completed: completed !== undefined ? completed : tasks[taskIndex].completed,
				priority: priority !== undefined ? priority : tasks[taskIndex].priority,
				updatedAt: new Date()
			}

			tasks[taskIndex] = updatedTask
			writeTasksToFile(tasks)

			return res.status(200).json(tasks[taskIndex])
		} catch (err) {
			return res.status(500).json({ error: 'Server Error' })
		}
	},

	deleteTask: (req, res) => {
		try {

			if(!isValidId(req.params.id)) {
				return res.status(400).json({ error: 'Invalid task ID' })
			}

			const tasks = readTasksFromFile()
			const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id))
			if (taskIndex === -1) {
				return res.status(404).json({ error: 'Task not found' })
			}

			tasks.splice(taskIndex, 1)
			writeTasksToFile(tasks)

			return res.status(200).json({ message: 'Task deleted' })
		} catch (err) {
			return res.status(500).json({ error: 'Server Error' })
		}
	},

	getTasksByPriority: (req, res) => {
		try {
			const tasks = readTasksFromFile()
			const { level } = req.params

			const validLevels = ['low', 'medium', 'high']
			if (!validLevels.includes(level)) {
				return res.status(400).json({ error: 'Invalid priority level' })
			}

			const filteredTasks = tasks.filter(task => task.priority === level)
			res.status(200).json(filteredTasks)
		} catch (err) {
			res.status(500).json({ error: 'Server Error' })
		}
	}

}
