import React,{useState,useEffect} from 'react'
import { useContext } from 'react';
import { ModeContext } from './ModeContext';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import './style.css'
import axios from 'axios';
import '../components/style.css'

const Chart = () => {
    const { isLightMode } = useContext(ModeContext);
    const [thicknessData, setThicknessData] = useState([]);
    const[thicknessString,SensorLastThickness]=useState(1001)
    const [device1,DeviceData1]=useState([])
    const [device2,DeviceData2]=useState([])
    const [device3,DeviceData3]=useState([])
    const [device4,DeviceData4]=useState([])
    const [device5,DeviceData5]=useState([])
    const [device6,DeviceData6]=useState([])
    const [device7,DeviceData7]=useState([])
    const [device8,DeviceData8]=useState([])
    const [device9,DeviceData9]=useState([])
    const [device10,DeviceData10]=useState([])
    const [device11,DeviceData11]=useState([])
    const [device12,DeviceData12]=useState([])
    const [device13,DeviceData13]=useState([])
    const [device14,DeviceData14]=useState([])
    const [device15,DeviceData15]=useState([])
    const [device16,DeviceData16]=useState([])
    const [device17,DeviceData17]=useState([])
    const [device18,DeviceData18]=useState([])
    const [device19,DeviceData19]=useState([])
    const [device20,DeviceData20]=useState([])
    const [maxlimit,setLimitData] = useState(null);

    useEffect(() => {
        fetchData();
        limits();
        const interval = setInterval(fetchData, 5000);
        const max = setInterval(limits,2000);
        return () => {
          clearInterval(interval);
          clearInterval(max);
        };
      }, []);
      const limits = async()=>{
        try{
          const response = await axios.get('http://localhost:4000/backend/limitdata');
          setLimitData(response.data.limt);
        }catch(error){
          console.error('Error fetching data',error)
        }
      }
    const fetchData = async (sensorNumber) => {
        try {
          let data;
          if (sensorNumber === 'sensor1') {
            data ='XY00001'
          }
          else if (sensorNumber === 'sensor2') {
            data = 'XY00002'
          }
          else if (sensorNumber === 'sensor3') {
            data = 'XY00003'
          }
          else if (sensorNumber === 'sensor4') {
            data = 'XY00004'
          }
          else if (sensorNumber === 'sensor5') {
            data = 'XY00005'
          }
          else if (sensorNumber === 'sensor6') {
            data = 'XY00006'
          }
          else if (sensorNumber === 'sensor7') {
            data = 'XY00007'
          }
          else if (sensorNumber === 'sensor7') {
            data = 'XY00008'
          }  else if (sensorNumber === 'sensor9') {
            data = 'XY00009'
          }
          else if (sensorNumber === 'sensor10') {
            data = 'XY00010'
          }
          
          const response = await fetch('http://localhost:4000/backend/ChartData');
          const info = await response.json();
      
          const device1 = info.XY00001 && info.XY00001.length > 0 ? info.XY00001[0] : { thickness_data: '-' };
          const device2 = info.XY00002 && info.XY00002.length > 0 ? info.XY00002[0] : { thickness_data: '-' };
          const device3 = info.XY00003 && info.XY00003.length > 0 ? info.XY00003[0] : { thickness_data: '-' };
          const device4 = info.XY00004 && info.XY00004.length > 0 ? info.XY00004[0] : { thickness_data: '-' };
          const device5 = info.XY00005 && info.XY00005.length > 0 ? info.XY00005[0] : { thickness_data: '-' };
          const device6 = info.XY00006 && info.XY00006.length > 0 ? info.XY00006[0] : { thickness_data: '-' };
          const device7 = info.XY00007 && info.XY00007.length > 0 ? info.XY00007[0] : { thickness_data: '-' };
          const device8 = info.XY00008 && info.XY00008.length > 0 ? info.XY00008[0] : { thickness_data: '-' };
          const device9 = info.XY00009 && info.XY00009.length > 0 ? info.XY00009[0] : { thickness_data: '-' };
          const device10 = info.XY00010 && info.XY00010.length > 0 ? info.XY00010[0] : { thickness_data: '-' };
          const device11 = info.XY00011&& info.XY00011.length > 0 ? info.XY00011[0] : { thickness_data: '-' };
          const device12 = info.XY00012&& info.XY00012.length > 0 ? info.XY00012[0] : { thickness_data: '-' };
          const device13 = info.XY00013 && info.XY00013.length > 0 ? info.XY00013[0] : { thickness_data: '-' };
          const device14 = info.XY00014 && info.XY00014.length > 0 ? info.XY00014[0] : { thickness_data: '-' };
          const device15 = info.XY00015 && info.XY00015.length > 0 ? info.XY00015[0] : { thickness_data: '-' };
          const device16 = info.XY00016 && info.XY00016.length > 0 ? info.XY00016[0] : { thickness_data: '-' };
          const device17 = info.XY00017 && info.XY00017.length > 0 ? info.XY00017[0] : { thickness_data: '-' };
          const device18 = info.XY00018 && info.XY00018.length > 0 ? info.XY00018[0] : { thickness_data: '-' };
          const device19 = info.XY00019 && info.XY00019.length > 0 ? info.XY00019[0] : { thickness_data: '-' };
          const device20 = info.XY00020 && info.XY00020.length > 0 ? info.XY00020[0] : { thickness_data: '-' };
          DeviceData1(device1);
          DeviceData2(device2);
          DeviceData3(device3);
          DeviceData4(device4);
          DeviceData5(device5);
          DeviceData6(device6);
          DeviceData7(device7);
          DeviceData8(device8);
          DeviceData9(device9);
          DeviceData10(device10);
          DeviceData11(device11);
          DeviceData12(device12);
          DeviceData13(device13);
          DeviceData14(device14);
          DeviceData15(device15);
          DeviceData16(device16);
          DeviceData17(device17);
          DeviceData18(device18);
          DeviceData19(device19);
          DeviceData20(device20);
        


          const sensor1 = info[data];
          if(sensor1){
              const sensor1lastdata = sensor1[0];
              const lastThicknessValue = sensor1lastdata.thickness
              setThicknessData(sensor1);
              
              SensorLastThickness(lastThicknessValue)
          }else{
            console.log("Sensor data for ${sensorname} is undefined.")
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      const sortedThicknessData = [...thicknessData].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
      const first30ThicknessData = sortedThicknessData.slice(0, 30);
      const thickness = first30ThicknessData.map((item) => item?.thickness);
      const updatedtime = first30ThicknessData.map((item) => {
          const timestamp = new Date(item?.timestamp);
          const formattedDate = `${timestamp.getDate()}-${timestamp.toLocaleString('en-us', { month: 'short' })}-${timestamp.getFullYear()}`;
          return formattedDate;
      });
      
      const chartOptions = {
          grid: {
            show: false,
          },
          series: [
            {
              name: 'thickness',
              style: {
                colors: '#ff0000',
              },
              data: thickness, 
            },
          ],
          chart: {
            height: 500,
            type: 'area',
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: 'smooth',
          },
          xaxis: {
            categories:updatedtime,
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
      const color_value ='bg-[#737373]'
      const iocn_color = 'text-stone-900'
        
      const thicknes = device1.thickness
      const limitvalue = ((thicknes-0)*(100-0))/(maxlimit-0)+0;
      const rounded_value = limitvalue.toFixed(2);
      const rounded_percentage = parseFloat(rounded_value);
  
      
      const getBackgroundColor = (value) => {
        const a = parseInt(value)
        if(value <= maxlimit *0.5){
          return 'red-bg'
        } 
        else if(value <= maxlimit *0.75 && value >= maxlimit *0.5){
          return 'orange-bg'
        } 
        else if(value > maxlimit *0.75){
          return 'green-bg'
        } 
        else {
          // Otherwise, return an empty string or another default class
          return '';
        }
      };
console.log("data",device1.thickness)
  return (
    <div className={`pt-[25px] h-[1088px] apexchart media px-[25px] ${isLightMode ? 'bg-[#202020]' : 'bg-[#f2f2f2]'}`}>
      <h1 className='text-white mb-5 font-bold'>Chart</h1>
      <div className='grid grid-rows-2'>
        <div className={`${isLightMode ? 'bg-[#2d2d2d]' : color_value}`}>
        <ReactApexChart options={chartOptions} series={chartOptions.series} type='area' height={400} />
        </div>
        <div className="mt-5 overflow-x-auto flex">
          <table className="min-w-full border">
            <thead>
              <tr>
                <td className="border font-bold text-white w-20">Device Id</td>
                <td onClick={() => fetchData('sensor1')} className={`bg-[#0A99DF] border cursor-pointer text-center text-white ${getBackgroundColor(device1.thickness)}`}>XY00001</td>
                <td onClick={()=>fetchData('sensor2')}  className={`border cursor-pointer text-center text-white ${device2.thickness <=50? 'bg-red-500':device2.thickness <=75?'bg-[#ED7014]':device2.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00002</td>
                <td  onClick={()=>fetchData('sensor3')} className={`border cursor-pointer text-center text-white ${device3.thickness <=50? 'bg-red-500':device3.thickness <=75?'bg-[#ED7014]':device3.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00003</td>
                <td onClick={()=>fetchData('sensor4')} className={`border cursor-pointer text-center text-white ${device4.thickness <=50? 'bg-red-500':device4.thickness <=75?'bg-[#ED7014]':device4.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00004</td>
                <td onClick={()=>fetchData('sensor5')} className={`border cursor-pointer text-center text-white ${device5.thickness <=50? 'bg-red-500':device5.thickness <=75?'bg-[#ED7014]':device5.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00005</td>
                <td onClick={()=>fetchData('sensor6')} className={`border cursor-pointer text-center text-white ${device6.thickness <=50? 'bg-red-500':device6.thickness <=75?'bg-[#ED7014]':device6.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00006</td>
                <td onClick={()=>fetchData('sensor7')} className={`border cursor-pointer text-center text-white ${device7.thickness <=50? 'bg-red-500':device7.thickness <=75?'bg-[#ED7014]':device7.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00007</td>
                <td  onClick={()=>fetchData('sensor8')} className={`border cursor-pointer text-center text-white ${device8.thickness <=50? 'bg-red-500':device8.thickness <=75?'bg-[#ED7014]':device8.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00008</td>
                <td onClick={()=>fetchData('sensor9')} className={`border cursor-pointer text-center text-white ${device9.thickness <=50? 'bg-red-500':device9.thickness <=75?'bg-[#ED7014]':device9.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00009</td>
                <td onClick={()=>fetchData('sensor10')} className={`border cursor-pointer text-center text-white ${device10.thickness <=50? 'bg-red-500':device10.thickness <=75?'bg-[#ED7014]':device10.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00010</td>
              </tr>
              <tr>
                <td className="border font-bold text-white w-20 h-14 ">Device Id</td>
                <td onClick={()=>fetchData('sensor11')} className={`border cursor-pointer text-center text-white ${device11.thickness <=50? 'bg-red-500':device11.thickness <=75?'bg-[#ED7014]':device11.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00011</td>
                <td onClick={()=>fetchData('sensor12')}  className={`border cursor-pointer text-center text-white ${device12.thickness <=50? 'bg-red-500':device12.thickness <=75?'bg-[#ED7014]':device12.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00012</td>
                <td  onClick={()=>fetchData('sensor13')} className={`border cursor-pointer text-center text-white ${device13.thickness <=50? 'bg-red-500':device13.thickness <=75?'bg-[#ED7014]':device13.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00013</td>
                <td onClick={()=>fetchData('sensor14')} className={`border cursor-pointer text-center text-white ${device14.thickness <=50? 'bg-red-500':device14.thickness <=75?'bg-[#ED7014]':device14.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00014</td>
                <td onClick={()=>fetchData('sensor15')} className={`border cursor-pointer text-center text-white ${device15.thickness <=50? 'bg-red-500':device15.thickness <=75?'bg-[#ED7014]':device15.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00015</td>
                <td onClick={()=>fetchData('sensor16')} className={`border cursor-pointer text-center text-white ${device16.thickness <=50? 'bg-red-500':device16.thickness <=75?'bg-[#ED7014]':device16.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00016</td>
                <td onClick={()=>fetchData('sensor17')} className={`border cursor-pointer text-center text-white ${device17.thickness <=50? 'bg-red-500':device17.thickness <=75?'bg-[#ED7014]':device17.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00017</td>
                <td  onClick={()=>fetchData('sensor18')} className={`border cursor-pointer text-center text-white ${device18.thickness <=50? 'bg-red-500':device18.thickness <=75?'bg-[#ED7014]':device18.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00018</td>
                <td onClick={()=>fetchData('sensor19')} className={`border cursor-pointer text-center text-white ${device19.thickness <=50? 'bg-red-500':device19.thickness <=75?'bg-[#ED7014]':device19.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00019</td>
                <td onClick={()=>fetchData('sensor20')} className={`border cursor-pointer text-center text-white ${device20.thickness <=50? 'bg-red-500':device20.thickness <=75?'bg-[#ED7014]':device20.thickness<=100 ? 'bg-[#1AC48B]':'bg-[#0A99DF]'}`}>XY00020</td>
              </tr>
            </thead>
            <tbody>
            </tbody>
          </table>
        </div> 
      </div>
      </div>
  )
}

export default Chart