"use client";
import styles from "./HeaderDiscountType.module.scss";
import { Button, Flex, Typography } from "antd";
import discountCategories from "../../../constants/discountTypes";

const { Title } = Typography;

type Props = {
  selectedType: number;
  handleClick: (type: number) => void;
};

export default function HeaderDiscountType({ selectedType, handleClick }: Props) {
  return (
    <Flex className={styles.HeaderContainer} justify="space-between" vertical gap={20}>
      <Title level={4}>Selecciona el tipo de descuento</Title>
      <Flex className={styles.buttonContainer} justify="space-around" wrap="wrap" gap={20}>
        {Object.keys(discountCategories).map((key) => (
          <Button
            key={`button-for-${key}`}
            className={`${styles.buttonIcon} ${selectedType === discountCategories[key].id ? styles.active : ""}`}
            icon={discountCategories[key].Icon()}
            onClick={() => handleClick(discountCategories[key].id)}
          >
            {discountCategories[key].name}
          </Button>
        ))}
      </Flex>
    </Flex>
  );
}
