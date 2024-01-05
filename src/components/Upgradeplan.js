import React ,{useContext}from 'react'
import xyma from '../imgaes/xyma.png'
import { ModeContext } from './ModeContext';
const Upgradeplan = () => {
    const {isLightMode, handleModeToggle} = useContext(ModeContext);
  return (
    <div className={`pt-[25px] h-[1088px] px-[25px] ${isLightMode ? 'bg-[#202020]' : 'bg-[#D0D9DB]'}`}>
    <h1 className='text-white mb-5 font-bold'>Upgrade a Plan</h1>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className=''>
            <div className="p-4  rounded-md bg-[#2d2d2d] mb-4">
                <h2 className='text-white'>Device Name: XYMA-01</h2>
                <h2 className='text-white'>Operator Name: Airtel</h2>
            </div>
        </div>
        <div className=''>
            <div className="text-right p-4 rounded-md bg-[#2d2d2d] mb-4">
                <h2 className='text-white'>MISSD Number: 00091223456</h2>
                <h2 className='text-white'>Validation End Date: 30-09-2023</h2>
            </div>
        </div>
    </div>
    <div className="flex flex-col items-center justify-center ml-[20%] mr-[20%] p-4 rounded-md bg-[#2d2d2d] shadow-md mb-4">
        <div className="flex h-[100px] w-[300px]">
            <img src={xyma} alt="Logo" className="w-full h-full object-contain" />
        </div>
        <div className="text-white text-center mt-5 md:mr-0">
            Browse Your Recharge Plan
        </div>
        <a href='https://www.airtel.in/recharge-online'>
            <button className="text-white bg-blue-500 rounded-lg text-center mt-5 md:mr-0 px-4 py-2">
                Browse
            </button>
        </a>
    </div>
</div>
  )
}

export default Upgradeplan
