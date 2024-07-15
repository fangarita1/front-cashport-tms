"use client";
import { message } from "antd";

import "../../../../../styles/_variables_logistics.css";

import "./createVehicle.scss";
import { VehicleFormTab } from "@/components/molecules/tabs/logisticsForms/vehicleForm/vehicleFormTab";

type Props = {
  params: {
    id: string;
  };
};

export const CreateVehicleView = ({ params }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();

  return (
    <>
      {contextHolder}
      <VehicleFormTab
        statusForm={"create"}
        params={{ id: params.id, vehicleId: "0" }}
      ></VehicleFormTab>
    </>
  );
};
