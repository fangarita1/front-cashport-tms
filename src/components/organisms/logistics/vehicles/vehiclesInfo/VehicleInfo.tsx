import { Flex, Typography, message, Row, Col, Tabs, Skeleton } from "antd";
import React, { useState } from "react";
// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import "../../../../../styles/_variables_logistics.css";

import "./vehicleInfo.scss";
import { VehicleFormTab } from "@/components/molecules/tabs/logisticsForms/vehicleForm/vehicleFormTab";
import { TabsProps } from "antd/lib";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTableConfig";
import { DriverTable } from "@/components/molecules/tables/logistics/driverTable/driverTable";
import { getVehicleById } from "@/services/logistics/vehicle";
import useSWR from "swr";
import { CarrierFormTab } from "@/components/molecules/tabs/logisticsForms/CarrierForm/carrierFormTab";

const { Title } = Typography;
interface Props {
  isEdit?: boolean;
  idParam: string;
}
export const VehicleInfoView = ({ isEdit = false, idParam = "" }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [value, setValue] = useState("2");

  console.log("VehicleInfoView", isEdit, idParam);

  const fetcher = async ({ id, key }: { id: string; key: string }) => {
    return getVehicleById(id);
  };
  const { data, isLoading } = useSWR({ id: idParam, key: "1" }, fetcher);

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
      children: <></>
    },
    {
      key: "3",
      label: "Conductor",
      children: (
        <>
          <>{<DriverTable></DriverTable>}</>
        </>
      )
    }
  ];

  const onChange = (key: string) => {
    setValue(key);
  };

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
              {!isLoading ? (
              <VehicleFormTab
                statusForm={"edit"}
                messageApi={messageApi}
                data={data?.data}
              ></VehicleFormTab>
              ) : (
                <Skeleton/>
              )}
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
