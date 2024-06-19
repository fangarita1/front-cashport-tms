import { Checkbox, Col, Flex, Radio, RadioChangeEvent, Row, Typography } from "antd";
import styles from "./FeatByOrder.module.scss";
import { lineDummy, rangesDummy } from "./dataDummy";
import { useMemo, useState } from "react";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Plus } from "phosphor-react";
import RangesRow from "../../rangesRow/RangesRow";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { useForm } from "react-hook-form";
import ProductList from "../../productList/ProductList";

const { Text, Title } = Typography;

type FeatByOrderProps = {
  discountType: number;
};

const types = [3, 4];

export default function FeatByOrder({ discountType }: FeatByOrderProps) {
  const { control } = useForm();
  const [value, setValue] = useState(1);

  const onChange = (e: RadioChangeEvent) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  const principalStyle = useMemo(() => {
    if (types.includes(discountType)) return styles.principalContainer;
    else return "";
  }, [discountType]);

  return (
    <Flex className={principalStyle} vertical gap={20}>
      {types.includes(discountType) && (
        <>
          <Title style={{ marginBottom: 0 }} level={5}>
            Cantidad mínima de orden
          </Title>
          <InputForm
            control={control}
            nameInput="minOrder"
            error={undefined}
            placeholder="0"
            className={styles.input}
          />
        </>
      )}
      <ProductList lines={lineDummy}></ProductList>
      <Radio.Group onChange={onChange} value={value} className={styles.radioGroup}>
        <Radio value={3}>Descuento aplicable en porcentaje</Radio>
        <Radio value={4}>Descuento aplicable en valor fijo</Radio>
      </Radio.Group>
      <Flex className={styles.rangesContainer} vertical>
        <Flex className={styles.rangesSubContainer} gap={10} vertical>
          <Row>
            <Col span={8}>Monto mínimo</Col>
            <Col span={8}>Monto máximo</Col>
            <Col span={8}>Descuento a aplicar</Col>
          </Row>
          <hr />
          {rangesDummy.map((range) => (
            <RangesRow
              unitsMin={range.unitsMin}
              unitsMax={range.unitsMax}
              discount={range.discount}
              key={"range - " + range.id}
              id={range.id}
            />
          ))}
        </Flex>
        <Flex className={styles.rangesContainer} justify="flex-end">
          <PrincipalButton className={styles.button} icon={<Plus />} iconPosition="end">
            Agregar rango
          </PrincipalButton>
        </Flex>
      </Flex>
    </Flex>
  );
}
