import { Flex, Typography } from "antd";

// components
import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";

//import "../../../../../../../../styles/_variables_logistics.css";

import "./createGeneralView.scss";
import { GroupLocationsTable } from "@/components/molecules/tables/logistics/grouplocationsTable/grouplocationsTable";

const { Title } = Typography;

export const CreateGeneralView = () => {
  return (
    <><GroupLocationsTable/></>
  );
};
