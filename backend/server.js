import express from 'express';
import mongoose from 'mongoose';
import  cors  from 'cors';
const app = express();
import router from './routes/cumi.js';
// import  DataModel from './components/data'
app.use(cors());
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/cumi");
// import LoginModel from './components/login';
// import limitModel from './components/limit';
// import  jwt from 'jsonwebtoken';
// import  bcrypt from  'bcryptjs';
// import DropdownModel from './components/dropdown';
// const { default: axios } = require('axios');
// import InputModel from './components/devicename';
// import DayModel from './components/datafrequency_day'
// import  DataFrequency from './components/datafrequency';
app.use("/backend",router);
app.use(express.json());
mongoose.connect("mongodb://127.0.0.1:27017/cumi");

////////////Register Credentials//////////
// app.post('/register', async(req,res) => {
//   try {
//       const newPassword = await bcrypt.hash(req.body.password, 10)
//       await LoginModel.create({
//           email: req.body.email,
//           password: newPassword,
//       })
//       res.json({status: 'ok'})
//   } catch (error) {
//       res.json({status: 'error', error: 'Duplicate email'})
//   }
// });

// ///////////////Login Page/////////////
// app.post('/login', async (req, res) => {
//   const user = await LoginModel.findOne({
//       email: req.body.email,
//   })
//   if(!user) {
//       return {status: 'error', error: 'Invalid User'}
//   }
//   const isPasswordVaild = await bcrypt.compare(
//       req.body.password,
//       user.password
//   )
//   if (isPasswordVaild) {
//       const token = jwt.sign(
//           {
//               name: user.name,
//               email: user.email
//           },
//           'secret123'
//       )
//       return res.json({status: 'ok', user: token})
//   } else {
//       return res.json({status: 'error', user: false})
//   }
// })

// /////////////In Setting Page Add a DeviceName////////////////
// app.post('/input', async (req, res) => {
//   try {
//     const existingData = await InputModel.findOne({ input: req.body.input });

//     if (existingData) {
//       console.log('Data already exists in the database');
//       return res.status(409).json({ status: 'already_exists' });
//     } else {
//       await InputModel.create({
//         input: req.body.input,
//       });
  
//       res.json({ status: 'ok' });
//       console.log('Data stored successfully');
//     }
//   } catch (error) {
//     console.error('Error storing data in the database:', error);
//     res.status(500).json({ status: 'error', error: 'Internal server error' });
//   }
// });


// /////////////////////Dropdown List///////////////////
// app.get('/DeviceName',(req,res)=>{
//   InputModel.find({}).then(data=>{
//     if(data.length>0){
//       res.status(200).json(data)
//     }else{
//       res.status(404).json({error:"No data found"});
//     }
//   }).catch(err=>res.status(500).json({error:err.message}))
// })

// ///////////////Store the last clicked dropdown value/////////////
// app.post('/dropdown', async (req, res) => {
//   try {
//     await DropdownModel.create({
//       dropdown: req.body.dropdown,
//     });

//     res.json({ status: 'ok' });
//     console.log("sucess");
//   } catch (error) {
//     console.error('Error storing limit in the database:', error);
//     res.status(500).json({ status: 'error', error: 'Internal server error' });
//   }
// });

// ///////////////set the Max thickness Limit//////////////
// app.post('/limit', async (req, res) => {
//   try {
//     const { limit } = req.body;
//     if (!limit) {
//       return res.status(400).json({ error: 'Missing required parameter "limit"' });
//     }
//     const newData = {
//       limit: limit,
//     };
//     await limitModel.create(newData);
//     return res.status(200).json({ message: 'Data successfully saved' });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ error: error.message });
//   }
// });

// //////////////Retrive the last Max Thickness data/////////////
// app.get('/limitdata',(req,res)=>{
//   limitModel.findOne({},{},{sort: { _id: -1 }})
//   .then(data=>{
//     if(data){
//       res.status(200).json({limt:data.limit,
//       });
//     }else{
//       res.status(400).json({error:'No data found'});
//     }
//   })
//   .catch(err => res.status(500).json({error: err.message}));
// })

// //////////////findout the last clicked dropdown value////////////////
// app.get('/lastdropdownvalue', (req, res) => {
//   DropdownModel
//     .findOne({}, {}, { sort: { _id: -1 } })
//     .then(data => {
//       if (data) {
//         res.status(200).json({ dropdown: data });
//       } else {
//         res.status(400).json({ error: 'No data found' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err.message }));
// });


// ////////////////fetch that corresponding clicked dropdown data/////////////
// app.get('/fetchLastSensor1Data', async (req, res) => {
//   try {
//     const limitResponse = await axios.get('http://localhost:2002/lastdropdownvalue');
//     const dropdowndata = limitResponse.data;
//     const main = dropdowndata.dropdown.dropdown;
//     const data = await DataModel.find({ device_name: main }).sort({_id:-1}).limit(30);
//     if (data.length > 0) {
//       const formattedData = data.map(item => ({
//         device_name: item.device_name,
//         thickness: item.thickness,
//         device_Temp: item.device_status,
//         signal: item.signal_strength,
//         battery: item.battery_status,
//         timestamp: item.timestamp
//       }));
//       res.status(200).json(formattedData);
//     } else {
//       res.status(404).json({ error: 'No data found for sensor1' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// app.get('/ChartData', async (req, res) => {
//   try {


//     const data1 = await DataModel.find({ device_name: 'sensor1' }).sort({_id: -1}).limit(30);
//     const data2 = await DataModel.find({ device_name: 'sensor2' }).sort({_id: -1}).limit(30);
    

//     if (data1.length > 0 || data2.length > 0 ) {
//       const formattedData1 = data1.map(item => ({
//         device_name: item.device_name,
//         thickness: item.thickness,
//         device_Temp: item.device_status,
//         signal: item.signal_strength,
//         battery: item.battery_status,
//         timestamp: item.timestamp
//       }));
//       const formattedData2 = data2.map(item => ({
//         device_name: item.device_name,
//         thickness: item.thickness,
//         device_Temp: item.device_status,
//         signal: item.signal_strength,
//         battery: item.battery_status,
//         timestamp: item.timestamp
//       }));


//       res.status(200).json({
//         sensor1: formattedData1,
//         sensor2: formattedData2,
//       });
//     } else {
//       res.status(404).json({ error: 'No data found for sensors' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });




// app.get('/fetchAllData', (req, res) => {
//   DataModel.find({}) // Find all documents
//     .then(data => {
//       if (data.length > 0) {
//         res.status(200).json(data);
//       } else {
//         res.status(404).json({ error: 'No data found' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err.message }));
// });


// //////////This for two way communication set the date/////////////
// app.get('/daylimt', (req, res) => {
//   DataFrequency.findOne({}, {}, { sort: { _id: -1 } }) 
//     .then(data => {
//       if (data) {
//         res.status(200).json({ day: data.day,
//         });
        
//       } else {
//         res.status(404).json({ error: 'No data found' });
//       }
//     })
//     .catch(err => res.status(500).json({ error: err.message }));
// });

// //summa 
// app.post('/summa_testing', async (req, res) => {
//   try {
//     await DayModel.create({
//       day: "129",
//     });

//     res.json({ status: 'ok' });
//     console.log("sucess");
//   } catch (error) {
//     console.error('Error storing limit in the database:', error);
//     res.status(500).json({ status: 'error', error: 'Internal server error' });
//   }
// });



// ///////////////////server Insert Link(API)/////////////////// 
// app.get('/insertData', async (req, res) => {
//   const {device_name, device_status, thickness, signal_strength, battery } = req.query;
//   if (!device_name ||!device_status || !thickness || !signal_strength || !battery) {
//     return res.status(400).json({ error: 'Missing required parameters' });
//   }
//   try {
//     const limitResponse = await axios.get('http://localhost:2002/limitdata');
//     const DayLimit = await axios.get('http://localhost:2002/daylimt') 
//     if (limitResponse.status === 200 && DayLimit.status === 200) {
//       const day = DayLimit.data.day;
//       const limit = limitResponse.data.limt;
//       const $ = "$";
//       const spl = "#";
//       const char = "*";
//       const at ="@";
//       const date = new Date();
//       const options = {
//         year: 'numeric',
//         month: '2-digit',
//         day: '2-digit',
//         hour: '2-digit',
//         minute: '2-digit',
//         hour12: true,
//         timeZone: 'Asia/Kolkata',
//       };
//       const formattedTimestamp = date.toLocaleString('en-US', options);
//       const responseData = [String($),Number(limit),String(spl),String(at), Number(day),String(char)];
//       const newData = {
//         device_name:device_name,
//         device_status: device_status,
//         thickness: thickness,
//         signal_strength: signal_strength,
//         battery_status: battery,
//         timestamp: formattedTimestamp,
        
//       };
//       await DataModel.create(newData);
//       res.status(200).json(responseData);
//     } else {
//       res.status(500).json({ error: 'Failed to retrieve limit data' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });



app.listen(4000, () => {
    console.log('Server started on port 4000');
  });