import { ICarrierRequestDrivers } from "@/types/logistics/schema";
import { Flex, Typography } from "antd";
import { DefaultOptionType } from "antd/es/select";
const { Text } = Typography;

interface IDriverLabel {
  drivers: ICarrierRequestDrivers[] | null | undefined;
  selectedValue: DefaultOptionType;
}
function DriverRenderLabel({ selectedValue, drivers }: IDriverLabel) {
  const selectedDriver = drivers?.find((driver) => driver.id === selectedValue.value);
  return (
    selectedDriver && (
      <Flex gap={8} align="center">
        <Flex flex={1}>
          <Text ellipsis strong>{`${selectedDriver.name} ${selectedDriver.last_name}`}</Text>
        </Flex>
        <Flex flex={1} justify="flex-end">
          <Text strong style={{ paddingRight: "1.5rem" }}>
            {selectedDriver.phone}
          </Text>
        </Flex>
      </Flex>
    )
  );
}
export default DriverRenderLabel;
