import { Flex, Typography } from "antd";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//import "../../../../../../../../styles/_variables_logistics.css";

import "./createGeneralView.scss";
import { UsersTable } from "@/components/molecules/tables/logistics/usersTable/usersTable";

const { Title } = Typography;

export const CreateGeneralView = () => {
  return (
    <><UsersTable/></>
  );
};
