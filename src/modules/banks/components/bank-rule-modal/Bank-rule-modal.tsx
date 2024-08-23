import { Controller, useForm } from "react-hook-form";
import { Button, Modal } from "antd";
import { Plus } from "phosphor-react";

import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import GeneralSelect from "@/components/ui/general-select";
import { InputForm } from "@/components/atoms/inputs/InputForm/InputForm";

import "./bank-rule-modal.scss";
import { useEffect, useState } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const BankRuleModal = ({ isOpen, onClose }: Props) => {
  const [ruleCount, setRuleCount] = useState(1);

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset
  } = useForm<{
    rules: {
      description: string;
      client_name: any;
      coincidence: any;
    }[];
  }>({});

  const handleAddRule = () => {
    setRuleCount((prevCount) => prevCount + 1);
  };

  const handleAddEditRule = (data: any) => console.log(data);

  useEffect(() => {
    if (!isOpen) {
      setRuleCount(1);
      reset();
    }
  }, [isOpen]);
  return (
    <Modal
      className="bankRuleModal"
      width={"65%"}
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <h2 className="bankRuleModal__title">Nueva regla</h2>
      <p className="bankRuleModal__description">Ingresa descripcion y nombre del cliente</p>

      <div className="bankRuleModal__rules">
        {[...Array(ruleCount)].map((_, index) => (
          <div key={index} className="bankRuleModal__singleRule">
            <InputForm
              titleInput="Descripción"
              control={control}
              nameInput={`rules.${index}.description`}
            />
            <p className="equalSign">=</p>
            <Controller
              name={`rules.${index}.client_name`}
              control={control}
              rules={{ required: true, minLength: 1 }}
              render={({ field }) => (
                <GeneralSelect
                  field={field}
                  title="Nombre del cliente"
                  placeholder="Ingresar nombre"
                  options={mockCoincidences?.map((coincidence) => coincidence.value)}
                />
              )}
            />
            <Controller
              name={`rules.${index}.coincidence`}
              control={control}
              rules={{ required: true, minLength: 1 }}
              render={({ field }) => (
                <GeneralSelect
                  field={field}
                  title="Coincidencia"
                  placeholder="Seleccione coincidencia"
                  options={mockCoincidences?.map((coincidence) => coincidence.value)}
                />
              )}
            />
          </div>
        ))}
        <Button
          type="text"
          size="large"
          style={{ paddingLeft: 0, fontWeight: 500, width: "fit-content", marginTop: "0.4rem" }}
          onClick={handleAddRule}
          icon={<Plus size={"1.45rem"} />}
        >
          Agregar otra
        </Button>
      </div>

      <div className="bankRuleModal__footer">
        <SecondaryButton onClick={onClose}>Cancelar</SecondaryButton>
        <PrincipalButton disabled={!isValid} onClick={handleSubmit(handleAddEditRule)}>
          Crear nueva regla
        </PrincipalButton>
      </div>
    </Modal>
  );
};

const mockCoincidences = [
  { value: "Coincidencia exacta", label: "Coincidencia exacta" },
  { value: "Contiene", label: "Contiene" }
];
