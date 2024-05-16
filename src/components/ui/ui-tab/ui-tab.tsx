import { FC, ReactNode } from "react";
import "./ui-tab.scss";
import { Tabs } from "antd";

interface ITab {
  key: string;
  label: string;
  children: ReactNode;
}

interface UiTabProps {
  tabs: ITab[];
}

const UiTab: FC<UiTabProps> = ({ tabs }) => {
  return (
    <div className="tabsContainer">
      <Tabs
        style={{ width: "100%", height: "100%" }}
        defaultActiveKey="1"
        items={tabs}
        size="small"
      />
    </div>
  );
};

export default UiTab;
