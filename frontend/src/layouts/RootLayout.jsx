import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Nav from "./nav";

function RootLayout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
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
  );
}

export default RootLayout;
