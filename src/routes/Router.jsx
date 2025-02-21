import { createBrowserRouter } from 'react-router-dom';
import AddTask from '../pages/AddTask/AddTask/AddTask';
import ManageTasks from '../pages/ManageTasks/ManageTasks/ManageTasks';
import MainLayout from '../layouts/MainLayout';
import Home from '../pages/Home/Home/Home';
import Login from '../pages/Login/Login';
import ErrorPage from '../pages/ErrorPage/ErrorPage';
import Register from '../pages/Register/Register';


const router = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout />,
        errorElement: <ErrorPage />,
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
            },
            {
                path: 'register',
                element: <Register />
            }

        ]
    }
]);

export default router;