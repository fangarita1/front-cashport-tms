import { Checkbox, Flex, Typography } from "antd";

import "./addresscontainer.scss";

const { Text } = Typography;

interface Props {
  address?: string;
  city?: string;
  addressId?: number;
  complement?: string;
}

export const AddressContainer = ({
  address = "Calle 69 # 15 - 34 Local 102",
  city = "Barranquilla",
  addressId = 0,
  complement = "Local 102"
}: Props) => {
  return (
    <Flex className="addresscontainer">
      <Checkbox onChange={() => console.log("Selected address with id: ", addressId)} />
      <Flex vertical>
        <Text className="address">
          {address} - {complement}
        </Text>
        <Text className="city">{city}</Text>
      </Flex>
    </Flex>
  );
};
