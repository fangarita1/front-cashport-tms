import { Dispatch, SetStateAction, useState } from "react";
import { Empty, Flex, Spin, Typography } from "antd";
import useSWR from "swr";

import { SelectChanel } from "@/components/atoms/SelectChanel/SelectChanel";
import { SelectLines } from "@/components/atoms/SelectLines/SelectLines";

import { useAppStore } from "@/lib/store/store";
import { fetcher } from "@/utils/api/api";

import { IBRE } from "@/types/bre/IBRE";

import "./selectstructure.scss";
interface Props {
  selectedSublines: {
    idChannel: number;
    idLine: number;
    subline: {
      id: number;
      description: string;
    };
  }[];
  setSelectedSublines: Dispatch<
    SetStateAction<
      {
        idChannel: number;
        idLine: number;
        subline: {
          id: number;
          description: string;
        };
      }[]
    >
  >;
}
export const SelectStructure = ({ selectedSublines, setSelectedSublines }: Props) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IBRE>(`/bussines-rule/project/${ID}`, fetcher, {});

  const [selectChannel, setSelectChannel] = useState(0);

  const selectLine =
    selectChannel !== 0 ? data?.data.filter((channel) => channel.CHANNEL_ID === selectChannel) : [];

  return (
    <div className="selectstructure">
      <Typography.Text className="title">Estructura</Typography.Text>
      <Flex className="structure" gap={"1rem"}>
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data?.data ? (
              <SelectChanel
                idActiveLine={selectChannel}
                setSelectChannel={setSelectChannel}
                chanels={data.data}
                setSelectedSublines={setSelectedSublines}
                selectedSubLines={selectedSublines}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
            {selectLine?.[0] && (
              <SelectLines
                lines={selectLine[0]}
                selectedSubLines={selectedSublines}
                setSelectedSublines={setSelectedSublines}
              />
            )}
          </>
        )}
      </Flex>
    </div>
  );
};
