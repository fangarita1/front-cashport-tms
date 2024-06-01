import { Dispatch, SetStateAction, useCallback } from "react";
import { Checkbox, Flex, Tag, Typography } from "antd";

import { ISelectedBussinessRules, Line } from "@/types/bre/IBRE";

import "./selectchips.scss";

const { Text } = Typography;

interface Props {
  channelId: number;
  channelName: string;
  setSelectedBusinessRules: Dispatch<SetStateAction<ISelectedBussinessRules>>;
  selectedBusinessRules: ISelectedBussinessRules;
  lines: Line[];
}

export const SelectChips = ({
  channelName,
  lines,
  channelId,
  selectedBusinessRules,
  setSelectedBusinessRules = () => {}
}: Props) => {
  const {
    channels: selectedChannelsId,
    lines: selectedLinesId,
    sublines: selectedSublinesId
  } = selectedBusinessRules;

  const onChannelSelected = (channelId: number) => {
    return selectedChannelsId.some((id) => id === channelId);
  };

  const onLineSelected = (lineId: number) => {
    return selectedLinesId.some((id) => id === lineId);
  };

  const onSublineSelected = (sublineId: number) => {
    return selectedSublinesId.some((id) => id === sublineId);
  };

  const handleChannelChange = useCallback(() => {
    setSelectedBusinessRules((prev) => {
      const isChannelSelected = prev.channels.includes(channelId);
      const updatedChannels = isChannelSelected
        ? prev.channels.filter((id) => id !== channelId)
        : [...prev.channels, channelId];
      return { ...prev, channels: updatedChannels };
    });
  }, [channelId, setSelectedBusinessRules]);

  const handleLineChange = useCallback(
    (lineId: number) => {
      setSelectedBusinessRules((prev) => {
        const isLineSelected = prev.lines.includes(lineId);
        const updatedLines = isLineSelected
          ? prev.lines.filter((id) => id !== lineId)
          : [...prev.lines, lineId];
        return { ...prev, lines: updatedLines };
      });
    },
    [setSelectedBusinessRules]
  );

  const handleSublineChange = useCallback(
    (sublineId: number) => {
      setSelectedBusinessRules((prev) => {
        const isSublineSelected = prev.sublines.includes(sublineId);
        const updatedSublines = isSublineSelected
          ? prev.sublines.filter((id) => id !== sublineId)
          : [...prev.sublines, sublineId];
        return { ...prev, sublines: updatedSublines };
      });
    },
    [setSelectedBusinessRules]
  );

  return (
    <Flex className="selectchips" vertical>
      <Flex component="header" justify="space-between" className="headerselectchips">
        <Text className="titleChannel">{channelName}</Text>
        {lines && (
          <Checkbox checked={onChannelSelected(channelId)} onChange={handleChannelChange} />
        )}
      </Flex>
      <Flex component="main" className="mainTags">
        {lines?.length > 0 ? (
          lines.map((line) => (
            <Flex key={line.id} vertical className="line">
              <Flex justify="space-between">
                <Text className="titleLine">{line.description}</Text>
                <Checkbox
                  checked={onLineSelected(line.id)}
                  onChange={() => handleLineChange(line.id)}
                />
              </Flex>
              <Flex className="sublines">
                {line.sublines?.length > 0 ? (
                  <>
                    {line.sublines.map((subline) => {
                      return (
                        <Tag key={subline.id} className="tag">
                          {subline.description}
                          <Checkbox
                            checked={onSublineSelected(subline.id)}
                            onChange={() => handleSublineChange(subline.id)}
                          />
                        </Tag>
                      );
                    })}
                  </>
                ) : (
                  <Text>Sin sublineas actualmente.</Text>
                )}
              </Flex>
            </Flex>
          ))
        ) : (
          <Text>Sin Lineas actualmente.</Text>
        )}
      </Flex>
    </Flex>
  );
};
