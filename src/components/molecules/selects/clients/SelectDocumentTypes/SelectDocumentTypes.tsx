import { Select, Typography } from "antd";
import useSWR from "swr";
import {
  ControllerRenderProps,
  FieldErrorsImpl,
  Merge,
  FieldError as OriginalFieldError
} from "react-hook-form";

import { fetcher } from "@/utils/api/api";

import { IDocumentsTypes } from "@/types/documentTypes/IDocumentsTypes";
import { ClientFormType } from "@/types/clients/IClients";

import "../commonInputStyles.scss";

// Extend the existing FieldError type
type ExtendedFieldError =
  | OriginalFieldError
  | Merge<OriginalFieldError, FieldErrorsImpl<{ value: number; label: string }>>;

interface Props {
  errors: ExtendedFieldError | undefined;
  field: ControllerRenderProps<ClientFormType, "infoClient.document_type">;
}

export const SelectDocumentTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IDocumentsTypes>("/document-type", fetcher, {});
  const options = data?.data.map((option) => {
    return {
      value: option.id,
      label: option.document_name,
      className: "selectOptions"
    };
  });

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
        options={options}
        labelInValue
      />
      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </>
  );
};
