import React, { useEffect } from 'react';
import { Card, Button} from 'antd';



const { Meta } = Card;
const DisCard = ( {setView} ) => {
    const handleClick = () => {
      setView("form")
    };

    return (
  <Card
    hoverable
    style={{ width: 240 }}
    cover={<img alt="dispositivo" src="https://docs.sunfounder.com/projects/umsk/en/latest/_images/esp32_wroom_32e.png" />}
  >
    
    <Meta title="Dispositivo" description="Dispositivo por conectar. " />

    <Button type="primary" style={{ marginTop: 16 }} onClick={handleClick}>
        Registrar
    </Button>
  </Card>
)};
export default DisCard;