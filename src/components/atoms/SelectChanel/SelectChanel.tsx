import { Dispatch, SetStateAction } from "react";
import { Flex, Typography } from "antd";

import { IChanel } from "@/types/bre/IBRE";
import { SelectChips } from "../SelectChips/SelectChips";

import "./selectchanel.scss";
const { Text } = Typography;
interface Props {
  idActiveLine: number;
  chanels: IChanel[];
  setSelectChannel: Dispatch<SetStateAction<number>>;

  setSelectedSublines: Dispatch<
    SetStateAction<
      {
        idChannel: number;
        idLine: number;
        subline: { id: number; description: string };
      }[]
    >
  >;
  selectedSubLines: {
    idChannel: number;
    idLine: number;
    subline: {
      id: number;
      description: string;
    };
  }[];
}
export const SelectChanel = ({
  idActiveLine,
  chanels,
  selectedSubLines,
  setSelectedSublines,
  setSelectChannel
}: Props) => {
  return (
    <div className="chanelSelect">
      <Text>Canales</Text>
      <Flex vertical>
        <Flex vertical>
          {chanels.map(({ CHANNEL_ID, CHANNEL_NAME }) => {
            const activeChannelSublines = selectedSubLines
              .filter((bre) => bre.idChannel === CHANNEL_ID)
              .map((item) => item.subline);
            const idLine = selectedSubLines
              .filter((bre) => bre.idChannel === CHANNEL_ID)
              .map((item) => item.idLine)[0];
            return (
              <SelectChips
                key={CHANNEL_ID}
                activeBox={CHANNEL_ID === idActiveLine}
                channelId={CHANNEL_ID}
                lineId={idLine}
                selectedSubLines={selectedSubLines}
                setSelectChannel={setSelectChannel}
                setSelectedSublines={setSelectedSublines}
                activeSublines={activeChannelSublines}
                channelName={CHANNEL_NAME}
              />
            );
          })}
        </Flex>
      </Flex>
    </div>
  );
};
