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

  const [open, setOpen] = useState(window.innerWidth >= 768);
  // State for STS submenu
  // State for Vehicle submenu
  const [UserSubmenuOpen, setUserSubmenuOpen] = useState(false);

  const Menus = [
    {
        title: "Dashboard",
        icon: <AiOutlineBarChart />,
        route: "/auth/login/admin/dashboard",
      },
    {
      title: "Prescribe",

      icon: <LuUserCog />,

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

    //make it available for role 1 or 3

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
          UserSubmenuOpen ? "min-h-screen" : "h-screen"
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
            MeduCare
          </h1>
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

                {menu.submenu && open && menu.title === "User Management" && (
                  <BsChevronDown
                    className={`${UserSubmenuOpen && "rotate-180"}`}
                    onClick={() => setUserSubmenuOpen(!UserSubmenuOpen)}
                  />
                )}
              </li>

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
