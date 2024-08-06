import { Dispatch, FC, createContext, useState } from "react";
import SearchClient from "../../components/create-order-search-client/create-order-search-client";
import CreateOrderMarket from "../../components/create-order-market";
import CreateOrderCart from "../../components/create-order-cart";
import styles from "./create-order.module.scss";
import CreateOrderCheckout from "../../components/create-order-checkout";

export interface ISelectedProduct {
  id: number;
  name: string;
  price: number;
  discount: number | undefined;
  discount_percentage: number | undefined;
  quantity: number;
  image: string;
  category_id: number;
}

export interface ISelectedProducts {
  category_id: number;
  category: string;
  products: ISelectedProduct[];
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
  selectedProducts: ISelectedProducts[];
  setSelectedProducts: Dispatch<ISelectedProducts[]>;
  checkingOut: boolean;
  setCheckingOut: Dispatch<boolean>;
}

export const OrderViewContext = createContext<IOrderViewContext>({} as IOrderViewContext);

export const CreateOrderView: FC = () => {
  const [client, setClient] = useState({} as IOrderViewContext["client"]);
  const [selectedProducts, setSelectedProducts] = useState<ISelectedProducts[]>([]);
  const [checkingOut, setCheckingOut] = useState(false);

  return (
    <OrderViewContext.Provider
      value={{
        client,
        setClient,
        selectedProducts,
        setSelectedProducts,
        checkingOut,
        setCheckingOut
      }}
    >
      <div className={styles.ordersView}>
        <h2 className={styles.title}>Crear orden</h2>
        {!client?.name ? (
          <SearchClient />
        ) : (
          <div className={styles.marketView}>
            {checkingOut ? <CreateOrderCheckout /> : <CreateOrderMarket />}
            <CreateOrderCart />
          </div>
        )}
      </div>
    </OrderViewContext.Provider>
  );
};

export default CreateOrderView;
