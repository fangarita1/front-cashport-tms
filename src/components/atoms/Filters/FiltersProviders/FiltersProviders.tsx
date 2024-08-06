import { Cascader } from "antd";
import "../filterCascader.scss";

type Props = {
  handleChangeActive?: (
    filter: {
      label: string;
      value: number;
    }[]
  ) => void;
};

export default function FiltersProviders({ handleChangeActive }: Props) {
  return (
    <Cascader
      style={{ width: "130px", height: "100%", marginLeft: "10px", border: "1px solid black", borderRadius: "10px" }}
      size="large"
      multiple={false}
      removeIcon
      maxTagCount="responsive"
      placeholder="Filtrar" 
      placement="bottomRight"
      options={[
        { label: "Activo", value: 1 },
        { label: "Inactivo", value: 0 }
      ]}
      onChange={(_, filter) => handleChangeActive?.(filter)}
    />
  );
}
