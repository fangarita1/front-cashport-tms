import { FC, createContext } from "react";
import styles from "./create-order.module.scss";
import { Button, Flex } from "antd";

import Link from "next/link";

interface ClientDetailsProps {}
export const CreateOrderViewContext = createContext<any>({});

export const CreateOrderView: FC<ClientDetailsProps> = () => {
  const handleCreateOrder = () => {
    console.log("Crear orden");
  };
  return (
    <CreateOrderViewContext.Provider value={""}>
      <div className={styles.ordersView}>
        <h2 className={styles.title}>Crear orden</h2>
        <Flex className={styles.FlexContainer} vertical>
          <h3>Buscar cliente</h3>
          <input type="text" />
        </Flex>
        <Flex>
          <Link href="/comercio">
            <Button>Cancelar</Button>
          </Link>
          <Button onClick={handleCreateOrder}>Crear Orden</Button>
        </Flex>
      </div>
    </CreateOrderViewContext.Provider>
  );
};

export default CreateOrderView;
