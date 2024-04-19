import { Dispatch, SetStateAction } from "react";
import { Button, Checkbox, Flex, Table, TableProps, Typography } from "antd";
import { Eye, Plus } from "phosphor-react";

import "./shiptoprojecttable.scss";

const { Text, Link, Title } = Typography;

interface Props {
  setIsCreateShipTo: Dispatch<SetStateAction<boolean>>;
}

export const ShipToProjectTable = ({ setIsCreateShipTo }: Props) => {
  const columns: TableProps<any>["columns"] = [
    {
      title: "",
      dataIndex: "active",
      key: "active",
      render: () => <Checkbox />,
      width: "30px"
    },
    {
      title: "ID Ship To",
      dataIndex: "id",
      key: "id",
      render: (text) => <Link underline>{text}</Link>
    },
    {
      title: "Ciudad",
      dataIndex: "city",
      key: "city",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Canal",
      key: "channel",
      dataIndex: "channel",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Linea",
      key: "line",
      dataIndex: "line",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Sublinea",
      key: "subline",
      dataIndex: "subline",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Zona",
      key: "zone",
      dataIndex: "zone",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "Hereda parámetros",
      key: "heritage",
      dataIndex: "heritage",
      width: "200px",
      render: (text) => <Text>{text}</Text>
    },
    {
      title: "",
      key: "seeProject",
      width: "40px",
      dataIndex: "",
      render: () => (
        <Button onClick={() => setIsCreateShipTo(true)} icon={<Eye size={"1.3rem"} />} />
      )
    }
  ];
  return (
    <>
      <div className="ShipToProjectTable">
        <Flex justify="space-between" className="ShipToProjectTable__header">
          <Title level={4}>Ship To</Title>
          <Flex gap={"1rem"}>
            <Button
              type="primary"
              className="buttonOutlined"
              size="large"
              icon={<Plus weight="bold" size={15} />}
            >
              Descargar plantilla
            </Button>
            <Button
              type="primary"
              className="buttonOutlined"
              size="large"
              icon={<Plus weight="bold" size={15} />}
            >
              Cargar excel
            </Button>
          </Flex>
        </Flex>
        <Table
          className="ShipToProjectTable__table"
          pagination={false}
          columns={columns}
          dataSource={data}
        />
        <Button
          size="large"
          type="text"
          className="buttonCreateShipTo"
          onClick={() => setIsCreateShipTo(true)}
          icon={<Plus weight="bold" size={15} />}
        >
          Crear Ship To
        </Button>
      </div>
    </>
  );
};

const data = [
  {
    key: "1",
    active: "",
    id: "31223",
    city: "metrallo",
    channel: "Institucional",
    line: "Medicamentos",
    subline: "Analgesicos",
    zone: "Norte",
    heritage: "Si"
  },
  {
    key: "2",
    active: "",
    id: "31223",
    city: "metrallo",
    channel: "Institucional",
    line: "Medicamentos",
    subline: "Analgesicos",
    zone: "Norte",
    heritage: "Si"
  }
];
