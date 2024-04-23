import { Select, Typography } from "antd";
import useSWR from "swr";

import { fetcher } from "@/utils/api/api";
import { IDocumentsTypes } from "@/types/documentTypes/IDocumentsTypes";

import "./SelectDocumentTypes.scss";

interface Props {
  errors: any;
  field: any;
}
const { Option } = Select;
export const SelectDocumentTypes = ({ errors, field }: Props) => {
  const { data, isLoading } = useSWR<IDocumentsTypes>("/document-type", fetcher, {});
  const options = data?.data;
  return (
    <Select
      placeholder="Seleccione Tipo de Documento"
      className={errors ? "selectInputRolesError" : "selectInputRoles"}
      loading={isLoading}
      variant="borderless"
      optionLabelProp="label"
      {...field}
    >
      {options?.map((value) => {
        return (
          <Option value={`${value.id}-${value.document_name}`} key={value.id}>
            {`${value.id}-${value.document_name}`}
          </Option>
        );
      })}
      {errors && (
        <Typography.Text className="textError">
          El tipo de documento es obligatorio *
        </Typography.Text>
      )}
    </Select>
  );
};
