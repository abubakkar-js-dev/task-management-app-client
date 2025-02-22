const TaskStatusBadge = ({ status }) => {
    const statusStyles = {
      'To-Do': 'bg-blue-100 text-blue-700',
      'In Progress': 'bg-orange-100 text-orange-700',
      'Done': 'bg-green-100 text-green-700',
    };
    
    return (
      <span className={`text-xs px-2 py-1 rounded-full font-medium ${statusStyles[status]}`}>
        {status}
      </span>
    );
  };


  export default TaskStatusBadge;