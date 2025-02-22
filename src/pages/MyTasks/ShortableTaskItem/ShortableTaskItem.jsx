import { FiCalendar, FiEdit, FiTrash2 } from "react-icons/fi";
import TaskStatusBadge from "../TaskStatusBadge/TaskStatusBadge";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const SortableTaskItem = ({ task, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
      useSortable({ id: task._id });

  const style = {
      transform: CSS.Transform.toString(transform),
      transition,
      touchAction: "none",
  };

  return (
      <div
          ref={setNodeRef}
          style={style}
          {...attributes}
          {...listeners}
          className="bg-white rounded-lg shadow-sm p-4 mb-3 border-l-4 border-blue-500 cursor-move hover:shadow-md transition-shadow"
      >
          <div className="flex justify-between items-start">
              <div className="flex-1">
                  <h3 className="font-medium text-gray-800">{task.title}</h3>
                  <p className="text-sm text-gray-600 mt-1">{task.description}</p>

                  <div className="flex items-center mt-3">
                      <div className="flex items-center text-xs text-gray-500 mr-3">
                          <FiCalendar className="mr-1" />
                          {new Date(task.createdAt).toLocaleDateString()}
                      </div>
                      <TaskStatusBadge status={task.category} />
                  </div>
              </div>

              <div className="flex space-x-2">
                  <button
                      onClick={(e) => {
                          e.stopPropagation();
                          onEdit(task);
                      }}
                      className="text-gray-600 hover:text-blue-500 transition-colors"
                  >
                      <FiEdit size={16} />
                  </button>
                  <button
                      onClick={(e) => {
                          e.stopPropagation();
                          onDelete(task._id);
                      }}
                      className="text-gray-600 hover:text-red-500 transition-colors"
                  >
                      <FiTrash2 size={16} />
                  </button>
              </div>
          </div>
      </div>
  );
};

export default SortableTaskItem;