import { Button } from "antd";
import { Bell } from "phosphor-react";

import "./notificationbutton.scss";

export const NotificationButton = () => {
  return (
    <Button
      type="primary"
      size="large"
      className="notificationbutton"
      icon={<Bell size="1.5rem" />}
    />
  );
};
