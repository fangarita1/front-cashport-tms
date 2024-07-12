// NuevoComponenteTab.tsx

import { Flex, Typography, message, Row, Col, Tabs } from "antd";
import React, { useState } from "react";
import type { TabsProps } from "antd";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";
import { DriverTable } from "@/components/molecules/tables/logistics/driverTable/driverTable";
import { VehicleTable } from "@/components/molecules/tables/logistics/vehicleTable/vehicleTable";
import { useRouter } from "next/navigation";

import "../../../../../styles/_variables_logistics.css";
import "./nuevoComponenteTab.scss";

const { Title } = Typography;

interface NuevoComponenteTabProps {
  id?: string;
}

export const NuevoComponenteTab = ({ id }: NuevoComponenteTabProps) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState("1");

  const onChange = (key: string) => {
    setValue(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: <CarrierTable />
    },
    {
      key: "2",
      label: "Vehiculo",
      children: <VehicleTable />
    },
    {
      key: "3",
      label: "Conductor",
      children: <DriverTable />
    }
  ];

  return (
    <>
      {contextHolder}
      <main className="mainCreateOrder">
        <SideBar />
        <Flex vertical className="containerCreateOrder">
          <Flex className="infoHeaderOrder">
            <Flex gap={"2rem"}>
              <Title level={2} className="titleName">
                Proveedores
              </Title>
            </Flex>
            <Flex component={"navbar"} align="center" justify="space-between">
              <NavRightSection />
            </Flex>
          </Flex>
          <Flex className="orderContainer">
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <Tabs defaultActiveKey={value} items={items} onChange={onChange} />
              </Col>
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
