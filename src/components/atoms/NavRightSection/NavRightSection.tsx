import { Flex } from "antd";
import Search from "antd/es/input/Search";

interface Props {
  isSearched?: boolean;
}

export const NavRightSection = ({ isSearched = false }: Props) => {
  return (
    <Flex align="center" gap="0.75rem">
      {isSearched && <Search size="large" style={{ width: "300px" }} placeholder="Buscar" />}
    </Flex>
  );
};
