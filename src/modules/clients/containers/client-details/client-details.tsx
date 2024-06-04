import { CaretLeft } from "phosphor-react";
import { FC } from "react";
import { WalletTab } from "@/components/organisms/Customers/WalletTab/WalletTab";

import styles from "./client-details.module.scss";
import Dashboard from "../dashboard";
import InvoiceActionsModal from "../invoice-actions-modal";

import { useClientDetails } from "../../hooks/client-details/client-details.hook";
import { Button, Flex } from "antd";
import UiTab from "@/components/ui/ui-tab";

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
              <a href={`/clientes/all`}>
                <Button
                  type="text"
                  size="large"
                  className={styles.buttonGoBack}
                  icon={<CaretLeft size={"1.6rem"} />}
                >
                  {portfolioData ? portfolioData.data_wallet.client_name : "Loading..."}
                </Button>
              </a>
            </Flex>
          </Flex>

          <UiTab tabs={items} sticky />
        </Flex>
      </main>
      <InvoiceActionsModal />
    </>
  );
};

export default ClientDetails;
