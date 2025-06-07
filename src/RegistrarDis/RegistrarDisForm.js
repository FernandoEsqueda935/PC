import React from 'react';
import axios from 'axios';
import { Button, Form, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const URL = "http://localhost:3001/dispositivos/sin-registrar/";

const RegistrarDisForm = ( { setView, d_id }) => {
    
  const handleBack = () => {
      setView("DisCard")
    };

    const handleOnFinish = async (values) => {
        try {
          console.log('Received values:', values);
          const response = await axios.put(URL + d_id, values);
          console.log('Response:', response.data);
        } catch (error) {
          console.error('Error al registrar el dispositivo:', error);
        }

        setView("SenForm");
      };
  return (
    <div style={{ borderRadius: '10px' ,flexDirection: "column",display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>

      <Form
        style={{ minWidth: 400 }}
        onFinish={handleOnFinish}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Button type="default" icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Atrás
          </Button>
        </div>
        <div style={{ flex: 0.8, textAlign: 'center', marginBottom: 16 }}>
            <strong>Registrar dispositivo</strong>
        </div>
        <Form.Item
          label="Nombre"
          name="nombre"
          rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}
        >
          <Input placeholder="Ejemplo: Dispositivo principal" />
        </Form.Item>
        <Form.Item
          label="Lugar"
          name="lugar"
          rules={[{ required: true, message: 'Por favor ingresa el lugar' }]}
        >
          <Input placeholder="Ejemplo: Casa, oficina, patio" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrarDisForm;