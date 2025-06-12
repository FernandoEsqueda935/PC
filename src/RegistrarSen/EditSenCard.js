import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';

const URL = "http://localhost:3001/sensores/";
const { Meta } = Card;

const SenCard = ({ d_id, setView, setS_id }) => {
  const [dispositivos, setDispositivos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL + d_id);
      if (response.status === 200) {
        console.log("Data fetched successfully:", response.data);
        setDispositivos(response.data);
      } else {
        console.error("Error fetching data:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleClick = ( sensor ) => {
    setS_id(sensor); // <-- Aquí guardas el id del sensor
    setView("EditSenConf");
};

return (
  <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
    {dispositivos.map((dispositivo) => (
      <Card
        key={dispositivo.d_id}
        hoverable
        style={{ maxWidth: 240, padding: 16 }}
        cover={
          <img
            alt="dispositivo"
            src="https://www.okystar.com/wp-content/uploads/2017/08/HLB1a.1oTCrqK1RjSZK9760yypXaI-1-705x705.png"
          />
        }
      >
        <Meta
          title={`Sensor ID: ${dispositivo.s_id}`}
          description="Configuración de sensor."
        />
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={() => handleClick(dispositivo)} // <-- Aquí pasas el id
        >
          Configurar
        </Button>
      </Card>
    ))}
    {dispositivos.length === 0 && (
      <Card style={{ width: 240, textAlign: 'center' }}>
        <Meta description="No hay sensores registrados" />
      </Card>
    )}
  </div>
);
}

export default SenCard;