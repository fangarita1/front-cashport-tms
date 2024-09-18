import { FC, useState } from "react";
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
import CustomCollapse from "@/components/ui/custom-collapse/CustomCollapse";
import Container from "@/components/atoms/Container/Container";

export const OrdersView: FC = () => {
  const [isOpenModalRemove, setIsOpenModalRemove] = useState<boolean>(false);
  const [selectedRows, setSelectedRows] = useState<any[] | undefined>();

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
    <Container>
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
      <CustomCollapse
        items={mockOrders?.map((order) => ({
          key: order.status_id,
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
      <ModalRemove
        isMassiveAction={true}
        name="pedidos"
        isOpen={isOpenModalRemove}
        onClose={() => setIsOpenModalRemove(false)}
        onRemove={handleDeleteOrders}
      />
    </Container>
  );
};

export default OrdersView;

const mockOrders = [
  {
    status_id: 1,
    status: "En proceso",
    color: "#0085FF",
    orders: [
      {
        id: 12,
        client: "SKINBOOSTER",
        created_at: "30/09/2021",
        city: "Bogotá",
        contact: 3001234567,
        total: 150000,
        early_pay_total: 90000
      },
      {
        id: 34,
        client: "SKINBOOSTER2",
        created_at: "31/09/2021",
        city: "Medellin",
        contact: 3001234567,
        total: 200000,
        early_pay_total: 90000
      }
    ]
  },
  {
    status_id: 2,
    status: "Procesados",
    color: "#A9BA43",
    orders: [
      {
        id: 56,
        client: "SKINBOOSTER",
        created_at: "30/09/2021",
        city: "Barranquilla",
        contact: 3001234567,
        total: 100000,
        early_pay_total: 90000
      },
      {
        id: 78,
        client: "SKINBOOSTER2",
        created_at: "31/09/2021",
        city: "Bogotá",
        contact: 3001234567,
        total: 900000,
        early_pay_total: 90000
      }
    ]
  }
];
