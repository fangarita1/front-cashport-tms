"use client";
import { Button, Col, Flex, Row, Table, TableProps, Typography } from "antd";
import { ProviderDetailMaterials } from "@/types/acept_carrier/acept_carrier";
import { Radioactive, Warning } from "@phosphor-icons/react";
import styles from "./materials.module.scss";

interface MaterialsDataProps {
  materials: ProviderDetailMaterials[];
}

const { Text } = Typography;

export default function Materials({ materials }: MaterialsDataProps) {

  const columns: TableProps<any>["columns"] = [
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "quantity",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.quantity - b.quantity,
      showSorterTooltip: false
    },
    {
      title: "SKU",
      dataIndex: "SKU",
      key: "SKU",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.SKU.localeCompare(b.SKU),
      showSorterTooltip: false
    },
    {
      title: "Nombre",
      key: "name",
      dataIndex: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false
    },
    {
      title: "Volumen",
      key: "volume",
      dataIndex: "volume",
      render: (amount) => <Text>{amount}</Text>,
      sorter: (a, b) => a.volume - b.volume,
      showSorterTooltip: false
    },
    {
      title: "Alto",
      key: "height",
      dataIndex: "height",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.height - b.height,
      showSorterTooltip: false
    },
    {
      title: "Ancho",
      key: "broad",
      dataIndex: "broad",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.broad - b.broad,
      showSorterTooltip: false
    },
    {
      title: "Largo",
      key: "width",
      dataIndex: "width",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.width - b.width,
      showSorterTooltip: false
    },
    {
      title: "Peso",
      key: "weight",
      dataIndex: "weight",
      render: (amount) => <Text>{amount} kg</Text>,
      sorter: (a, b) => a.weight - b.weight,
      showSorterTooltip: false
    },
    {
      title: "",
      key: "buttonSee",
      width: 64,
      dataIndex: "",
      render: (text, record) => (
        <Flex style={{ gap: "6px", justifyContent: "flex-end" }}>
          {record.radioactiveIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Radioactive size={"1.3rem"} />} />
          )}
          {record.dangerIcon && (
            <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Warning size={"1.3rem"} />} />
          )}
        </Flex>
      )
    }
  ];

  return (
    <Flex style={{ marginTop: "1rem" }} className={styles.wrapper}>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex vertical className={styles.table} style={{ width: "99%", marginTop: "2rem" }}>
            <h3>Materiales</h3>
            <Row>
              <Col span={24} style={{ paddingTop: "1rem" }}>
                <Table
                  style={{ width: "100%" }}
                  columns={columns}
                  dataSource={materials.map((data) => ({ ...data, key: data.id }))}
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
