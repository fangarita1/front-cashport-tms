import { Col, Flex, Row, Tabs, TabsProps, Typography, message } from "antd";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//vars
import { useRouter } from "next/navigation";

import "./createDriver.scss";
import { DriverFormTab } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { addDriver } from "@/services/logistics/drivers";
import { IFormDriver } from "@/types/logistics/schema";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";
import { VehicleTable } from "@/components/molecules/tables/logistics/vehicleTable/vehicleTable";
import { useState } from "react";

const { Title } = Typography;

export const CreateDriverView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const onCreateDriver = async (data: IFormDriver) => {
    try {
      const response = await addDriver(data.general, data.logo, data.files);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El conductor fue creado exitosamente."
        });
        push("/");
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };

  const [value, setValue] = useState("3");

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
            <>{<VehicleTable></VehicleTable>}</>
        </>
      )
    },
    {
      key: "3",
      label: "Conductor",
      children: (
        <>
           <>{<DriverFormTab onSubmitForm={onCreateDriver} statusForm={"create"}></DriverFormTab>}</>
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
              <Tabs defaultActiveKey={value} items={items} onChange={onChange}>
                
              </Tabs>
            </Col>
          </Row>
        </Flex>
      </Flex>
    </main>
  </>
  );
};
