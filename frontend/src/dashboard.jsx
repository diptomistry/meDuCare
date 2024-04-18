import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { CgTrashEmpty } from "react-icons/cg";
import { IoCartOutline } from "react-icons/io5";
import { GoInbox } from "react-icons/go";

import { BiSitemap } from "react-icons/bi";

import {
  AiOutlineBarChart,
  AiOutlineLogout,
  AiOutlineControl,
} from "react-icons/ai";
import { LuUserCog } from "react-icons/lu";

import { RiDashboardFill, RiBillLine } from "react-icons/ri";
import { SiGooglecontaineroptimizedos } from "react-icons/si";

import {
  BsArrowLeftShort,
  BsSearch,
  BsChevronDown,
  BsPerson,
} from "react-icons/bs";
import { ToastContainer } from "react-toastify";

const Dash = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(true);
  const [stsSubmenuOpen, setStsSubmenuOpen] = useState(false); // State for STS submenu
  const [vehicleSubmenuOpen, setVehicleSubmenuOpen] = useState(false); // State for Vehicle submenu
  const [UserSubmenuOpen, setUserSubmenuOpen] = useState(false);
  const [landfillSubmenuOpen, setLandfillSubmenuOpen] = useState(false);
  const [OptimizationSubmenuOpen, setOptimizationSubmenuOpen] = useState(false);

  const Menus = [
    {
      title: "Prescribe",

      icon: <LuUserCog />,
      /* submenu: true,
      submenuItems: [
        { title: "Manage Users", route: "/auth/login/admin/ManageUsers" },
        { title: "Create User", route: "/auth/login/admin/CreateUser" },
      ],
      */

        route: "/get-started/doctor/prescribe",
    },

    {
      title: "Add Account",
      icon: <CgTrashEmpty />,
      spacing: true,

      submenu: true,
      submenuItems: [
        { title: " Create STS", route: "/auth/login/admin/CreateSTS" },
      ],
    },

    {
      title: "Vehicle",
      icon: <IoCartOutline />,
      submenu: true,

      submenuItems: [
        { title: "Create Vehicle", route: "/auth/login/admin/CreateVehicle" },
      ],
    },

    //make it available for role 1 or 3

    {
      title: "Landfill",
      icon: <GoInbox />,
      spacing: true,
      submenu: true,
      submenuItems: [
        { title: "Create Landfill", route: "/auth/login/admin/CreateLandfill" },
      ],
    },

    {
      title: "Profile",
      icon: <BsPerson />,
      route: "/auth/login/admin/Profile",
    },

    { title: "Logout", icon: <AiOutlineLogout /> },
  ];
  return (
    <div className="flex">
      <div
        className={`bg-bgOrange p-5 pt-8 ${open ? "w-72" : "w-20 h-screen"} ${
          stsSubmenuOpen ||
          vehicleSubmenuOpen ||
          UserSubmenuOpen ||
          landfillSubmenuOpen ||
          OptimizationSubmenuOpen
            ? "min-h-screen"
            : "h-screen"
        } duration-300 relative`}
      >
        <BsArrowLeftShort
          className={`bg-white text-dark-purple text-3xl rounded-full absolute -right-3 top-9 border border-dark-purple cursor-pointer ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        />
        <div className="inline-flex">
          <RiDashboardFill
            className={`bg-amber-300 text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <h1
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !open && "scale-0"
            }`}
          >
            EcoSync
          </h1>
        </div>
        <div
          className={`flex items-center rounded-md bg-light-white mt-6 ${
            !open ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-black text-lg block float-left cursor-pointer ${
              open && "mr-2"
            }`}
          />
          <input
            type={"search"}
            placeholder="Search"
            className={`text-base bg-transparent w-full text-black focus:outline-none ${
              !open && "hidden"
            }`}
          />
        </div>
        <ul className="pt-2">
          {Menus.map((menu, index) => (
            <>
              <li
                key={index}
                onClick={() => {
                  if (menu.title === "Logout") {
                    localStorage.removeItem("token");
                    localStorage.removeItem("isLoggedIn");
                    navigate("/auth/login");
                  }
                  if (menu.route) {
                    navigate(menu.route);
                  }
                }}
                className={`text-black text-sm flex items-center gap-x-4 cursor-pointer p-2 hover:bg-light-white rounded-md ${
                  menu.spacing ? "mt-9" : "mt-2"
                }`}
              >
                <span className="text-2xl block float-left">{menu.icon}</span>
                <span
                  className={`text-base font-medium flex-1 duration-200 ${
                    !open && "hidden"
                  }`}
                >
                  {menu.title}
                </span>
                {menu.submenu && open && menu.title === "STS" && (
                  <BsChevronDown
                    className={`${stsSubmenuOpen && "rotate-180"}`}
                    onClick={() => setStsSubmenuOpen(!stsSubmenuOpen)}
                  />
                )}

                {menu.submenu && open && menu.title === "Vehicle" && (
                  <BsChevronDown
                    className={`${vehicleSubmenuOpen && "rotate-180"}`}
                    onClick={() => setVehicleSubmenuOpen(!vehicleSubmenuOpen)}
                  />
                )}
                {menu.submenu && open && menu.title === "User Management" && (
                  <BsChevronDown
                    className={`${UserSubmenuOpen && "rotate-180"}`}
                    onClick={() => setUserSubmenuOpen(!UserSubmenuOpen)}
                  />
                )}
                {menu.submenu && open && menu.title === "Landfill" && (
                  <BsChevronDown
                    className={`${landfillSubmenuOpen && "rotate-180"}`}
                    onClick={() => setLandfillSubmenuOpen(!landfillSubmenuOpen)}
                  />
                )}
                {menu.submenu && open && menu.title === "Optimization" && (
                  <BsChevronDown
                    className={`${OptimizationSubmenuOpen && "rotate-180"}`}
                    onClick={() =>
                      setOptimizationSubmenuOpen(!OptimizationSubmenuOpen)
                    }
                  />
                )}
              </li>
              {menu.submenu &&
                stsSubmenuOpen &&
                open &&
                menu.title === "STS" && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, index) => (
                      <li
                        key={index}
                        className="text-gray-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md "
                        onClick={() =>
                          submenuitem.route && navigate(submenuitem.route)
                        }
                      >
                        {submenuitem.title}
                      </li>
                    ))}
                  </ul>
                )}
              {menu.submenu &&
                vehicleSubmenuOpen &&
                open &&
                menu.title === "Vehicle" && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, index) => (
                      <li
                        key={index}
                        className="text-gray-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md "
                        onClick={() =>
                          submenuitem.route && navigate(submenuitem.route)
                        }
                      >
                        {submenuitem.title}
                      </li>
                    ))}
                  </ul>
                )}
              {menu.submenu &&
                UserSubmenuOpen &&
                open &&
                menu.title === "User Management" && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, index) => (
                      <li
                        key={index}
                        className="text-gray-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md "
                        onClick={() =>
                          submenuitem.route && navigate(submenuitem.route)
                        }
                      >
                        {submenuitem.title}
                      </li>
                    ))}
                  </ul>
                )}
              {menu.submenu &&
                landfillSubmenuOpen &&
                open &&
                menu.title === "Landfill" && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, index) => (
                      <li
                        key={index}
                        className="text-gray-700 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md "
                        onClick={() =>
                          submenuitem.route && navigate(submenuitem.route)
                        }
                      >
                        {submenuitem.title}
                      </li>
                    ))}
                  </ul>
                )}
              {menu.submenu &&
                OptimizationSubmenuOpen &&
                open &&
                menu.title === "Optimization" && (
                  <ul>
                    {menu.submenuItems.map((submenuitem, index) => (
                      <li
                        key={index}
                        className="text-gray-300 text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 hover:bg-light-white rounded-md "
                        onClick={() =>
                          submenuitem.route && navigate(submenuitem.route)
                        }
                      >
                        {submenuitem.title}
                      </li>
                    ))}
                  </ul>
                )}
            </>
          ))}
        </ul>
      </div>
      <div className="flex flex-col basis-full">
        <div className="p-7">
          <h1 className="text-2xl font-semibold">adsflkaj;sdf</h1>
        </div>
        <div>{<Outlet />}</div>
      </div>
    </div>
  );
};

export default Dash;
