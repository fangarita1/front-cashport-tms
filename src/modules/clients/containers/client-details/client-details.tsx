import { Button, Flex, Tabs, TabsProps } from "antd";

import { CaretLeft } from "phosphor-react";
import { FC } from "react";
import { WalletTab } from "@/components/organisms/Customers/WalletTab/WalletTab";
import Dashboard from "../dashboard/dashboard";
import Link from "next/link";

import styles from "./client-details.module.scss";
import { useClientDetails } from "../../hooks/client-details/client-details.hook";

interface ClientDetailsProps {}

export const ClientDetails: FC<ClientDetailsProps> = () => {
  const { portfolioData } = useClientDetails();

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Dashboard",
      children: (
        <>
          <Dashboard />
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
      <main className={styles.mainDetail}>
        <Flex vertical className={styles.containerDetailClient}>
          <Flex component={"navbar"} align="center" justify="space-between">
            <Flex className={styles.infoHeader} align="center" justify="center">
              <Link href={`/clientes/all`}>
                <Button
                  type="text"
                  size="large"
                  className={styles.buttonGoBack}
                  icon={<CaretLeft size={"1.6rem"} />}
                >
                  {portfolioData ? portfolioData.data_wallet.client_name : "Loading..."}
                </Button>
              </Link>
            </Flex>
          </Flex>

          <Flex className={styles.tabsContainer}>
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

export default ClientDetails;
