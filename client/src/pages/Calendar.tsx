import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import { Task } from '../types';
import TaskCard from '../components/tasks/TaskCard';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import './Calendar.css';

const Calendar: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tasks, setTasks] = useState<Task[]>([]);

  const fetchTasksByDate = async (date: Date) => {
    try {
      const dateStr = format(date, 'yyyy-MM-dd');
      const response = await axios.get('/api/tasks', {
        params: { date: dateStr }
      });
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasksByDate(selectedDate);
  }, [selectedDate]);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  const pendingCount = tasks.filter(t => t.status === 'pending').length;
  const completedCount = tasks.filter(t => t.status === 'completed').length;

  return (
    <div className="calendar-page">
      <div className="container">
        <div className="page-header animate-fade-in">
          <div>
            <h1>📅 Calendar View</h1>
            <p className="subtitle">Browse and manage your tasks by date</p>
          </div>
          <div className="task-stats">
            <div className="stat-pill pending">
              <span className="stat-number">{pendingCount}</span>
              <span className="stat-label">Pending</span>
            </div>
            <div className="stat-pill completed">
              <span className="stat-number">{completedCount}</span>
              <span className="stat-label">Done</span>
            </div>
          </div>
        </div>

        <div className="calendar-grid">
          <div className="calendar-sidebar">
            <div className="calendar-picker-card card">
              <h3 className="picker-title">Select Date</h3>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                inline
                dateFormat="MMMM d, yyyy"
              />
            </div>
          </div>

          <div className="tasks-panel">
            <div className="tasks-header">
              <h2>{format(selectedDate, 'EEEE, MMMM d, yyyy')}</h2>
              <span className="task-count">{tasks.length} {tasks.length === 1 ? 'task' : 'tasks'}</span>
            </div>
            
            <div className="tasks-scroll-container">
              {tasks.length > 0 ? (
                <div className="tasks-list-calendar">
                  {tasks.map(task => (
                    <TaskCard 
                      key={task._id} 
                      task={task} 
                      onUpdate={() => fetchTasksByDate(selectedDate)} 
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <div className="empty-icon">📭</div>
                  <h3>No tasks for this day</h3>
                  <p>Select another date or add a new task</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
