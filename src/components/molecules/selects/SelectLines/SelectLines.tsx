import { Dispatch, SetStateAction } from "react";
import { Empty, Flex, Typography } from "antd";

import { SelectChips } from "../SelectChips/SelectChips";
import { IChanel, ISelectedBussinessRules } from "@/types/bre/IBRE";

import "./selectlines.scss";

const { Text } = Typography;
interface Props {
  lines: IChanel;
  selectedBusinessRules: ISelectedBussinessRules;
  setSelectedBusinessRules: Dispatch<SetStateAction<ISelectedBussinessRules>>;
}
export const SelectLines = ({ lines, selectedBusinessRules, setSelectedBusinessRules }: Props) => {
  return (
    <div className="lineSelect">
      <Text>Lineas</Text>
      <Flex vertical>
        <Flex vertical>
          {lines.CHANNEL_LINES?.length > 0 ? (
            <>
              {lines.CHANNEL_LINES.map((line) => (
                <SelectChips
                  key={line.id}
                  lines={[]}
                  channelId={lines.CHANNEL_ID}
                  channelName={line.description}
                  selectedBusinessRules={selectedBusinessRules}
                  setSelectedBusinessRules={setSelectedBusinessRules}
                />
              ))}
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </Flex>
      </Flex>
    </div>
  );
};
