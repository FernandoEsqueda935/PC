import React, { useState, useEffect } from 'react';
import './App.css';
import RegistrarDisForm from './RegistrarDis/RegistrarDisForm';
import RegistrarDisCard from './RegistrarDis/RegistrarDisCard';
import MainDashboard from './Dashboard/MainDashboard';
import RegistrarSenForm from './RegistrarSen/RegistrarSenForm';
import SenCard from './RegistrarSen/EditSenCard';
import AllCharts from './LineChart/AllCharts';
import EditSenConf from './RegistrarSen/EditSenConf';
import axios from 'axios';

const URI = "http://localhost:3001/get-info/id";

function App() {
  const [view, setView] = useState("linechart");
  const [d_id, setD_id] = useState(null);
  const [s_id, setS_id] = useState(null);
  const [page, setPage] = useState("dashboard");

  const fetchData = async () => {
    try {
      const response = await axios.get(URI);
      if (response.status === 200) {
        setD_id(response.data.d_id);
        console.log("Data fetched successfully:", response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Ejecuta fetchData al montar y cada vez que cambie page o view
  useEffect(() => {
    fetchData();
  }, [page, view]);

  useEffect(() => {
    localStorage.setItem('view', view);
  }, [view]);

  useEffect(() => {
    switch (page) {
      case "dashboard":
        setView("linechart");
        break;
      case "dispositivos":
        setView("DisCard");
        break;
      case "sensores":
        setView("SenCard");
        break;
      default:
        setView("linechart");
    }
  }, [page]);

  return (
    <div className="App">
      <main className='main'>
        <MainDashboard setPage={setPage}>
          {page === "dashboard" && view === 'linechart' && <AllCharts d_id={d_id} />}
          {page === "dispositivos" && view === 'DisForm' && <RegistrarDisForm setView={setView} d_id={d_id} />}
          {page === "dispositivos" && view === 'DisCard' && <RegistrarDisCard setView={setView} setD_id={setD_id} />}
          {page === "dispositivos" && view === 'SenForm' && <RegistrarSenForm setView={setView} d_id={d_id} />}
          {page === "sensores" && view === 'SenCard' && <SenCard setS_id={setS_id} setView={setView} d_id={d_id} />}
          {page === "sensores" && view === 'EditSenConf' && <EditSenConf setView={setView} sensor={s_id} />}
        </MainDashboard>
      </main>
    </div>
  );
}

export default App;