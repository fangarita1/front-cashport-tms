"use client";
import React from "react";
import "./notificationsView.scss";
import { Flex, Tabs } from "antd";
import UiSearchInput from "@/components/ui/search-input/search-input";
import FiltersNotifications from "@/components/atoms/Filters/FiltersNotifications/FiltersNotifications";
import { formatDateAndTime } from "@/utils/utils";
import { Check, Eye, X } from "phosphor-react";
import { notifications } from "./mockdata";
import { useModalDetail } from "@/context/ModalContext";

const ListPanel = [
  { key: "pending", value: "Pendientes" },
  { key: "opens", value: "Abiertas" },
  { key: "closed", value: "Cerradas" }
];

interface Notification {
  title: string;
  name: string;
  time: Date;
  description: string;
}

interface Notifications {
  opens: Notification[];
  pending: Notification[];
  closed: Notification[];
}
export const NotificationsView = () => {
  const { openModal } = useModalDetail();
  const renderNotifications = (type: keyof Notifications) => {
    const currentNotifications = notifications[type];
    return currentNotifications?.map((item, index) => (
      <Flex className="notifications__container" key={index}>
        <div className="notifications__list">
          <div className="list-item">
            <div>
              <Flex gap="1rem">
                <p className="item__title">{item.title}</p>
                <p className="item__name">{item.name}</p>
                <p className="item__date">{formatDateAndTime(item.time.toString())}</p>
              </Flex>
              <p className="item__description">{item.description}</p>
            </div>
            <Flex gap="1rem">
              {type === "closed" && (
                <>
                  <div className="label__status">
                    <Check size={14} />
                    Aprobar
                  </div>
                  <div className="label__status">
                    <X size={14} />
                    Rechazar
                  </div>
                </>
              )}
              <div className="eyeIcon" onClick={() => openModal("novelty", { noveltyId: item.id })}>
                <Eye size={28} />
              </div>
            </Flex>
          </div>
        </div>
      </Flex>
    ));
  };

  return (
    <div className="notificationView">
      <Tabs
        defaultActiveKey="1"
        style={{ height: 220 }}
        items={ListPanel.map((item, i) => {
          return {
            label: `${item.value}`,
            key: String(i),
            children: (
              <Flex vertical>
                <Flex className="searchBar__container">
                  <UiSearchInput
                    placeholder="Buscar"
                    onChange={(event) => {
                      setTimeout(() => {
                        console.info(event.target.value);
                      }, 1000);
                    }}
                  />
                  <FiltersNotifications />
                </Flex>
                {renderNotifications(item.key as keyof Notifications)}
              </Flex>
            )
          };
        })}
      />
    </div>
  );
};
