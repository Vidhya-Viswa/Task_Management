import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTasks, saveTasks } from '../utils/localStorage';

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);

  useEffect(() => {
    const tasks = getTasks();
    setTask(tasks.find(t => t.id === id));
  }, [id]);

  const handleDelete = () => {
    const tasks = getTasks();
    saveTasks(tasks.filter(t => t.id !== id));
    navigate('/');
  };

  return task ? (
    <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-lg mx-auto border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
        <span className="mr-2">🗑️</span> Delete Task
      </h1>
      <p className="text-gray-700 mb-8 text-center">Are you sure you want to delete "<span className="font-bold text-red-600">{task.name} - {task.title}</span>"? This action cannot be undone.</p>
      <div className="flex space-x-4 justify-center">
        <button onClick={handleDelete} className="bg-red-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-red-600 hover:scale-105 transition-all duration-300 shadow-lg">Yes, Delete</button>
        <button onClick={() => navigate('/')} className="bg-gray-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-gray-600 hover:scale-105 transition-all duration-300 shadow-lg">Cancel</button>
      </div>
    </div>
  ) : <p className="text-gray-600 text-center">Loading...</p>;
};

export default DeleteTask;