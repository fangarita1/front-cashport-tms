import style from "./AnnualFeatures.module.scss";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { Col, Flex, Row, Select } from "antd";
import { useForm } from "react-hook-form";
import { Plus } from "phosphor-react";

const options = [
  { label: "Skincare", value: 1 },
  { label: "Haircare", value: 2 },
  { label: "Makeup", value: 3 },
  { label: "Fragrance", value: 4 },
  { label: "Shoes", value: 5 },
  { label: "Clothing", value: 6 },
  { label: "Accessories", value: 7 }
];

export default function AnnualFeatures() {
  const { control } = useForm();
  return (
    <Flex className={style.container} vertical gap={10}>
      <Row>
        <Col span={5}>
          <span className={style.columnHeader}>Línea</span>
        </Col>
        <Col span={5} offset={1}>
          <span className={style.columnHeader}>Unidades</span>
        </Col>
        <Col span={7} offset={1}>
          <span className={style.columnHeader}>Rango de descuento</span>
        </Col>
        <Col span={4} offset={1}>
          <span className={style.columnHeader}>Descuento</span>
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <Select
            variant="borderless"
            className={`${style.selectInput}`}
            options={options}
          ></Select>
        </Col>
        <Col span={5} offset={1}>
          <InputForm
            hiddenTitle={true}
            control={control}
            error={undefined}
            nameInput="general.units"
            className={style.input}
          ></InputForm>
        </Col>
        <Col span={7} offset={1} className={style.discountFeatures}>
          <span>De 6 a 10 unidades</span>
        </Col>
        <Col span={4} offset={1} className={style.discountFeatures}>
          <span>20%</span>
        </Col>
      </Row>
      <hr />
      <Row>
        <Col span={5}>
          <span className={style.columnHeader}>Línea</span>
        </Col>
        <Col span={5} offset={1}>
          <span className={style.columnHeader}>Unidades</span>
        </Col>
        <Col span={7} offset={1}>
          <span className={style.columnHeader}>Rango de descuento</span>
        </Col>
        <Col span={4} offset={1}>
          <span className={style.columnHeader}>Descuento</span>
        </Col>
      </Row>
      <Row>
        <Col span={5}>
          <Select
            variant="borderless"
            className={`${style.selectInput}`}
            options={options}
          ></Select>
        </Col>
        <Col span={5} offset={1}>
          <InputForm
            hiddenTitle={true}
            control={control}
            error={undefined}
            nameInput="general.units"
            className={style.input}
          ></InputForm>
        </Col>
        <Col span={7} offset={1} className={style.discountFeatures}>
          <span>De 6 a 10 unidades</span>
        </Col>
        <Col span={4} offset={1} className={style.discountFeatures}>
          <span>20%</span>
        </Col>
      </Row>
      <hr />
      <Flex justify="end">
        <PrincipalButton className={style.button} icon={<Plus/>} iconPosition="end">Agregar descuento</PrincipalButton>
      </Flex>
    </Flex>
  );
}
