import { Dispatch, SetStateAction, useState } from "react";
import { Flex, Input, Modal, Radio, Typography } from "antd";

import { SelectBillingPeriodOrder } from "@/components/molecules/selects/clients/SelectBillingPeriod/SelectBillingPeriodOrder";
import "./modalBillingPeriod.scss";
import { SelectBillingPeriodDay } from "@/components/molecules/selects/clients/SelectBillingPeriod/SelectBillingPeriodDay";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  setIsBillingPeriodOpen: Dispatch<SetStateAction<boolean>>;
  setBillingPeriod?: Dispatch<SetStateAction<any>>;
}

export const ModalBillingPeriod = ({ isOpen, setIsBillingPeriodOpen, setBillingPeriod }: Props) => {
  // Son tres estados
  // 1 para cada input radio
  // 1 para capturar el estado seleccionado
  const [dayValueRadio, setDayValueRadio] = useState<IBillingPeriodForm>({
    day_flag: true,
    day: undefined,
    day_of_week: undefined,
    order: undefined
  });
  const [orderValueRadio, setOrderValueRadio] = useState<IBillingPeriodForm>({
    day_flag: false,
    day: undefined,
    day_of_week: "",
    order: ""
  });
  const [billingPeriodValue, setBillingPeriodValue] = useState<IBillingPeriodForm>();

  const orderOptions = ["primero", "segundo", "tercero", "cuarto", "ultimo"];

  const daysOptions = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  const onSaveChanges = () => {
    if (setBillingPeriod) {
      setBillingPeriod(billingPeriodValue);
    }
    setIsBillingPeriodOpen(false);
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsBillingPeriodOpen(false)}
      title="Periodo de facturación"
      okButtonProps={{
        className: "buttonOk"
      }}
      cancelButtonProps={{
        className: "buttonCancel"
      }}
      okText="Guardar cambios"
      cancelText="Cancelar"
      className="modalBillingPeriod"
      onOk={onSaveChanges}
    >
      <Flex vertical>
        <Text>Selecciona el corte de facturación</Text>

        <Radio.Group
          style={{ padding: "1.2rem .5rem" }}
          onChange={(e) => setBillingPeriodValue(e.target.value)}
        >
          <Radio value={dayValueRadio}>
            <Flex align="center" gap="1rem">
              <Text>El día</Text>
              <Flex vertical style={{ width: "80.5%" }} justify="center">
                <Input
                  variant="borderless"
                  className="input"
                  placeholder="10"
                  onChange={(e) =>
                    setDayValueRadio({ ...dayValueRadio, day: parseInt(e.target.value) })
                  }
                />
              </Flex>
            </Flex>
          </Radio>
          <Radio value={orderValueRadio} style={{ width: "100%" }}>
            <Flex align="center" gap="1rem" style={{ width: "100%" }}>
              <Text>El</Text>
              <Flex style={{ width: "20rem", gap: "1rem", marginLeft: "1rem" }}>
                <SelectBillingPeriodOrder
                  options={orderOptions}
                  placeHolder="Segundo"
                  errors={false}
                  orderRadioValue={orderValueRadio}
                  setValueSelected={setOrderValueRadio}
                />
                <SelectBillingPeriodDay
                  options={daysOptions}
                  placeHolder="Miercoles"
                  errors={false}
                  orderRadioValue={orderValueRadio}
                  setValueSelected={setOrderValueRadio}
                />
              </Flex>
            </Flex>
          </Radio>
        </Radio.Group>

        <Text>El periodo de facturación inicia el ... ... de cada mes</Text>
      </Flex>
    </Modal>
  );
};
