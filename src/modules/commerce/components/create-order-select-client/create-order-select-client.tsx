import { Select } from "antd";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";
import { selectClientForm } from "../create-order-search-client/create-order-search-client";
import { useAppStore } from "@/lib/store/store";
import { useEffect, useState } from "react";
import { getClients } from "@/services/commerce/commerce";
import "./create-order-select-client.scss";

type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<selectClientForm, "client">;
}

const SelectClient = ({ errors, field }: Props) => {
  const { ID } = useAppStore((state) => state.selectedProject);
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState<{ value: number | string; label: string }[]>();

  useEffect(() => {
    if (!ID) return;
    const fetchClients = async () => {
      setLoading(true);
      const response = await getClients(ID);
      const clients = response?.data;
      const options = clients?.map((client) => ({
        value: client.client_id,
        label: client.client_name
      }));
      setLoading(false);
      setOptions(options);
    };
    fetchClients();
  }, [ID]);

  return (
    <Select
      showSearch
      optionFilterProp="label"
      placeholder="Seleccione un cliente"
      className={errors ? "selectInputClientError" : "selectInputClientCustom"}
      loading={loading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
      popupClassName="selectDrop"
      options={options}
      labelInValue
    />
  );
};

export default SelectClient;
