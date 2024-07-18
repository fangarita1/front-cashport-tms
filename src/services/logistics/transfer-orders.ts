import axios, { AxiosResponse } from "axios";

import { getIdToken } from "@/utils/api/api";
import config from "@/config";
import { ICreateRegister, ITransferOrder, TransferOrderDocumentType } from "@/types/logistics/schema";

export const addTransferOrder = async (
    data: ITransferOrder,
    files: TransferOrderDocumentType[]
  ): Promise<AxiosResponse<any, any>> => {
    try {
      const token = await getIdToken();
      const form = new FormData();
      const body: any = data;
      body.files = files
      form.append("body", JSON.stringify({...body}));
      if(files != undefined){
        files.forEach((file) => {
          if (!file.file) throw new Error(`El archivo ${file.description} no se puede cargar`);
          form.append(`file-for-${file.id}`, file.file);
        });
      }
      const response = await axios.post(`${config.API_HOST}/transfer-order/create`, form, {
        headers: {
          "content-type": "multipart/form-data",
          Accept: "application/json, text/plain, */*",
          Authorization: `Bearer ${token}`
        }
      });
      return response;
    } catch (error) {
      console.log("Error post transfer-order/: ", error);
      throw error as any;
    }
  };