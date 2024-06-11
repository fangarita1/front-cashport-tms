import { Dispatch, SetStateAction, useCallback, useEffect, useReducer, useState } from "react";
import { Flex, Input, InputNumber, Modal, Radio, RadioChangeEvent, Typography } from "antd";

import { SelectBillingPeriod } from "@/components/molecules/selects/clients/SelectBillingPeriod/SelectBillingPeriod";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import "./modalBillingPeriod.scss";

const { Text } = Typography;

interface Props {
  isOpen: boolean;
  billingPeriod: IBillingPeriodForm | undefined;
  setIsBillingPeriodOpen: Dispatch<SetStateAction<boolean>>;
  setBillingPeriod: Dispatch<SetStateAction<IBillingPeriodForm | undefined>>;
}

interface State {
  order: string | undefined;
  dayOfWeek: string | undefined;
  day: number | undefined;
}

const initialState: State = {
  order: undefined,
  dayOfWeek: undefined,
  day: undefined
};

// Definición de acciones y sus tipos
type Action =
  | { type: "SET_PERIOD"; payload: string | undefined }
  | { type: "SET_DAY_OF_WEEK"; payload: string | undefined }
  | { type: "SET_DAY"; payload: number | undefined };

const actionTypes = {
  SET_PERIOD: "SET_PERIOD",
  SET_DAY_OF_WEEK: "SET_DAY_OF_WEEK",
  SET_DAY: "SET_DAY"
} as const;

export const ModalBillingPeriod = ({
  isOpen,
  setIsBillingPeriodOpen,
  setBillingPeriod,
  billingPeriod
}: Props) => {
  const [radioState, setRadioState] = useState<boolean | null>(null);
  const orderOptions = ["Primero", "Segundo", "Tercero", "Cuarto", "Ultimo"];
  const daysOptions = ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado", "Domingo"];

  const [state, dispatch] = useReducer(reducer, initialState);

  const handleSetPeriod = useCallback((event: string) => {
    dispatch({ type: actionTypes.SET_PERIOD, payload: event });
  }, []);

  const handleSetDayOfWeek = useCallback((event: string) => {
    dispatch({ type: actionTypes.SET_DAY_OF_WEEK, payload: event });
  }, []);
  const handleSetDay = useCallback((event: number | undefined) => {
    dispatch({ type: actionTypes.SET_DAY, payload: event });
  }, []);

  const handle = (
    day: number | undefined,
    dayOfWeek: string | undefined,
    order: string | undefined
  ) => {
    dispatch({ type: actionTypes.SET_DAY_OF_WEEK, payload: dayOfWeek });
    dispatch({ type: actionTypes.SET_DAY, payload: day });
    dispatch({ type: actionTypes.SET_PERIOD, payload: order });
  };

  const onSaveChanges = () => {
    const { day, dayOfWeek, order } = state;
    setBillingPeriod({
      day_flag: radioState ? "true" : "false",
      order: !radioState ? order : undefined,
      day_of_week: !radioState ? dayOfWeek : undefined,
      day: !radioState ? undefined : day
    });
    setIsBillingPeriodOpen(false);
  };

  const onChangeSelectRadio = (e: RadioChangeEvent) => setRadioState(e.target.value);

  useEffect(() => {
    if (isOpen === true && billingPeriod) {
      const { day, order, day_of_week } = billingPeriod;
      setRadioState(billingPeriod.day_flag === "true");
      handle(day, day_of_week, order);
    }
  }, [isOpen]);
  const modalDisabled = () => {
    switch (true) {
      case radioState === true && state.day !== undefined:
        return false;
      case radioState === false && state.dayOfWeek !== undefined && state.order !== undefined:
        return false;
      default:
        return true;
    }
  };
  return (
    <Modal
      open={isOpen}
      onCancel={() => setIsBillingPeriodOpen(false)}
      title="Periodo de facturación"
      okButtonProps={{
        className: "buttonOk",
        disabled: modalDisabled()
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
          style={{ padding: "1.2rem .5rem", display: "flex", flexDirection: "column", gap: "1rem" }}
          onChange={onChangeSelectRadio}
          value={radioState}
        >
          <Radio value={true}>
            <Flex align="center" gap="1rem">
              <Text className="textPre-input">El día</Text>
              <Flex vertical style={{ width: "80.5%" }} justify="center">
                <InputNumber
                  value={state.day}
                  variant="borderless"
                  className="input"
                  placeholder="10"
                  onChange={(e) => handleSetDay(e ? e : undefined)}
                />
              </Flex>
            </Flex>
          </Radio>
          <Radio value={false} style={{ width: "100%" }}>
            <Flex align="center" gap="1rem" style={{ width: "100%" }}>
              <Text className="textPre-input">El</Text>
              <Flex style={{ width: "20rem", gap: "1rem" }}>
                {[
                  {
                    options: orderOptions,
                    placeHolder: "Segundo",
                    orderRadioValue: state.order,
                    setValueSelected: handleSetPeriod
                  },
                  {
                    options: daysOptions,
                    placeHolder: "Miercoles",
                    orderRadioValue: state.dayOfWeek,
                    setValueSelected: handleSetDayOfWeek
                  }
                ].map((item) => (
                  <SelectBillingPeriod {...item} disabled={radioState === true} />
                ))}
              </Flex>
            </Flex>
          </Radio>
        </Radio.Group>

        <Text>
          El periodo de facturación inicia el
          {radioState === true
            ? ` día ${state.day ?? ""} `
            : ` ${state.order ?? ""} ${state.dayOfWeek ?? ""} `}
          de cada mes
        </Text>
      </Flex>
    </Modal>
  );
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case actionTypes.SET_PERIOD:
      return {
        ...state,
        order: action.payload
      };
    case actionTypes.SET_DAY_OF_WEEK:
      return {
        ...state,
        dayOfWeek: action.payload
      };
    case actionTypes.SET_DAY:
      return {
        ...state,
        day: action.payload
      };
    default:
      return state;
  }
};
