import { Flex, Typography } from "antd";

import { SelectChips } from "../SelectChips/SelectChips";

import "./selectlines.scss";

const { Text } = Typography;

export const SelectLines = () => {
  return (
    <div className="lineSelect">
      <Text>Comercial</Text>
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
        </Flex>
      </Flex>
    </div>
  );
};
