import { FC, createContext } from "react";
import styles from "./orders-view.module.scss";
import { Button, Flex } from "antd";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";

import Link from "next/link";

interface ClientDetailsProps {}
export const OrdersViewContext = createContext<any>({});

export const OrdersView: FC<ClientDetailsProps> = () => {
  return (
    <OrdersViewContext.Provider value={""}>
      <div className={styles.ordersView}>
        <h2 className={styles.title}>Mis pedidos</h2>
        <Flex className={styles.FlexContainer} vertical>
          <Flex className={styles.header} gap={"10px"}>
            <UiSearchInput
              placeholder="Buscar"
              onChange={(event) => {
                setTimeout(() => {
                  console.log(event.target.value);
                }, 1000);
              }}
            />
            <FilterDiscounts />
            <DotsDropdown />
            <Link href="/comercio/pedido">
              <Button type="primary"> Crear orden</Button>
            </Link>
          </Flex>
        </Flex>
      </div>
    </OrdersViewContext.Provider>
  );
};

export default OrdersView;

const mockLabels = [
  {
    label: "Pedidos en proceso",
    total: 17,
    color: "#0085FF"
  },
  {
    label: "Pedidos procesados",
    total: 17,
    color: "#A9BA43"
  },
  {
    label: "Borrador",
    total: 17,
    color: "#000000"
  },
  {
    label: "Pendientes revisión cartera",
    total: 17,
    color: "#F31B1B"
  }
];
