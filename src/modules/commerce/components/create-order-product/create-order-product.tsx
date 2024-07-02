import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import { OrderViewContext } from "../../containers/create-order/create-order";
import { formatMoney } from "@/utils/utils";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import { Minus, Plus } from "phosphor-react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";

import styles from "./create-order-product.module.scss";
export interface CreateOrderProductProps {
  product: {
    id: number;
    name: string;
    price: number;
    discount: number;
    image: string;
  };
}

const CreateOrderProduct: FC<CreateOrderProductProps> = ({ product }) => {
  const { selectedProducts, setSelectedProducts } = useContext(OrderViewContext);

  const alreadySelectedProduct = selectedProducts.find(
    (p) => p.id === product.id && p.quantity > 0
  );

  const handleAddToCart = (product: CreateOrderProductProps["product"]) => {
    const productToAdd = {
      id: product.id,
      name: product.name,
      price: product.price,
      discount: product.discount,
      quantity: 1,
      image: product.image
    };
    setSelectedProducts([...selectedProducts, productToAdd]);
  };

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
    <div className={styles.productCard}>
      <div className={styles.imageContainer}>
        <Image
          className={styles.imageContainer__img}
          src={product.image}
          alt="product image"
          width={100}
          height={100}
        />
      </div>

      <hr className={styles.separator} />
      <h4 className={styles.name}>{product.name}</h4>
      <h5 className={styles.price}>{formatMoney(product.price)}</h5>
      {alreadySelectedProduct ? (
        <div className={styles.quantityFooter}>
          <PrincipalButton
            customStyles={{ padding: "0.5rem" }}
            onClick={() => handleDecrementQuantity(product.id)}
          >
            <Minus size={20} />
          </PrincipalButton>
          <input
            type="number"
            className={styles.quantityInput}
            value={alreadySelectedProduct.quantity}
            onChange={(e) => handleChangeQuantity(e, product.id)}
          />
          <PrincipalButton
            customStyles={{ padding: "0.5rem" }}
            onClick={() => handleIncrementQuantity(product.id)}
          >
            <Plus size={20} />
          </PrincipalButton>
        </div>
      ) : (
        <div className={styles.footer}>
          <SecondaryButton
            customStyles={{ width: "100%" }}
            bordered
            onClick={() => handleAddToCart(product)}
          >
            Agregar <Plus size={20} />
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};

export default CreateOrderProduct;
