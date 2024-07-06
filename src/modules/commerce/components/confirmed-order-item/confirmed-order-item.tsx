import { FC } from "react";
import Image from "next/image";
import { formatMoney } from "@/utils/utils";

import styles from "./confirmed-order-item.module.scss";

export interface ConfirmedOrderItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number | undefined;
    percentageDiscount: number;
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

      <h5 className={styles.price}>{formatMoney(product.price)}</h5>

      <p className={styles.finalQuantity}>{product.quantity} Uds</p>
    </div>
  );
};

export default ConfirmedOrderItem;
