import { lazy } from "react";
const UserDashboard = lazy(()=> import("../views/user/UserDashboard"))



const userRouters =[
        {
            path:'/user',
            element:<UserDashboard/>
        }
]

export default userRouters;