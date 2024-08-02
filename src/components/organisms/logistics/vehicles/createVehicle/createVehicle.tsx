"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import "../../../../../styles/_variables_logistics.css";
import "./createVehicle.scss";
import { VehicleFormTab } from "@/components/molecules/tabs/logisticsForms/vehicleForm/vehicleFormTab";
import { addVehicle } from "@/services/logistics/vehicle";

type Props = {
  params: {
    id: string;
    vehicleId: string;
  };
};

export const CreateVehicleView = ({ params }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (data: any) => {
    try {
        const response = await addVehicle(
          {...data}, 
          data.files, 
          data.images
        );  
      if (response && response.status === 200) {
        messageApi.open({
          type: "success",
          content: `El vehículo fue creado exitosamente.`
        });
        push(`/logistics/providers/${params.id}/vehicle`);
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
      <VehicleFormTab
        onSubmitForm={handleSubmit}
        statusForm={"create"}
        params={params}
      />
    </>
  );
};
