import { Dispatch, SetStateAction } from "react";
import { Flex } from "antd";
import { ButtonGenerateAction } from "@/components/atoms/ButtonGenerateAction/ButtonGenerateAction";
import { CheckSquareOffset } from "phosphor-react";
import { ViewEnum } from "../ModalGenerateActionTO";
import { BillingByCarrier } from "@/types/logistics/billing/billing";

const CarrierList = ({
  carriers,
  setSelectedCarrier,
  setSelectedView
}: {
  carriers: BillingByCarrier[];
  setSelectedCarrier: Dispatch<SetStateAction<number | null>>;
  setSelectedView: Dispatch<SetStateAction<ViewEnum>>;
}) => {
  return (
    <Flex style={{ width: "100%", height: "100%" }} gap={24} vertical>
      {carriers.map(({ id, carrier }, index) => {
        return (
          <ButtonGenerateAction
            key={`carrier-${index}-${id}`}
            icon={<CheckSquareOffset size={20} />}
            title={carrier}
            onClick={() => {
              setSelectedCarrier(id);
              setSelectedView(ViewEnum.PREAUTHORIZE_TRIP);
            }}
          />
        );
      })}
    </Flex>
  );
};

export default CarrierList;
