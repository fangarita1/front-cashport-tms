import { FC, useCallback, useContext } from "react";
import Image from "next/image";
import { OrderViewContext } from "../../containers/create-order/create-order";
import { formatMoney } from "@/utils/utils";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import { Plus } from "phosphor-react";
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
  console.log("selectedPro: ", selectedProducts);

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
            -
          </PrincipalButton>
          <p>{alreadySelectedProduct.quantity}</p>
          <PrincipalButton
            customStyles={{ padding: "0.5rem" }}
            onClick={() => handleIncrementQuantity(product.id)}
          >
            +
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
