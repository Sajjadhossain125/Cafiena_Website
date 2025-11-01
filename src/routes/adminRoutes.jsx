import { lazy } from "react";
import { Navigate } from "react-router-dom";
const AdminLogin = lazy(()=>import("../component/admin/AdminLogin"))
const Layout = lazy(() => import("../views/admin/Layout"));
const AdminDashboard = lazy(() => import("../views/admin/AdminDashboard"));
const AdminProducts = lazy(() => import("../views/admin/AdminProducts")); // wrapper
const AdminProductsAll = lazy(() => import("../views/admin/AdminProductsAll"));
const AdminProductsNew = lazy(() => import("../views/admin/AdminProductsNew"));
const AdminProductsCategory = lazy(() => import("../views/admin/AdminProductsCategory"));
const AdminOrders = lazy(() => import('./../views/admin/AdminOrders'));
const AdminCustomers = lazy(() => import('../views/admin/AdminCustomers'));
const AdminInventory = lazy(() => import("../views/admin/AdminInventory"));
const AdminPayments = lazy(() => import("../views/admin/AdminPayments"));
const AdminPromotions = lazy(() => import("../views/admin/AdminPromotions"));
const AdminReviews = lazy(() => import("../views/admin/AdminReviews"));
const AdminBlog = lazy(() => import("../views/admin/AdminBlog"))
const AdminSetting =lazy(()=>import ('../views/admin/AdminSetting') )




const adminRoutes = [
  {
    path: "/admin",
    element: <Layout />,
    children: [
      { path: "dashboard", element: <AdminDashboard /> },

      {
        path: "products",
        element: <AdminProducts />, 
        children: [
          // /admin/products -> /admin/products/all
          { index: true, element: <Navigate to="all" replace /> }, 
          { path: "all", element: <AdminProductsAll /> },
          { path: "new", element: <AdminProductsNew /> },
          { path: "categories", element: <AdminProductsCategory /> },
        ],
      },
      {
        path:"orders",
        element:<AdminOrders/>
      },
      {
        path:"customers",
        element:<AdminCustomers/>
      },
      {
        path:'inventory',
        element:<AdminInventory/>
      },
      {
        path:'payments',
        element:<AdminPayments/>
      },
      {
        path:'promotions',
        element:<AdminPromotions/>
      },
      {
        path:'reviews',
        element: <AdminReviews/>
      },
      {
        path:'blog',
        element:<AdminBlog/>
      },
    {
        path:'settings',
        element:<AdminSetting/>
    }
    ],
  },
  { path: "/admin/login", element: <AdminLogin /> },
];

export default adminRoutes;
