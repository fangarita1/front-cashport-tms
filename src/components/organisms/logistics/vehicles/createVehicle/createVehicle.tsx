import { Flex, Typography, message, Row, Col, Tabs, TabsProps } from "antd";
import React, { useRef, useEffect, useState, useContext } from "react";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import { IListData, ILocation } from "@/types/logistics/schema";

import { useRouter } from "next/navigation";

import "../../../../../styles/_variables_logistics.css";

import "./createVehicle.scss";
import { CarrierInfoForm } from "@/components/molecules/tabs/logisticsForms/CarrierForm/carrierFormTab";
import { VehicleFormTab } from "@/components/molecules/tabs/logisticsForms/vehicleForm/vehicleFormTab";
import { DriverFormTab } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";

const { Title } = Typography;

export const CreateVehicleView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [value, setValue] = useState("2");

  const onChange = (key: string) => {
    setValue(key);
    //setRenderInfo(true)
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <>
          <>{<CarrierTable></CarrierTable>}</>
        </>
      )
    },
    {
      key: "2",
      label: "Vehiculo",
      children: (
        <>
          <>{<VehicleFormTab statusForm={"create"}></VehicleFormTab>}</>
        </>
      )
    },
    {
      key: "3",
      label: "Conductor",
      children: (
        <>
          <>{<DriverFormTab statusForm={"review"}></DriverFormTab>}</>
        </>
      )
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
          {/* ------------Main Info Order-------------- */}
          <Flex className="orderContainer">
            <Row style={{ width: "100%" }}>
              <Col span={24}>
                <Tabs defaultActiveKey={value} items={items} onChange={onChange}></Tabs>
              </Col>
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
