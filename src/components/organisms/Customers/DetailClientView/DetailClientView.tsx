import { Button, Flex, Tabs, TabsProps } from "antd";

import "./detailclientview.scss";
import { CaretLeft } from "phosphor-react";
import { Dispatch, SetStateAction } from "react";

// const { Title } = Typography;

interface IViewClientDetails {
  active: boolean;
  clientId: number | undefined;
  clientName: string | undefined;
  projectId: number | undefined;
}

interface Props {
  setIsViewClientDetails: Dispatch<SetStateAction<IViewClientDetails>>;
  isViewClientDetails: IViewClientDetails;
}
export const DetailClientView = ({
  setIsViewClientDetails,
  isViewClientDetails: client
}: Props) => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <>
          <p>Dashboard</p>
        </>
      )
    },
    {
      key: "2",
      label: "Cartera",
      children: (
        <>
          <p>Cartera</p>
        </>
      )
    }
  ];

  return (
    <>
      <main className="mainDetail">
        <Flex vertical className="containerDetailClient">
          <Flex component={"navbar"} align="center" justify="space-between">
            <Flex className="infoHeader" align="center" justify="center">
              <Button
                type="text"
                size="large"
                onClick={() =>
                  setIsViewClientDetails({
                    active: false,
                    clientId: undefined,
                    clientName: undefined,
                    projectId: undefined
                  })
                }
                className="buttonGoBack"
                icon={<CaretLeft size={"1.6rem"} />}
              >
                {client.clientName}
              </Button>
            </Flex>
          </Flex>
          {/* ------------Main Info Project-------------- */}

          <Flex className="tabsContainer">
            <Tabs
              style={{ width: "100%", height: "100%" }}
              defaultActiveKey="1"
              items={items}
              size="large"
            />
          </Flex>
        </Flex>
      </main>
    </>
  );
};
