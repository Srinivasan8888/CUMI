import { useState } from "react";
import Chart_fill from "../imgaes/dashboard.png";
import chart from "../imgaes/Chart.png";
import cumi from "../imgaes/cumi_final.png"
import control from "../imgaes/control.png";
import logout_img from "../imgaes/arrow.png";
import xyma from "../imgaes/xyma.png";
import folder from "../imgaes/Folder.png";
import setting from "../imgaes/Setting.png";
import './style.css'
import { Link } from "react-router-dom";
import { BiLogOutCircle } from "react-icons/bi";
const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  
  const Menus = [
    { title: "Dashboard", src: Chart_fill, url: "/" },
    { title: "Chart", src: chart, gap: true, url: "/chart" },
    { title: "Reports", src: folder, gap: true, url: "/report" },
    // { title: "Upgrade Plan", src: calander, gap: true, url: "/upgrade" },
    // { title: "Map", src: search, gap: true, url: "/map" },
    { title: "Settings", src: setting, gap: true, url: "/setting" },
  ];
  const handleItemClick = (index) => {
    setActiveIndex(index); 
  };
  const logout = () => {
    localStorage.removeItem('token')
    window.location.href = '/'
  }

  return (
    <div className={`${open ? "w-72" : "w-20"} height bg-dark_color h-screen p-5 pt-8 relative duration-300`}>
      <img src={control} className={`absolute cursor-pointer -right-3 top-9 w-7 border-dark_color border-2 rounded-full ${!open && "rotate-180"}`}
        onClick={() => setOpen(!open)}
      />
      {/* && "rotate-[360deg]" */}
      <div className="flex flex-col gap-4 items-center">
        <img src={cumi} className={`cursor-pointer duration-500 ${open }`}/>
      </div>
      <ul className="pt-6">
        {Menus.map((Menu, index) => (
          <Link to={Menu.url} key={index}>
            <li
              className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
                ${Menu.gap ? "mt-4 sm:mt-9" : "mt-2"} ${
                index === activeIndex && "bg-light-white" 
              } `}
              onClick={() => handleItemClick(index)} 
            >
              <div className="flex items-center">
                <img src={Menu.src} alt={Menu.title} />
                <span className={`ml-5 ${!open && "hidden"} origin-left duration-200`}>
                  {Menu.title}
                </span>
              </div>
            </li>
          </Link>
        ))}
        <Link to="/logout" onClick={logout}>
          <li className={`flex rounded-md p-2 cursor-pointer hover:bg-light-white text-gray-300 text-sm items-center gap-x-4 
              mt-4 sm:mt-9 ${
                activeIndex === Menus.length && "bg-light-white"
              } `}
          >
            <div className="flex items-center">
            <img src={logout_img} className={`cursor-pointer duration-500 ${open }`}/>
              <span className={`ml-5 ${!open && "hidden"} origin-left duration-200`}>
                Logout
              </span>
            </div>
          </li>
        </Link>
      </ul>
      <div className="mt-5">
        <span className={`text-white ml-9 mt-10  ${!open && "hidden"}`}>© All rights reserved by</span>
        <div className="flex flex-col gap-4 items-center">
          <img src={xyma} className={`cursor-pointer w-40 mt-2 duration-500 `}/>
        </div>     
    </div>
  </div>
  );
};

export default Sidebar;
