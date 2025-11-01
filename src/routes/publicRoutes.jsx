import { lazy } from 'react';


const Login = lazy(() => import('../component/users/Login'));
const Register = lazy(() => import('../component/users/Register'));
const Home = lazy(() => import('../views/pages/Home'));

const publicRoutes = [
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path:"/",
    element:<Home/>
  }
];

export default publicRoutes;
