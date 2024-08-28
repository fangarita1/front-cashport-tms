import { Dispatch, SetStateAction } from "react";
import { Flex } from "antd";
import { ButtonGenerateAction } from "@/components/atoms/ButtonGenerateAction/ButtonGenerateAction";
import { CheckSquareOffset } from "phosphor-react";
import { ICarrier, ViewEnum } from "../ModalGenerateActionTO";

const CarrierList = ({
  carriers,
  setSelectedCarrier,
  setSelectedView
}: {
  carriers: ICarrier[];
  setSelectedCarrier: Dispatch<SetStateAction<number | null>>;
  setSelectedView: Dispatch<SetStateAction<ViewEnum>>;
}) => {
  return (
    <Flex style={{ width: "100%", height: "100%" }} gap={24} vertical>
      {carriers.map(({ id, name }, index) => {
        return (
          <ButtonGenerateAction
            key={`carrier-${index}-${id}`}
            icon={<CheckSquareOffset size={20} />}
            title={name}
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
