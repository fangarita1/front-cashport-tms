import { Button } from "antd";
import { Control, Controller, FieldError, RegisterOptions, UseFormSetValue } from "react-hook-form";
import { Minus, Plus } from "phosphor-react";

import styles from "./inputExpirationNoticeDays.module.scss";
import { useState } from "react";

type InputExpirationNoticeDaysProps = {
  nameInput: string;
  control: Control<any> | undefined;
  validationRules?: RegisterOptions;
  error?: FieldError | undefined;
  setValue: UseFormSetValue<any>;
};

export const InputExpirationNoticeDays = ({
  nameInput,
  control,
  validationRules,
  error,
  setValue
}: InputExpirationNoticeDaysProps) => {
  // eslint-disable-next-line no-unused-vars
  const [noticeDays, setNoticeDays] = useState<{ days: number; suffix: "días" }>({
    days: 0,
    suffix: "días"
  });

  const handleDecrementNotice = () => {
    setNoticeDays((prev) => {
      const newDays = { ...prev, days: prev.days - 1 };
      setValue(nameInput, `${newDays.days} ${newDays.suffix}`, { shouldValidate: true });
      return newDays;
    });
  };

  const handleIncrementNotice = () => {
    setNoticeDays((prev) => {
      const newDays = { ...prev, days: prev.days + 1 };
      setValue(nameInput, `${newDays.days} ${newDays.suffix}`, { shouldValidate: true });
      return newDays;
    });
  };
  return (
    <div className={styles.noticeDaysContainer}>
      <div className={styles.noticeDays}>
        <p className={styles.noticeDays__title}>Aviso de vencimiento</p>
        <Button className={styles.buttonMinus} onClick={() => handleDecrementNotice()}>
          <Minus size={14} weight="light" />
        </Button>
        <Controller
          name={nameInput}
          control={control}
          rules={validationRules}
          render={({ field }) => (
            <input
              readOnly
              className={styles.input}
              value={field.value}
              onChange={field.onChange}
              onBlur={field.onBlur}
              ref={field.ref}
            />
          )}
        />
        <Button className={styles.buttonPlus} onClick={() => handleIncrementNotice()}>
          <Plus size={14} weight="light" />
        </Button>
      </div>
      <p className={styles.noticeDaysContainer__error}>
        {error ? (error.message ? ` ${error.message}` : `Valor de aviso obligatorio *`) : ""}
      </p>
    </div>
  );
};
