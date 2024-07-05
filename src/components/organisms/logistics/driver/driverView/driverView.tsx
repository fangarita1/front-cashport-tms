import {
  Flex,
  Typography,
  message,
  Row,
  Col,
  Table,
  AutoComplete,
  Input
} from "antd";
import React, { useRef, useEffect, useState, useContext } from "react";
import Tabs2 from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

import { IDriver, IListData, ILocation } from "@/types/logistics/schema";

//locations
import { getAllLocations } from "@/services/logistics/locations";

import { useRouter } from "next/navigation";


import "../../../../../styles/_variables_logistics.css";

import "./driverView.scss";
import { VehicleTable } from "@/components/molecules/tables/logistics/vehicleTable/vehicleTable";
import { DriverTable } from "@/components/molecules/tables/logistics/driverTable/driverTable";
import { getAllDrivers } from "@/services/logistics/drivers";

const { Title } = Typography;

export const DriverView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [driversOptions, setDriversOptions] = useState<any>([]);
  const [value, setValue] = useState(2);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const loadDrivers = async () => {
    console.log('hace cosas')
    const result = await getAllDrivers();
    console.log(result)
    if (result.data.data.length > 0) {

      const listDrivers: any[] | ((prevState: IDriver[]) => IDriver[]) = [];
      const listDriversOptions: { label: any; value: any }[] = [];

      result.data.data.forEach((item, index) => {
        listDrivers.push(item);
        listDriversOptions.push({ label: item.description, value: item.id });
      });

      setDrivers(listDrivers);
      setDriversOptions(listDriversOptions);

      console.log(listDrivers);
      console.log(listDriversOptions);
    }
  };

  loadDrivers();

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
                <Tabs2
                  className="tabs"
                  value={value}
                  onChange={handleChange}
                  role="navigation"
                >
                  <Tab className={"tab"} value={0} label="General" href="/logistics/providers/all" />
                  <Tab className={"tab"} value={1} label="Vehiculo" href="/logistics/vehicles/all" />
                  <Tab className={"tab"} value={2} label="Conductor" href="/logistics/drivers/all" />
                </Tabs2>
              </Col>
              <DriverTable ></DriverTable>
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
