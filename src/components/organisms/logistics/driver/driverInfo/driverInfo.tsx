"use client";
import { Flex, Typography, message, Row, Col, Tabs, TabsProps, Spin, Button, Result } from "antd";
import React, { useEffect, useState } from "react";
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { useRouter } from "next/navigation";
import "../../../../../styles/_variables_logistics.css";
import "./driverInfo.scss";
import { DriverFormTab } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { getDriverById, updateDriver } from "@/services/logistics/drivers";
import { IDriver, IFormDriver } from "@/types/logistics/schema";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTableConfig";
import { VehicleTable } from "@/components/molecules/tables/logistics/vehicleTable/vehicleTable";
import Link from "next/link";

interface Props {
  isEdit?: boolean;
  params: {
    id: string;
    driverId: string;
  };
}

const { Title, Text } = Typography;

export const DriverInfoView = ({ isEdit = false, params }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const [drivers, setDrivers] = useState<IDriver[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [value, setValue] = useState("3");

  const [isEditProject, setIsEditProject] = useState(isEdit);
  const [isCreateUser, setIsCreateUser] = useState(false);
  const [isViewDetailsUser, setIsViewDetailsUser] = useState({
    active: false,
    id: 0
  });

  const onGoBackTableUsers = () => {
    setIsCreateUser(false);
    setIsViewDetailsUser({
      active: false,
      id: 0
    });
  };

  const onUpdateDriver = async (finalData: IFormDriver) => {
    try {
      const response = await updateDriver(finalData.general);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El proyecto fue editado exitosamente."
        });
      }
      setIsEditProject(false);
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };
  const datasource: IDriver[] = [];
  const loadDriver = async () => {
    const result = await getDriverById(params.driverId);
    const listDrivers: any[] | ((prevState: IDriver[]) => IDriver[]) = [];
    result.data.data.forEach((item, index) => {
      listDrivers.push(item);
    });
    return listDrivers;
  };

  useEffect(() => {
    loadDriver()
      .then((result) => {
        setLoading(false);
        setDrivers(result);
      })
      .catch((error) => setError(error));
  }, [error]);

  drivers.forEach((element) => {
    if (element.active.data[0] === 1) {
      element.status = true;
    } else {
      element.status = false;
    }
    datasource.push(element);
  });

  return (
    <>
      {contextHolder}
      <>
        {datasource.length === 0 ? (
          <Flex vertical>
            <Flex align="center" gap={"2rem"}>
              <Link href={`/logistics/providers/${params.id}/driver`} passHref>
                <Button>Volver</Button>
              </Link>
              <Text>Informacion No encontrada</Text>
            </Flex>
            <Result
              status="404"
              title="404"
              subTitle="Lo siento este conductor no existe"
              extra={
                <Button type="primary" href="/logistics/providers/all">
                  Back Home
                </Button>
              }
            />
          </Flex>
        ) : (
          <DriverFormTab
            onSubmitForm={onUpdateDriver}
            onEditProject={() => setIsEditProject(true)}
            data={datasource}
            statusForm={isEditProject ? "edit" : "review"}
            params={params}
          ></DriverFormTab>
        )}
      </>
    </>
  );
};
