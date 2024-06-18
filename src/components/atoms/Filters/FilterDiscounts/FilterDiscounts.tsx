import { Cascader } from "antd";
import "../filterCascader.scss";

export default function FilterDiscounts() {
  return (
    <Cascader
      className="filterCascader"
      style={{ width: "130px" }}
      multiple
      size="large"
      removeIcon
      maxTagCount="responsive"
      placeholder="Filtrar"
      placement="bottomRight"
      onClear={() => {}}
      options={[]}
      changeOnSelect
      loadData={() => []}
      value={["asdasd"]}
      onChange={() => []}
      onBlur={() => []}
    />
  );
}
