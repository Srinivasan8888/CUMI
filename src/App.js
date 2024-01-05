import './App.css';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import { Outlet } from 'react-router-dom';
import { ModeProvider } from './components/ModeContext';

function App() {
  return (
    <ModeProvider>
      <div className="flex">
        <div>
          <Sidebar/>
        </div>
        <div className='basis-[100%]'>
          <Dashboard/>
          <div>
            <Outlet>
            </Outlet>
          </div>
        </div>
      </div>
    </ModeProvider>
  );
}

export default App;