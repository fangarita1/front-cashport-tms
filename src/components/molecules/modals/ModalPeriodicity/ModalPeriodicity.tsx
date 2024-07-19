import { Modal } from "antd";
import "./modalPeriodicity.scss";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { Controller, useForm } from "react-hook-form";
import GeneralSelect from "@/components/ui/general-select";
import { SelectDay } from "@/components/atoms/SelectDay/SelectDay";

interface Props {
  isOpen: boolean;
  name?: string;
  onClose: () => void;
}
export const ModalPeriodicity = ({ isOpen, onClose }: Props) => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<any>({});

  return (
    <Modal
      className="modalPeriodicity"
      open={isOpen}
      onCancel={onClose}
      footer={null}
      destroyOnClose
    >
      <h2 className="modalPeriodicity__title"> Establecer periodicidad</h2>
      <div className="modalPeriodicity__inputs">
        <p className="modalPeriodicity__inputs__name">Inicio</p>
        <InputDateForm
          customStyleContainer={{ maxWidth: "fit-content" }}
          hiddenIcon
          nameInput="init_date"
          placeholder="Seleccionar fecha"
          control={control}
          error={errors.init_date}
        />
        <p className="modalPeriodicity__inputs__name">Repetir cada</p>
        <div className="modalPeriodicity__inputs__repeat">
          <input type="number" className="inputNumber" />
          <Controller
            name="event_type"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GeneralSelect
                errors={errors.event_type}
                field={field}
                placeholder="Semanal"
                options={repeatOptions}
              />
            )}
          />
        </div>
        <p className="modalPeriodicity__inputs__days">
          <SelectDay />
        </p>
        <p className="modalPeriodicity__inputs__name">Fin</p>
        <InputDateForm
          customStyleContainer={{ maxWidth: "fit-content" }}
          hiddenTitle
          hiddenIcon
          nameInput="end_date"
          placeholder="Seleccionar fecha"
          control={control}
          error={errors.end_date}
        />
      </div>
      <p className="modalPeriodicity__inputs__name">
        Se produce cada Miercoles empezando el 03/07/2024
      </p>
      <div className="modalPeriodicity__footer">
        <SecondaryButton>Cancelar</SecondaryButton>
        <PrincipalButton onClick={onClose}>Guardar</PrincipalButton>
      </div>
    </Modal>
  );
};

const repeatOptions = [
  { value: "Semanal", label: "Semanal" },
  { value: "Mensual", label: "Mensual" }
];
