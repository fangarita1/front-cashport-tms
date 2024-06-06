import { Checkbox, Flex, Typography } from "antd";

import "./addresscontainer.scss";

const { Text } = Typography;

interface Props {
  address?: string;
  city?: string;
  locationId?: number;
}

export const AddressContainer = ({
  address = "Calle 69 # 15 - 34 Local 102",
  city = "Barranquilla",
  locationId = 0
}: Props) => {
  return (
    <Flex className="addresscontainer">
      <Checkbox onChange={() => console.log("Selected location with id: ", locationId)} />
      <Flex vertical>
        <Text className="address">{address}</Text>
        <Text className="city">{city}</Text>
      </Flex>
    </Flex>
  );
};
