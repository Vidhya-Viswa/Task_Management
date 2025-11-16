import { useState } from 'react';

const TaskTable = ({ tasks, onEdit, onDelete, onToggleStatus }) => {
  const [sortKey, setSortKey] = useState('title');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedTasks = [...tasks]
    .sort((a, b) => {
      if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
      if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

  const handleSort = (key) => {
    setSortOrder(sortKey === key && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortKey(key);
  };

  return (
    <div className="bg-white p-4 md:p-6 rounded-2xl shadow-2xl border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
      <div className="overflow-x-auto">
        <table className="w-full table-auto border-collapse text-sm md:text-base">
          <thead>
            <tr className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
              <th onClick={() => handleSort('name')} className="p-2 md:p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors duration-200">Name</th>
              <th onClick={() => handleSort('title')} className="p-2 md:p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors duration-200">Title</th>
              <th onClick={() => handleSort('priority')} className="p-2 md:p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors duration-200">Priority</th>
              <th onClick={() => handleSort('status')} className="p-2 md:p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors duration-200">Status</th>
              <th onClick={() => handleSort('dueDate')} className="p-2 md:p-4 text-left cursor-pointer hover:bg-blue-600 transition-colors duration-200">Due Date</th>
              <th className="p-2 md:p-4 text-left rounded-tr-xl">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedTasks.map(task => (
              <tr key={task.id} className="border-b hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-200 hover:scale-[1.02] cursor-pointer">
                <td className="p-2 md:p-4 font-semibold">{task.name}</td>
                <td className="p-2 md:p-4 font-semibold">{task.title}</td>
                <td className="p-2 md:p-4">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold ${
                    task.priority === 'High' ? 'bg-red-100 text-red-800 hover:bg-red-200' :
                    task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' :
                    'bg-green-100 text-green-800 hover:bg-green-200'
                  } transition-colors duration-200`}>
                    {task.priority === 'High' ? '🔴' : task.priority === 'Medium' ? '🟡' : '🟢'} {task.priority}
                  </span>
                </td>
                <td className="p-2 md:p-4">
                  <span className={`px-2 md:px-3 py-1 rounded-full text-xs md:text-sm font-bold ${
                    task.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    task.status === 'Overdue' ? 'bg-red-100 text-red-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {task.status === 'Completed' ? '✅' : task.status === 'Overdue' ? '🚨' : '⏳'} {task.status}
                  </span>
                </td>
                <td className="p-2 md:p-4">{task.dueDate}</td>
                <td className="p-2 md:p-4 space-x-1 md:space-x-3">
                  <button onClick={() => onToggleStatus(task.id)} className="bg-green-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-green-600 hover:scale-110 transition-all duration-200 shadow-md text-xs md:text-sm">Toggle</button>
                  <button onClick={() => onEdit(task.id)} className="bg-blue-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-blue-600 hover:scale-110 transition-all duration-200 shadow-md text-xs md:text-sm">✏️ Edit</button>
                  <button onClick={() => onDelete(task.id)} className="bg-red-500 text-white px-2 md:px-4 py-1 md:py-2 rounded-lg hover:bg-red-600 hover:scale-110 transition-all duration-200 shadow-md text-xs md:text-sm">🗑️ Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TaskTable;