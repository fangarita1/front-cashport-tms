import {
  Typography,
  message,
} from "antd";

// components
import { useRouter } from "next/navigation";

import "../../../../../styles/_variables_logistics.css";

import "./defaultInfoConfig.scss";
import { MaterialsTable } from "@/components/molecules/tables/logistics/materialsTable/materialsTable";
const { Title } = Typography;

export const DefaultInfoConfigView = () => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();
  return (
    <><MaterialsTable></MaterialsTable></>
  );
};
