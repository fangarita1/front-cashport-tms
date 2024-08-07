import { FC, use, useEffect, useState } from "react";
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
import { IOrderData } from "@/types/commerce/ICommerce";
import { set } from "react-hook-form";

interface IOrdersByCategory {
  status: string;
  color: string;
  orders: IOrderData[];
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
        const ordersByCategoryData = response.data.reduce(
          (acc: IOrdersByCategory[], order: IOrderData) => {
            const category = acc.find((category) => category.status === order.order_status);
            if (category) {
              category.orders.push(order);
            } else {
              acc.push({
                status: order.order_status,
                color: "#0085FF",
                orders: [order]
              });
            }
            return acc;
          },
          []
        );
        ordersByCategoryData[1].color = "#A9BA43";
        setOrdersByCategory(ordersByCategoryData);
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
