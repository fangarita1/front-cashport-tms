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
}

const GenericCollapse: FC<CollapseProps> = ({ items }) => {
  return <Collapse className="genericCollapse" ghost accordion items={items} />;
};

export default GenericCollapse;
