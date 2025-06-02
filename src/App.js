import React, { useState } from 'react';
import './App.css';
import RegistrarDisForm from './RegistrarDis/RegistrarDisForm';
import RegistrarDisCard from './RegistrarDis/RegistrarDisCard';
import MainDashboard from './Dashboard/MainDashboard';
import { useEffect } from 'react';
import DailyChart from './LineChart/DailyChart';




function App() {
  const [view, setView] = useState("linechart");

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <div className="App">
      <main>
        {view === 'dashboard' && <MainDashboard />}
        {view === 'linechart' && <DailyChart />}
        {view === 'form' && <RegistrarDisForm setView = {setView}/>}
        {view === 'card' && <RegistrarDisCard setView = {setView} />}
      </main>
      <footer className="App-footer">
        <p>&copy; 2023 Registrar Dashboard</p>
      </footer>
    </div>
  );
}

export default App;