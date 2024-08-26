"use client";
import { Typography, message, Spin } from "antd";
import React, { useCallback, useState } from "react";
import "../../../../../../styles/_variables_logistics.css";
import "./locationInfo.scss";
import { getLocationById, updateLocation, updateLocationStatus } from "@/services/logistics/locations";
import { IFormLocation, ILocation } from "@/types/logistics/schema";
import { StatusForm } from "@/components/molecules/tabs/logisticsForms/locationForm/locationFormTab.mapper";
import { useRouter } from "next/navigation";
import { DocumentCompleteType } from "@/types/logistics/certificate/certificate";
import useSWR from "swr";
import { LocationFormTab } from "@/components/molecules/tabs/logisticsForms/locationForm/locationFormTab";

interface Props {
  params: {
    id: string;
    locationId: string;
  };
}

export const LocationInfoView = ({ params }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [statusForm, setStatusForm]= useState<StatusForm>("review")
  const { push } = useRouter();

  //console.log(params)
  const handleFormState = useCallback((newFormState:StatusForm) => {
    setStatusForm(newFormState);
  }, []);

  const fetcher = async ({ id, key }: { id: string; key: string }) => {
    return getLocationById(params.id);
  };

  const { data, isLoading } = useSWR({ id: params, key: "1" }, fetcher,     
    { revalidateIfStale:false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false
  });

  const handleSubmitForm = async (dataform: IFormLocation) => {
    const sendata:IFormLocation={
      general: dataform as unknown as ILocation,
      images: [],
      IS_ACTIVE: true
    }
    sendata.general.id = Number(params.id);
    try {
      const response = await updateLocation(
        sendata.general,
        dataform?.files as DocumentCompleteType[]
      );
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "La ubicación fue editada exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/locations/${params.id}`);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };

  const handleActivation= async() =>{
    console.log('active')
    try {
      const response = await updateLocationStatus(params.id,'1');
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "La ubicación fue editada exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/locations/${params.id}`);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };

  const handleDesactivation= async() =>{
    console.log('desactive')
    try {
      const response = await updateLocationStatus(params.id,'0');
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "La ubicación fue editada exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/locations/${params.id}`);
      }
    } catch (error) {
      messageApi.open({
        type: "error",
        content: "Oops, hubo un error por favor intenta mas tarde."
      });
    }
  };

  return (
    <>
      {contextHolder}
      <>
      {isLoading ? (
          <Spin/>
        ) : (
          <LocationFormTab
            onSubmitForm={handleSubmitForm}
            data={data?.data?.data[0]}
            params={params}
            statusForm={statusForm}
            handleFormState={handleFormState}
            onActiveLocation={handleActivation}
            onDesactivateLocation={handleDesactivation}
          />
        )}
      </>
    </>
  );
};
