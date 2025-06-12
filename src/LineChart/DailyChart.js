import { LineChart } from '@mui/x-charts/LineChart';
import { useEffect, useState } from 'react';
import { MEDICIONES_LAST } from '../api';
import axios from 'axios';
import { InputNumber, Button } from 'antd';

const URI = "http://localhost:3001/sensores/offset";
const UMBRAL_URI = "http://localhost:3001/sensores/update/umbral";

export default function DailyChart({ s_id, tipo, offset_in }) {
  const [xData, setXData] = useState([]);
  const [yData, setYData] = useState([]);
  const [kWh, setKWh] = useState(0);
  const [offsetInput, setOffsetInput] = useState(0);
  const [offset, setOffset] = useState(null);

  // Umbral
  const [umbralInput, setUmbralInput] = useState(0);
  const [umbral, setUmbral] = useState(null);

  useEffect(() => {
    setOffsetInput(offset_in ? offset_in / 1000 : 0);
  }, [offset_in]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Ordenar los datos por hora ascendente para evitar negativos en deltaT
        const response = await axios.get(MEDICIONES_LAST + s_id);
        const rawData = response.data.slice().sort((a, b) => {
          // Soporta hora con segundos: "HH:mm:ss"
          const [ha, ma, sa] = a.hora.split(':');
          const [hb, mb, sb] = b.hora.split(':');
          const da = new Date();
          da.setHours(Number(ha), Number(ma), sa ? Number(sa) : 0, 0);
          const db = new Date();
          db.setHours(Number(hb), Number(mb), sb ? Number(sb) : 0, 0);
          return da - db;
        });
        setXData(
          rawData.map((item) => {
            const [hour, minute, second] = item.hora.split(':');
            const date = new Date();
            date.setHours(
              Number(hour),
              Number(minute),
              second ? Number(second) : 0,
              0
            );
            return date;
          })
        );
        setYData(
          rawData.map((item) => {
            switch (tipo) {
              case 'SCT-013-010':
                return Math.max(item.valor * 0.010 - offset_in / 1000, 0);
              case 'SCT-013-015':
                return Math.max(item.valor * 0.015 - offset_in / 1000, 0);
              case 'SCT-013-020':
                return Math.max(item.valor * 0.020 - offset_in, 0);
              default:
                return Math.max(item.valor - offset_in / 1000, 0);
            }
          })
        );
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [s_id, tipo, offset_in]);

  useEffect(() => {
    let totalKWh = 0;
    const V = 127;
    for (let i = 1; i < xData.length; i++) {
      const deltaT = (xData[i] - xData[i - 1]) / 3600000; // horas
      const avgI = (yData[i] + yData[i - 1]) / 2;
      totalKWh += (avgI * V * deltaT) / 1000;
    }
    setKWh(totalKWh);
  }, [xData, yData]);

  const handleOffset = () => {
    setOffset(offsetInput);
    axios.post(URI, {
      s_id: s_id,
      offset: offsetInput * 1000,
    })
      .then(response => {
        console.log('Offset guardado:', response.data);
      })
      .catch(error => {
        console.error('Error al guardar el offset:', error);
      });
  };

  const handleUmbral = () => {
    let divisor = 1;
    switch (tipo) {
      case 'SCT-013-010':
        divisor = 0.010;
        break;
      case 'SCT-013-015':
        divisor = 0.015;
        break;
      case 'SCT-013-020':
        divisor = 0.020;
        break;
      default:
        divisor = 1;
    }
    setUmbral(Number(((umbralInput / getMaxValue()) * 1000).toFixed(2)));

  
    const response = axios.put(UMBRAL_URI, {
      s_id: s_id,
      umbral: umbral
    });
    response
      .then((res) => {
        console.log('Umbral guardado:', res.data);
      })
      .catch((error) => {
        console.error('Error al guardar el umbral:', error);
      });  
  };

  const getMaxValue = () => {
    switch (tipo) {
      case 'SCT-013-010':
        return 10;
      case 'SCT-013-015':
        return 15;
      case 'SCT-013-020':
        return 20;
      default:
        return 30; // Valor por defecto si no se reconoce el tipo
    }
  };

  return (
    <div>
      <div style={{ textAlign: 'center', marginBottom: 8 }}>
        <strong>Consumo estimado: {kWh.toFixed(3)} kWh</strong>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'flex-start', padding: '0 24px', gap: 24 }}>
        {/* Offset a la izquierda */}
        <div>
          <h3>Offset: {offset_in / 1000}</h3>
          <InputNumber
            value={offsetInput}
            min={0}
            step={0.01}
            precision={2}
            onChange={setOffsetInput}
            style={{ width: 120, marginRight: 8 }}
            placeholder="Ingresa offset"
          />
          <Button type="primary" onClick={handleOffset}>
            Guardar
          </Button>
          {offset !== null && (
            <div style={{ marginTop: 8 }}>
              <strong>Offset actual: {offset}</strong>
            </div>
          )}
        </div>
        {/* Gráfica */}
        <LineChart
          xAxis={[
            {
              data: xData,
              scaleType: 'time',
              valueFormatter: (date) =>
                date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
            },
          ]}
          yAxis={[
            {
              min: 0,
              max: Math.max(...yData, getMaxValue())
            }
          ]}
          series={[
            {
              data: yData,
              area: true,
              label: 'Amperaje',
            },
          ]}
          height={400}
          width={800}
        />
        {/* Umbral a la derecha */}
        <div>
          <h3>Umbral</h3>
            <InputNumber
              value={umbralInput}
              min={0}
              max={getMaxValue()} // Limita el máximo según el tipo de sensor
              step={0.01}
              precision={2}
              onChange={setUmbralInput}
              style={{ width: 120, marginRight: 8 }}
              placeholder="Ingresa umbral"
            />
          <Button type="primary" onClick={handleUmbral}>
            Guardar
          </Button>
          {umbral !== null && (
            <div style={{ marginTop: 8 }}>
              <strong>Umbral calculado: {umbral}</strong>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}