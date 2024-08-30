import { Flex, Typography } from "antd";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//import "../../../../../../../../styles/_variables_logistics.css";

import "./createGeneralView.scss";
import { SecureRoutesTable } from "@/components/molecules/tables/logistics/secureroutesTable/secureroutesTable";

const { Title } = Typography;

export const CreateGeneralView = () => {
  return (
    <><SecureRoutesTable/></>
  );
};
