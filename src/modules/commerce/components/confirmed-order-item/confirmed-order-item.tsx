import { FC } from "react";
import Image from "next/image";
import { formatMoney } from "@/utils/utils";

import styles from "./confirmed-order-item.module.scss";
import { Flex } from "antd";

export interface ConfirmedOrderItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number | undefined;
    discount_percentage: number;
    image: string;
    category_id: number;
    quantity: number;
  };
}

const ConfirmedOrderItem: FC<ConfirmedOrderItemProps> = ({ product }) => {
  return (
    <div className={styles.cartItemCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.imageContainer__img}
          src={product.image}
          alt="product image"
          width={100}
          height={100}
        />
      </div>
      <h4 className={styles.name}>{product.name}</h4>

      <div className={styles.price}>
        {product.discount ? (
          <>
            <h5 className={styles.oldPrice}>{formatMoney(product.price)}</h5>
            <Flex gap={4} align="baseline">
              <h5 className={styles.price__amount}>{formatMoney(product.discount)}</h5>
              <p className={styles.discountPercentage}>-%{product.discount_percentage}</p>
            </Flex>
          </>
        ) : (
          <h5 className={styles.price}>{formatMoney(product.price)}</h5>
        )}
      </div>

      <p className={styles.finalQuantity}>{product.quantity} Uds</p>
    </div>
  );
};

export default ConfirmedOrderItem;
