//import { Metadata } from "next";
//import DefaultTableConfigPage from "./page";

//export const metadata: Metadata = {
//  title: "Configuración",
// description: "Configuración"
//};
//export default DefaultTableConfigPage;

//export default function ConfigurationLayout({ children }: { children: React.ReactNode }) {
//  return <>{children}</>;
//}

"use client";

import { Flex, Typography, Row, Col, Tabs, TabsProps } from "antd";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { usePathname, useRouter } from "next/navigation";
import "./configuration.scss";
import "@/styles/_variables_logistics.css";

interface Props {
  children?: React.ReactNode;
  params: {
    id: string;
  };
}

const { Title } = Typography;

const ConfigurationLayout = ({ children, params }: Props) => {
  const router = useRouter();
  const path = usePathname();

  const getDefaultValue = () => {
    if (path.includes("materials")) {
      return "materiasl";
    }
    if (path.includes("users")) {
      return "users";
    }
    if (path.includes("carriers")) {
      return "carriers";
    }
    if (path.includes("locations")) {
      return "locations";
    }
    if (path.includes("grouplocations")) {
      return "grouplocations";
    }
    if (path.includes("secureroutes")) {
      return "secureroutes";
    }
    return "";
  };

  const onChange = (key: string) => {
    if(key == 'materials') //default tab
    {
      router.push(`/logistics/configuration`);
    }else{
      router.push(`/logistics/configuration/${key}/all`);
    }    
  };
  const items: TabsProps["items"] = [
    {
      key: "materials",
      label: "Materiales",
      children: <></>
    },
    {
      key: "users",
      label: "Usuarios",
      children: <></>
    },
    {
      key: "carriers",
      label: "Proveedores",
      children: <></>
    },
    {
      key: "locations",
      label: "Ubicacion",
      children: <></>
    },
    {
      key: "grouplocations",
      label: "Grupos de Ubicaciones",
      children: <></>
    },
    {
      key: "secureroutes",
      label: "Rutas de Seguridad",
      children: <></>
    }
  ];

  return (
    <main className="mainCreateOrder">
      <SideBar />
      <Flex vertical className="containerCreateOrder">
        <Flex className="infoHeaderOrder">
          <Flex gap={"2rem"}>
            <Title level={2} className="titleName">
            Configuración
            </Title>
          </Flex>
          <Flex align="center" justify="space-between">
            <NavRightSection />
          </Flex>
        </Flex>
        {/* ------------Main Info Order-------------- */}
        <Flex className="suppliersTabsContainer">
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Tabs defaultActiveKey={getDefaultValue()} items={items} onChange={onChange}></Tabs>
            </Col>
            {children}
          </Row>
        </Flex>
      </Flex>
    </main>
  );
};

export default ConfigurationLayout;
