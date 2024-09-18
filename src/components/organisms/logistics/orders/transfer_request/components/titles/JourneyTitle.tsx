import { CraneTower } from "@phosphor-icons/react";
import { Tooltip, Typography } from "antd";
import { CaretDown, Truck, User, Users } from "phosphor-react";

const { Text } = Typography;

type Props = {
  id_type_service: number;
  id: number;
  isOpen: boolean;
  start_location_desc: string;
  end_location_desc: string;
  handleChange: () => void;
  is_community?: boolean;
  community_name?: string;
};
const TitleComponent = ({
  id_type_service,
  id,
  isOpen,
  start_location_desc,
  end_location_desc,
  is_community = false,
  community_name,
  handleChange
}: Props) => {
  const serviceType =
    id_type_service === 1
      ? { title: "Carga", icon: <Truck size={27} color="#FFFFFF" weight="fill" /> }
      : id_type_service === 2
        ? { title: "Izaje", icon: <CraneTower size={27} color="#FFFFFF" weight="fill" /> }
        : { title: "Personal", icon: <User size={27} color="#FFFFFF" weight="fill" /> };

  return (
    <div className="collapseHeader" onClick={() => handleChange()}>
      <div className="collapseJustify">
        <div style={{ display: "flex", gap: 16 }}>
          <div className="collapseStateContainer">
            {serviceType.icon}
            <Text className="collapseState">{serviceType.title}</Text>
          </div>
          {is_community && (
            <Tooltip title={`Comunidad: ${community_name}`}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: 8,
                  borderRadius: 4,
                  background: "#F62A2A26",
                  cursor: "pointer"
                }}
              >
                <Users color="#F62A2A" size={26} />
              </div>
            </Tooltip>
          )}
        </div>
        <div>
          <CaretDown className={`collapseCaret ${isOpen && "collapseRotate"}`} size={24} />
        </div>
      </div>
      <div className="collapseFromTo">
        <div className="collapseFromToContainer">
          <Text className="collapseTitle">Origen</Text>
          <Text className="collapseSubtitle">{start_location_desc}</Text>
        </div>
        <div className="collapseFromToContainer collapseRight">
          <div className="collapseFromToContainer">
            <Text className="collapseTitle">Destino</Text>
            <Text className="collapseSubtitle">{end_location_desc}</Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitleComponent;
