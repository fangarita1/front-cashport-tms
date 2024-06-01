import { Dispatch, SetStateAction } from "react";
import { Empty, Flex, Spin, Typography } from "antd";
import useSWR from "swr";

import { SelectChanel } from "@/components/molecules/selects/SelectChanel/SelectChanel";

import { useAppStore } from "@/lib/store/store";
import { fetcher } from "@/utils/api/api";
import { IBRE, ISelectedBussinessRules } from "@/types/bre/IBRE";

import "./selectstructure.scss";
interface Props {
  sublinesUser?: number[];
  selectedBusinessRules: ISelectedBussinessRules;

  setSelectedBusinessRules: Dispatch<SetStateAction<ISelectedBussinessRules>>;
}
export const SelectStructure = ({ selectedBusinessRules, setSelectedBusinessRules }: Props) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IBRE>(`/bussines-rule/project/${ID}`, fetcher, {});

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
                chanels={data.data}
                setSelectedBusinessRules={setSelectedBusinessRules}
                selectedBusinessRules={selectedBusinessRules}
              />
            ) : (
              <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
            )}
          </>
        )}
      </Flex>
    </div>
  );
};
