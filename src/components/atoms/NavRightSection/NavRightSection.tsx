import { Flex } from "antd";
// import { CaretDown } from "phosphor-react";

// import { NotificationButton } from "../NotificationButton/NotificationButton";
import Search from "antd/es/input/Search";

interface Props {
  isSearched?: boolean;
}

export const NavRightSection = ({ isSearched = false }: Props) => {
  return (
    <Flex align="center" gap="0.75rem">
      {isSearched && <Search size="large" style={{ width: "300px" }} placeholder="Buscar" />}
      {/* <NotificationButton /> */}
      {/* <Avatar size={"large"}>FM</Avatar>
      <Button type="text" size="large" icon={<CaretDown size={"1.5rem"} />} /> */}
    </Flex>
  );
};
