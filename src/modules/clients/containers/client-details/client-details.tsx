import { Button, Flex } from "antd";
import Link from "next/link";

import { CaretLeft } from "phosphor-react";
import { FC } from "react";
import { WalletTab } from "@/components/organisms/Customers/WalletTab/WalletTab";
import UiTab from "@/components/ui/ui-tab";
import Dashboard from "../dashboard/dashboard";

import styles from "./client-details.module.scss";

import { useClientDetails } from "../../hooks/client-details/client-details.hook";

interface ClientDetailsProps {}

export const ClientDetails: FC<ClientDetailsProps> = () => {
  const { portfolioData } = useClientDetails();

  const items = [
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
          <Flex className={styles.stickyHeader} align="center" justify="space-between">
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

          <UiTab tabs={items} sticky />
        </Flex>
      </main>
    </>
  );
};

export default ClientDetails;
