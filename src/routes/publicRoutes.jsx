import { lazy } from 'react';
import CapsulatedCoffee from '../views/pages/collection/CapsulatedCoffee';


const Login = lazy(() => import('../component/users/Login'));
const Register = lazy(() => import('../component/users/Register'));
const Home = lazy(() => import('../views/pages/Home'));

const publicRoutes = [
   {
    path: '/collections/capsulated-coffee',
    element:<CapsulatedCoffee/>
  },
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
