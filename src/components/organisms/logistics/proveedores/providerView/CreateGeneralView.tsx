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

import { IListData, ILocation } from "@/types/logistics/schema";

//locations
import { getAllLocations } from "@/services/logistics/locations";

import { useRouter } from "next/navigation";


import "../../../../../styles/_variables_logistics.css";

import "./createGeneralView.scss";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";

const { Title } = Typography;

export const CreateGeneralView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [routeInfo, setRouteInfo] = useState([]);
  const [locations, setLocations] = useState<ILocation[]>([]);
  const [locationOptions, setLocationOptions] = useState<any>([]);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  console.log("routeInfo==>", routeInfo);

  useEffect(() => {
    loadLocations();
  });

  const loadLocations = async () => {
    if (locations.length > 0) return;
    const result = await getAllLocations();
    if (result.data.data.length > 0) {
      console.log(result.data.data);

      const listlocations: any[] | ((prevState: ILocation[]) => ILocation[]) = [];
      const listlocationoptions: { label: any; value: any }[] = [];

      result.data.data.forEach((item, index) => {
        listlocations.push(item);
        listlocationoptions.push({ label: item.description, value: item.id });
      });

      setLocations(listlocations);
      setLocationOptions(listlocationoptions);

      console.log(locations);
      console.log(locationOptions);
    }
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
              <CarrierTable></CarrierTable>
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
