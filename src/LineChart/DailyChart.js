import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { MEDICIONES_LAST } from '../api';
import axios from 'axios';

export default function DailyChart() {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(MEDICIONES_LAST + "1");
        setXData(response.data.map(item => {
          const [hour, minute] = item.hora.split(':');
          const date = new Date();
          date.setHours(Number(hour), Number(minute), 0, 0);
          return date;
        }));
        setYData(response.data.map(item => item.valor));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <LineChart
      xAxis={[
        { 
          data: xData, 
          scaleType: 'time',
          valueFormatter: (date) => date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]}
      series={[
        {
          data: yData,
          area: true,
        },
      ]}
        height={400}
        width={1000}
    />
  );
}