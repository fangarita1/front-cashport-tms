import { Button } from "antd";
import { ControllerRenderProps, FieldError, UseFormSetValue } from "react-hook-form";
import { Minus, Plus } from "phosphor-react";

import styles from "./inputExpirationNoticeDays.module.scss";
import { useEffect, useState } from "react";
import { ICommunicationForm } from "@/types/communications/ICommunications";

type InputExpirationNoticeDaysProps = {
  nameInput: string;
  field?: ControllerRenderProps<ICommunicationForm, "trigger.settings.noticeDaysEvent">;
  error?: FieldError | undefined;
  setValue: UseFormSetValue<any>;
  event_days_before?: number | null;
  disabled?: boolean;
};

export const InputExpirationNoticeDays = ({
  nameInput,
  field,
  error,
  setValue,
  event_days_before,
  disabled
}: InputExpirationNoticeDaysProps) => {
  // eslint-disable-next-line no-unused-vars
  const [noticeDays, setNoticeDays] = useState<{ days: number; suffix: "días" }>({
    days: 0,
    suffix: "días"
  });

  useEffect(() => {
    setNoticeDays({ days: event_days_before || 0, suffix: "días" });
  }, []);

  useEffect(() => {
    if (disabled) return;
    const newDays = { ...noticeDays, days: noticeDays.days + 1 };
    setValue(nameInput, `${newDays.days}`, { shouldValidate: true });
  }, [disabled, noticeDays, setValue, nameInput]);

  useEffect(() => {
    if (disabled) return;
    const newDays = { ...noticeDays, days: noticeDays.days - 1 };
    setValue(nameInput, `${newDays.days}`, { shouldValidate: true });
  }, [disabled, noticeDays, setValue, nameInput]);

  const handleDecrementNotice = () => {
    if (disabled) return;
    setNoticeDays((prev) => {
      const newDays = { ...prev, days: prev.days - 1 };
      return newDays;
    });
  };

  const handleIncrementNotice = () => {
    if (disabled) return;
    setNoticeDays((prev) => {
      const newDays = { ...prev, days: prev.days + 1 };
      return newDays;
    });
  };
  return (
    <div className={styles.noticeDaysContainer}>
      <div className={styles.noticeDays}>
        <p className={styles.noticeDays__title}>Aviso de vencimiento</p>
        <Button
          disabled={disabled}
          className={styles.buttonMinus}
          onClick={() => handleDecrementNotice()}
        >
          <Minus size={14} weight="light" />
        </Button>

        <input
          readOnly
          className={styles.input}
          value={`${noticeDays.days} ${noticeDays.suffix}`}
          onChange={field?.onChange}
          onBlur={field?.onBlur}
          ref={field?.ref}
          disabled={disabled}
        />
        <Button
          disabled={disabled}
          className={styles.buttonPlus}
          onClick={() => handleIncrementNotice()}
        >
          <Plus size={14} weight="light" />
        </Button>
      </div>
      <p className={styles.noticeDaysContainer__error}>
        {error ? (error.message ? ` ${error.message}` : `Valor de aviso obligatorio *`) : ""}
      </p>
    </div>
  );
};
