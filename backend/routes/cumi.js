import express from 'express'
import { register,input,login,DeviceName,dropdown,limit,limitdata,lastdropdownvalue,fetchLastSensor1Data,ChartData,fetchAllData,daylimt,summa_testing,insertData,BulkData} from "../controller/alldata.js";

const router = express.Router();
router.post("/register", register)
router.post("/login",login)
router.post("/input",input)
router.post('/summa_testing',summa_testing)
router.post("/dropdown",dropdown)
router.post("/limit",limit)
router.get("/limitdata",limitdata)
router.get("/DeviceName",DeviceName)
router.get("/alldata",fetchLastSensor1Data)
router.get("/lastdropdownvalue",lastdropdownvalue)
router.get("/ChartData",ChartData)
router.get("/BulkData",BulkData)
router.get("/fetchAllData",fetchAllData)
router.get("/daylimt",daylimt)
router.get("/insertData",insertData)


export default router;