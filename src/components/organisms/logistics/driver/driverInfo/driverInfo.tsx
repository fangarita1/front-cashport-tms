import { Flex, Typography, message, Row, Col, Tabs, TabsProps, Spin } from "antd";
import React, { useEffect, useState } from "react";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { useRouter } from "next/navigation";
import "../../../../../styles/_variables_logistics.css";
import "./driverInfo.scss";
import { DriverInfoForm } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { getDriverById } from "@/services/logistics/drivers";
import { IDriver } from "@/types/logistics/schema";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";
import { DriverTable } from "@/components/molecules/tables/logistics/driverTable/driverTable";
import { VehicleTable } from "@/components/molecules/tables/logistics/vehicleTable/vehicleTable";

interface Props {
  idParam: string;
  statusForm: string;
}

const { Title } = Typography;

export const DriverInfoView = ({ idParam = ""}: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [value, setValue] = useState('3');
  const [renderAllInfo, setRenderInfo] = useState(false);

  const onChange = (key: string) => {
    setValue(key);
    setRenderInfo(true)
  };
  const datasource: IDriver[] = [];

  const retry = () => {
    setLoading(true)
    setError('')
  }
  const loadDriver = async () => {
    const result = await getDriverById(idParam);
    const listDrivers: any[] | ((prevState: IDriver[]) => IDriver[]) = [];
    result.data.data.forEach((item, index) => {
      listDrivers.push(item);
    });
    return listDrivers;
  };

  useEffect(() => {
    loadDriver().then(result => {
      setLoading(false)
      setDrivers(result);
    } ).catch(error => setError(error));
  }, [error])

  drivers.forEach((element) => {
    if (element.active.data[0] === 1) {
      element.status = true;
    } else {
      element.status = false;
    }
    datasource.push(element);
  });

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "General",
      children: (
        <>
        </>
      )
    },
    {
      key: "2",
      label: "Vehiculo",
      children: (
        <>
        </>
      )
    },
    {
      key: "3",
      label: "Conductor",
      children: (
        <>
        </>
      )
    }
  ];

  if(loading){
    return (<Flex style={{ height: "30%" }} align="center" justify="center">
    <Spin size="large" />
  </Flex>)
  } else {
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
              <Flex align="center" justify="space-between">
                <NavRightSection />
              </Flex>
            </Flex>
            {/* ------------Main Info Order-------------- */}
            <Flex className="orderContainer">
              <Row style={{ width: "100%" }}>
                <Col span={24}>
                <Tabs defaultActiveKey={value} items={items} onChange={onChange} >
                </Tabs>
                </Col>
                <DriverInfoForm data={datasource} statusForm={"review"}></DriverInfoForm>
              </Row>
            </Flex>
          </Flex>
        </main>
      </>
    );
  }
};
