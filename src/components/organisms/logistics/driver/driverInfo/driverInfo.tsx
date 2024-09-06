"use client";
import { Typography, message, Spin } from "antd";
import React, { useCallback, useState } from "react";
import "../../../../../styles/_variables_logistics.css";
import "./driverInfo.scss";
import { DriverFormTab } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab";
import { getDriverById, updateDriver, updateDriverStatus } from "@/services/logistics/drivers";
import { IFormDriver } from "@/types/logistics/schema";
import { StatusForm } from "@/components/molecules/tabs/logisticsForms/driverForm/driverFormTab.mapper";
import { useRouter } from "next/navigation";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import useSWR from "swr";

interface Props {
  params: {
    id: string;
    driverId: string;
  };
}

export const DriverInfoView = ({ params }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [statusForm, setStatusForm] = useState<StatusForm>("review");
  const { push } = useRouter();

  const handleFormState = useCallback((newFormState: StatusForm) => {
    setStatusForm(newFormState);
  }, []);

  const fetcher = async ({ id, key }: { id: string; key: string }) => {
    return getDriverById(params.driverId);
  };

  const { data, isLoading, isValidating } = useSWR({ id: params, key: "1" }, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateOnMount: true
  });

  const handleSubmitForm = async (data: IFormDriver) => {
    data.general.company_id = params.id;
    try {
      const response = await updateDriver(
        data.general,
        data.logo as any,
        data?.files as DocumentCompleteType[]
      );
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El conductor fue editado exitosamente."
        });
        push(`/logistics/providers/${params.id}/driver`);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };
  const handlechangeStatus = async (status: boolean) => {
    try {
      await updateDriverStatus(params.driverId, status);
      messageApi.open({
        type: "success",
        content: "El conductor fue editado exitosamente."
      });
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: error.message
        });
      }
    }
  };

  return (
    <>
      {contextHolder}
      <>
        {isLoading || isValidating ? (
          <Spin />
        ) : (
          <DriverFormTab
            onSubmitForm={handleSubmitForm}
            data={data?.data?.data[0]}
            params={params}
            statusForm={statusForm}
            handleFormState={handleFormState}
            onActiveProject={() => handlechangeStatus(true)}
            onDesactivateProject={() => handlechangeStatus(false)}
          />
        )}
      </>
    </>
  );
};
