import React,{useState} from 'react'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import App from '../App';
import Mainpage from '../components/Mainpage';
import Pdf from '../components/Pdf'
import Chart from '../components/Chart';
import Upgradeplan from '../components/Upgradeplan';
import Reports from '../components/Reports';
import Setting from '../components/Setting';
import Login from '../components/login';
import ProtectedRoute from './../components/ProtectedRoute';


const Router = () => {
  return (
    <div>
        <BrowserRouter>
          <Routes>
          <Route path='login' element={<Login/>}/>
          <Route path='/' element = {<ProtectedRoute />}>
              <Route path='/' element={<App/>}>
                  <Route index element={<Mainpage/>}/>
                  <Route path='chart' element={<Chart/>}/>
                  {/* <Route path='upgrade' element={<Upgradeplan/>}/> */}
                  <Route path='report' element={<Reports/>}/>
                  <Route path='setting' element={<Setting/>}/>
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
    </div>
  )
}
export default Router
