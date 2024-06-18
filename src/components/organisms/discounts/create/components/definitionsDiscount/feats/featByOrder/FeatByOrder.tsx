import { Flex, Typography } from "antd";
import styles from "./FeatByOrder.module.scss";

const { Text, Title } = Typography;
export default function FeatByOrder() {
  return (
    <>
      <Title  level={5}>Productos a aplicar</Title>
      <Flex className={styles.products} gap={10}>
        <Flex className={styles.product}>Producto 1</Flex>
        <Flex className={styles.product}>Producto 2</Flex>
      </Flex>
    </>
  );
}
