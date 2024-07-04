import {
  Flex,
  Typography,
  message,
  Row,
  Col,
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

import "./carrierInfoConfig.scss";
import { CarrierInfoForm } from "@/components/molecules/tabs/logisticsForms/CarrierForm/carrierFormTab";

const { Title } = Typography;

export const CarrierInfoConfigView = () => {
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
                Configuración
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
                  <Tab className={"tab"} value={0} label="Reglas de Negocio" href="/" />
                  <Tab className={"tab"} value={1} label="Materiales" href="/" />
                  <Tab className={"tab"} value={2} label="Usuarios" href="/spam" />
                  <Tab className={"tab"} value={3} label="Proveedores" href="/logistics/configuration" />
                  <Tab className={"tab"} value={4} label="Ubicacion" href="/"  />
                  <Tab className={"tab"} value={5} label="Grupos de Ubicaciones" href="/spam" />
                  <Tab className={"tab"} value={6} label="Rutas de Seguridad" href="/spam" />
                </Tabs2>
              </Col>
              <CarrierInfoForm statusForm={"create"}></CarrierInfoForm>
            </Row>
          </Flex>
        </Flex>
      </main>
    </>
  );
};
