import { Checkbox, Flex, Typography } from "antd";

import "./addresscontainer.scss";
import { ILocation } from "@/types/locations/ILocations";

const { Text } = Typography;

interface Props {
  address?: string;
  city?: string;
  addressId?: number;
  complement?: string;
  isSelected: boolean;
  // eslint-disable-next-line no-unused-vars
  onSelectAddress: (addressId: number) => void;
}

export const AddressContainer = ({
  address = "Calle 69 # 15 - 34 Local 102",
  city = "Barranquilla",
  addressId = 0,
  complement = "Local 102",
  isSelected,
  onSelectAddress
}: Props) => {
  return (
    <Flex className="addresscontainer">
      <Checkbox checked={isSelected} onChange={() => onSelectAddress(addressId)} />
      <Flex vertical>
        <Text className="address">
          {address} - {complement}
        </Text>
        <Text className="city">{city}</Text>
      </Flex>
    </Flex>
  );
};
