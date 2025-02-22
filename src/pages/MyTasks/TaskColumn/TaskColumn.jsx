import React from 'react';
import { FiCheck, FiClipboard, FiLoader } from 'react-icons/fi';
import SortableTaskItem from '../ShortableTaskItem/ShortableTaskItem';

const TaskColumn = ({ title, tasks, onEdit, onDelete, children }) => {
    return (
        <div className="bg-gray-50 rounded-lg p-4 w-full md:w-80">
            <h2 className="font-bold text-lg mb-4 text-gray-800 flex items-center">
                {title === 'To-Do' && <FiClipboard className="mr-2 text-blue-500" />}
                {title === 'In Progress' && <FiLoader className="mr-2 text-orange-500" />}
                {title === 'Done' && <FiCheck className="mr-2 text-green-500" />}
                {title}
                <span className="ml-2 bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded-full">
                    {tasks.length}
                </span>
            </h2>

            {children}

            <div className="mt-2">
                {tasks.map((task) => (
                    <SortableTaskItem
                        key={task._id}
                        task={task}
                        onEdit={onEdit}
                        onDelete={onDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default TaskColumn;