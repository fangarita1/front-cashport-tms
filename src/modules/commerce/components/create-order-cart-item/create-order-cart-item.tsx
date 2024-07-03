import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import { OrderViewContext } from "../../containers/create-order/create-order";
import { formatMoney } from "@/utils/utils";

import { Minus, Plus, Trash } from "phosphor-react";

import styles from "./create-order-cart-item.module.scss";
import { Button } from "antd";
export interface CreateOrderItemProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number | undefined;
    image: string;
  };
  finishedOrder?: boolean;
}

const CreateOrderItem: FC<CreateOrderItemProps> = ({ product, finishedOrder }) => {
  const { selectedProducts, setSelectedProducts } = useContext(OrderViewContext);

  const alreadySelectedProduct = selectedProducts.find(
    (p) => p.id === product.id && p.quantity > 0
  );

  const handleDecrementQuantity = useCallback(
    (productId: number) => {
      const productIndex = selectedProducts.findIndex((product) => product.id === productId);

      if (productIndex !== -1) {
        const updatedSelectedProducts = [...selectedProducts];
        const updatedProduct = {
          ...selectedProducts[productIndex],
          quantity: selectedProducts[productIndex].quantity - 1
        };

        if (updatedProduct.quantity === 0) {
          updatedSelectedProducts.splice(productIndex, 1);
        } else {
          updatedSelectedProducts[productIndex] = updatedProduct;
        }

        setSelectedProducts(updatedSelectedProducts);
      }
    },
    [selectedProducts, setSelectedProducts]
  );

  const handleIncrementQuantity = useCallback(
    (productId: number) => {
      const productIndex = selectedProducts.findIndex((product) => product.id === productId);

      if (productIndex !== -1) {
        const updatedSelectedProducts = [...selectedProducts];
        const updatedProduct = {
          ...selectedProducts[productIndex],
          quantity: selectedProducts[productIndex].quantity + 1
        };

        updatedSelectedProducts[productIndex] = updatedProduct;

        setSelectedProducts(updatedSelectedProducts);
      }
    },
    [selectedProducts, setSelectedProducts]
  );

  const handleChangeQuantity = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, productId: number) => {
      const newQuantity = parseInt(event.target.value);

      if (isNaN(newQuantity) || newQuantity <= 0) {
        return;
      }

      const updatedProducts = selectedProducts.map((p) =>
        p.id === productId ? { ...p, quantity: newQuantity } : p
      );
      setSelectedProducts(updatedProducts);
    },
    [selectedProducts, setSelectedProducts]
  );

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

      {finishedOrder ? (
        <p className={styles.finalQuantity}>{alreadySelectedProduct?.quantity} Uds</p>
      ) : (
        <div className={styles.quantityFooter}>
          <Button
            className={styles.buttonChangeQuantity}
            onClick={() => handleDecrementQuantity(product.id)}
          >
            {alreadySelectedProduct?.quantity === 1 ? <Trash size={14} /> : <Minus size={14} />}
          </Button>
          <input
            type="number"
            className={styles.quantityInput}
            value={alreadySelectedProduct?.quantity}
            onChange={(e) => handleChangeQuantity(e, product.id)}
          />
          <Button
            className={styles.buttonChangeQuantity}
            onClick={() => handleIncrementQuantity(product.id)}
          >
            <Plus size={14} />
          </Button>
        </div>
      )}
    </div>
  );
};

export default CreateOrderItem;
