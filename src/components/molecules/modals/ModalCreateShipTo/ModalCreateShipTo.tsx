import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, Flex, Input, Modal, Switch, Typography } from "antd";

import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";
import { ModalAddress } from "../ModalAddress/ModalAddress";

import "./modalcreateshipto.scss";
import { ISelectType } from "@/types/clients/IClients";
import { ModalBillingPeriod } from "../ModalBillingPeriod/ModalBillingPeriod";
import { IBillingPeriodForm } from "@/types/billingPeriod/IBillingPeriod";
import { SelectRadicationTypes } from "../../selects/clients/SelectRadicationTypes/SelectRadicationTypes";
import { SelectPaymentConditions } from "../../selects/clients/SelectPaymentConditions/SelectPaymentCondition";
import { ModalBusinessRules } from "../ModalBusinessRules/ModalBusinessRules";
import { ISelectedBussinessRules } from "@/types/bre/IBRE";

const { Text, Title } = Typography;
interface Props {
  isOpen: boolean;
  setIsCreateShipTo: Dispatch<SetStateAction<boolean>>;
  clientId: number;
  projectId: number;
}

export type ShipToFormType = {
  shipTo: {
    code: number;
    billing_period: string;
    radication_type: ISelectType;
    condition_payment: ISelectType;
  };
};

export const ModalCreateShipTo = ({ isOpen, setIsCreateShipTo, clientId, projectId }: Props) => {
  const [isEditAvailable] = useState(true);
  const [currentView, setCurrentView] = useState<"main" | "businessRules" | "address">("main");
  const [selectedShipToData, setSelectedShipToData] = useState<ShipToFormType | undefined>();
  const [isBillingPeriodOpen, setIsBillingPeriodOpen] = useState(false);
  const [billingPeriod, setBillingPeriod] = useState<IBillingPeriodForm | undefined>();
  const [zones, setZones] = useState([] as number[]);
  const [selectedStructure, setSelectedStructure] = useState<ISelectedBussinessRules>(
    initDatSelectedBusinessRules
  );
  const [inheritParameters, setInheritParameters] = useState(true);

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid }
  } = useForm<ShipToFormType>({
    mode: "onChange",
    disabled: !isEditAvailable
    // values: isViewDetailsUser?.active ? dataToDataForm(dataUser.data) : ({} as ShipToType)
  });

  useEffect(() => {
    // UseEffect para actualizar el valor de billingPeriod
    if (!billingPeriod) {
      // setValue("shipTo.billing_period", "undefined");
      return;
    }

    const formattedBillingPeriod = billingPeriod.day_flag
      ? `El dia ${billingPeriod.day} del mes`
      : `El ${billingPeriod.order} ${billingPeriod.day_of_week} del mes`;

    // Establecer el valor formateado al string de billing period
    setValue("shipTo.billing_period", formattedBillingPeriod, { shouldValidate: true });
  }, [billingPeriod, setValue]);

  const handleInheritParameters = (checked: boolean) => {
    setInheritParameters(checked);
  };

  const onSubmitHandler = async (data: ShipToFormType) => {
    setSelectedShipToData(data);
    setCurrentView("businessRules");
  };

  const handleCreateShipTo = () => {
    console.log("CREATING SHIP TO...");
    console.log("clientID: ", clientId);
    console.log("projectID: ", projectId);
    console.log("SelectedShipToData: ", selectedShipToData);
    console.log("dependency_client: ", inheritParameters);
    console.log("BillingPeriod: ", billingPeriod);
    console.log("SelectedStructure: ", selectedStructure);
    console.log("Zones: ", zones);
    // Aca iria la creacion del ShipTo POST
    setIsCreateShipTo(false);
  };

  const mainViewModal = {
    content: (
      <form onSubmit={handleSubmit(onSubmitHandler)}>
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
              variant="borderless"
              className="input"
              placeholder="Ingresar ubicacion"
              onClick={() => setCurrentView("address")}
            />
          </Flex>
        </div>
        <Flex gap={".5rem"} style={{ padding: "1rem 0rem" }}>
          <Switch defaultChecked={inheritParameters} onChange={handleInheritParameters} />
          <Text>Heredar parámetros del cliente</Text>
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
          <Button className="cancelButton" onClick={() => setIsCreateShipTo(false)}>
            Cancelar
          </Button>
          <Button disabled={!isValid} htmlType="submit" className="acceptButton">
            Siguiente
          </Button>
        </div>
        {inheritParameters ? <p>INHERITING</p> : null}
      </form>
    )
  };

  const businessRulesViewModal = {
    content: (
      <ModalBusinessRules
        setCurrentView={setCurrentView}
        zones={zones}
        setZones={setZones}
        selectedStructure={selectedStructure}
        setSelectedStructure={setSelectedStructure}
      />
    ),
    footer: (
      <div className="footer">
        <Button className="cancelButton" onClick={() => setCurrentView("main")}>
          Cancelar
        </Button>
        <Button
          onClick={handleCreateShipTo}
          disabled={selectedStructure.channels.length === 0 || zones.length === 0}
          className="acceptButton"
        >
          Crear Ship To
        </Button>
      </div>
    )
  };

  const addressViewModal = {
    content: <ModalAddress setCurrentView={setCurrentView} />,
    footer: (
      <div className="footer">
        <Button onClick={() => setCurrentView("main")} className="acceptButton -address">
          Guardar ubicación
        </Button>
      </div>
    )
  };

  return (
    <>
      <Modal
        width={"40%"}
        open={isOpen}
        className="modalcreateshipto"
        okButtonProps={{
          className: "buttonOk"
        }}
        cancelButtonProps={{
          className: "buttonCancel"
        }}
        footer={
          currentView === "businessRules"
            ? businessRulesViewModal.footer
            : currentView === "address" && addressViewModal.footer
        }
        onCancel={() => setIsCreateShipTo(false)}
      >
        {currentView === "main" && mainViewModal.content}
        {currentView === "businessRules" && businessRulesViewModal.content}
        {currentView === "address" && addressViewModal.content}
      </Modal>
      <ModalBillingPeriod
        isOpen={isBillingPeriodOpen}
        setIsBillingPeriodOpen={setIsBillingPeriodOpen}
        setBillingPeriod={setBillingPeriod}
      />
    </>
  );
};

const initDatSelectedBusinessRules: ISelectedBussinessRules = {
  channels: [],
  lines: [],
  sublines: []
};
