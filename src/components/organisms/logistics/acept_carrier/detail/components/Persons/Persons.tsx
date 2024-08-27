"use client";
import { Col, Flex, Row, Table, TableProps, Typography } from "antd";
import { ICarrierRequestContacts } from "@/types/logistics/schema";
import styles from "./persons.module.scss";

interface IContact {
  contact_number: string;
  cost_center_desc: string;
  id: number;
  id_cost_center: number;
  id_psl: number;
  id_user: number;
  name: string;
  psl_desc: string;
}
interface PersonsDataProps {
  persons: IContact[];
}

const { Text } = Typography;

export default function Persons({ persons }: PersonsDataProps) {
  const columns: TableProps<IContact>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false
    },
    {
      title: "Teléfono",
      dataIndex: "contact_number",
      key: "phone",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => Number(a.contact_number) - Number(b.contact_number),
      showSorterTooltip: false
    },
    {
      title: "PSL",
      dataIndex: "psl_desc",
      key: "psl",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.psl_desc.localeCompare(b.psl_desc),
      showSorterTooltip: false
    },
    {
      title: "CC",
      dataIndex: "cost_center_desc",
      key: "typeid",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.cost_center_desc.localeCompare(b.cost_center_desc),
      showSorterTooltip: false
    }
  ];

  return (
    <Flex>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex vertical style={{ width: "100%" }}>
            <p className={styles.title}>Personas</p>
            <Row>
              <Col span={24} style={{ paddingTop: "0.5rem" }}>
                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  dataSource={persons}
                  pagination={false}
                />
                <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
              </Col>
            </Row>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
