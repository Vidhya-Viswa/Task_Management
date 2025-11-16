import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskTable from '../components/TaskTable';
import Pagination from '../components/Pagination';
import SearchBar from '../components/SearchBar';
import { getTasks, saveTasks } from '../utils/localStorage';

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [searchTitle, setSearchTitle] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const tasksPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    setTasks(getTasks());
  }, []);

  const filteredTasks = tasks.filter(task =>
    task.name.toLowerCase().includes(searchName.toLowerCase()) &&
    task.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    (statusFilter === 'All' || task.status === statusFilter)
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const handleEdit = (id) => navigate(`/edit/${id}`);
  const handleDelete = (id) => navigate(`/delete/${id}`);
  const handleToggleStatus = (id) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === id) {
        const statuses = ['Pending', 'Completed', 'Overdue'];
        const currentIndex = statuses.indexOf(task.status);
        const nextStatus = statuses[(currentIndex + 1) % statuses.length];
        return { ...task, status: nextStatus };
      }
      return task;
    });
    saveTasks(updatedTasks);
    setTasks(updatedTasks);
  };

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === 'Completed').length;
  const pendingTasks = tasks.filter(task => task.status === 'Pending').length;
  const overdueTasks = tasks.filter(task => task.status === 'Overdue' || (task.status === 'Pending' && new Date(task.dueDate) < new Date())).length;

  return (
    <div className="space-y-6 md:space-y-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">📋 All Tasks</h1>
      
      {/* Statistics */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-800">📊 Task Statistics</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <div className="text-center p-4 md:p-6 bg-blue-100 rounded-xl hover:bg-blue-200 transition-colors duration-200">
            <p className="text-3xl md:text-4xl font-bold text-blue-600">{totalTasks}</p>
            <p className="text-base md:text-lg text-gray-600">Total Tasks</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-green-100 rounded-xl hover:bg-green-200 transition-colors duration-200">
            <p className="text-3xl md:text-4xl font-bold text-green-600">{completedTasks}</p>
            <p className="text-base md:text-lg text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-yellow-100 rounded-xl hover:bg-yellow-200 transition-colors duration-200">
            <p className="text-3xl md:text-4xl font-bold text-yellow-600">{pendingTasks}</p>
            <p className="text-base md:text-lg text-gray-600">Pending</p>
          </div>
          <div className="text-center p-4 md:p-6 bg-red-100 rounded-xl hover:bg-red-200 transition-colors duration-200">
            <p className="text-3xl md:text-4xl font-bold text-red-600">{overdueTasks}</p>
            <p className="text-base md:text-lg text-gray-600">Overdue</p>
          </div>
        </div>
      </div>

      {/* Status Filter Buttons */}
      <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
        <h2 className="text-xl md:text-2xl font-bold mb-3 md:mb-4 text-gray-800">🔍 Filter by Status</h2>
        <div className="flex flex-wrap gap-2 md:gap-4">
          <button onClick={() => setStatusFilter('All')} className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 ${statusFilter === 'All' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>All</button>
          <button onClick={() => setStatusFilter('Pending')} className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 ${statusFilter === 'Pending' ? 'bg-yellow-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Pending</button>
          <button onClick={() => setStatusFilter('Completed')} className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 ${statusFilter === 'Completed' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Completed</button>
          <button onClick={() => setStatusFilter('Overdue')} className={`px-4 md:px-6 py-2 md:py-3 rounded-xl font-semibold transition-all duration-200 ${statusFilter === 'Overdue' ? 'bg-red-500 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>Overdue</button>
        </div>
      </div>

      <SearchBar onSearchName={setSearchName} onSearchTitle={setSearchTitle} />
      <TaskTable tasks={paginatedTasks} onEdit={handleEdit} onDelete={handleDelete} onToggleStatus={handleToggleStatus} />
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  );
};

export default Home;