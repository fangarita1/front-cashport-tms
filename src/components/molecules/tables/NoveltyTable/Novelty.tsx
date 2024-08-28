import { Button, Table, Typography } from "antd";
import type { TableColumnsType } from "antd";

import "./novelty.scss";
import { Eye } from "phosphor-react";
import { INovelty } from "@/types/novelty/INovelty";
import { FC } from "react";
import { formatMoney } from "@/utils/utils";

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
interface INoveltyTableProps {
  novelties: INovelty[];
  openDrawer: () => void;
  handleShowDetails: (id: number) => void;
}

export const NoveltyTable: FC<INoveltyTableProps> = ({ novelties, openDrawer, handleShowDetails }) => {
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
      title: "Soportes",
      dataIndex: "support",
      render: (url: string) => (
        <a href={url} target="_blank" rel="noopener noreferrer">
          Ver soportes
        </a>
      ),
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
      title: "",
      dataIndex: "support",
      render: (url) => (
        <div className="btnContainer">
          <Button
            className="btn"
            type="text"
            size="middle"
            onClick={() => window.open(url, "_blank")}
            icon={<Eye size={24} />}
          />
        </div>
      ),
    },
  ];
  
  return (
    <Table
      columns={columns}
      pagination={false}
      dataSource={novelties.map((novelty) => {
        const firstEvidenceUrl = novelty.evidences.length > 0 ? novelty.evidences[0].url : "#";
        return {
          key: novelty.id,
          id: String(novelty.id),
          noveltyType: novelty.novelty_type,
          observation: novelty.observation,
          support: firstEvidenceUrl,
          value: formatMoney(novelty.value),
          state: novelty.status,
        };
      })}
    />
  );
};