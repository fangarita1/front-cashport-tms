import { Flex, Typography } from "antd";
import "./selectstructure.scss";
import { SelectChanel } from "@/components/atoms/SelectChanel/SelectChanel";
import { SelectLines } from "@/components/atoms/SelectLines/SelectLines";

export const SelectStructure = () => {
  return (
    <div className="selectstructure">
      <Typography.Text className="title">Estructura</Typography.Text>
      <Flex className="structure" gap={"1rem"}>
        <SelectChanel />
        <SelectLines />
      </Flex>
    </div>
  );
};
