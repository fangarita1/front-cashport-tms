"use client";
import { Col, Flex, Row, Table, TableProps, Typography } from "antd";
import { ICarrierRequestContacts } from "@/types/logistics/schema";
import styles from "./materials.module.scss";

interface PersonsDataProps {
  persons: ICarrierRequestContacts[];
}

const { Text } = Typography;

export default function Persons({ persons }: PersonsDataProps) {

  const columns: TableProps<ICarrierRequestContacts>["columns"] = [
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
      sorter: (a, b) => a.contact_number - b.contact_number,
      showSorterTooltip: false
    },
    {
      title: "PSL",
      dataIndex: "id_psl",
      key: "psl",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.id_psl - b.id_psl,
      showSorterTooltip: false
    },
    {
      title: "CC",
      dataIndex: "id_contact",
      key: "typeid",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.id_contact - b.id_contact,
      showSorterTooltip: false
    }
  ];

  return (
    <Flex style={{ marginTop: "1rem" }} className={styles.wrapper}>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex vertical className={styles.table} style={{ width: "99%", marginTop: "2rem" }}>
            <h3>Personas</h3>
            <Row>
              <Col span={24} style={{ paddingTop: "1rem" }}>
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
