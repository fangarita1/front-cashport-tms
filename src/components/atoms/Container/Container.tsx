import { Flex } from "antd";
import styles from "./Container.module.scss";

interface IContainer {
  children: React.ReactNode;
}

export default function Container({ children }: Readonly<IContainer>) {
  return (
    <Flex vertical className={styles.container}>
      {children}
    </Flex>
  );
}
