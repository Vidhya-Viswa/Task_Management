import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  name: yup.string().required('Name is required').min(2, 'Name must be at least 2 characters'),
  title: yup.string().required('Title is required').min(3, 'Title must be at least 3 characters'),
  description: yup.string().required('Description is required'),
  priority: yup.string().oneOf(['Low', 'Medium', 'High'], 'Invalid priority'),
  status: yup.string().oneOf(['Pending', 'Completed', 'Overdue'], 'Invalid status'),
  dueDate: yup.string().required('Due date is required'),
});

const TaskForm = ({ onSubmit, initialData = {} }) => {

  // ⭐ FIX: DO NOT convert date → KEEP EXACT STRING
  const formatDate = (dateStr) => dateStr;

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),

    defaultValues: {
      ...initialData,

      // ⭐ FIX: only slice yyyy-mm-dd, no Date() object
      dueDate: initialData.dueDate
        ? initialData.dueDate.slice(0, 10)
        : '',

      status: initialData.status || 'Pending',
    },
  });

  const today = new Date().toISOString().split('T')[0];

  // ⭐ FIX: Ensure submitted date stays EXACT, no timezone shift
  const onFormSubmit = (data) => {
    const fixedData = {
      ...data,
      dueDate: formatDate(data.dueDate), // no conversion
    };

    onSubmit(fixedData);
  };

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white p-6 md:p-8 rounded-2xl shadow-2xl max-w-lg mx-auto border border-gray-200 hover:shadow-3xl transition-shadow duration-300">
      <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-gray-800 flex items-center">
        <span className="mr-2">✏️</span> Task Details
      </h2>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Name:</label>
        <input {...register('name')} className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300" />
        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.name?.message}</p>
      </div>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Title:</label>
        <input {...register('title')} className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300" />
        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.title?.message}</p>
      </div>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Description:</label>
        <textarea {...register('description')} className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300" rows="3 md:4" />
        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.description?.message}</p>
      </div>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Priority:</label>
        <select {...register('priority')} className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300">
          <option value="Low">🟢 Low</option>
          <option value="Medium">🟡 Medium</option>
          <option value="High">🔴 High</option>
        </select>
        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.priority?.message}</p>
      </div>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Status:</label>
        <select {...register('status')} className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300">
          <option value="Pending">⏳ Pending</option>
          <option value="Completed">✅ Completed</option>
          <option value="Overdue">🚨 Overdue</option>
        </select>
        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.status?.message}</p>
      </div>

      <div className="mb-4 md:mb-5">
        <label className="block text-sm font-semibold text-gray-700 mb-2">Due Date:</label>

        {/* ⭐ FIX: Date will save EXACTLY as chosen */}
        <input
          type="date"
          {...register('dueDate')}
          min={today}
          className="w-full p-2 md:p-3 border-2 border-gray-300 rounded-xl focus:ring-4 focus:ring-blue-400 focus:border-blue-500 transition-all duration-200 hover:border-blue-300"
        />

        <p className="text-red-500 text-xs md:text-sm mt-1">{errors.dueDate?.message}</p>
      </div>

      <button type="submit" className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white py-2 md:py-3 rounded-xl font-bold hover:from-green-600 hover:to-blue-600 hover:scale-105 transition-all duration-300 shadow-lg">
        Submit Task
      </button>
    </form>
  );
};

export default TaskForm;
