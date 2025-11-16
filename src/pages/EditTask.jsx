import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import { getTasks, saveTasks } from '../utils/localStorage';

const EditTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = getTasks();
    const foundTask = tasks.find(t => t.id === id);
    if (foundTask) {
      setTask(foundTask);
    } else {
      // If task not found (e.g., invalid ID), redirect to home
      navigate('/');
    }
  }, [id, navigate]);

  const handleSubmit = (data) => {
    const tasks = getTasks();
    const updatedTasks = tasks.map(t => t.id === id ? { ...t, ...data } : t);
    saveTasks(updatedTasks);
    navigate('/');
  };

  return task ? (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">✏️ Edit Task</h1>
      <TaskForm onSubmit={handleSubmit} initialData={task} />
    </div>
  ) : <p className="text-gray-600 text-center">Loading...</p>;
};

export default EditTask;