import { Metadata } from "next";
import Notification from "./page";
import Header from "@/components/organisms/header";
import { SideBar } from "@/components/molecules/SideBar/SideBar";

export const metadata: Metadata = {
  title: "Notificaciones",
  description: "notificaciones por usuario"
};
const NotificationLayout = () => {
  return (
    <div className="page">
      <SideBar />
      <div className="mainContent">
        <Header title="Notificationes" />
        <Notification />
      </div>
    </div>
  );
};
export default NotificationLayout;
