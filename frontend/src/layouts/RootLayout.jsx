import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Nav from "./nav";

function RootLayout({  }) {
  return (
    <div className="flex h-screen">
      <div className=" h-full">
        <Sidebar />
      </div>
      <div className="flex flex-col w-full ">
        <div className="bg-gray-100 shadow-md">
          <Nav />
        </div>
        <div className="flex-1 overflow-y-auto">
          <main className="max-w-5xl mx-auto py-4">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}

export default RootLayout;