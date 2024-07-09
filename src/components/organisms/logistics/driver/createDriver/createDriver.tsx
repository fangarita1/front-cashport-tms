import { Flex, Tabs, TabsProps, Typography, message } from "antd";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//vars
import { useRouter } from "next/navigation";

import "./createDriver.scss";
import { DriverFormTab } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { addDriver } from "@/services/logistics/drivers";
import { IFormDriver } from "@/types/logistics/schema";

const { Title } = Typography;

export const CreateDriverView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  const onCreateDriver = async (data: IFormDriver) => {
    try {
      const response = await addDriver(data.general);
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El proyecto fue creado exitosamente."
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

  return (
    <>
      {contextHolder}
      <main className="mainCreateProject">
        <SideBar />
        <Flex vertical className="containerCreateProject">
          <Flex className="infoHeaderProject">
            <Flex gap={"2rem"}>
              <Title level={2} className="titleName">
                Crear Proyecto
              </Title>
            </Flex>
            <Flex component={"navbar"} align="center" justify="space-between">
              <NavRightSection />
            </Flex>
          </Flex>
          {/* ------------Main Info Project-------------- */}
          <DriverFormTab onSubmitForm={onCreateDriver} statusForm={"create"}></DriverFormTab>
        </Flex>
      </main>
    </>
  );
};
