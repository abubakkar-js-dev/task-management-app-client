import { useState } from "react";
import { motion } from "framer-motion";

const TaskForm = ({ task, onSave, onCancel }) => {
    const [formData, setFormData] = useState({
      title: task?.title || '',
      description: task?.description || '',
      category: task?.category || 'To-Do',
    });
    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({ ...prev, [name]: value }));
    };
    
    const handleSubmit = (e) => {
      e.preventDefault();
      onSave({
        _id: task?._id,
        ...formData
      });
    };
    
    return (
      <motion.form 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-md p-5 mb-5 border-l-4 border-orange-500"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="title">
            Task Title
          </label>
          <input
            id="title"
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
            maxLength={50}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.title.length}/50 characters</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows="3"
            maxLength={200}
          />
          <p className="text-xs text-gray-500 mt-1">{formData.description.length}/200 characters</p>
        </div>
        
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
            Status
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="To-Do">To-Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {task ? 'Update Task' : 'Add Task'}
          </button>
        </div>
      </motion.form>
    );
  };


export default TaskForm;