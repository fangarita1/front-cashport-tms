import { Checkbox, Flex, Typography } from "antd";

import "./addresscontainer.scss";

const { Text } = Typography;
export const AddressContainer = () => {
  return (
    <Flex className="addresscontainer">
      <Checkbox />
      <Flex vertical>
        <Text className="address">Calle 69 # 15 - 34 Local 102</Text>
        <Text className="city">Barranquilla</Text>
      </Flex>
    </Flex>
  );
};
