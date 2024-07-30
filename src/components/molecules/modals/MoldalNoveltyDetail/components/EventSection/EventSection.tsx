import React from "react";
import { Hourglass } from "phosphor-react";
import { Typography, Avatar, Steps } from "antd";
import "./eventsection.scss";
import { IconLabel } from "@/components/atoms/IconLabel/IconLabel";

const { Text } = Typography;
const { Step } = Steps;

interface Event {
  approved_by: string | null;
  rejected_by: string | null;
  created_at: string;
  comments: string;
  files: any[]; // You might want to define a more specific type for files
}

interface EventSectionProps {
  events: Event[];
  currentUserAvatar: string;
}

export const EventSection: React.FC<EventSectionProps> = ({ events, currentUserAvatar }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const getEventUser = (event: Event) => {
    return event.approved_by || event.rejected_by || "Unknown User";
  };

  const getEventAction = (event: Event) => {
    if (event.approved_by) return "Aprobado";
    if (event.rejected_by) return "Rechazado";
    return "Acción desconocida";
  };

  return (
    <div className="event-section">
      <div className="event-header">
        <IconLabel icon={<Hourglass size={20} />} text={`Eventos`} />
      </div>
      <Steps direction="vertical" size="small" className="event-steps">
        {events.map((event, index) => (
          <Step
            key={index}
            status="finish"
            title={
              <div className="event-content">
                <Text strong>{getEventUser(event)}</Text>
                <Text>{event.comments || getEventAction(event)}</Text>
                <Text type="secondary">{formatDate(event.created_at)}</Text>
              </div>
            }
            icon={
              <div className="approval-avatar">{getEventUser(event).charAt(0).toUpperCase()}</div>
            }
          />
        ))}
        <Step
          status="wait"
          icon={<Avatar src={currentUserAvatar} />}
          title={<Text className="add-comment">Agrega un comentario</Text>}
        />
      </Steps>
    </div>
  );
};
