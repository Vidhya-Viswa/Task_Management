import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import CreateTask from './pages/CreateTask';
import EditTask from './pages/EditTask';
import DeleteTask from './pages/DeleteTask';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100">
        <nav className="bg-gradient-to-r from-blue-600 to-purple-600 shadow-xl p-4 md:p-6 flex flex-col md:flex-row justify-between items-center text-white">
          <h1 className="text-2xl md:text-3xl font-bold tracking-wide mb-4 md:mb-0">📋 Task Manager</h1>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="/" className="hover:text-yellow-300 transition-colors text-center md:text-left">Home</a>
            <a href="/create" className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-yellow-300 hover:text-blue-700 transition-all duration-300 shadow-lg">+ Create Task</a>
          </div>
        </nav>
        <div className="container mx-auto p-4 md:p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
            <Route path="/delete/:id" element={<DeleteTask />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;