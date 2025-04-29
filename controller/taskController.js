import Task from '../models/task.js';

// Get all tasks
export const getAllTasks = async (req, res, next) => {
    try {
        const tasks = await Task.findAll();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
};

// Get single task
export const getTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Create task
export const createTask = async (req, res, next) => {
    try {
        const { title, description, completed } = req.body;
        const task = await Task.create({ title, description, completed });
        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
};

// Update task
export const updateTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.update(req.body);
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        next(error);
    }
};

// Delete task
export const deleteTask = async (req, res, next) => {
    try {
        const task = await Task.findByPk(req.params.id);
        if (task) {
            await task.destroy();
            res.json({ message: 'Task deleted' });
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        next(error);
    }
};