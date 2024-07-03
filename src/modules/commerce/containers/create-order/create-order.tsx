import { Dispatch, FC, createContext, useState } from "react";
import SearchClient from "../../components/create-order-search-client/create-order-search-client";
import CreateOrderMarket from "../../components/create-order-market";
import CreateOrderCart from "../../components/create-order-cart";
import styles from "./create-order.module.scss";

export interface ISelectedProduct {
  id: number;
  name: string;
  price: number;
  discount: number | undefined;
  quantity: number;
  image: string;
}
interface IOrderViewContext {
  client: {
    name: string;
    id: number;
  };
  setClient: Dispatch<{
    name: string;
    id: number;
  }>;
  selectedProducts: ISelectedProduct[];
  setSelectedProducts: Dispatch<ISelectedProduct[]>;
}

export const OrderViewContext = createContext<IOrderViewContext>({} as IOrderViewContext);

export const CreateOrderView: FC = () => {
  const [client, setClient] = useState({} as IOrderViewContext["client"]);
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProduct[]>([]);

  return (
    <OrderViewContext.Provider value={{ client, setClient, selectedProducts, setSelectedProducts }}>
      <div className={styles.ordersView}>
        <h2 className={styles.title}>Crear orden</h2>
        {!client?.name ? (
          <SearchClient />
        ) : (
          <div className={styles.marketView}>
            <CreateOrderMarket />
            <CreateOrderCart />
          </div>
        )}
      </div>
    </OrderViewContext.Provider>
  );
};

export default CreateOrderView;
