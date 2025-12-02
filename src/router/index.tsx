import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/layouts/App';

const Dashboard = lazy(() => import('@/pages/dashboard/Dashboard'));
const Kanban = lazy(() => import('@/pages/kanban/Kanban'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: <AppLayout />,
        children: [
            { index: true, element: <Dashboard /> },
            { path: 'kanban', element: <Kanban /> },
        ],
    },
]);
