import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, Row, Col, Checkbox } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';

const URL = "http://localhost:3001/sensores/";

const sensorTypes = [
  { value: 'SCT-013-010', label: '10A - 1V' },
  { value: 'SCT-013-015', label: '15A - 1V' },
  { value: 'SCT-013-020', label: '20A - 1V' },
];

const RegistrarSenForm = ({ setView, d_id }) => {
  const [form] = Form.useForm();
  const [sensor1Active, setSensor1Active] = useState(true);
  const [sensor2Active, setSensor2Active] = useState(false);

  const handleBack = () => {
    setView("card");
  };

  const handleOnFinish = async (values) => {
    try {
      const sensores = [];
      if (sensor1Active) {
        sensores.push({
          d_id,
          nombre: values.nombre1,
          lugar: values.lugar1,
          tipo: values.tipo1,
        });
      }
      if (sensor2Active) {
        sensores.push({
          d_id,
          nombre: values.nombre2,
          lugar: values.lugar2,
          tipo: values.tipo2,
        });
      }
      if (sensores.length === 0) {
        return; // No registrar nada si no hay sensores seleccionados
      }
      console.log('Sensores a registrar:', sensores);
      for (const sensor of sensores) {
        await axios.post(URL, sensor);
      }
setView("linechart");
      setView("linechart");
    } catch (error) {
      console.error('Error al registrar los sensores:', error);
    }
  };

  return (
    <div style={{ borderRadius: '10px', flexDirection: "column", display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5', padding: '20px' }}>
      <Form
        form={form}
        style={{ minWidth: 400 }}
        layout="vertical"
        onFinish={handleOnFinish}
      >
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', marginBottom: 16 }}>
          <Button type="default" icon={<ArrowLeftOutlined />} onClick={handleBack}>
            Atrás
          </Button>
        </div>
        <div style={{ textAlign: 'center', marginBottom: 16 }}>
          <strong>Registrar sensores para el dispositivo</strong>
        </div>
        <Row gutter={16}>
          <Col span={12}>
            <Checkbox
              checked={sensor1Active}
              onChange={e => setSensor1Active(e.target.checked)}
              style={{ marginBottom: 8 }}
            >
              Registrar Sensor 1
            </Checkbox>
            {sensor1Active && (
              <>
                <Form.Item label="Nombre Sensor 1" name="nombre1" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
                  <Input maxLength={50} placeholder="Ejemplo: Sensor principal" />
                </Form.Item>
                <Form.Item label="Lugar Sensor 1" name="lugar1" rules={[{ required: true, message: 'Por favor ingresa el lugar' }]}>
                  <Input maxLength={50} placeholder="Ejemplo: Sala, cocina" />
                </Form.Item>
                <Form.Item label="Tipo Sensor 1" name="tipo1" rules={[{ required: true, message: 'Selecciona el tipo' }]}>
                  <Select options={sensorTypes} placeholder="Selecciona tipo" />
                </Form.Item>
              </>
            )}
          </Col>
          <Col span={12}>
            <Checkbox
              checked={sensor2Active}
              onChange={e => setSensor2Active(e.target.checked)}
              style={{ marginBottom: 8 }}
            >
              Registrar Sensor 2
            </Checkbox>
            {sensor2Active && (
              <>
                <Form.Item label="Nombre Sensor 2" name="nombre2" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
                  <Input maxLength={50} placeholder="Ejemplo: Sensor secundario" />
                </Form.Item>
                <Form.Item label="Lugar Sensor 2" name="lugar2" rules={[{ required: true, message: 'Por favor ingresa el lugar' }]}>
                  <Input maxLength={50} placeholder="Ejemplo: Patio, baño" />
                </Form.Item>
                <Form.Item label="Tipo Sensor 2" name="tipo2" rules={[{ required: true, message: 'Selecciona el tipo' }]}>
                  <Select options={sensorTypes} placeholder="Selecciona tipo" />
                </Form.Item>
              </>
            )}
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Registrar Sensores
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegistrarSenForm;