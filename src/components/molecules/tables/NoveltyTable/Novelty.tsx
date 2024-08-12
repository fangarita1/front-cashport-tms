import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";

import "./novelty.scss";
import { Eye } from "phosphor-react";

const { Text } = Typography;

interface DataType {
  key: React.Key;
  id: string;
  noveltyType: string;
  observation: string;
  support: string;
  value: string;
  state: string;
}

const getBgColor = (state: string) => {
  switch (state) {
    case 'Pendiente':
      return '#969696'
    case 'Aceptada':
      return '#E0F07E'
    case 'Rechazada':
      return '#ED161E'
    default:
      return '#969696'
  }
}

const getColor = (state: string) => {
  switch (state) {
    case 'Pendiente':
      return '#FFFFFF'
    case 'Aceptada':
      return '#141414'
    case 'Rechazada':
      return '#FFFFFF'
    default:
      return '#FFFFFF'
  }
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    render: (text: string) => <Text className='row-text id'>{text}</Text>,
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Tipo de novedad',
    dataIndex: 'noveltyType',
    render: (text: string) => <Text className='row-text'>{text}</Text>,
  },
  {
    title: 'Observaciones',
    dataIndex: 'observation',
    render: (text: string) => <Text className='row-text'>{text}</Text>,
  },
  {
    title: 'Soportes',
    dataIndex: 'support',
    render: (text: string) => <Text className='row-text id'>{text}</Text>,
  },
  {
    title: 'Valor',
    dataIndex: 'value',
    render: (text: string) => <Text className='row-text'>{text}</Text>,
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Status',
    dataIndex: 'state',
    render: (text: string) => (
      <div className='stateContainer'>
        <div style={{ backgroundColor: getBgColor(text) }} className='stateContent'>
          <Text style={{ color: getColor(text) }} className='text'>{text}</Text>
        </div>
      </div>
    ),
  },
  {
    title: '',
    dataIndex: '',
    render: (text: string) => (
      <div className='btnContainer'>
        <Button
          className="btn"
          type="text"
          size="middle"
          icon={<Eye size={24} />}
        />
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    id: '0000000',
    noveltyType: 'Kilometros adicionales',
    observation: 'Descripción de na novedad',
    support: 'Ver soportes',
    value: '$0.000',
    state: 'Pendiente',
  },
  {
    key: '2',
    id: '0000000',
    noveltyType: 'Stand By',
    observation: 'Descripción de na novedad',
    support: 'Ver soportes',
    value: '$0.000',
    state: 'Aceptada',
  },
  {
    key: '3',
    id: '0000000',
    noveltyType: 'Doble conductor',
    observation: 'Descripción de na novedad',
    support: 'Ver soportes',
    value: '$0.000',
    state: 'Rechazada',
  },
];

export const NoveltyTable = () => {
  return <Table
    columns={columns}
    dataSource={data}
  />
};