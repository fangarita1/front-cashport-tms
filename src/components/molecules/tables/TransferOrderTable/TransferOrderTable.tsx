import { Button, Checkbox, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";

import "./transferOrderTable.scss";
import { Radioactive } from "@phosphor-icons/react";
import { Eye, Warning } from "phosphor-react";
import Link from "next/link";
import { ITransferRequest } from "@/types/transferRequest/ITransferRequest";
import { FC } from "react";
import dayjs from "dayjs";
import { calculateMinutesDifference } from "@/utils/logistics/calculateMinutesDifference";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

const { Text } = Typography;

interface DataType {
  key: number;
  tr: string;
  validator: {
    ismaterialsproblem: boolean;
    ispeopleproblem: boolean;
    tr: string;
  };
  origendestino: {
    origin: string;
    destination: string;
  };
  fechas: {
    origin: string;
    destination: string;
  };
  tipodeviaje: string;
  // vehiculos: {
  //   origin: string;
  //   destination: string;
  // };
  // conductor: {
  //   origin: string;
  //   destination: string;
  // };
  tiempodeviaje: string;
  valor: string;
}

const columns = (showColumn: boolean, redirect?: string): TableColumnsType<DataType> => {
  const timeToTrip = showColumn
    ? {
        title: "Tiempo de viaje",
        dataIndex: "tiempodeviaje",
        render: (text: string) => (
          <Text className="row-text">{calculateMinutesDifference(text)} min</Text>
        ),
        sorter: {
          multiple: 1
        }
      }
    : {};
  return [
    {
      title: "TR",
      dataIndex: "tr",
      render: (text: string) => <Text className="row-text id">{text}</Text>
    },
    {
      title: "Origen y destino",
      dataIndex: "origendestino",
      render: (text: { origin: string; destination: string }) => (
        <div className="titleContainer">
          <div className="textContainer">
            <Text className="title">Origen</Text>
            <Text className="title">Destino</Text>
          </div>
          <div className="textContainer">
            <Text className="row-text">{text.origin}</Text>
            <Text className="row-text">{text.destination}</Text>
          </div>
        </div>
      ),
      sorter: {
        multiple: 1
      }
    },
    {
      title: "Fechas",
      dataIndex: "fechas",
      render: (text: { origin: string; destination: string }) => (
        <div className="textContainer">
          <Text className="row-text">{text.origin}</Text>
          <Text className="row-text">{text.destination}</Text>
        </div>
      ),
      sorter: {
        multiple: 1
      }
    },
    {
      title: "Tipo de viaje",
      dataIndex: "tipodeviaje",
      render: (text: string) => <Text className="row-text">{text}</Text>,
      sorter: {
        multiple: 1
      }
    },
    // {
    //   title: 'Vehículo(s)',
    //   dataIndex: 'vehiculos',
    //   render: (text: { origin: string, destination: string }) => (
    //     <div className='textContainer'>
    //       <Text className='row-text'>{text.origin}</Text>
    //       <Text className='row-text'>{text.destination}</Text>
    //     </div>
    //   ),
    //   sorter: {
    //     multiple: 1,
    //   },
    // },
    // {
    //   title: 'Conductor',
    //   dataIndex: 'conductor',
    //   render: (text: { origin: string, destination: string }) => (
    //     <div className='textContainer'>
    //       <Text className='row-text'>{text.origin}</Text>
    //       <Text className='row-text'>{text.destination}</Text>
    //     </div>
    //   ),
    //   sorter: {
    //     multiple: 1,
    //   },
    //   width: '12%',
    // },
    timeToTrip,
    {
      title: "Valor",
      dataIndex: "valor",
      render: (text: string) => <Text className="row-text value">{text}</Text>,
      sorter: {
        multiple: 1
      }
    },
    {
      title: "",
      dataIndex: "validator",
      render: (text: { tr: string; ismaterialsproblem: boolean; ispeopleproblem: boolean }) => (
        <div className="btnContainer">
          {!!text.ismaterialsproblem && (
            <Button className="btn" type="text" size="middle" icon={<Radioactive size={24} />} />
          )}
          {!!text.ismaterialsproblem && (
            <Button className="btn" type="text" size="middle" icon={<Warning size={24} />} />
          )}
          <Link href={`${redirect ? redirect : "/logistics/transfer-orders/details"}/${text.tr}`}>
            <Button className="btn" type="text" size="middle" icon={<Eye size={24} />} />
          </Link>
        </div>
      )
    }
  ];
};

interface ITransferOrdersTable {
  items: ITransferRequest[];
  showColumn?: boolean;
  aditionalRow?: any;
  redirect?: string;
}

export const TransferOrdersTable: FC<ITransferOrdersTable> = ({
  items,
  showColumn = true,
  aditionalRow,
  redirect
}) => {
  let data: DataType[] = [];
  if (items) {
    data = items.map((item, index) => {
      return {
        key: index,
        tr: String(item.id),
        origendestino: {
          origin: item.start_location,
          destination: item.end_location
        },
        fechas: {
          origin: `${dayjs.utc(item.start_date).format('DD/MM/YY - HH:mm')} h`,
          destination: `${dayjs.utc(item.end_date).format('DD/MM/YY - HH:mm')} h`
        },
        tipodeviaje: item.type,
        // vehiculos: {
        //   origin: 'Cama baja',
        //   destination: 'HDG-465',
        // },
        // conductor: {
        //   origin: 'Carlos Galeano',
        //   destination: '318 645 2849'
        // },
        tiempodeviaje: String(item.created_at),
        valor: "$0.000.000",
        validator: {
          ismaterialsproblem: item.is_materials_problem,
          ispeopleproblem: item.is_people_problem,
          tr: String(item.id)
        }
      };
    });
  }
  const columnsShow = columns(showColumn, redirect);
  if (aditionalRow) {
    columnsShow.unshift(aditionalRow);
  }

  return (
    <Table
      rowSelection={
        !aditionalRow
          ? {
              type: "checkbox"
            }
          : undefined
      }
      columns={columnsShow}
      dataSource={data}
      pagination={false}
    />
  );
};
