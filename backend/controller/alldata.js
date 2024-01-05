import LoginModel from "../components/login.js";
import InputModel from "../components/devicename.js";
import DropdownModel from "../components/dropdown.js";
import limitModel from "../components/limit.js";
import DataModel from "../components/data.js";
import DataFrequency from "../components/datafrequency.js";
import DayModel from "../components/datafrequency_day.js";
import axios from 'axios'
import  jwt from 'jsonwebtoken';
import  bcrypt from  'bcryptjs';

export const register = async(req,res) => {
    try {
        const newPassword = await bcrypt.hash(req.body.password, 10)
        await LoginModel.create({
            email: req.body.email,
            password: newPassword,
        })
        res.json({status: 'ok'})
    } catch (error) {
        res.json({status: 'error', error: 'Duplicate email'})
    }
  }



  export const login =async (req, res) => {
    const user = await LoginModel.findOne({
        email: req.body.email,
    })
    if(!user) {
        return {status: 'error', error: 'Invalid User'}
    }
    const isPasswordVaild = await bcrypt.compare(
        req.body.password,
        user.password
    )
    if (isPasswordVaild) {
        const token = jwt.sign(
            {
                name: user.name,
                email: user.email
            },
            'secret123'
        )
        return res.json({status: 'ok', user: token})
    } else {
        return res.json({status: 'error', user: false})
    }
  }


  export const input =  async (req, res) => {
    try {
      const existingData = await InputModel.findOne({ input: req.body.input });
  
      if (existingData) {
        console.log('Data already exists in the database');
        return res.status(409).json({ status: 'already_exists' });
      } else {
        await InputModel.create({
          input: req.body.input,
        });
    
        res.json({ status: 'ok' });
        console.log('Data stored successfully');
      }
    } catch (error) {
      console.error('Error storing data in the database:', error);
      res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }


export const DeviceName = (req,res)=>{
    InputModel.find({}).then(data=>{
      if(data.length>0){
        res.status(200).json(data)
      }else{
        res.status(404).json({error:"No data found"});
      }
    }).catch(err=>res.status(500).json({error:err.message}))
  }


export const dropdown = async (req, res) => {
  try {
    await DropdownModel.create({
      dropdown: req.body.dropdown,
    });

    res.json({ status: 'ok' });
    console.log("sucess");
  } catch (error) {
    console.error('Error storing limit in the database:', error);
    res.status(500).json({ status: 'error', error: 'Internal server error' });
  }
}


export const limit=  async (req, res) => {
    try {
      const { limit, devicename } = req.body;
      if (!limit) {
        return res.status(400).json({ error: 'Missing required parameter "limit"' });
      }
      const newData = {
        limit: limit,
        deviceName: devicename,
      };
      await limitModel.create(newData);
      return res.status(200).json({ message: 'Data successfully saved' });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  export const limitdata = (req, res) => {
    limitModel.aggregate([
      { $sort: { _id: -1 } }, 
      { $group: { _id: "$deviceName", data: { $first: "$$ROOT" } } }, 
      { $replaceRoot: { newRoot: "$data" } }  
    ])
      .then(data => {
        if (data.length > 0) {
          const result = data.map(item => ({ limit: item.limit, devicename: item.deviceName }));
          res.status(200).json(result);
        } else {
          res.status(400).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

// export const limitdata= (req,res)=>{
//     limitModel.findOne({},{},{sort: { _id: -1 }})
//     .then(data=>{
//       if(data){
//         res.status(200).json({limt:data.limit, devicename:data.deviceName
//         });
//       }else{
//         res.status(400).json({error:'No data found'});
//       }
//     })
//     .catch(err => res.status(500).json({error: err.message}));
//   }

  export const lastdropdownvalue = (req, res) => {
    DropdownModel
      .findOne({}, {}, { sort: { _id: -1 } })
      .then(data => {
        if (data) {
          res.status(200).json({ dropdown: data });
        } else {
          res.status(400).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

export const fetchLastSensor1Data = async (req, res) => {
  try {
    const data = await DataModel.find();
    
    if (data.length > 0) {
      const formattedData = data.map(item => ({
        device_name: item.device_name,
        thickness: item.thickness,
        device_status: item.device_status, // Assuming this is the correct property name
        signal_strength: item.signal_strength, // Assuming this is the correct property name
        battery_status: item.battery_status, // Assuming this is the correct property name
        timestamp: item.timestamp
      }));

      res.status(200).json(formattedData);
    } else {
      res.status(404).json({ error: 'No data found for sensor1' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



  export const BulkData = async (req, res) => {
    try {
      const data1 = await DataModel.find({ device_name: 'XY00001' }).sort({_id: -1}).limit(500);
      const data2 = await DataModel.find({ device_name: 'XY00002' }).sort({_id: -1}).limit(500);
      const data3 = await DataModel.find({ device_name: 'XY00003' }).sort({_id: -1}).limit(500);
      const data4 = await DataModel.find({ device_name: 'XY00004' }).sort({_id: -1}).limit(500);
      const data5 = await DataModel.find({ device_name: 'XY00005' }).sort({_id: -1}).limit(500);
      const data6 = await DataModel.find({ device_name: 'XY00006' }).sort({_id: -1}).limit(500);
      const data7 = await DataModel.find({ device_name: 'XY00007' }).sort({_id: -1}).limit(500);
      const data8 = await DataModel.find({ device_name: 'XY00008' }).sort({_id: -1}).limit(500);
      const data9 = await DataModel.find({ device_name: 'XY00009' }).sort({_id: -1}).limit(500);
      const data10 = await DataModel.find({ device_name: 'XY00010' }).sort({_id: -1}).limit(500);
  
      if (data1.length > 0 || data2.length > 0 ) {
        const formattedData1 = data1.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData2 = data2.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData3 = data3.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData4 = data4.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData5 = data5.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData6 = data6.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData7 = data7.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData8 = data8.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        })); 
         const formattedData9 = data9.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData10 = data10.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));

        res.status(200).json({
          XY00001: formattedData1,
          XY00002: formattedData2,
          XY00003: formattedData3,
          XY00004: formattedData4,
          XY00005: formattedData5,
          XY00006: formattedData6,
          XY00007: formattedData7,
          XY00008: formattedData8,
          XY00009: formattedData9,
          XY00010: formattedData10,
        });
      } else {
        res.status(404).json({ error: 'No data found for sensors' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }




 export const ChartData = async (req, res) => {
    try {
      const data1 = await DataModel.find({ device_name: 'XY00001' }).sort({_id: -1}).limit(30);
      const data2 = await DataModel.find({ device_name: 'XY00002' }).sort({_id: -1}).limit(30);
      const data3 = await DataModel.find({ device_name: 'XY00003' }).sort({_id: -1}).limit(30);
      const data4 = await DataModel.find({ device_name: 'XY00004' }).sort({_id: -1}).limit(30);
      const data5 = await DataModel.find({ device_name: 'XY00005' }).sort({_id: -1}).limit(30);
      const data6 = await DataModel.find({ device_name: 'XY00006' }).sort({_id: -1}).limit(30);
      const data7 = await DataModel.find({ device_name: 'XY00007' }).sort({_id: -1}).limit(30);
      const data8 = await DataModel.find({ device_name: 'XY00008' }).sort({_id: -1}).limit(30);
      const data9 = await DataModel.find({ device_name: 'XY00009' }).sort({_id: -1}).limit(30);
      const data10 = await DataModel.find({ device_name: 'XY00010' }).sort({_id: -1}).limit(30);
      
      // const data11 = await DataModel.find({ device_name: 'XY00011' }).sort({_id: -1}).limit(30);
      // const data12 = await DataModel.find({ device_name: 'XY00012' }).sort({_id: -1}).limit(30);
      // const data13 = await DataModel.find({ device_name: 'XY00013' }).sort({_id: -1}).limit(30);
      // const data14 = await DataModel.find({ device_name: 'XY00014' }).sort({_id: -1}).limit(30);
      // const data15 = await DataModel.find({ device_name: 'XY00015' }).sort({_id: -1}).limit(30);
      // const data16 = await DataModel.find({ device_name: 'XY00016' }).sort({_id: -1}).limit(30);
      // const data17 = await DataModel.find({ device_name: 'XY00017' }).sort({_id: -1}).limit(30);
      // const data18 = await DataModel.find({ device_name: 'XY00018' }).sort({_id: -1}).limit(30);
      // const data19 = await DataModel.find({ device_name: 'XY00019' }).sort({_id: -1}).limit(30);
      // const data20 = await DataModel.find({ device_name: 'XY00020' }).sort({_id: -1}).limit(30);
  
  
      if (data1.length > 0 || data2.length > 0 ) {
        const formattedData1 = data1.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData2 = data2.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData3 = data3.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData4 = data4.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData5 = data5.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData6 = data6.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData7 = data7.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData8 = data8.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        })); 
         const formattedData9 = data9.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
        const formattedData10 = data10.map(item => ({
          device_name: item.device_name,
          thickness: item.thickness,
          device_Temp: item.device_status,
          signal: item.signal_strength,
          battery: item.battery_status,
          timestamp: item.timestamp
        }));
  
  
      
        res.status(200).json({
          XY00001: formattedData1,
          XY00002: formattedData2,
          XY00003: formattedData3,
          XY00004: formattedData4,
          XY00005: formattedData5,
          XY00006: formattedData6,
          XY00007: formattedData7,
          XY00008: formattedData8,
          XY00009: formattedData9,
          XY00010: formattedData10,
        });
      } else {
        res.status(404).json({ error: 'No data found for sensors' });
      }
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

export const fetchAllData =  (req, res) => {
    DataModel.find({}) 
      .then(data => {
        if (data.length > 0) {
          res.status(200).json(data);
        } else {
          res.status(404).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }

  export const daylimt = (req, res) => {
    DataFrequency.findOne({}, {}, { sort: { _id: -1 } }) 
      .then(data => {
        if (data) {
          res.status(200).json({ day: data.day,
          });
          
        } else {
          res.status(404).json({ error: 'No data found' });
        }
      })
      .catch(err => res.status(500).json({ error: err.message }));
  }
  
  //summa 
 export const summa_testing =  async (req, res) => {
    try {
      await DayModel.create({
        day: req.body.day,
      });
  
      res.json({ status: 'ok' });
      console.log("sucess");
    } catch (error) {
      console.error('Error storing limit in the database:', error);
      res.status(500).json({ status: 'error', error: 'Internal server error' });
    }
  }


export const insertData = async (req, res) => {
  const {device_name, device_status, thickness, signal_strength, battery } = req.query;
  if (!device_name ||!device_status || !thickness || !signal_strength || !battery) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }
  try {
    const limitResponse = await axios.get('http://localhost:4000/backend/limitdata');
    const DayLimit = await axios.get('https://cumi.xyma.live/backend/daylimt') 
    if (limitResponse.status === 200 && DayLimit.status === 200) {
      const day = DayLimit.data.day;
      const device1 = limitResponse.data.find(item => item.devicename === "XY00001")
      const device2 = limitResponse.data.find(item => item.devicename === "XY00002")
      const device3 = limitResponse.data.find(item => item.devicename === "XY00003")
      const device4 = limitResponse.data.find(item => item.devicename === "XY00004")
      const limit = limitResponse.data.limt;
      const $ = "$";
      const spl = "#";
      const char = "*";
      const at ="@";
      const date = new Date();
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true,
        timeZone: 'Asia/Kolkata',
      };
      const formattedTimestamp = date.toLocaleString('en-US', options);
      const responseData = [String($),String(device1.devicename),String(device1.limit),Number(day),String(char), String(spl),String(device2.devicename),String(device2.limit),Number(day),String(at), String(char),String(device3.devicename),String(device3.limit),Number(day),String($), String(spl),String(device4.devicename),String(device4.limit),Number(day),String(char)];
      const newData = {
        device_name:device_name,
        device_status: device_status,
        thickness: thickness,
        signal_strength: signal_strength,
        battery_status: battery,
        timestamp: formattedTimestamp,
        
      };
      await DataModel.create(newData);
      res.status(200).json(responseData);
    } else {
      res.status(500).json({ error: 'Failed to retrieve limit data' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}