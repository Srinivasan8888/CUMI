import React, { useContext, useEffect, useRef, useState } from 'react';
import { ModeContext } from './ModeContext';
import list from '../json/list.json';
import { AiFillSignal, AiOutlineCaretDown,AiOutlineSearch } from 'react-icons/ai';
import { BiChevronDown } from 'react-icons/bi';
import ReactApexChart from 'react-apexcharts';
import cumi from '../imgaes/CUMI0908.png'
import axios from 'axios';
import { FaBatteryHalf, FaSortAmountUpAlt } from 'react-icons/fa';
import { BsDeviceSsd } from 'react-icons/bs';
import {MdBrowserUpdated, MdSensors} from 'react-icons/md';
import Select from 'react-select';
import './style.css';
const Mainpage = () => {
  const { isLightMode } = useContext(ModeContext);
  const [lastUpdatedThickness, setLastUpdatedThickness] = useState(null);
  const [maxlimit,setLimitData] = useState(null);
  const[device_temp,setLastUpdatedDevice_temp]=useState(null);
  const[battery,setLastUpdatedBattery]=useState(null);
  const[updatedsignal,setLastUpdatedSignal]=useState(null);
  const[time,setTimeStamp] =useState(null);
  const[chart,setAllData]=useState([]);
  const [isSecondPopupVisible, setSecondPopupVisible] = useState(false);
  const[device,setDeviceName]=useState([])
  const[sensors,setSensors] =useState(null);
  const inputRef = useRef(null);
  const[dropdowndata,setDropdown]=useState([]);
  const[DF_DATAS,setDF_Data]=useState([])

  useEffect(()=>{
    limits();
    fetchData();
    Data_freequence();
    DropDown();
    DeviceData();
    const dropdowninterval = setInterval(DropDown,2000)
    const DF = setInterval(Data_freequence,2000)
    const max = setInterval(limits,2000);
    const devicename = setInterval(() => DeviceData(device), 2000);
    const chartinterval = setInterval(fetchData,2000);
    return() =>{
      clearInterval(dropdowninterval);
      clearInterval(max);
      clearInterval(chartinterval);    
      clearInterval(devicename);
      clearInterval(DF)
    }
  },[device])


  //that max limit value database 
  const limits = async () => {
    try {
      const response = await axios.get('http://localhost:4000/backend/limitdata');
      
      // Assuming you want to find data for devicename "XY00001" in response.data
      const xy00001Data = response.data.find(item => item.devicename === device);
  
      if (xy00001Data) {
        // Use xy00001Data as needed
        console.log("Data for XY00001:", xy00001Data);
        setLimitData(xy00001Data.limit)
        
      } else {
        console.log("Data for XY00001 not found");
      }
    } catch (error) {
      console.error('Error fetching data', error);
    }
  }
  
  
  //////////////Last Thickness and device etc.. datas///////////
  const fetchData = async () => {
    try {
   
      const response = await fetch('http://localhost:4000/backend/ChartData');
      const info = await response.json();
    
      DeviceData(info);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  

  const sortedChartData = [...chart].sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timestampB = new Date(b.timestamp);
    return timestampB - timestampA;
  });
  //table data
  function formatTimestamp(timestamp) {
    const date = new Date(timestamp);
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleDateString('en-US', options);
  }
  

  const Device = "Active";
  const limitvalue = ((lastUpdatedThickness-0)*(100-0))/(maxlimit-0)+0;
  const rounded_value = limitvalue.toFixed(2);
  const rounded_percentage = parseFloat(rounded_value);
  const thickness_int = parseInt(lastUpdatedThickness);
  const error_data = 'Over Limit';
  const a = "95.23"; 

 //Battery percentage Converter

  const Battery_percentage = (battery - 265) * (100 - 0) / (540 - 265) + 0;
  const Battery_Percentage_Value =parseInt(Battery_percentage)

  const sortedChart = chart.slice().sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  const thicknessdata = sortedChart.map(data => data.thickness);
  const updatedtime = sortedChart.map(data => data.timestamp);

  const formattedTimestamps = sortedChart.map(data => {
    const timestamp = new Date(data.timestamp);
    const options = { year: '2-digit', month: 'short', day: 'numeric' };
    const formattedDate = timestamp.toLocaleDateString('en-US', options);
    return formattedDate;
  });

  const last30time = formattedTimestamps;
  
  const chartOptions = {
      grid: {
        show: false,
      },
      series: [
        {
          name: 'thickness',
          style: {
            colors: thicknessdata.map(value => {
              if (value >= 1 && value <= 50) {
                return '#ff0000'; 
              } else if (value > 50 && value <= 100) {
                return '#00ff00'; 
              } else {
                return '#3c07ed'; 
              }
            }),
          },
          data: thicknessdata,
        },
      ],
      chart: {
        height: 700,
        type: 'area',
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: 'smooth',
      },
      xaxis: {
        categories:last30time,
        labels: {
          style: {
            colors: '#ffffff', 
          },
        },
      },
      yaxis:{
        labels:{
          style:{
            colors:'#ffffff'
          }
        }
      },
    };



const DropDown = async () => {
  try {
    const response = await fetch("http://localhost:4000/backend/DeviceName");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();

    // Check if there is no data
    if (data.length === 0) {
      setSensors(['No data']);
    } else {
      setSensors(data);
    }
  } catch (error) {
    console.error('Error fetching DeviceName:', error);
    setSensors(['No data']);
  }
};

 const color_value ='bg-[#737373]'
 const iocn_color = 'text-stone-900'
 const closeSecondPopup = () => {
  setLastUpdatedThickness(95.23);
  setSecondPopupVisible(false);
};

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: isLightMode ? '#2A77E8' : color_value,
    borderColor: isLightMode ? 'white' : color_value,
    color: isLightMode ? 'white' : 'black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2d2d2d' : isLightMode ? '#2d2d2d' : color_value,
    color: state.isSelected ? 'white' : isLightMode ? 'white' : 'black',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: 'red', 
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#fffff', 
  }),
};

const options = sensors
? sensors.map((sensor) => ({
    value: sensor._id, 
    label: sensor.input, 
  }))
: [];

const DeviceData = async(info) =>{
  if (info && info[device]) {
    const sensorData = info[device];
  
    if (sensorData.length > 0) {
      const lastData = sensorData[0];
      setLastUpdatedThickness(lastData.thickness);
      setLastUpdatedDevice_temp(lastData.device_Temp);
      setLastUpdatedBattery(lastData.battery);
      setLastUpdatedSignal(lastData.signal);
      setTimeStamp(lastData.timestamp);
      setAllData(sensorData);
    } else {
      console.log(`Error: No data available for `);
    }
  } else {
    console.log(`Error: Unexpected response format for `);
  }
}


const handleSensorChange = (selectedOption) => {
  if (selectedOption) {
    const sensorNumber = selectedOption.label;
    try {
      if (
        sensorNumber === 'XY00001' ||
        sensorNumber === 'XY00002' ||
        sensorNumber === 'XY00003' ||
        sensorNumber === 'XY00004' ||
        sensorNumber === 'XY00005'||
        sensorNumber === 'XY00006'||
        sensorNumber === 'XY00007'||
        sensorNumber === 'XY00008'||
        sensorNumber === 'XY00009'||
        sensorNumber === 'XY00010'
      ) {
        setDeviceName(sensorNumber);
        DeviceData(sensorNumber); 
      } else {
        console.error('Error: Invalid sensor number');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
};


// const handleSensorChange = (selectedOption) => {
//   if (selectedOption) {
//     const sensorNumber = selectedOption.label;
//     try {
//       if (sensorNumber === "XY00001") {
//         sensorNumber = "sensor1"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00002") {
//         sensorNumber = "sensor2"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }
//        else if (sensorNumber === "XY00003") {
//         sensorNumber = "sensor3"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00004") {
//         sensorNumber = "sensor4"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00005") {
//         sensorNumber = "sensor5"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00006") {
//         sensorNumber = "sensor6"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00007") {
//         sensorNumber = "sensor7"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00008") {
//         sensorNumber = "sensor8"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY00009") {
//         sensorNumber = "sensor9"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }else if (sensorNumber === "XY000010") {
//         sensorNumber = "sensor10"
//         setDeviceName(sensorNumber);
//         DeviceData(sensorNumber); 
//       }
//       else {
//         console.error('Error: Invalid sensor number');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   }
// };
const handleSubmit = async(event)=>{
  
  event.preventDefault();
  
  const inputValue = inputRef.current.value;
  const ints = parseInt(inputValue);
   if(ints){
    try{
      const response = await fetch('http://localhost:4000/backend/limit',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body: JSON.stringify({limit:inputValue, devicename:device}),
        
      });
      if(response.ok){
        console.log("value stored in the database");
        inputRef.current.value = ""
      }else{
        console.error('Error storing value in the Database');
      }
    }
    catch(error){
      console.error(error);
    }
   }else{
    console.error("error");
 }
}

const customStyles_2 = {
  control: (provided) => ({
    ...provided,
    backgroundColor: isLightMode ? '#EC7E01' : color_value,
    borderColor: isLightMode ? 'white' : color_value,
    color: isLightMode ? 'white' : 'black',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#2d2d2d' : isLightMode ? '#2d2d2d' : color_value,
    color: state.isSelected ? 'white' : isLightMode ? 'white' : 'black',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#B48B03', 
  }),
  placeholder: (defaultStyles) => ({
    ...defaultStyles,
    color: '#fffff', 
  }),
};


const Data_freequence = async () => {
  try {
    const response = await fetch("http://localhost:4000/backend/daylimt");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data_freequence_data = await response.json();
    
    // Check if there is no data

    if (data_freequence_data.day === "30") {
      setDF_Data("30 sec");
    }  else if (data_freequence_data.day === "60") {
      setDF_Data("1 Hrs");
    }
    else if (data_freequence_data.day === "1440") {
      setDF_Data("1 Day");
    }
    else if (data_freequence_data.day === "10080") {
      setDF_Data("7 Days");
    }
    else if (data_freequence_data.day === "21600") {
      setDF_Data("15 Days");
    }else if (data_freequence_data.day === "43200") {
      setDF_Data("30 Days");
    } else {
      setDF_Data("No Data");
    }
  } catch (error) {
    console.error('Error fetching DeviceName:', error);
    setSensors(['No data']);
  }
};
const Data_freequences = [
  { label: '30 Sec', value: '303' },
  { label: '1 Hrs', value: '60' },
  { label: '1 Day', value: '1440' },
  { label: '7 Days', value: '7' },
  { label: '15 Days', value: '15' },
  { label: '30 Days', value: '30' },
];


const handle_dropdown_Change = async(selectedOption) => {

  try {
    let dayValue;
    if (selectedOption.value === "303"){
      dayValue = 30;
    }
    else if(selectedOption.value === "60"){
      dayValue = 60;
    }
    else if(selectedOption.value === "1440"){
      dayValue = 1440;
    }
    else if(selectedOption.value === "7"){
      dayValue = 10080;
    }else if(selectedOption.value === "15"){
      dayValue = 21600;
    }else if(selectedOption.value === "30"){
      dayValue = 43200;
    }
    setDropdown(dayValue);

    const response = await fetch('http://localhost:4000/backend/summa_testing', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ day: dayValue }),
    });
    if(response.ok){
      console.log("value stored in the database");
      inputRef.current.value = ""
    }else{
      console.error('Error storing value in the Database');
    }
  } catch (error) {
    console.error(error);
  }
};
const overlimit_data = 65
  return (
    <div className={`pt-[25px] h-100vh screen media px-[25px] ${isLightMode ? 'bg-[#202020]' : 'bg-[#D0D9DB]'}`}>
    <h1 className={`text-4xl font-sans font-bold text-center ${isLightMode ? 'text-white' : 'text-red'}`}>WEAR MONITORING DEVICE</h1>
    <div className='p-4'>
    <div className='text-right mb-3 mt-2'>
          <div className='flex justify-end items-center mb-5'>
          <div className='relative flex items-center'>
            <Select  className ="mr-2" options={options} styles={customStyles} placeholder="Device Id" onChange={handleSensorChange} />
            <Select  className="w-25 " options={Data_freequences} styles={customStyles_2} isSearchable={true}  placeholder={`Clockify - ${DF_DATAS}`} onChange={handle_dropdown_Change} />
            <input type="text" placeholder="Thickness" ref={inputRef} className="text-black h-10 w-24 rounded-md border px-2 py-1 ml-2" />
            <button onClick={handleSubmit} className="rounded ml-2 bg-[#00B949] text-white py-2 px-9">Add</button>
          </div>
          </div>
          
          {/* Image and other data points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4">

            {/* Image */}
            <div className='flex items-center justify-center h-80 rounded'>
              <p className='text-2xl text-gray-400 dark:text-gray-500'>
                <img src={cumi} alt='img' className='w-full h-full object-contain'/>
              </p>
            </div>
            {/* Temp,Device,Signal,Battery */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mb-4'>
              <div className={`md:col-span-3 flex items-center justify-center rounded ${rounded_percentage <= 50 ? 'bg-red-500' :  rounded_percentage <= 75 ? 'bg-[#ED7014]': rounded_percentage <=100 ? 'bg-[#1AC48B]' : 'bg-[#0A99DF]'}`}>
                <FaSortAmountUpAlt className={`text-5xl ml-4  ${isLightMode ? 'text-stone-300' : iocn_color}`}/>
                <div className="flex-grow text-center">
                  <p className="text-4xl mt-6 font-bold text-lime-300">
                  {rounded_percentage !== null ? (rounded_percentage <= 100 ? (lastUpdatedThickness === "95.23" ? 'Loss Connection' : `${rounded_percentage}%`):'Over Limit'):'N/A'}
                  </p>
                  <p className="text-white text-center text-3xl font-bold mt-10 text-left ml-5">Thickness</p>
                </div>
                <p className="text-4xl mr-7 text-lime-300 mt-1 font-bold">
                  {lastUpdatedThickness !== null && lastUpdatedThickness !== '' ? (
                     parseInt(lastUpdatedThickness) > parseInt(overlimit_data) ? '-' : lastUpdatedThickness
                  ) : 'N/A'}
                  /{maxlimit !== null ? `${maxlimit} mm` : 'Loading...'}
                </p>
              </div>
              {['Device Temp', 'Signal Strength', 'Battery Level'].map((title, index) => (
                <div key={index} className={`flex items-center justify-center rounded ${isLightMode ? 'bg-[#2d2d2d]' : color_value}`}>
                  {index === 0 ? (
                    <BsDeviceSsd className={`text text-5xl ml-4 ${isLightMode ? 'text-stone-300' : iocn_color}`} />
                  ) : index === 1 ? (
                    <AiFillSignal className={`text text-5xl ml-4 ${isLightMode ? 'text-stone-300' : iocn_color}`} />
                  ) : (
                    <FaBatteryHalf className={`text text-5xl ml-4 ${isLightMode ? 'text-stone-300' : iocn_color}`}/>
                  )}
                  <div className="flex-grow text-center">
                    <h1 className="text-4xl text-teal-500 font-bold">
                    {index === 0 ? (device_temp !== null ? `${device_temp}` : 'N/A') : index === 1 ? (updatedsignal !== null ? `${updatedsignal}` : 'N/A') : (battery!== null ? Battery_Percentage_Value< 100 ? `${Battery_Percentage_Value}%` :'100 %' : 'N/A')}

                    {/* {index === 0 ? (device_temp !== null ? `${device_temp}` : 'N/A') : index === 1 ? (updatedsignal !== null ? `${updatedsignal}` : 'N/A') : (battery!== null ? `${Battery_Percentage_Value}%` : 'N/A')} */}
                    </h1>
                    <p className="text-white text-center text-lg font-bold mt-10 text-left ml-5">{title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4 mb-4'>
            <div className='grid grid-cols-1 sm:grid-cols-1 gap-4'>
              {/* First row with both icons */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className={`flex items-center justify-center rounded ${isLightMode ? 'bg-[#2d2d2d]' : color_value}`}>
                  <MdSensors className={`text text-6xl ml-6  ${isLightMode ? 'text-stone-300' : iocn_color}`}/>
                  <div className='flex-grow text-center'>
                    <h1 className='text-2xl text-emerald-400 font-bold'>
                      {Device !== null ? `${Device}` : 'Loading...'}
                    </h1>
                    <p className='text-white text-center font-bold mt-3 text-left ml-5'>Device Status</p>
                  </div>
                </div>
                <div className={`flex items-center justify-center rounded ${isLightMode ? 'bg-[#2d2d2d]' : color_value}`}>
                  <MdBrowserUpdated className={`text text-6xl ml-6 ${isLightMode ? 'text-stone-300' : iocn_color}`} />
                  <div className='flex-grow text-center'>
                    <h1 className='text-2xl text-emerald-400 font-bold'>
                      {time !== null ? `${time}` : 'Loading...'}
                    </h1>
                    <p className='text-white text-center font-bold mt-3 text-left ml-5'>Last Updated Time</p>
                  </div>
                </div>
              </div>
              {/* Table */}
              <div className='grid grid-cols-2'>
                <div className={`flex items-center justify-center rounded ${isLightMode ? 'bg-[#2d2d2d]' : color_value} col-span-full`}>
                  <div className='max-h-[200px] overflow-x-auto'>
                    <table className="min-w-full table divide-y divide-gray-200">
                        <thead>
                          <tr>
                            <th className={`px-2  text-white text-bold  ${isLightMode ? 'bg-[#2d2d2d]' : color_value} text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                              Thickness
                            </th>
                            <th className={`px-2 text-white text-bold ${isLightMode ? 'bg-[#2d2d2d]' : color_value} text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                              Battery Level
                            </th>
                            <th className={`px-2 text-white text-bold ${isLightMode ? 'bg-[#2d2d2d]' : color_value} text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                              Signal Strength
                            </th>
                            <th className={`px-2 text-white text-bold ${isLightMode ? 'bg-[#2d2d2d]' : color_value} text-center text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider`}>
                              Time
                            </th>
                          </tr>
                        </thead>
                        <tbody className={`${isLightMode ? 'bg-[#2d2d2d]' : color_value}  divide-y divide-gray-200`}>

                          {sortedChartData.map((data, index) => {
                            let batteryPercentage = parseInt((data.battery - 265) * (100 - 0) / (540 - 265) + 0);
                            batteryPercentage = Math.min(batteryPercentage, 100);

                            return (
                              <tr key={index}>
                                <td className="px-2 whitespace-no-wrap text-slate-300">{data.thickness}</td>
                                <td className="px-2 whitespace-no-wrap text-slate-300">{batteryPercentage} %</td>
                                <td className="px-2 whitespace-no-wrap text-slate-300">{data.signal}</td>
                                <td className="px-2 whitespace-no-wrap text-slate-300">{formatTimestamp(data.timestamp)}</td>
                              </tr>
                            );
                          })}
                        </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className='flex  items-center justify-content rounded'>
              <div className={`${isLightMode ? 'bg-[#2d2d2d]' : color_value} chart h-full`}style={{ width: '100%', maxWidth: '100%', height: '100%' }}>
                <ReactApexChart options={chartOptions} series={chartOptions.series} type='area' />
              </div>
            </div>
            {isSecondPopupVisible && (
              <div className="fixed inset-0 flex items-center justify-center z-50">
                <div className="bg-white p-4 rounded h-30 shadow-lg flex flex-col">
                  <p>Please select a Correct Limit</p>
                  <div className="flex justify-end"> {/* Add this container for the button */}
                    <button
                      type="button"
                      onClick={closeSecondPopup}
                      className="mt-4 inline-flex items-center px-4 py-2 bg-gray-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-500 active:bg-gray-700 focus:outline-none focus:border-gray-800 focus:ring focus:ring-gray-200 disabled:opacity-25 transition"
                    >
                      Okay
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>  )
}
export default Mainpage
