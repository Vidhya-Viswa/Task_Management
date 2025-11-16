import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { getTasks, saveTasks, generateId } from '../utils/localStorage';

const CreateTask = () => {
  const navigate = useNavigate();

  const handleSubmit = (data) => {
    const tasks = getTasks();
    const newTask = { ...data, id: generateId() };
    saveTasks([...tasks, newTask]);
    navigate('/');
  };

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">➕ Create New Task</h1>
      <TaskForm onSubmit={handleSubmit} />
    </div>
  );
};

export default CreateTask;