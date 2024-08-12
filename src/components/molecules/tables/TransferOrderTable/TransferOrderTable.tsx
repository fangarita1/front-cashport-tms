import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";

import "./transferOrderTable.scss";
import { Radioactive } from "@phosphor-icons/react";
import { Eye, Warning } from "phosphor-react";
import Link from "next/link";

const { Text } = Typography;

interface DataType {
  key: React.Key;
  tr: string;
  origendestino: {
    origin: string;
    destination: string;
  }
  fechas: {
    origin: string;
    destination: string;
  };
  tipodeviaje: string;
  vehiculos: {
    origin: string;
    destination: string;
  };
  conductor: {
    origin: string;
    destination: string;
  };
  tiempodeviaje: string;
  valor: string;
}

const columns: TableColumnsType<DataType> = [
  {
    title: 'TR',
    dataIndex: 'tr',
    render: (text: string) => <Text className='row-text id'>{text}</Text>,
    width: '8%'
  },
  {
    title: 'Origen y destino',
    dataIndex: 'origendestino',
    render: (text: { origin: string, destination: string }) => (
      <div className='titleContainer'>
        <div className='textContainer'>
          <Text className='title'>Origen</Text>
          <Text className='title'>Destino</Text>
        </div>
        <div className='textContainer'>
          <Text className='row-text'>{text.origin}</Text>
          <Text className='row-text'>{text.destination}</Text>
        </div>
      </div>
    ),
    sorter: {
      multiple: 1,
    },
    width: '26%'
  },
  {
    title: 'Fechas',
    dataIndex: 'fechas',
    render: (text: { origin: string, destination: string }) => (
      <div className='textContainer'>
        <Text className='row-text'>{text.origin}</Text>
        <Text className='row-text'>{text.destination}</Text>
      </div>
    ),
    sorter: {
      multiple: 1,
    },
    width: '12%'
  },
  {
    title: 'Tipo de viaje',
    dataIndex: 'tipodeviaje',
    render: (text: string) => <Text className='row-text'>{text}</Text>,
    sorter: {
      multiple: 1,
    },
    width: '8%',
  },
  {
    title: 'Vehículo(s)',
    dataIndex: 'vehiculos',
    render: (text: { origin: string, destination: string }) => (
      <div className='textContainer'>
        <Text className='row-text'>{text.origin}</Text>
        <Text className='row-text'>{text.destination}</Text>
      </div>
    ),
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Conductor',
    dataIndex: 'conductor',
    render: (text: { origin: string, destination: string }) => (
      <div className='textContainer'>
        <Text className='row-text'>{text.origin}</Text>
        <Text className='row-text'>{text.destination}</Text>
      </div>
    ),
    sorter: {
      multiple: 1,
    },
    width: '12%',
  },
  {
    title: 'Tiempo de viaje',
    dataIndex: 'tiempodeviaje',
    render: (text: string) => <Text className='row-text'>{text}</Text>,
    sorter: {
      multiple: 1,
    },
  },
  {
    title: 'Valor',
    dataIndex: 'valor',
    render: (text: string) => <Text className='row-text value'>{text}</Text>,
    sorter: {
      multiple: 1,
    },
    width: '10%'
  },
  {
    title: '',
    dataIndex: 'tr',
    render: (text: string) => (
      <div className='btnContainer'>
        <Button
          className="btn"
          type="text"
          size="middle"
          icon={<Radioactive size={24} />}
        />
        <Button
          className="btn"
          type="text"
          size="middle"
          icon={<Warning size={24} />}
        />
        <Link href={`/logistics/transfer-orders/details/${text}`}>
          <Button
            className="btn"
            type="text"
            size="middle"
            icon={<Eye size={24} />}
          />
        </Link>
      </div>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    tr: '0000000',
    origendestino: {
      origin: 'Centro empresarial Dorado plaza',
      destination: 'Centro empresarial Dorado plaza',
    },
    fechas: {
      origin: '22/12/24 - 07:00 h',
      destination: '22/12/24 - 07:00 h'
    },
    tipodeviaje: 'Izaje',
    vehiculos: {
      origin: 'Cama baja',
      destination: 'HDG-465',
    },
    conductor: {
      origin: 'Carlos Galeano',
      destination: '318 645 2849'
    },
    tiempodeviaje: '30 min',
    valor: '$0.000.000',
  },
  {
    key: '2',
    tr: '0000000',
    origendestino: {
      origin: 'Centro empresarial Dorado plaza',
      destination: 'Centro empresarial Dorado plaza',
    },
    fechas: {
      origin: '22/12/24 - 07:00 h',
      destination: '22/12/24 - 07:00 h'
    },
    tipodeviaje: 'Izaje',
    vehiculos: {
      origin: 'Cama baja',
      destination: 'HDG-465',
    },
    conductor: {
      origin: 'Carlos Galeano',
      destination: '318 645 2849'
    },
    tiempodeviaje: '30 min',
    valor: '$0.000.000',
  },
];

// rowSelection object indicates the need for row selection
// const rowSelection = {
//   onChange: (selectedRowKeys: React.Key[], selectedRows: DataType[]) => {
//     console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
//   },
//   getCheckboxProps: (record: DataType) => ({
//     disabled: record.name === 'Disabled User', // Column configuration not to be checked
//     name: record.name,
//   }),
// };

export const TransferOrdersTable = () => {
  return <Table
    rowSelection={{
      type: 'checkbox',
    }}
    columns={columns}
    dataSource={data}
  />
};