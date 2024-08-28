"use client";
import { message } from "antd";
import { useRouter } from "next/navigation";
import "../../../../../../styles/_variables_logistics.css";
import "./createUser.scss";
import { UserFormTab } from "@/components/molecules/tabs/logisticsForms/userForm/userFormTab";
import { addUser } from "@/services/logistics/users";

type Props = {
  params: {
    id: string;
    userId: string;
  };
};

export const CreateUserView = ({ params }: Props) => {
  const { push } = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const handleSubmit = async (data: any) => {
    try {
        const response = await addUser(
          {...data}, 
          data.logo
        );  
      if (response && response.status === 200) {
        messageApi.open({
          type: "success",
          content: `El usuario fue creado exitosamente.`
        });
        push(`/logistics/configuration/users/all`); //${response.data.data.id}
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
      <UserFormTab
        onSubmitForm={handleSubmit}
        statusForm={"create"}
        params={params}
      />
    </>
  );
};

