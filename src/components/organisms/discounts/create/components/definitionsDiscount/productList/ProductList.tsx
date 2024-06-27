import styles from "./ProductList.module.scss";
import { Typography, Flex, Checkbox } from "antd";

const { Title } = Typography;

type ProductListProps = {
  lines: {
    id: number;
    name: string;
    products: {
      id: number;
      name: string;
      checked: boolean;
    }[];
  }[];
};
export default function ProductList({ lines }: ProductListProps) {
  return (
    <>
      <Title level={5}>Productos a aplicar</Title>
      <Flex className={styles.products} gap={10} wrap>
        {lines.map((line) => (
          <Flex className={styles.line} vertical key={"line - " + line.id}>
            <Flex justify="space-between">
              {line.name}
              <Checkbox />
            </Flex>
            <Flex justify="space-arround" gap={2} wrap>
              {line.products.map((product) => (
                <label
                  className={styles.product}
                  htmlFor={"line - " + line.id + "product - " + product.id}
                  key={"product - " + product.id}
                >
                  {product.name} <Checkbox id={"line - " + line.id + "product - " + product.id} />
                </label>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
}
