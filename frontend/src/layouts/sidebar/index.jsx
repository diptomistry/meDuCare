import { useEffect, useState } from "react";
import { useRef } from "react";
import SubMenu from "./SubMenu";
import { motion } from "framer-motion";
import { FaClinicMedical } from "react-icons/fa";

// * React icons

import { IoIosArrowBack } from "react-icons/io";
import { SlLogout, SlSettings } from "react-icons/sl";
import { AiOutlineAppstore } from "react-icons/ai";
import { BsPerson } from "react-icons/bs";
import { HiOutlineDatabase } from "react-icons/hi";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBuilding3Line } from "react-icons/ri";
import { useMediaQuery } from "react-responsive";
import { MdMenu } from "react-icons/md";
import { NavLink, useLocation, useRoutes } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import { RxColorWheel } from "react-icons/rx";
import Nav from "../nav";

const Sidebar = () => {
  let isTabletMid = useMediaQuery({ query: "(max-width: 768px)" });
 
  //It checks whether the screen width is less than or equal to 768 pixels, indicating a tablet or smaller device
  const [open, setOpen] = useState(isTabletMid ? false : true); //// it is set to true for larger screens and false for tablet-sized screens or smaller

  const sidebarRef = useRef(); //
  const { pathname } = useLocation();
 
  //If the screen size is a tablet or smaller, the sidebar menu is closed
  useEffect(() => {
    if (isTabletMid) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [isTabletMid]);
  const { user,logout } = useAuth();
  const role = user.role;
  console.log(role);
  //if the user navigates to a new page, and the sidebar is open on a tablet or smaller screen, it automatically closes
  useEffect(() => {
    isTabletMid && setOpen(false);
  }, [pathname]);
  //The Nav_animation object defines different animation variants for opening and closing the sidebar menu based on the screen size.
  //It adjusts the position and width of the sidebar accordingly.
  const Nav_animation = isTabletMid
    ? {
        open: {
          x: 0,
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          x: -250,
          width: 0,
          transition: {
            damping: 40,
            delay: 0.15,
          },
        },
      }
    : {
        open: {
          width: "16rem",
          transition: {
            damping: 40,
          },
        },
        closed: {
          width: "4rem",
          transition: {
            damping: 40,
          },
        },
      };

  var subMenusList = [
   

  ];
  if(role==='admin'){
    subMenusList = [
      {
        name: "Public Info",
        icon: RiBuilding3Line,
        menus: ["Gallery", "Department", "Notice"],
      },
      
      //  {
      //   name: "Duty Roster",
      //   icon: RiBuilding3Line,
      //   menus: ["Slots"]
      // },
    ];
  }

  return (
    <div className="">
      {/*viewport with a semi-transparent black layer to close the sidebar menu by clicking outside the menu area on small screens */}
      <div
        onClick={() => setOpen(false)}
        className={`md:hidden fixed inset-0 max-h-screen z-[998] bg-black/50 ${
          open ? "block" : "hidden" //block(display)
        } `}
        //inset-0: This sets the top, right, bottom, and left properties of the backdrop overlay to 0,
      ></div>
      <motion.div
        ref={sidebarRef} //sidebarRef provides a way to interact with the sidebar component programmatically
        variants={Nav_animation}
        //By combining these two props, ref and variants, you can create dynamic and interactive animations for the sidebar component,
        // allowing it to smoothly transition between different states (e.g., open and closed) based on user interactions or application logic.

        initial={{ x: isTabletMid ? -250 : 0 }}
        animate={open ? "open" : "closed"}
        className=" bg-backgroundColor text-gray shadow-xl z-[999] max-w-[16rem]  w-[16rem] 
            overflow-hidden md:relative fixed
         h-screen "
      >
        <div className="flex items-center gap-2.5 font-medium border-b py-3 border-slate-300  mx-3">
          <FaClinicMedical
            size={25}
            className={`min-w-max ml-2 bg-blue-100 rounded block float-left duration-500 ${
              open && "rotate-[360deg]"
            }`}
          />
          <span className="text-xl whitespace-pre ml-2 text-white">
            Du HealthCare
          </span>
        </div>

        <div className="flex flex-col  h-full">
          <ul className="whitespace-pre px-2.5 text-[0.9rem] py-5 flex flex-col gap-1  font-medium overflow-x-hidden scrollbar-thin scrollbar-track-white scrollbar-thumb-slate-100   md:h-[68%] h-[70%]">
          
            {role==='dispensary_officer'?<li>
              <NavLink to={"/dashboard/dispensary/request-medicine"} className="link">
                <AiOutlineAppstore size={23} className="min-w-max" />
                Request Medicine
              </NavLink>
            </li>:null}
            {
              role==='admin'?
              <li>
                <NavLink to={"/dashboard/admin/duty-roster/slots"} className="link">
                  <TbReportAnalytics size={23} className="min-w-max" />
                  Duty Roster
                </NavLink>
              </li>:null
            }
            {role==='dispensary_officer' || role ==='admin' ?<li>
              <NavLink to={"/dashboard/dispensary/stocks"} className="link">
                <HiOutlineDatabase size={23} className="min-w-max" />
                Stocks
              </NavLink>
            </li>:null}
            {
              role==='doctor'?<li>
              <NavLink
                to={"/dashboard/doctor/prescription"}
                className="link"
              >
                <BsPerson size={23} className="min-w-max" />
                Presctiptions
              </NavLink>
            </li>
            :null
            }
            {
              role==='doctor'?<li>
              <NavLink
                to={"/dashboard/doctor/appointment"}
                className="link"
              >
                <BsPerson size={23} className="min-w-max" />
                Appointment
              </NavLink>
            </li>
            :null
            
            }
            {
              role==='dispensary_officer' || role ==='admin'?<li>
              <NavLink
                to={"/dashboard/dispensary/all-prescriptions"}
                className="link"
              >
                <BsPerson size={23} className="min-w-max" />
                Prescriptions
              </NavLink>
            </li>:null
            }
            <li>
              <NavLink
                to={"/dashboard/profile"}
                className="link"
              >
                <BsPerson size={23} className="min-w-max" />
                Profile
              </NavLink>
            </li>
            {
              role==='senior_officer'?<li>
              <NavLink
                to={"/dashboard/senior-officer/add-medicine"}
                className="link"
              >
                <SlSettings size={23} className="min-w-max" />
                Add Medicine
              </NavLink>
            </li>:null
            }
              {
              <li>
              <NavLink
                to={"/dashboard/senior-officer/medicines"}
                className="link"
              >
                <SlSettings size={23} className="min-w-max" />
                Medicines
              </NavLink>
            </li>
            }
            {
              role==='admin'?
            <li>
              <NavLink to={"/dashboard/admin/stroage"} className="link">
                <BsPerson size={23} className="min-w-max" />
                Users
              </NavLink>
            </li>:null
}

            {(open || isTabletMid) && (
              <div className="border-y py-5 border-slate-300 ">
                <small className="pl-3 text-slate-500 inline-block mb-2">
                  Admin Panel
                </small>
                {subMenusList?.map((menu) => (
                  <div key={menu.name} className="flex flex-col gap-1 ">
                    <SubMenu data={menu} />
                  </div>
                ))}
              </div>
            )}
          

            
          </ul>
          {/* {open && (
            <div className="flex-1 text-sm z-50  max-h-48 my-auto  whitespace-pre   w-full  font-medium  ">
              <div className="flex border-y border-slate-300 p-4 items-center justify-between">
                <div>
                  <p>Spark</p>
                  <small>No-cost $0/month</small>
                </div>
                <p className="text-teal-500 py-1.5 px-3 text-xs bg-teal-50 rounded-xl">
                  Upgrade
                </p>
              </div>
            </div>
          )} */}
         <button onClick={
              ()=>{
              logout();
                localStorage.removeItem("token");
                window.location.href="/"
              }
            }>
            <div className={`flex  flex-row  text-sm z-50   my-auto  whitespace-pre     font-medium rounded-lg bg-blue-100 px-3 py-2 items-center justify-center ml-2 mr-2`}>
             
              
                <SlLogout size={23} className="min-w-max  mr-2" />
                <p className={` ${open?"block":"hidden"}`}>Logout</p>
             
           
            </div>
            </button>
        </div>
        <motion.div
          onClick={() => {
            setOpen(!open);
          }}
          animate={
            open
              ? {
                  x: 0,
                  y: 0,
                  rotate: 0,
                }
              : {
                  x: -10,
                  y: -200,
                  rotate: 180,
                }
          }
          transition={{ duration: 0 }}
          className="absolute w-fit h-fit md:block z-50 hidden right-2 bottom-3 cursor-pointer"
        >
          <IoIosArrowBack size={25} />
        </motion.div>
      </motion.div>
      <div className="m-3 md:hidden  " onClick={() => setOpen(true)}>
        <MdMenu size={25} />
      </div>
    </div>
  );
};

export default Sidebar;
