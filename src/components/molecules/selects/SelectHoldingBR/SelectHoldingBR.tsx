import { Button, Flex, Popover, Spin, Typography } from "antd";
import useSWR from "swr";
import { Plus, X } from "phosphor-react";

import { fetcher } from "@/utils/api/api";
import { InputCreateZone } from "@/components/atoms/InputCreateZone/InputCreateZone";

import "./selectholdingbr.scss";
import { IHolding } from "@/types/holding/IHolding";

export const SelectHoldingBR = () => {
  const { data, isLoading } = useSWR<IHolding>(`/holding`, fetcher, {});

  return (
    <div className="selectholdingbr">
      <Typography.Text className="title">Holdings</Typography.Text>
      <Flex vertical className="holdings">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data?.data.map((holding) => {
              return (
                <Flex key={holding.id} justify="space-between" className="holding">
                  <Typography.Text>{holding.name}</Typography.Text>
                  <Button icon={<X size={"16px"} />} className="removebutton" />
                </Flex>
              );
            })}
          </>
        )}
        <Popover content={<InputCreateZone isEditAvailable />} trigger="click" placement="bottom">
          <Button icon={<Plus size={"16px"} />} className="addButton" type="text">
            Agregar Holding
          </Button>
        </Popover>
      </Flex>
    </div>
  );
};
