import styles from "./FeatByClient.module.scss";
import { Flex, Radio, RadioChangeEvent, Typography } from "antd";
import { lineDummy } from "../featByOrder/dataDummy";
import { useState } from "react";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { useForm } from "react-hook-form";
import ProductList from "../../productList/ProductList";
import GroupClients from "../../groupClients/GroupClients";

const { Title } = Typography;

const clientDummy = [
    {
      id: 1,
      name: "Grupo 1",
    },
    {
      id: 2,
      name: "Grupo 2",
    },
    {
      id: 3,
      name: "Grupo 3",
    },
    {
      id: 4,
      name: "Grupo 4",
    },
  ];

export default function FeatByCient() {
  const { control } = useForm();
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Flex className={styles.principalContainer} vertical gap={20}>
      <Title level={5}>Descuento aplicable</Title>
      <Radio.Group onChange={onChange} value={value} className={styles.radioGroup}>
        <Radio value={3}>Descuento aplicable en porcentaje</Radio>
        <Radio value={4}>Descuento aplicable en valor fijo</Radio>
      </Radio.Group>
      <InputForm
        control={control}
        nameInput="minOrder"
        error={undefined}
        placeholder="0"
        className={styles.input}
      />
      <Title level={5}>Selecciona un grupo de clientes</Title>
      <GroupClients clients={clientDummy}></GroupClients>
      <ProductList lines={lineDummy}></ProductList>
    </Flex>
  );
}
