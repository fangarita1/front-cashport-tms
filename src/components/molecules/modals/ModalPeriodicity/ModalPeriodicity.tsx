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
  selectedPeriodicity: IPeriodicityModalForm | undefined;
  setSelectedPeriodicity: Dispatch<SetStateAction<IPeriodicityModalForm | undefined>>;
}
export const ModalPeriodicity = ({
  isOpen,
  onClose,
  selectedPeriodicity,
  setSelectedPeriodicity
}: Props) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid }
  } = useForm<IPeriodicityModalForm>({
    defaultValues: selectedPeriodicity
      ? {
          ...selectedPeriodicity,
          days: selectedPeriodicity.days
        }
      : { days: [] }
  });

  const watchInitDate = watch("init_date");
  const watchFrequency = watch("frequency");
  const watchDays = watch("days");

  const handleOnSave = (data: IPeriodicityModalForm) => {
    setSelectedPeriodicity(data);
    onClose();
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
            rules={{
              required: true,
              pattern: {
                message: "valor invalido",
                value: /^(3[0-1]|[12][0-9]|[1-9]|0[1-9])$/
              }
            }}
            render={({ field }) => (
              <div className="inputNumber">
                <input
                  type="number"
                  className="input"
                  name={field.name}
                  onChange={field.onChange}
                  value={field.value}
                />
                {errors.frequency_number && (
                  <p className="error">{errors.frequency_number.message}</p>
                )}
              </div>
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
                errorSmall
              />
            )}
          />
        </div>
        <div className="modalPeriodicity__inputs__days">
          <Controller
            name="days"
            control={control}
            rules={{ required: watchFrequency?.value !== "Mensual" }}
            render={({ field }) => (
              <SelectDay
                {...field}
                onChange={(options) => field.onChange(options)}
                disabled={watchFrequency?.value === "Mensual"}
                value={field.value}
              />
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
          validationRules={{
            validate: (value) => {
              const initDate = dayjs(watchInitDate, "YYYY-MM-DD", true);
              const inputDate = dayjs(value, "YYYY-MM-DD", true);
              if (inputDate.diff(initDate, "days") <= 0) {
                console.log("diferencia: ", inputDate.diff(initDate, "days"));
                return "La fecha debe ser mínimo un día más que la fecha inicial";
              }
              return true;
            }
          }}
        />
      </div>
      <p className="modalPeriodicity__inputs__name">
        Se produce cada {watchDays.map((day) => `${day.value} `)} empezando el
        {watchInitDate && ` ${dayjs(watchInitDate, "YYYY-MM-DD").format("DD/MM/YYYY")}`}
      </p>
      <div className="modalPeriodicity__footer">
        <SecondaryButton onClick={() => onClose()}>Cancelar</SecondaryButton>
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
