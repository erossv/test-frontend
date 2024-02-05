import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import { checkLoginStatus } from "src/util"
import DashboardLayout from 'src/layouts/dashboard';

const TaskPage = lazy(() => import('src/pages/task'));
const AuthPage = lazy(() => import('src/pages/auth'));
const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const isLoggedIn = checkLoginStatus();
  const routes = useRoutes([
    {
      path: '/',
      element: isLoggedIn ? <Navigate to="/task" replace /> : <Navigate to="/auth" replace />,
    },
    {
      path: '/task',
      element: isLoggedIn ? (
        <DashboardLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
            <TaskPage />
          </Suspense>
        </DashboardLayout>
      ) : <Navigate to="/auth" replace />,
    },
    {
      path: '/auth',
      element: isLoggedIn ? (
        <Navigate to="/task" replace />
      ) : <AuthPage />,
    },
    {
      path: '/404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
