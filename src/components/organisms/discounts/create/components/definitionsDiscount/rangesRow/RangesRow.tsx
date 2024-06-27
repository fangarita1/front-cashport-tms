import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { Button, Col, Flex, Row } from "antd";
import { Trash } from "phosphor-react";
import { useForm } from "react-hook-form";

type RangesRowProps = {
  unitsMin: number;
  unitsMax: number;
  discount: number;
  id: number;
};

export default function RangesRow({ unitsMin, unitsMax, discount, id }: RangesRowProps) {
  const {
    watch,
    setValue,
    getValues,
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      unitsMin,
      unitsMax,
      discount
    }
  });
  return (
    <>
      <Flex justify="space-between" align="center">
        Rango {id}
        <Button type="text">
          <Trash size={20} />
        </Button>
      </Flex>
      <Row>
        <Col span={7}>
          <InputForm
            control={control}
            error={undefined}
            nameInput="unitsMin"
            className={"style.inputDesc"}
          ></InputForm>
        </Col>
        <Col span={7} offset={1}>
          <InputForm
            control={control}
            error={undefined}
            nameInput="unitsMax"
            className={"style.inputDesc"}
          ></InputForm>
        </Col>
        <Col span={8} offset={1}>
          <InputForm
            control={control}
            error={undefined}
            nameInput="discount"
            className={"style.inputDesc"}
          ></InputForm>
        </Col>
      </Row>
    </>
  );
}
