import React, { useEffect } from 'react';
import { Button, Form, Input, Select, Row, Col } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';

const URI = "http://localhost:3001/sensores/";

const sensorTypes = [
  { value: 'SCT-013-010', label: '10A - 1V' },
  { value: 'SCT-013-015', label: '15A - 1V' },
  { value: 'SCT-013-020', label: '20A - 1V' },
];

const EditSenConf = ({sensor , setView }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (sensor) {
      form.setFieldsValue({
        nombre: sensor.nombre,
        lugar: sensor.lugar,
        tipo: sensor.tipo,
      });
    }
  }, [sensor, form]);

  const handleBack = () => {
    setView("SenCard");
  };

  const handleOnFinish = (values) => {

    axios.put(`${URI}${sensor.s_id}`, { ...values, s_id: sensor.s_id })
      .then(response => {
        console.log('Sensor actualizado:', response.data);
      })
      .catch(error => {
        console.error('Error al actualizar el sensor:', error);
      });

    setView("SenCard");
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
          <strong>Editar sensor</strong>
        </div>
        <Row gutter={16}>
          <Col span={24}>
            <Form.Item label="Nombre" name="nombre" rules={[{ required: true, message: 'Por favor ingresa el nombre' }]}>
              <Input maxLength={50} placeholder="Ejemplo: Sensor principal" />
            </Form.Item>
            <Form.Item label="Lugar" name="lugar" rules={[{ required: true, message: 'Por favor ingresa el lugar' }]}>
              <Input maxLength={50} placeholder="Ejemplo: Sala, cocina" />
            </Form.Item>
            <Form.Item label="Tipo" name="tipo" rules={[{ required: true, message: 'Selecciona el tipo' }]}>
              <Select options={sensorTypes} placeholder="Selecciona tipo" />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default EditSenConf;