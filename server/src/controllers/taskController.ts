import { Response } from 'express';
import { Task } from '../models/Task';
import { AuthRequest } from '../types';

export const getTasks = async (req: AuthRequest, res: Response) => {
  try {
    const { date, status } = req.query;
    const userId = req.userId;

    let query: any = { userId };

    if (status && (status === 'pending' || status === 'completed')) {
      query.status = status;
    }

    if (date) {
      const searchDate = new Date(date as string);
      const nextDay = new Date(searchDate);
      nextDay.setDate(nextDay.getDate() + 1);
      
      query.dueDate = {
        $gte: searchDate,
        $lt: nextDay
      };
    }

    const tasks = await Task.find(query).sort({ dueDate: 1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const createTask = async (req: AuthRequest, res: Response) => {
  try {
    const { title, description, dueDate } = req.body;
    const userId = req.userId;

    const task = new Task({
      userId,
      title,
      description,
      dueDate: new Date(dueDate)
    });

    await task.save();
    res.status(201).json({ message: 'Task created successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const updates = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: id, userId },
      updates,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task updated successfully', task });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const deleteTask = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    const task = await Task.findOneAndDelete({ _id: id, userId });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
