import { Checkbox, Flex } from "antd";
import styles from "./GroupClients.module.scss";

type Props = {
  clients: {
    id: number;
    name: string;
  }[];
};
export default function GroupClients({ clients }: Props) {
  return (
    <Flex className={styles.principalContainer} gap={20} wrap justify="space-around">
      {clients.map((client) => (
        <label
          key={"cliente - " + client.id}
          className={styles.groupClients}
          htmlFor={"cliente - " + client.id}
        >
          {client.name}
          <Checkbox id={"cliente - " + client.id} />
        </label>
      ))}
    </Flex>
  );
}
