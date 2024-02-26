import { Dispatch, SetStateAction } from "react";
import { Checkbox, Flex, Tag, Typography } from "antd";
import { CheckCircle } from "phosphor-react";

import { Subline } from "@/types/bre/IBRE";

import "./selectchips.scss";

const { Text } = Typography;

interface Props {
  channelId: number;
  lineId: number;
  channelName: string;
  activeSublines?: Subline[];
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
  activeBox?: boolean;
  setSelectChannel?: Dispatch<SetStateAction<number>>;
}

export const SelectChips = ({
  activeBox,
  channelName,
  activeSublines = [],
  channelId,
  lineId,
  selectedSubLines = [],
  setSelectChannel,
  setSelectedSublines = () => {}
}: Props) => {
  const onOpenChannel = ({ target }: any) => {
    setSelectChannel ? setSelectChannel(target.checked ? channelId : 0) : () => {};
  };
  const onSelectSubline = (idSubline: number, description: string, isActiveSubline: boolean) => {
    if (isActiveSubline) {
      const desactivatedSublines = selectedSubLines.filter(
        (subline) => subline.subline.id !== idSubline
      );
      return setSelectedSublines(desactivatedSublines);
    }
    setSelectedSublines((s) => [
      ...s,
      {
        idChannel: channelId,
        idLine: lineId,
        subline: {
          id: idSubline,
          description: description
        }
      }
    ]);
  };

  return (
    <Flex className="selectchips" vertical>
      <Flex component="header" justify="space-between" className="headerselectchips">
        <Text className="titleLine">{channelName}</Text>
        {setSelectChannel && <Checkbox checked={activeBox} onClick={onOpenChannel} />}
      </Flex>
      <Flex component="main" className="mainTags">
        {activeSublines?.length > 0 ? (
          <>
            {activeSublines.map(({ id, description }) => {
              const activeSubline = selectedSubLines.filter((subline) => subline.subline.id === id);
              return (
                <Tag
                  key={id}
                  closeIcon={
                    <CheckCircle
                      color={activeSubline[0] ? "green" : "gray"}
                      onClick={() => onSelectSubline(id, description, !!activeSubline[0])}
                      size={"1.4rem"}
                    />
                  }
                  className="tag"
                >
                  {description}
                </Tag>
              );
            })}
          </>
        ) : (
          <Text>Sin sublineas actualmente.</Text>
        )}
      </Flex>
    </Flex>
  );
};
