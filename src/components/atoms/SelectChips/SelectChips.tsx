import { Checkbox, Flex, Tag, Typography } from "antd";
import "./selectchips.scss";
import { CheckCircle } from "phosphor-react";

const { Text } = Typography;

export const SelectChips = () => {
  return (
    <Flex className="selectchips" vertical>
      <Flex component="header" justify="space-between" className="headerselectchips">
        <Text>Medicamentos</Text>
        <Checkbox />
      </Flex>
      <Flex component="main" className="mainTags">
        <Tag closeIcon={<CheckCircle size={"1.4rem"} />} className="tag">
          Acetaminofen
        </Tag>
      </Flex>
    </Flex>
  );
};
