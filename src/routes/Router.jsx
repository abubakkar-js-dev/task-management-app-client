import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../pages/AddTask/AddTask/AddTask';
import ManageTasks from '../pages/ManageTasks/ManageTasks/ManageTasks';

const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <div>404 Not Found</div>,
        children: [
            {
                path: '/',
                element: <Home />,
            },
            {
                path: '/add-task',
                element: <AddTask />,
            },
            {
                path: '/manage-tasks',
                element: <ManageTasks />,
            },
            {
                path: 'login',
                element: <Login />
            }

        ]
    }
]);

export default router;