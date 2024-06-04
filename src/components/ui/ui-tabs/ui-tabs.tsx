import { FC, useState } from "react";
import styles from "./ui-tabs.module.scss";

interface UiTabsProps {
  tabs: string[];
  initialTabIndex?: number;
  className?: string;
  onTabClick: (index: number) => void;
}

const UiTabs: FC<UiTabsProps> = ({ tabs, initialTabIndex = 0, className, onTabClick }) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState<number>(initialTabIndex);

  const handleTabClick = (index: number) => {
    setSelectedTabIndex(index);
    onTabClick(index);
  };

  return (
    <div className={`${styles.tabs} ${className}`}>
      {tabs.map((tab, index) => (
        <div
          key={`ui-tabs-tab-${tab}`}
          className={`${styles.tab} ${selectedTabIndex === index ? styles.active : ""}`}
          onClick={() => handleTabClick(index)}
        >
          {tab}
        </div>
      ))}
    </div>
  );
};

export default UiTabs;
