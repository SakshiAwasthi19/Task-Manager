import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchTasks, deleteTask } from '../store/taskSlice';
import $ from 'jquery';
import 'jquery-ui/ui/widgets/sortable';
import 'jquery-ui/ui/widgets/tooltip';

function Dashboard() {
  const dispatch = useDispatch();
  const { tasks, status, error } = useSelector((state) => state.tasks);
  const taskListRef = useRef(null);
  const sortableInitialized = useRef(false);
  const tooltipInitialized = useRef(false);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTasks());
    }
  }, [status, dispatch]);

  useEffect(() => {
    // Initialize jQuery functionality after tasks are loaded
    if (tasks.length > 0 && taskListRef.current) {
      // Initialize tooltips if not already initialized
      if (!tooltipInitialized.current) {
        try {
          $('[data-toggle="tooltip"]').tooltip();
          tooltipInitialized.current = true;
        } catch (error) {
          console.log('Tooltip initialization error:', error);
        }
      }

      // Initialize sortable if not already initialized
      if (!sortableInitialized.current) {
        try {
          $(taskListRef.current).sortable({
            items: '.task-card',
            handle: '.card-header',
            update: function(event, ui) {
              // Here you could implement custom sorting logic
              console.log('Task order updated');
            }
          });
          sortableInitialized.current = true;
        } catch (error) {
          console.log('Sortable initialization error:', error);
        }
      }

      // Hover effects
      $('.task-card').hover(
        function() {
          $(this).find('.task-actions').stop().fadeIn(200);
        },
        function() {
          $(this).find('.task-actions').stop().fadeOut(200);
        }
      );
    }

    // Cleanup
    return () => {
      // Cleanup tooltips
      if (tooltipInitialized.current) {
        try {
          $('[data-toggle="tooltip"]').tooltip('dispose');
        } catch (error) {
          console.log('Tooltip cleanup error:', error);
        }
        tooltipInitialized.current = false;
      }

      // Cleanup sortable
      if (sortableInitialized.current && taskListRef.current) {
        try {
          $(taskListRef.current).sortable('destroy');
        } catch (error) {
          console.log('Sortable cleanup error:', error);
        }
        sortableInitialized.current = false;
      }
    };
  }, [tasks]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      // jQuery animation for delete
      $(`#task-${id}`).fadeOut(300, function() {
        dispatch(deleteTask(id));
      });
    }
  };

  if (status === 'loading') {
    return (
      <div className="loading-spinner">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (status === 'failed') {
    return (
      <div className="error-message">
        <i className="fas fa-exclamation-circle me-2"></i>
        Error: {error}
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Task Dashboard</h2>
        <Link to="/add" className="btn btn-primary">
          <i className="fas fa-plus me-2"></i>Add New Task
        </Link>
      </div>

      {tasks.length === 0 ? (
        <div className="text-center py-5">
          <i className="fas fa-tasks fa-3x text-muted mb-3"></i>
          <h4>No tasks found</h4>
          <p className="text-muted">Get started by adding a new task!</p>
          <Link to="/add" className="btn btn-primary mt-3">
            Create Your First Task
          </Link>
        </div>
      ) : (
        <div className="row g-4 task-list" ref={taskListRef}>
          {tasks.map((task) => (
            <div 
              key={task._id} 
              id={`task-${task._id}`}
              className="col-md-6 col-lg-4 task-card"
              data-toggle="tooltip"
              title={`Created: ${new Date(task.createdAt).toLocaleDateString()}`}
            >
              <div className="card h-100">
                <div className="card-header bg-transparent">
                  <h5 className="card-title mb-0">{task.title}</h5>
                </div>
                <div className="card-body">
                  <p className="card-text text-muted">{task.description}</p>
                  {task.dueDate && (
                    <p className="text-muted mb-3">
                      <i className="far fa-calendar-alt me-2"></i>
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  )}
                  <div className="d-flex justify-content-between align-items-center">
                    <span className={`badge status-${task.status}`}>
                      {task.status}
                    </span>
                    <div className="task-actions" style={{ display: 'none' }}>
                      <Link to={`/task/${task._id}`} className="btn btn-outline-primary btn-sm me-2">
                        <i className="fas fa-edit me-1"></i>Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(task._id)}
                        className="btn btn-outline-danger btn-sm"
                      >
                        <i className="fas fa-trash-alt me-1"></i>Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard; 