import { Select, Typography } from "antd";
import useSWR from "swr";
import { ControllerRenderProps, FieldError } from "react-hook-form";

import { fetcher } from "@/utils/api/api";

import { IDocumentsTypes } from "@/types/documentTypes/IDocumentsTypes";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

interface Props {
  errors: FieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.document_type">;
}
const { Option } = Select;
export const SelectDocumentTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IDocumentsTypes>("/document-type", fetcher, {});
  const options = data?.data;

  return (
    <>
      <Select
        placeholder="Seleccione Tipo de Documento"
        className={errors ? "selectInputError" : "selectInputCustom"}
        loading={isLoading}
        variant="borderless"
        optionLabelProp="label"
        {...field}
        popupClassName="selectDrop"
      >
        {options?.map((value) => {
          return (
            <Option
              className="selectOptions"
              value={`${value.id}-${value.document_name}`}
              key={value.id}
            >
              {`${value.id}-${value.document_name}`}
            </Option>
          );
        })}
      </Select>
      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
