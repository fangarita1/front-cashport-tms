import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { Button, Flex, MenuProps } from "antd";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import LabelCollapse from "@/components/ui/label-collapse";
import Collapse from "@/components/ui/collapse";
import OrdersViewTable from "../../components/orders-view-table/orders-view-table";
import { ModalRemove } from "@/components/molecules/modals/ModalRemove/ModalRemove";

import styles from "./orders-view.module.scss";
import { useAppStore } from "@/lib/store/store";
import { getAllOrders } from "@/services/commerce/commerce";
import { IOrder } from "@/types/commerce/ICommerce";

interface IOrdersByCategory {
  status: string;
  color: string;
  count: number;
  orders: IOrder[];
}

export const OrdersView: FC = () => {
  const { ID: projectId } = useAppStore((state) => state.selectedProject);
  const [ordersByCategory, setOrdersByCategory] = useState<IOrdersByCategory[]>();
  const [isOpenModalRemove, setIsOpenModalRemove] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();

  useEffect(() => {
    if (!projectId) return;
    const fetchOrders = async () => {
      const response = await getAllOrders(projectId);
      if (response.status === 200) {
        console.log("data", response.data);

        setOrdersByCategory(response.data);
      }
    };
    fetchOrders();
  }, [projectId]);

  const handleDeleteOrders = () => {
    console.info("Delete orders: ", selectedRows);
    setIsOpenModalRemove(false);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button className="buttonOutlined" onClick={() => setIsOpenModalRemove(true)}>
          Eliminar
        </Button>
      )
    }
  ];

  return (
    <div className={styles.ordersView}>
      <h2 className={styles.title}>Mis pedidos</h2>
      <Flex className={styles.FlexContainer} vertical>
        <Flex className={styles.header}>
          <UiSearchInput
            placeholder="Buscar"
            onChange={(event) => {
              setTimeout(() => {
                console.info(event.target.value);
              }, 1000);
            }}
          />
          <FilterDiscounts />
          <DotsDropdown items={items} />
          <Link href="/comercio/pedido" className={styles.ctaButton}>
            <PrincipalButton>Crear orden</PrincipalButton>
          </Link>
        </Flex>
        <Collapse
          items={ordersByCategory?.map((order) => ({
            key: order.status,
            label: (
              <LabelCollapse
                status={order.status}
                quantity={order.orders.length}
                color={order.color}
                removeIcons
              />
            ),
            children: (
              <OrdersViewTable dataSingleOrder={order.orders} setSelectedRows={setSelectedRows} />
            )
          }))}
        />
      </Flex>
      <ModalRemove
        isMassiveAction={true}
        name="pedidos"
        isOpen={isOpenModalRemove}
        onClose={() => setIsOpenModalRemove(false)}
        onRemove={handleDeleteOrders}
      />
    </div>
  );
};

export default OrdersView;
