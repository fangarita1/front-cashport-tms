import { List, Popover, Tabs } from "antd";
import React from "react";
import "./popoverUserNotifications.scss";
import Link from "next/link";
import { BellSimpleRinging, Eye } from "phosphor-react";
import { timeAgo } from "@/utils/utils";
import TabPane from "antd/es/tabs/TabPane";

interface PopoverUserNotificationsProps {
  setIsPopoverVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isPopoverVisible: boolean;
}

export const PopoverUserNotifications: React.FC<PopoverUserNotificationsProps> = ({
  setIsPopoverVisible,
  isPopoverVisible
}) => {
  const handleVisibleChange = (visible: boolean) => {
    setIsPopoverVisible(visible);
  };

  const notifications = {
    opens: [
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 16",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 24 * 30)
      }
    ],
    pending: [
      {
        title: "Notificacion 1",
        name: "Descripcion de la notificacion 1",
        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 12",
        name: "Descripcion de la notificacion 1",

        time: new Date(Date.now() - 3600000)
      },
      {
        title: "Notificacion 13",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 2)
      },
      {
        title: "Notificacion 14",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 24)
      },
      {
        title: "Notificacion 15",
        name: "Farmatodo",

        time: new Date(Date.now() - 3600000 * 8)
      },
      {
        title: "Notificacion 16",
        name: "Farmatodo",
        time: new Date(Date.now() - 3600000 * 24 * 30)
      }
    ]
  };
  const content = (
    <div className="notificationsPopoverContent">
      <div className="modalTitle">
        <div className="title__text">
          <p>Notificaciones</p>
        </div>
        <div>
          <Link href="/notificaciones" passHref>
            Ver todo
          </Link>
        </div>
      </div>
      {/* por tabs  pendiente , abiertos, rechazados*/}
      <Tabs defaultActiveKey="1">
        <TabPane
          tab={`Pendientes ${notifications?.opens.length > 0 ? `(${notifications?.opens.length})` : ""}`}
          key="1"
        >
          <List
            itemLayout="horizontal"
            dataSource={notifications.opens}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <p className="item__title">{item.title}</p>
                  <p className="item__name">{item.name}</p>
                  <p className="item__date">{timeAgo(item.time.toString())}</p>
                </div>
                <div className="eyeIcon">
                  <Eye size={28} />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane
          tab={`Abiertos ${notifications?.pending.length > 0 ? `(${notifications?.pending.length})` : ""}`}
          key="2"
        >
          <List
            itemLayout="horizontal"
            dataSource={notifications.pending}
            renderItem={(item) => (
              <List.Item>
                <div>
                  <p className="item__title">{item.title}</p>
                  <p className="item__name">{item.name}</p>
                  <p className="item__date">{timeAgo(item.time.toString())}</p>
                </div>
                <div className="eyeIcon">
                  <Eye size={28} />
                </div>
              </List.Item>
            )}
          />
        </TabPane>
        <TabPane tab="Cerradas" key="3"></TabPane>
      </Tabs>
    </div>
  );

  return (
    <Popover
      content={content}
      title={null}
      trigger="click"
      open={isPopoverVisible}
      onOpenChange={handleVisibleChange}
      placement="bottomLeft"
      overlayClassName="notificationsPopover"
      arrow={false}
    >
      <div className="notificationsWrapper">
        <div className={`notifications ${notifications?.pending.length > 0 ? "notifications_active" : ""}`}>
          <BellSimpleRinging />
          {notifications?.pending.length> 0 && (
            <span className="notificationsLength">{notifications?.pending.length}</span>
          )}
        </div>
      </div>
    </Popover>
  );
};
