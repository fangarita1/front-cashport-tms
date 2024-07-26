import { Modal } from "antd";
import "./modalPeriodicity.scss";
import SecondaryButton from "@/components/atoms/buttons/secondaryButton/SecondaryButton";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { InputDateForm } from "@/components/atoms/inputs/InputDate/InputDateForm";
import { Controller, useForm } from "react-hook-form";
import GeneralSelect from "@/components/ui/general-select";
import { SelectDay } from "@/components/atoms/SelectDay/SelectDay";
import { IPeriodicityModalForm } from "@/types/communications/ICommunications";
import dayjs from "dayjs";
import { Dispatch, SetStateAction } from "react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setSelectedPeriodicity: Dispatch<SetStateAction<IPeriodicityModalForm>>;
}
export const ModalPeriodicity = ({ isOpen, onClose, setSelectedPeriodicity }: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<IPeriodicityModalForm>({
    defaultValues: {
      days: []
    }
  });

  const watchInitDate = watch("init_date");

  const handleOnSave = (data: IPeriodicityModalForm) => {
    console.log(data);
    setSelectedPeriodicity(data);
  };

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
          titleInput=""
          customStyleContainer={{ maxWidth: "fit-content" }}
          hiddenIcon
          nameInput="init_date"
          placeholder="Seleccionar fecha"
          control={control}
          error={errors.init_date}
          minDate={dayjs(new Date().toLocaleDateString())}
        />
        <p className="modalPeriodicity__inputs__name">Repetir cada</p>
        <div className="modalPeriodicity__inputs__repeat">
          <Controller
            name="frequency_number"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <input
                type="number"
                className="inputNumber"
                name={field.name}
                onChange={field.onChange}
              />
            )}
          />
          <Controller
            name="frequency"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <GeneralSelect
                errors={errors.frequency}
                field={field}
                placeholder="Semanal"
                options={repeatOptions}
              />
            )}
          />
        </div>
        <div className="modalPeriodicity__inputs__days">
          <Controller
            name="days"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <SelectDay {...field} onChange={(options) => field.onChange(options)} />
            )}
          />
        </div>
        <p className="modalPeriodicity__inputs__name">Fin</p>
        <InputDateForm
          disabled={!watchInitDate}
          titleInput=""
          customStyleContainer={{ maxWidth: "fit-content" }}
          hiddenTitle
          hiddenIcon
          nameInput="end_date"
          placeholder="Seleccionar fecha"
          control={control}
          error={errors.end_date}
          minDate={dayjs(watchInitDate, "YYYY-MM-DD", true).add(1, "day")}
        />
      </div>
      <p className="modalPeriodicity__inputs__name">
        Se produce cada Miercoles empezando el
        {watchInitDate && ` ${dayjs(watchInitDate, "YYYY-MM-DD").format("DD/MM/YYYY")}`}
      </p>
      <div className="modalPeriodicity__footer">
        <SecondaryButton>Cancelar</SecondaryButton>
        <PrincipalButton disabled={!isValid} onClick={handleSubmit(handleOnSave)}>
          Guardar
        </PrincipalButton>
      </div>
    </Modal>
  );
};

const repeatOptions = [
  { value: "Semanal", label: "Semanal" },
  { value: "Mensual", label: "Mensual" }
];
