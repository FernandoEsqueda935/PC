import DailyChart from "./DailyChart";
import { useEffect, useState } from 'react';
import axios from 'axios';

const URL = "http://localhost:3001/sensores/";

export default function AllCharts({ d_id }) {
  const [view, setView] = useState("linechart");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const sensores = await axios.get(URL + d_id);
        setData(sensores.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, [d_id]);

  return (
    <div>
        {
            d_id ?
            (data.map((sensor) => (
            <div key={sensor.s_id} style={{ marginBottom: '20px' }}>
                <h3>Nombre: {sensor.nombre} - Lugar: {sensor.lugar} </h3>
                <DailyChart s_id={sensor.s_id} tipo = {sensor.tipo} offset_in={sensor.offset} />
            </div>
            )))
            :
            (
                <h1>No hay dispositivo registrado</h1>
            )
        }
    </div>
  );
}