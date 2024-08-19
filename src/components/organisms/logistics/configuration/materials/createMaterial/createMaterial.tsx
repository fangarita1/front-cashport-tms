"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import "../../../../../../styles/_variables_logistics.css";
import "./createMaterial.scss";
import { MaterialFormTab } from "@/components/molecules/tabs/logisticsForms/materialForm/materialFormTab";
import { addMaterial } from "@/services/logistics/materials";

type Props = {
  params: {
    id: string;
    driverId: string;
  };
};

export const CreateMaterialView = ({ params }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (data: any) => {
    try {
        const response = await addMaterial(
          {...data}, 
          data.files, 
          data.images
        );  
      if (response && response.status === 200) {
        messageApi.open({
          type: "success",
          content: `El material fue creada exitosamente.`
        });
        push(`/logistics/configuration/materials/${params.id}`);
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
      <MaterialFormTab
        onSubmitForm={handleSubmit}
        statusForm={"create"}
        params={params}
      />
    </>
  );
};

