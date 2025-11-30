import React from 'react';
import axios from 'axios';
import { Task } from '../../types';
import { format } from 'date-fns';
import './TaskCard.css';

interface TaskCardProps {
  task: Task;
  onUpdate: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onUpdate }) => {
  const toggleStatus = async () => {
    try {
      await axios.put(`/api/tasks/${task._id}`, {
        status: task.status === 'pending' ? 'completed' : 'pending'
      });
      onUpdate();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTask = async () => {
    if (!confirm('Are you sure you want to delete this task?')) return;
    
    try {
      await axios.delete(`/api/tasks/${task._id}`);
      onUpdate();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className={`task-card ${task.status} animate-fade-in`}>
      <div className="task-card-inner">
        <div className="task-header">
          <h3 className="task-title">{task.title}</h3>
          <span className={`status-badge status-${task.status}`}>
            {task.status === 'pending' ? '⏳ Pending' : '✓ Done'}
          </span>
        </div>
        
        {task.description && (
          <p className="task-description">{task.description}</p>
        )}
        
        <div className="task-footer">
          <div className="task-meta">
            <span className="task-date">
              📅 {format(new Date(task.dueDate), 'MMM dd, yyyy')}
            </span>
          </div>
          
          <div className="task-actions">
            <button 
              onClick={toggleStatus} 
              className="btn-icon btn-toggle" 
              title={task.status === 'pending' ? 'Mark as complete' : 'Mark as pending'}
            >
              {task.status === 'pending' ? '✓' : '↺'}
            </button>
            <button 
              onClick={deleteTask} 
              className="btn-icon btn-delete" 
              title="Delete task"
            >
              🗑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
