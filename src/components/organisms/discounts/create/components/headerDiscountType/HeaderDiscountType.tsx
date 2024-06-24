"use client";
import styles from "./HeaderDiscountType.module.scss";
import { Button, Flex, Typography } from "antd";
import { Bag, CalendarBlank, UsersThree } from "phosphor-react";
import { useState } from "react";

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
        <Button
          className={`${styles.buttonIcon} ${selectedType === 1 ? styles.active : ""}`}
          icon={<Bag size={32} />}
          onClick={() => handleClick(1)}
        >
          Por orden
        </Button>
        <Button
          className={`${styles.buttonIcon} ${selectedType === 2 ? styles.active : ""}`}
          icon={<UsersThree size={32} />}
          onClick={() => handleClick(2)}
        >
          Por cliente
        </Button>
        <Button
          className={`${styles.buttonIcon} ${selectedType === 3 ? styles.active : ""}`}
          icon={<CalendarBlank size={32} />}
          onClick={() => handleClick(3)}
        >
          Plan anual
        </Button>
      </Flex>
    </Flex>
  );
}
