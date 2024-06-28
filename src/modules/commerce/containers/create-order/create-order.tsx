import { Dispatch, FC, createContext, useState } from "react";
import styles from "./create-order.module.scss";

import SearchClient from "../../components/create-order-search-client/create-order-search-client";

interface IOrderViewContext {
  client: any;
  setClient: Dispatch<any>;
}
export const OrderViewContext = createContext<IOrderViewContext>({} as IOrderViewContext);

export const CreateOrderView: FC = () => {
  const [client, setClient] = useState<any>();

  return (
    <OrderViewContext.Provider value={{ client, setClient }}>
      <div className={styles.ordersView}>
        <h2 className={styles.title}>Crear orden</h2>
        {client ? <h4>Cliente seleccionado MarketPlace</h4> : <SearchClient />}
      </div>
    </OrderViewContext.Provider>
  );
};

export default CreateOrderView;
