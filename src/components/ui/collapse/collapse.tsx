import { FC } from "react";
import { Collapse, CollapsePanelProps } from "antd";
import "./collapse.scss";

interface ItemCollapse {
  key?: any;
  label?: CollapsePanelProps["header"];
  children?: CollapsePanelProps["children"];
}

interface CollapseProps {
  items: ItemCollapse[] | undefined;
  accordion?: boolean;
}

const GenericCollapse: FC<CollapseProps> = ({ items, accordion }) => {
  return <Collapse className="genericCollapse" ghost items={items} accordion={accordion} />;
};

export default GenericCollapse;
