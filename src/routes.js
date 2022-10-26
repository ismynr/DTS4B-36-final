import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import SimpleLayout from './layouts/simple';
//
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import UserPage from './pages/UserPage';
import SongPage from './pages/SongPage';
// component
import ProtectedRoute from './components/ProtectedRoute';

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: 'login',
      element: <ProtectedRoute loginOnly={false}><LoginPage /></ProtectedRoute>,
    },
    {
      path: 'register',
      element: <ProtectedRoute loginOnly={false}><RegisterPage /></ProtectedRoute>,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <ProtectedRoute><Navigate to="/home" /></ProtectedRoute>, index: true },
        { path: '404', element: <Page404 /> },
        { path: 'home', element: <ProductsPage />, },
        { path: 'song/:name/:id', element: <SongPage />, },
        { path: '1', element: <UserPage /> },
        { path: 'featured/:name/:id', element: <UserPage /> },
        { path: 'album/:name/:id', element: <UserPage /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
