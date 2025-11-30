import React, { useState, useEffect } from 'react';
import axios from 'axios';
import type { Task } from '../types';
import TaskCard from '../components/tasks/TaskCard';
import AddTaskModal from '../components/tasks/AddTaskModal';
import './Home.css';

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

  const fetchTasks = async () => {
    try {
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await axios.get('/api/tasks', { params });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [filter]);

  const todayTasks = tasks.filter(task => {
    const today = new Date().toDateString();
    return new Date(task.dueDate).toDateString() === today;
  });

  const upcomingTasks = tasks.filter(task => {
    const today = new Date();
    const taskDate = new Date(task.dueDate);
    return taskDate > today;
  });

  return (
    <div className="container home-page">
      <div className="home-header animate-fade-in">
        <div>
          <h1 style={{ textShadow: '0 0 40px rgba(124, 58, 237, 0.5)' }}>
            Welcome Back! 👋
          </h1>
          <p className="subtitle">Here's an overview of your tasks</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          + Add Task
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>{tasks.filter(t => t.status === 'pending').length}</h3>
          <p>Pending Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{tasks.filter(t => t.status === 'completed').length}</h3>
          <p>Completed Tasks</p>
        </div>
        <div className="stat-card">
          <h3>{todayTasks.length}</h3>
          <p>Due Today</p>
        </div>
      </div>

      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          All
        </button>
        <button 
          className={`filter-tab ${filter === 'pending' ? 'active' : ''}`}
          onClick={() => setFilter('pending')}
        >
          Pending
        </button>
        <button 
          className={`filter-tab ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
      </div>

      <div className="tasks-section">
        <h2>Today's Tasks</h2>
        <div className="tasks-grid">
          {todayTasks.length > 0 ? (
            todayTasks.map(task => (
              <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
            ))
          ) : (
            <div className="empty-state">
              <p>No tasks for today</p>
            </div>
          )}
        </div>
      </div>

      <div className="tasks-section">
        <h2>Upcoming Tasks</h2>
        <div className="tasks-grid">
          {upcomingTasks.length > 0 ? (
            upcomingTasks.map(task => (
              <TaskCard key={task._id} task={task} onUpdate={fetchTasks} />
            ))
          ) : (
            <div className="empty-state">
              <p>No upcoming tasks</p>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <AddTaskModal 
          onClose={() => setShowModal(false)} 
          onSuccess={fetchTasks} 
        />
      )}
    </div>
  );
};

export default Home;
