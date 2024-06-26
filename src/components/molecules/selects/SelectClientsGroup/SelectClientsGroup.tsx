import { Dispatch, SetStateAction } from "react";
import { Checkbox, Flex, Spin, Typography } from "antd";
import { useClientsGroups } from "@/hooks/useClientsGroups";

import "./selectClientsGroup.scss";

interface Props {
  userID: number;
  projectID: number;
  disabled?: boolean;
  assignedGroups: number[];
  setAssignedGroups: Dispatch<SetStateAction<any>>;
}

export const SelectClientsGroup = ({
  projectID,
  disabled,
  assignedGroups,
  setAssignedGroups
}: Props) => {
  const { data, loading: isLoading } = useClientsGroups({
    idProject: `${projectID}`
  });

  return (
    <div className="selectClientsGroup">
      <Typography.Text className="title">Grupos de clientes</Typography.Text>
      <Flex vertical className="cardGroups">
        {isLoading ? (
          <Spin />
        ) : (
          <>
            {data?.data.map((group) => {
              return (
                <Flex key={group.id} justify="space-between" className="cardGroups__group">
                  <Typography.Text>{group.group_name}</Typography.Text>
                  <Checkbox
                    checked={assignedGroups?.includes(group.id)}
                    disabled={disabled}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setAssignedGroups([...assignedGroups, group.id]);
                      } else {
                        setAssignedGroups(assignedGroups?.filter((id) => id !== group.id));
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
