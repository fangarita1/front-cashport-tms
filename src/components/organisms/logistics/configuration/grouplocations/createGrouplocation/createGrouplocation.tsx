"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import "../../../../../../styles/_variables_logistics.css";
import "./createGrouplocation.scss";
import { GroupLocationFormTab } from "@/components/molecules/tabs/logisticsForms/grouplocationForm/grouplocationFormTab";
import { addMaterial } from "@/services/logistics/materials";

type Props = {
  params: {
    id: string;
    groupLocationId: string;
  };
};

export const CreateGroupLocationView = ({ params }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (data: any) => {
    try {
        const response = await addMaterial(
          {...data}, 
          data.images
        );  
      if (response && response.status === 200) {
        messageApi.open({
          type: "success",
          content: `El grupo de ubicaciones fue creado exitosamente.`
        });
        push(`/logistics/configuration/grouplocations/all`);//${response.data.data.id}
      }
    } catch (error) {
      if (error instanceof Error) {
        messageApi.open({
          type: "error",
          content: error.message
        });
      } else {
        message.open({
          type: "error",
          content: "Oops, hubo un error por favor intenta más tarde."
        });
      }
    } 
  };
  return (
    <>
      {contextHolder}
      <GroupLocationFormTab
        onSubmitForm={handleSubmit}
        statusForm={"create"}
        params={params}
      />
    </>
  );
};

