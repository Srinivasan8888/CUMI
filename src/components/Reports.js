import React, { useContext ,useEffect,useState} from 'react';
import { ModeContext } from './ModeContext';
import xyma from '../imgaes/xyma.png';
import reportpng from '../imgaes/reports-bg1.png';
import Select from 'react-select';
import axios from 'axios';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
const Reports = () => {
  const[data,setsensorvalue]=useState([])
  const [selectedFromDate, setSelectedFromDate] = useState('');
  const [selectedToDate, setSelectedToDate] = useState('');
  const[sensors,setSensors] =useState(null);
  const { isLightMode } = useContext(ModeContext);
useEffect(()=>{
  DropDown();
  fetchData();
  const dropdown =setInterval(DropDown,5000)
  const pdf = setInterval(fetchData,5000)
  return()=>{
    clearInterval(dropdown);
    clearInterval(pdf);
  }
},[])

////////////DropDown sensors name////////////////////

const DropDown = async () => {
  try {
    const response = await fetch("http://localhost:4000/backend/DeviceName");
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const filteredSensors = data.filter(sensor => sensor.input.startsWith("XY"));
    if (filteredSensors.length === 0) {
      setSensors(['No data']);
    } else {
      setSensors(filteredSensors);
    }
  } catch (error) {
    console.error('Error fetching DeviceName:', error);
    setSensors(['No data']);
  }
};

////////////download the pdf////////////////////////////////
const fetchData = async (sensorNumber) => {
  try {
    let data;
    if (sensorNumber === 'XY00001') {
      data = 'XY00001';
    }
    else if (sensorNumber === 'XY00002') {
      data = 'XY00002';
    }
    else if (sensorNumber === 'XY00003') {
      data = 'XY00003';
    }
    else if (sensorNumber === 'XY00004') {
      data = 'XY00004';
    }
    else if (sensorNumber === 'XY00005') {
      data = 'XY00005';
    }
    else if (sensorNumber === 'XY00006') {
      data = 'XY00006';
    }
    else if (sensorNumber === 'XY00007') {
      data = 'XY00007';
    }
    else if (sensorNumber === 'XY00008') {
      data = 'XY00008';
    }
    else if (sensorNumber === 'XY00009') {
      data = 'XY00009';
    }
    else if (sensorNumber === 'XY00010') {
      data = 'XY00010';
    }
    else{
      console.error("Error");
    }
    const response = await fetch('http://localhost:4000/backend/BulkData');
    const info = await response.json();

    const sensor1 = info[data];
    const sample = info[data].map(item => {
      const originalTimestamp = new Date(item.timestamp);
      const formattedDate = `${originalTimestamp.getFullYear()}-${(originalTimestamp.getMonth() + 1).toString().padStart(2, '0')}-${originalTimestamp.getDate().toString().padStart(2, '0')}`;
      return { ...item, timestamp: formattedDate };
    });
    setsensorvalue(sample);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};


  const handleDateChange = (event, dateType) => {
    const selectedDate = event.target.value;
    if (dateType === 'from') {
      setSelectedFromDate(selectedDate);
    } else if (dateType === 'to') {
      setSelectedToDate(selectedDate);
    }
  };
  
  const handleDownload = async () => {
    try {
      if (!Array.isArray(data)) {
        console.error('Invalid data format:', data);
        return;
      }
      const startDate = new Date(selectedFromDate);
      const endDate = new Date(selectedToDate);
      const filteredData = data.filter(item => {
        const timestamp = new Date(item.timestamp);
        const itemDate = new Date(
          timestamp.getFullYear(),
          timestamp.getMonth(),
          timestamp.getDate()
        );
        return itemDate >= startDate && itemDate <= endDate;
      });
      const doc = new jsPDF();
      const tableHeaders = [
        ['Device', 'Thickness', 'Battery', 'Device Temp', 'Time'],
      ];
      const tableData = filteredData.map(item => {
        // Calculate the raw battery percentage using the formula
        const rawBatteryPercentage = parseInt((item.battery - 265) * (100 - 0) / (540- 265) + 0);
      
        // Ensure the battery percentage doesn't go above 100
        const batteryPercentage = Math.min(rawBatteryPercentage, 100);
      
        return [
          item.device_name,
          item.thickness,
          batteryPercentage, // Use the calculated battery percentage here
          // item.battery,
          item.device_Temp,
          item.timestamp,
        ];
      });
      // const tableData = filteredData.map(item => [
      //   item.device_name,
      //   item.thickness,
      //   parseInt((item.battery - 265) * (100 - 0) / (537 - 265) + 0),
      //   // item.battery,
      //   item.device_Temp,
      //   item.timestamp,
      // ]);
      

      doc.autoTable({
        head: tableHeaders,
        body: tableData,
      });
      const blob = doc.output('blob');
      const pdfUrl = URL.createObjectURL(blob);
      window.open(pdfUrl, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };
  
  const color_value = isLightMode ? '#737373' : '#f2f2f2';
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
  const handleSensorChange = (selectedOption) => {
    if (selectedOption) {
      const sensorNumber = selectedOption.label; 
      fetchData(sensorNumber);
    }
  };

  return (
<div className={`pt-[25px] h-auto md:h-[120vh] px-[25px] ${isLightMode ? 'bg-[#202020]' : 'bg-[#D0D9DB]'}`}>
  <h1 className='text-white mb-5 font-bold text-center'>Reports</h1>
  <div className={`flex flex-col md:flex-row items-center justify-between p-4 rounded-md ${isLightMode ? 'bg-[#2d2d2d]' : 'bg-[#B6BBC3]'} shadow-md`} style={{ height: 'auto' }}>
    <div className="flex flex-col items-center md:items-start mb-4 md:mb-0 md:w-1/2">
      <img src={xyma} className='mt-10 md:mt-0 ml-auto md:ml-0' style={{ width: '50vh', maxWidth: '100%' }} alt="XYMA" />
      <div className="grid grid-rows-4 mt-4 items-center md:items-start justify-center">
      <div className="text-white flex items-center">
        <h1 className="mb-2 mr-2">Select a Device Id:</h1>
        <Select className='ml-4' options={options} styles={customStyles} onChange={handleSensorChange} />
      </div>

        <div className='mt-2 flex items-center'>
          <h1 className='text-white ml-1'>From Date :</h1>
          <input type="date" className="border rounded p-2 ml-5" onChange={(e) => handleDateChange(e, 'from')} />
        </div>
        <div className='mt-2 flex items-center'>
          <h1 className='text-white ml-6'>To Date :</h1>
          <input type="date" className="border rounded p-2 ml-5" onChange={(e) => handleDateChange(e, 'to')} />
        </div>
        <button className="bg-blue-500 text-white p-2 rounded mt-2" onClick={handleDownload}>Download</button> 
      </div>
    </div>
    <div className="flex flex-col items-center md:items-end w-full md:w-1/2 mt-4 md:mt-0">
      <img src={reportpng} style={{ width: '80vh', maxWidth: '100%' }} alt="Report" />
    </div>
  </div>
</div>

  );
};

export default Reports;
