import React from 'react'
import AdminNavBar from '../../component/admin/AdminNavBar'
import AdminSideBar from '../../component/admin/AdminSideBar'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <AdminNavBar/>
    <div className='flex'>
        <AdminSideBar/>
        <div className='flex-1 px-4 py-10 md:px-10 h-[calc(100vh-64px] overflow-y-auto'>
            <Outlet/>
        </div>

    </div>

    </>
  )
}

export default Layout