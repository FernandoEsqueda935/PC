import React, { useState } from 'react';
import './App.css';
import RegistrarDisForm from './RegistrarDis/RegistrarDisForm';
import RegistrarDisCard from './RegistrarDis/RegistrarDisCard';
import MainDashboard from './Dashboard/MainDashboard';
import { useEffect } from 'react';
import { LineChart } from '@mui/x-charts/LineChart';

function BasicLineChart() {
  return (
    <LineChart
      xAxis={[{ data: [0,1, 2, 3, 5, 8, 10, 40] }]}
      series={[
        {
          data: [0,2, 5.5, 2, 8.5, 1.5, 5, 3],
          area: true,
        },
      ]}
    />
  );
}

function App() {
  const [view, setView] = useState("linechart");

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  return (
    <div className="App">
      <main>
        {view === 'dashboard' && <MainDashboard />}
        {view === 'linechart' && <BasicLineChart />}
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