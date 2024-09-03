"use client";
import { Typography, message, Spin } from "antd";
import React, { useCallback, useState } from "react";
import "../../../../../../styles/_variables_logistics.css";
import "./userInfo.scss";
import { getLocationById, updateLocation, updateLocationStatus } from "@/services/logistics/locations";
import { IFormUser, IUser } from "@/types/logistics/schema";
import { StatusForm } from "@/components/molecules/tabs/logisticsForms/locationForm/locationFormTab.mapper";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { UserFormTab } from "@/components/molecules/tabs/logisticsForms/userForm/userFormTab";
import { getUserById, updateUser, updateUserStatus} from "@/services/logistics/users";
interface Props {
  params: {
    id: string;
    userId: string;
  };
}

export const UserInfoView = ({ params }: Props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [statusForm, setStatusForm]= useState<StatusForm>("review")
  const { push } = useRouter();

  //console.log(params)
  const handleFormState = useCallback((newFormState:StatusForm) => {
    setStatusForm(newFormState);
  }, []);

  const fetcher = async ({ id, key }: { id: string; key: string }) => {
    return getUserById(params.id);
  };

  const { data, isLoading } = useSWR({ id: params, key: "1" }, fetcher,     
    { revalidateIfStale:false,
    revalidateOnFocus:false,
    revalidateOnReconnect:false
  });

  const handleSubmitForm = async (dataform: any) => {
    const sendata:IFormUser={
      general: dataform as unknown as IUser,
      logo: dataform.logo
    }
    sendata.general.id = Number(params.id);
    try {

      const response = await updateUser(
        {...dataform}, 
        dataform.logo
      );  
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El usuario fue editado exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/users/all`);
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
      const response = await updateUserStatus(params.id,'1');
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El usuario fue editado exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/users/all`);
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
      const response = await updateUserStatus(params.id,'0');
      if (response.status === 200) {
        messageApi.open({
          type: "success",
          content: "El usuario fue editado exitosamente."
        });
        setStatusForm('review');
        push(`/logistics/configuration/users/all`);
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
          <UserFormTab
            onSubmitForm={handleSubmitForm}
            data={data?.data?.data as unknown as IUser}
            params={params}
            statusForm={statusForm}
            handleFormState={handleFormState}
            onActiveUser={handleActivation}
            onDesactivateUser={handleDesactivation}
          />
        )}
      </>
    </>
  );
};
