import { Checkbox, Flex, Typography } from "antd";

import "./addresscontainer.scss";
import { ILocation } from "@/types/locations/ILocations";

const { Text } = Typography;
export const AddressContainer = ({
  location,
  onSelect
}: {
  location: ILocation;
  onSelect: (state: boolean) => void;
}) => {
  return (
    <Flex className="addresscontainer">
      <Checkbox onChange={(e) => onSelect(e.target.checked)} />
      <Flex vertical>
        <Text className="address">{location.address}</Text>
        <Text className="city">{location.city}</Text>
      </Flex>
    </Flex>
  );
};
