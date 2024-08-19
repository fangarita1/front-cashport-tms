import { Collapse, CollapseProps } from "antd";
import TitleComponent from "../titles/JourneyTitle";

type Props = {
  index: number;
  id_type_service: number;
  start_location_desc: string;
  end_location_desc: string;
  tags: any;
  openTabs: number[];
  setOpenTabs: any;
};
export default function JourneyCollapse({
  index,
  id_type_service,
  start_location_desc,
  end_location_desc,
  openTabs,
  setOpenTabs,
  tags
}: Props) {
  const handleChange = () => {
    if (openTabs.includes(index)) {
      setOpenTabs(openTabs.filter((a) => a !== index));
    } else {
      setOpenTabs([...openTabs, index]);
    }
  };
  const actionsOptionsVehiclesSelection: CollapseProps["items"] = [
    {
      key: `journey-${index}`,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: (
        <TitleComponent
          id_type_service={id_type_service}
          id={index}
          isOpen={openTabs.includes(index)}
          start_location_desc={start_location_desc}
          end_location_desc={end_location_desc}
        />
      ),
      showArrow: false,
      onClick: () => handleChange(),
      children: tags
    }
  ];
  return (
    <Collapse expandIconPosition="end" ghost items={actionsOptionsVehiclesSelection} key={index} />
  );
}
