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
  sticky?: boolean;
  tabBarExtraContent?: ReactNode;
}

const UiTab: FC<UiTabProps> = ({ tabs, tabBarExtraContent, sticky = false }: UiTabProps) => {
  return (
    <div className={`tabsContainer ${sticky && "-sticky"}`}>
      <Tabs
        style={{ width: "100%", height: "100%" }}
        defaultActiveKey="1"
        items={tabs}
        tabBarExtraContent={tabBarExtraContent}
        size="small"
      />
    </div>
  );
};

export default UiTab;
