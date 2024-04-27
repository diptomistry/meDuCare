


import { Outlet } from "react-router-dom";
import Menu from './adminSidebar/Menu';
import Nav from "../layouts/nav";


const AdminRootLayout = () => {
  return (
    <div className="flex gap-5">
      <Menu></Menu>
  
      <div className="flex-col h-screen w-full">
        <div >
          <Nav />
        </div>
        <div className="flex-1 ml-5">
          <main className="max-w-5xl flex-1 mx-auto py-4">
            <Outlet />
          </main>
        </div>
      </div>
  </div>
  )
}

export default AdminRootLayout