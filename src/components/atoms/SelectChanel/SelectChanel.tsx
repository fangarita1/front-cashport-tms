import { Flex, Typography } from "antd";
import "./selectchanel.scss";
import { SelectChips } from "../SelectChips/SelectChips";
const { Text } = Typography;

export const SelectChanel = () => {
  return (
    <div className="chanelSelect">
      <Text>Institucional</Text>
      <Flex vertical>
        <Flex vertical>
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
          <SelectChips />
        </Flex>
      </Flex>
    </div>
  );
};
