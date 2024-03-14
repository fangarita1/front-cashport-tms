import { Button, Flex, Popover, Spin, Typography } from "antd";
import useSWR from "swr";
import { Plus, X } from "phosphor-react";

import { fetcher } from "@/utils/api/api";
import { useAppStore } from "@/lib/store/store";
import { IZones } from "@/types/zones/IZones";
import { InputCreateZone } from "@/components/atoms/InputCreateZone/InputCreateZone";

import "./selectzonebr.scss";

export const SelectZoneBR = () => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, isLoading } = useSWR<IZones>(`/zone/project/${ID}`, fetcher, {});

  return (
    <div className="selectzonebr">
      <Typography.Text className="title">Zonas</Typography.Text>
      <Flex vertical className="zones">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data?.data.map((zone) => {
              return (
                <Flex key={zone.ID} justify="space-between" className="zone">
                  <Typography.Text>{zone.ZONE_DESCRIPTION}</Typography.Text>
                  <Button icon={<X size={"16px"} />} className="removebutton" />
                </Flex>
              );
            })}
          </>
        )}
        <Popover content={<InputCreateZone isEditAvailable />} trigger="click" placement="bottom">
          <Button icon={<Plus size={"16px"} />} className="addButton" type="text">
            Agregar zona
          </Button>
        </Popover>
      </Flex>
    </div>
  );
};
