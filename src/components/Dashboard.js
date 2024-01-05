import React,{useContext} from 'react';
import { ModeContext } from './ModeContext';
import { FaEnvelope, FaRegBell} from 'react-icons/fa';
import { MdOutlineDarkMode,HiOutlineQueueList} from "react-icons/md";
const Dashboard = () => {
  const { isLightMode, handleModeToggle } = useContext(ModeContext);
  return (
    <div className={`flex items-center justify-end h-[70px] sm:px-2 md:px-4 lg:px-8 ${isLightMode ? 'bg-[#202020] text-white' : 'bg-[#D0D9DB] text-black'}`}>
      <div className="ml-auto flex gap-2">
      <p className={isLightMode ? 'text-white' : 'text-black'}>XYMA</p>
        <MdOutlineDarkMode className='text-white mt-1' onClick={handleModeToggle}>
            {isLightMode ? 'Switch to Dark Mode' : 'Switch to Light Mode'}</MdOutlineDarkMode>
      </div>
    </div>
  );
};
export default Dashboard;