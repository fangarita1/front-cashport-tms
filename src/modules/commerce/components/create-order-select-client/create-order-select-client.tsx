import { Select } from "antd";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { selectClientForm } from "../create-order-search-client/create-order-search-client";
import styles from "./create-order-select-client.module.scss";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<selectClientForm, "client">;
}

const SelectClient = ({ errors, field }: Props) => {
  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder="Seleccione un cliente"
      className={errors ? styles.selectInputError : styles.selectInputCustom}
      loading={false}
      variant="borderless"
      optionLabelProp="label"
      {...field}
      popupClassName={styles.selectDrop}
      options={mockOptions}
      labelInValue
    />
  );
};

export default SelectClient;

const mockOptions = [
  { value: "1", label: "Cliente 1" },
  { value: "2", label: "Cliente 2" },
  { value: "3", label: "Cliente 3" },
  { value: "4", label: "Cliente 4" },
  { value: "5", label: "Cliente 5" }
];
