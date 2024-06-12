import { Dispatch, SetStateAction, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Flex, Input, Switch, Typography } from "antd";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import { SelectRadicationTypes } from "@/components/molecules/selects/clients/SelectRadicationTypes/SelectRadicationTypes";
import { SelectPaymentConditions } from "@/components/molecules/selects/clients/SelectPaymentConditions/SelectPaymentCondition";
import { ShipToFormType } from "@/types/shipTo/IShipTo";

import "./modalcreateshipto.scss";
const { Text, Title } = Typography;
interface Props {
  setIsShipToModalOpen: Dispatch<SetStateAction<boolean>>;
  setCurrentView: Dispatch<SetStateAction<"address" | "main" | "businessRules">>;
  setSelectedShipToData: Dispatch<SetStateAction<ShipToFormType | undefined>>;
  setIsBillingPeriodOpen: Dispatch<SetStateAction<boolean>>;
  billingPeriod: IBillingPeriodForm | undefined;
}

export const ModalCreateShipTo = ({
  setIsShipToModalOpen,
  setCurrentView,
  setSelectedShipToData,
  setIsBillingPeriodOpen,
  billingPeriod
}: Props) => {
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isValid }
  } = useForm<ShipToFormType>({
    mode: "onChange",
    // values: isViewDetailsUser?.active ? dataToDataForm(dataUser.data) : ({} as ShipToType)
    defaultValues: {
      shipTo: {
        dependency_client: false
      }
    }
  });

  const watchDependencyClient = watch("shipTo.dependency_client");

  useEffect(() => {
    // UseEffect para actualizar el valor de billingPeriod
    if (!billingPeriod) {
      return;
    }

    const formattedBillingPeriod = billingPeriod.day_flag
      ? `El dia ${billingPeriod.day} del mes`
      : `El ${billingPeriod.order} ${billingPeriod.day_of_week} del mes`;

    // Establecer el valor formateado al string de billing period
    setValue("shipTo.billing_period", formattedBillingPeriod, { shouldValidate: true });
  }, [billingPeriod, setValue]);

  const onSubmitHandler = async (data: ShipToFormType) => {
    setSelectedShipToData(data);
    setCurrentView("businessRules");
  };

  return (
    <form className="createShipToModal" onSubmit={handleSubmit(onSubmitHandler)}>
      <h5 className="modalTitle">Crear nuevo Ship To</h5>
      <div className="nonHereditaryInputs">
        <InputForm
          titleInput="Código Ship To"
          control={control}
          nameInput="shipTo.code"
          error={errors.shipTo?.code}
        />
        <Flex className="inputContainer" vertical>
          <Title className="inputContainer__title" level={5}>
            Ubicacion
          </Title>
          <Input
            readOnly
            variant="borderless"
            className="input"
            placeholder="Ingresar ubicacion"
            onClick={() => setCurrentView("address")}
          />
        </Flex>
      </div>
      <Flex gap={".5rem"} style={{ padding: "1rem 0rem" }}>
        <Controller
          control={control}
          name="shipTo.dependency_client"
          render={({ field }) => (
            <>
              <Switch {...field} checked={field.value} />
              <Text>Heredar parámetros del cliente</Text>
            </>
          )}
        />
      </Flex>

      <div className="hereditaryInputs">
        <div className="inputContainer">
          <Title className="inputContainer__title" level={5}>
            Período de facturación
          </Title>
          <Controller
            name="shipTo.billing_period"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field, fieldState: { error } }) => (
              <>
                <Input
                  variant="borderless"
                  className={error ? "inputError" : "input"}
                  placeholder="Segundo miércoles del mes"
                  onClick={() => setIsBillingPeriodOpen(true)}
                  {...field}
                  value={
                    billingPeriod
                      ? billingPeriod.day_flag
                        ? `El dia ${billingPeriod.day} del mes`
                        : `El ${billingPeriod.order} ${billingPeriod.day_of_week} del mes`
                      : undefined
                  }
                />
                {error && (
                  <Typography.Text className="textError">
                    El Periodo de facturacion es obligatorio *
                  </Typography.Text>
                )}
              </>
            )}
          />
        </div>

        <div className="inputContainer">
          <Title className="inputContainer__title" level={5}>
            Tipo de radicación
          </Title>
          <Controller
            name="shipTo.radication_type"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => (
              <SelectRadicationTypes<ShipToFormType>
                errors={errors.shipTo?.radication_type}
                field={field}
              />
            )}
          />
        </div>
        <div className="inputContainer">
          <Title className="inputContainer__title" level={5}>
            Condición de pago
          </Title>
          <Controller
            name="shipTo.condition_payment"
            control={control}
            rules={{ required: true, minLength: 1 }}
            render={({ field }) => {
              return (
                <SelectPaymentConditions<ShipToFormType>
                  errors={errors.shipTo?.condition_payment}
                  field={field}
                />
              );
            }}
          />
        </div>
      </div>

      <div className="footer">
        <Button className="cancelButton" onClick={() => setIsShipToModalOpen(false)}>
          Cancelar
        </Button>
        <Button disabled={!isValid} htmlType="submit" className="acceptButton">
          Siguiente
        </Button>
      </div>
      {watchDependencyClient ? <p>INHERITING</p> : null}
    </form>
  );
};
