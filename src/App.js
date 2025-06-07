import React, { useState } from 'react';
import './App.css';
import RegistrarDisForm from './RegistrarDis/RegistrarDisForm';
import RegistrarDisCard from './RegistrarDis/RegistrarDisCard';
import MainDashboard from './Dashboard/MainDashboard';
import RegistrarSenForm from './RegistrarSen/RegistrarSenForm';
import { useEffect } from 'react';
import DailyChart from './LineChart/DailyChart';

function App() {
  const [view, setView] = useState("DisCard");
  const [d_id, setD_id] = useState(null);
  useEffect(() => {
    const storedView = localStorage.getItem('view');
    if (storedView) {
      setView(storedView);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <div className="App">
      <main className='main'>
        {view === 'dashboard' && <MainDashboard />}
        {view === 'linechart' && <DailyChart/>}
        {view === 'DisForm' && <RegistrarDisForm setView = {setView} d_id = {d_id}  />}
        {view === 'DisCard' && <RegistrarDisCard setView = {setView} setD_id = {setD_id} />}
        {view === 'SenForm' && <RegistrarSenForm setView = {setView} d_id = {d_id} />}
      </main>
      <footer className="App-footer">
        <p>Proyecto de carrera</p>
      </footer>
    </div>
  );
}

export default App;