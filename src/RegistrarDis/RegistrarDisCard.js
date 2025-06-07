import React, { useState, useEffect } from 'react';
import { Card, Button } from 'antd';
import axios from 'axios';

const URL = "http://localhost:3001/dispositivos/sin-registrar";
const { Meta } = Card;

const DisCard = ({ setView, setD_id }) => {
  const [dispositivos, setDispositivos] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(URL);
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

  const handleClick = (d_id) => {
  setD_id(d_id);
  setView("DisForm");
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
            src="https://docs.sunfounder.com/projects/umsk/en/latest/_images/esp32_wroom_32e.png"
          />
        }
      >
        <Meta
          title={`Dispositivo ID: ${dispositivo.d_id}`}
          description="Dispositivo por conectar."
        />
        <Button
          type="primary"
          style={{ marginTop: 16 }}
          onClick={() => handleClick(dispositivo.d_id)} // <-- Aquí pasas el id
        >
          Registrar
        </Button>
      </Card>
    ))}
    {dispositivos.length === 0 && (
      <Card style={{ width: 240, textAlign: 'center' }}>
        <Meta description="No hay dispositivos sin registrar" />
      </Card>
    )}
  </div>
);
}

export default DisCard;