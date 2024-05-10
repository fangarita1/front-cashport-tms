import { Button, Flex, Tabs, TabsProps } from "antd";

import "./detailclientview.scss";
import { CaretLeft } from "phosphor-react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { WalletTab } from "@/components/organisms/Customers/WalletTab/WalletTab";
import Link from "next/link";
import { useParams } from "next/navigation";
import { extractSingleParam } from "@/utils/utils";
import { getPortfolioFromClient } from "@/services/portfolios/portfolios";
import { IDataSection } from "@/types/portfolios/portfolios";

export interface IViewClientDetails {
  active: boolean;
  clientName: string | undefined;
}

interface Props {
  setIsViewClientDetails?: Dispatch<SetStateAction<IViewClientDetails>>;
  isViewClientDetails?: IViewClientDetails;
}
export const DetailClientView = ({}: Props) => {
  const [portfolioData, setPortfolioData] = useState<IDataSection | undefined>(undefined);
  const params = useParams();

  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);

  const clientId = clientIdParam ? parseInt(clientIdParam) : undefined;
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;

  useEffect(() => {
    const fetchPortfolioData = async () => {
      if (!portfolioData) {
        const response: IDataSection = await getPortfolioFromClient(projectId, clientId);
        console.log("This is response:  ", response);
        setPortfolioData(response);
      }
    };
    fetchPortfolioData();
  }, [clientId, portfolioData, projectId]);

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
          <WalletTab />
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
              <Link href={`/clientes/all`}>
                <Button
                  type="text"
                  size="large"
                  className="buttonGoBack"
                  icon={<CaretLeft size={"1.6rem"} />}
                >
                  {portfolioData ? portfolioData.data_wallet.client_name : "AAAAA"}
                </Button>
              </Link>
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
