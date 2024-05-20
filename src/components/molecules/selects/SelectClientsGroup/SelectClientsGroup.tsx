import { Dispatch, SetStateAction } from "react";
import { Checkbox, Flex, Spin, Typography } from "antd";

import { useAppStore } from "@/lib/store/store";

import "./selectClientsGroup.scss";
import { useClientsGroups } from "@/hooks/useClientsGroups";

interface Props {
  assignedGroups: number[];
  setAssignedGroups: Dispatch<SetStateAction<number[]>>;
}

export const SelectClientsGroup = ({ assignedGroups, setAssignedGroups }: Props) => {
  const { ID } = useAppStore((state) => state.selectProject);
  const { data, loading: isLoading } = useClientsGroups({
    idProject: `${ID}`
  });

  return (
    <div className="selectClientsGroup">
      <Typography.Text className="title">Grupos de clientes</Typography.Text>
      <Flex vertical className="cardGroups">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data.map((group) => {
              return (
                <Flex key={group.id} justify="space-between" className="cardGroups__group">
                  <Typography.Text>{group.group_name}</Typography.Text>
                  <Checkbox
                    onChange={(e) => {
                      if (e.target.checked) {
                        if (!assignedGroups.includes(group.id)) {
                          setAssignedGroups([...assignedGroups, group.id]);
                        }
                      } else {
                        setAssignedGroups(assignedGroups.filter((id) => id !== group.id));
                      }
                    }}
                    className="checboxzone"
                  />
                </Flex>
              );
            })}
          </>
        )}
      </Flex>
    </div>
  );
};
