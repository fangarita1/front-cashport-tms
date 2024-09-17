"use client";

import { Flex, Row, Col, Tabs, TabsProps } from "antd";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { usePathname, useRouter } from "next/navigation";
import styles from "./configuration.module.scss";
import { SectionTitle } from "@/components/atoms/SectionTitle/SectionTitle";
import { number } from "yup";
import { TMS_COMPONENTS, TMSMODULES } from "@/utils/constants/globalConstants";
import { checkUserComponentPermissions } from "@/utils/utils";
import { useAppStore } from "@/lib/store/store";
import { useEffect } from "react";

interface Props {
  children?: React.ReactNode;
  params: {
    id: string;
  };
}

const viewName: keyof typeof TMSMODULES = "TMS-Configuracion";

const ConfigurationLayout = ({ children, params }: Props) => {
  const router = useRouter();
  const path = usePathname();

  const { selectedProject: project, isHy } = useAppStore((state) => state);

  useEffect(() => {
    if (isHy) {
      const checkFunction = ({ create_permission }: { create_permission: boolean }) =>
        create_permission;
      if (checkUserComponentPermissions(project, viewName, TMSMODULES[viewName], checkFunction)) {
        router.push(`/logistics/configuration`);
      }
    }
  }, [isHy, project]);

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
    if (path.includes("locations") && !path.includes("grouplocations")) {
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
    if (key == "materials") {
      //default tab
      router.push(`/logistics/configuration`);
    } else {
      router.push(`/logistics/configuration/${key}/all`);
    }
  };

  const checkFunction = ({ create_permission }: { create_permission: boolean }) =>
    create_permission;

  const items: any[] = [
    {
      key: "materials",
      label: "Materiales",
      children: <></>,
      hidden: !checkUserComponentPermissions(
        project,
        viewName,
        TMS_COMPONENTS[viewName]["MATERIALS"],
        checkFunction
      )
    },
    {
      key: "users",
      label: "Usuarios",
      children: <></>,
      disabled: false,
      hidden: !checkUserComponentPermissions(
        project,
        viewName,
        TMS_COMPONENTS[viewName]["USERS"],
        checkFunction
      )
    },
    {
      key: "locations",
      label: "Ubicación",
      children: <></>,
      hidden: !checkUserComponentPermissions(
        project,
        viewName,
        TMS_COMPONENTS[viewName]["LOCATIONS"],
        checkFunction
      )
    }
  ];

  return (
    <main className={styles.mainCreateOrder}>
      <SideBar />
      <Flex vertical className={styles.containerCreateOrder}>
        <Flex className={styles.infoHeaderOrder}>
          <SectionTitle title="Configuración" />
          <Flex align="center" justify="space-between">
            <NavRightSection />
          </Flex>
        </Flex>
        {/* ------------Main Info Order-------------- */}
        <Flex className={styles.suppliersTabsContainer}>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Tabs
                defaultActiveKey={getDefaultValue()}
                items={items.filter((x: any) => !x.hidden)}
                onChange={onChange}
              />
            </Col>
            {children}
          </Row>
        </Flex>
      </Flex>
    </main>
  );
};

export default ConfigurationLayout;
