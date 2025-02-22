import React, { useState, useEffect } from 'react';
import { DndContext, closestCenter, PointerSensor, KeyboardSensor, useSensor, useSensors, TouchSensor } from '@dnd-kit/core';
import { SortableContext, arrayMove, rectSortingStrategy } from '@dnd-kit/sortable';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { FiPlus } from 'react-icons/fi';
import TaskColumn from '../TaskColumn/TaskColumn';
import TaskForm from '../TaskForm/TaskForm';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import useAuth from '../../../hooks/useAuth';
import Loading from '../../../components/Loading/Loading';
import { Helmet } from 'react-helmet-async';

const MyTasks = () => {
    const axiosPublic = useAxiosPublic();
    const {user} = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [editingTask, setEditingTask] = useState(null);
    const [isAdding, setIsAdding] = useState(false);
    const [filter, setFilter] = useState('all');
    // const userId = "user2"
    const userId = user?.uid;

    const sensors = useSensors(
      useSensor(PointerSensor, {
          activationConstraint: {
              distance: 5, // Require a 5px movement to start dragging
          },
      }),
      useSensor(KeyboardSensor, {
          coordinateGetter: sortableKeyboardCoordinates,
      }),
      useSensor(TouchSensor, {
          activationConstraint: {
              delay: 250, // Add a slight delay to differentiate between taps and drags
              tolerance: 5, // Allow a small movement before considering it a drag
          },
      })
  )

  useEffect(() => {
    const handleDragStart = () => {
        document.body.classList.add('dragging');
    };

    const handleDragEnd = () => {
        document.body.classList.remove('dragging');
    };

    // Add event listeners for drag start and end
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('dragend', handleDragEnd);

    return () => {
        // Clean up event listeners
        document.removeEventListener('dragstart', handleDragStart);
        document.removeEventListener('dragend', handleDragEnd);
    };
}, []);;


    // Fetch tasks
    useEffect(() => {
        const fetchTasks = async () => {
            try {
                setLoading(true);
                const response = await axiosPublic.get(`/tasks?userId=${userId}`);
                const sortedTasks = response.data.sort((a, b) => a.position - b.position);
                setTasks(sortedTasks);
            } catch (error) {
                console.error('Failed to fetch tasks:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchTasks();
    }, [userId]);

    const handleDragEnd = async (event) => {
        const { active, over } = event;
    
        console.log("Over object:", over); // Debugging
    
        if (active.id !== over.id) {
            const draggedTask = tasks.find(task => task._id === active.id);
            const targetCategory = over.id.split('-')[1]; // Extract the category from the id
    
            console.log("Dragged Task:", draggedTask); // Debugging
            console.log("Target Category:", targetCategory); // Debugging
    
            if (draggedTask && targetCategory && draggedTask.category !== targetCategory) {
                // Update the category of the dragged task
                const updatedTask = { ...draggedTask, category: targetCategory };
    
                // Update the local state
                setTasks((prevTasks) => {
                    // Remove the task from the old category
                    const filteredTasks = prevTasks.filter(task => task._id !== active.id);
                    // Add the task to the new category with updated position
                    return [...filteredTasks, updatedTask];
                });
    
                // Update the task in the database
                try {
                    await axiosPublic.put(`/tasks/${updatedTask._id}`, {
                        category: targetCategory,
                        position: tasks.filter(task => task.category === targetCategory).length, // Add to the end of the new category
                    });
                } catch (error) {
                    console.error('Failed to update task category:', error);
                    // Revert the local state if the update fails
                    setTasks(tasks);
                }
            } else {
                // Handle reordering within the same category
                setTasks((items) => {
                    const oldIndex = items.findIndex(item => item._id === active.id);
                    const newIndex = items.findIndex(item => item._id === over.id);
    
                    return arrayMove(items, oldIndex, newIndex);
                });
    
                // Update positions in the database
                try {
                    const updatedTasks = [...tasks];
                    const oldIndex = updatedTasks.findIndex(item => item._id === active.id);
                    const newIndex = updatedTasks.findIndex(item => item._id === over.id);
    
                    const movedTasks = arrayMove(updatedTasks, oldIndex, newIndex);
    
                    // Create an array of updated positions
                    const updatedPositions = movedTasks.map((task, index) => ({
                        _id: task._id,
                        position: index, // Update the position based on the new index
                    }));
    
                    // Send batch update to the server
                    await axiosPublic.post('/tasks/update-positions', { tasks: updatedPositions });
                } catch (error) {
                    console.error('Failed to update positions:', error);
                    // Revert the local state if the update fails
                    setTasks(tasks);
                }
            }
        }
    };
    const handleAddTask = async (taskData) => {
        try {
            const maxPosition = tasks.length > 0
                ? Math.max(...tasks.map(t => t.position))
                : -1;

            const newTask = {
                ...taskData,
                userId,
                position: maxPosition + 1
            };

            const response = await axiosPublic.post('/tasks', newTask);
            setTasks(prev => [...prev, response.data]);
            setIsAdding(false);
        } catch (error) {
            console.error('Failed to add task:', error);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
        setIsAdding(false);
    };

    const handleUpdateTask = async (updatedTask) => {
        try {
            const response = await axiosPublic.put(`/tasks/${updatedTask._id}`, updatedTask);
            setTasks(prev => prev.map(task =>
                task._id === response.data._id ? response.data : task
            ));
            setEditingTask(null);
        } catch (error) {
            console.error('Failed to update task:', error);
        }
    };

    const handleDeleteTask = async (id) => {
        try {
            await axiosPublic.delete(`/tasks/${id}`);
            setTasks(prev => prev.filter(task => task._id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        }
    };

    // Filter tasks by category
    const filteredTasks = tasks.filter(task => {
        if (filter === 'all') return true;
        return task.category === filter;
    });

    const todoTasks = filteredTasks.filter(task => task.category === 'To-Do');
    const inProgressTasks = filteredTasks.filter(task => task.category === 'In Progress');
    const doneTasks = filteredTasks.filter(task => task.category === 'Done');

    if (loading) {
        return <Loading />
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-6xl">
                        <Helmet>
                            <title>My Tasks | Tasky</title>
                        </Helmet>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Tasks</h1>
                    <p className="text-gray-600">Organize and manage your tasks efficiently</p>
                </div>

                <div className="mt-4 md:mt-0 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <div className="inline-flex rounded-md shadow-sm">
                        <button
                            onClick={() => setFilter('all')}
                            className={`px-4 py-2 text-sm font-medium rounded-l-lg border ${
                                filter === 'all'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => setFilter('To-Do')}
                            className={`px-4 py-2 text-sm font-medium border-t border-b ${
                                filter === 'To-Do'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            To-Do
                        </button>
                        <button
                            onClick={() => setFilter('In Progress')}
                            className={`px-4 py-2 text-sm font-medium border-t border-b ${
                                filter === 'In Progress'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            In Progress
                        </button>
                        <button
                            onClick={() => setFilter('Done')}
                            className={`px-4 py-2 text-sm font-medium rounded-r-lg border ${
                                filter === 'Done'
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                        >
                            Done
                        </button>
                    </div>

                    <button
                        onClick={() => {
                            setIsAdding(true);
                            setEditingTask(null);
                        }}
                        className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors shadow-sm"
                    >
                        <FiPlus className="mr-2" />
                        Add Task
                    </button>
                </div>
            </div>

            {(isAdding || editingTask) && (
                <TaskForm
                    task={editingTask}
                    onSave={editingTask ? handleUpdateTask : handleAddTask}
                    onCancel={() => {
                        setIsAdding(false);
                        setEditingTask(null);
                    }}
                />
            )}

<DndContext
    sensors={sensors}
    collisionDetection={closestCenter}
    onDragEnd={handleDragEnd}
>
    <SortableContext items={tasks.map(task => task._id)} strategy={rectSortingStrategy}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            <TaskColumn
                title="To-Do"
                tasks={todoTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
            />
            <TaskColumn
                title="In Progress"
                tasks={inProgressTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
            />
            <TaskColumn
                title="Done"
                tasks={doneTasks}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
            />
        </div>
    </SortableContext>
</DndContext>
        </div>
    );
};

export default MyTasks;