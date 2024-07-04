import { FC, useContext, useState } from "react";
import { Flex } from "antd";
import { ISelectType } from "@/types/clients/IClients";
import { OrderViewContext } from "../../containers/create-order/create-order";
import CreateOrderItem from "../create-order-cart-item";
import { BagSimple } from "phosphor-react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import CreateOrderDiscountsModal from "../create-order-discounts-modal";

import styles from "./create-order-cart.module.scss";
export interface selectClientForm {
  client: ISelectType;
}

const CreateOrderCart: FC = ({}) => {
  const [openDiscountsModal, setOpenDiscountsModal] = useState(false);
  const { selectedProducts } = useContext(OrderViewContext);

  const numberOfSelectedProducts = selectedProducts.reduce(
    (acc, category) => acc + category.products.length,
    0
  );

  const handleOpenDiscountsModal = () => {
    console.log("Open discounts modal");
    setOpenDiscountsModal(true);
  };

  return (
    <div className={styles.cartContainer}>
      <div className={styles.cartContainer__top}>
        <Flex className={styles.header} justify="space-between">
          <h3>Resumen de la orden</h3>
          <p>SKUs: {numberOfSelectedProducts}</p>
        </Flex>

        {selectedProducts.length === 0 && (
          <div className={styles.emptyCart}>
            <BagSimple className={styles.bagLogo} size={82} />
            <p>Aún no has agregado productos</p>
            <button
              className={styles.discountsButton}
              data-info="Ver todos los descuentos"
              onClick={handleOpenDiscountsModal}
            ></button>
          </div>
        )}
        <div className={styles.products}>
          {selectedProducts.map((category) => (
            <div key={category.category_id}>
              <Flex className={styles.products__header} justify="space-between">
                <p>{category.category}</p>
                <p>SKUs: {category.products.length}</p>
              </Flex>
              {category.products.map((product) => (
                <CreateOrderItem
                  key={product.id}
                  product={product}
                  categoryName={category.category}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      {selectedProducts.length > 0 && (
        <div className={styles.cartContainer__footer}>
          <button
            className={styles.discountsButton}
            data-info="Ver todos los descuentos"
            onClick={handleOpenDiscountsModal}
          ></button>
          <hr className={styles.separator} />
          <Flex vertical gap={"0.25rem"}>
            <Flex justify="space-between">
              <p>Subtotal</p>
              <p>$XXXXX</p>
            </Flex>
            <Flex justify="space-between">
              <p>IVA 19%</p>
              <p>$XXXXX</p>
            </Flex>
            <Flex justify="space-between">
              <strong>Total</strong>
              <strong>$XXXXX</strong>
            </Flex>
          </Flex>

          <PrincipalButton>Continuar compra</PrincipalButton>
        </div>
      )}

      {openDiscountsModal && (
        <CreateOrderDiscountsModal setOpenDiscountsModal={setOpenDiscountsModal} />
      )}
    </div>
  );
};

export default CreateOrderCart;
