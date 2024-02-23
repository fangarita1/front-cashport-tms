import { Checkbox, Flex, Spin, Typography } from "antd";
import useSWR from "swr";
import { fetcher } from "@/utils/api/api";
import { useAppStore } from "@/lib/store/store";
import { IZones } from "@/types/zones/IZones";

import "./selectzone.scss";

export const SelectZone = () => {
  const project = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IZones>(`/zone/project/${project.ID}`, fetcher, {});

  return (
    <div className="selectzone">
      <Typography.Text className="title">Zona</Typography.Text>
      <Flex vertical className="zones">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data?.data.map((zone) => (
              <Flex key={zone.ID} justify="space-between" className="zone">
                <Typography.Text>{zone.ZONE_DESCRIPTION}</Typography.Text>
                <Checkbox className="checboxzone" />
              </Flex>
            ))}
          </>
        )}
      </Flex>
    </div>
  );
};
