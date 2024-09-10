import { Flex } from "antd";
import "./createGeneralView.scss";
import { CarrierTable } from "@/components/molecules/tables/logistics/carrierTable/carrierTable";

export const CreateGeneralView = () => {
  return (
    <Flex className="carrierContainer">
      <CarrierTable />
    </Flex>
  );
};
