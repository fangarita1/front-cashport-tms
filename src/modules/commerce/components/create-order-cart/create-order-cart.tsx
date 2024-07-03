import { FC, useContext } from "react";
import { Flex } from "antd";
import { ISelectType } from "@/types/clients/IClients";
import { OrderViewContext } from "../../containers/create-order/create-order";

import styles from "./create-order-cart.module.scss";
import CreateOrderItem from "../create-order-cart-item";

export interface selectClientForm {
  client: ISelectType;
}

const CreateOrderCart: FC = ({}) => {
  const { selectedProducts } = useContext(OrderViewContext);

  return (
    <Flex className={styles.cartContainer} vertical gap={"0.5rem"}>
      <h3>Resumen de la orden</h3>
      {selectedProducts.map((product) => (
        <CreateOrderItem key={product.id} product={product} />
      ))}
    </Flex>
  );
};

export default CreateOrderCart;
