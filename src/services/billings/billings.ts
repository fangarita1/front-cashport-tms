import axios from "axios";

import { API, getIdToken } from "@/utils/api/api";
import config from "@/config";
import {
  IBillingsRequestList,
  IBillingDetails,
  IIncident,
  IJourney,
  ITripBilling,
  IBillingRequestsListDetail,
  IPreauthorizedRequest,
  PreAuthorizationRequestData
} from "@/types/logistics/schema";
import { GenericResponse } from "@/types/global/IGlobal";
import {
  Invoice,
  PA,
  PreAutorizationInfo,
  UploadInvoiceForm
} from "@/components/molecules/modals/ModalBillingAction/UploadInvoice/controllers/uploadinvoice.types";
import dayjs from "dayjs";

export const getAllBillingList = async (): Promise<IBillingsRequestList[]> => {
  try {
    const response: GenericResponse<IBillingsRequestList[]> =
      await API.get(`/logistic-billing/all`);
    return response.data;
  } catch (error) {
    console.log("Error get all getAllBillingList: ", error);
    return error as any;
  }
};

export const getBillingDetailsById = async (id: string): Promise<IBillingDetails | undefined> => {
  try {
    const response: GenericResponse<IBillingDetails> = await API.get(`/logistic-billing/${id}`);
    if (response.data) {
      return response.data;
    } else {
      console.log(`Error: ${response.data}`);
    }
  } catch (error) {
    console.log(`Error getBillingDetailsById: `, error);
    return error as any;
  }
};

export const getAceptBilling = async (idBilling: number): Promise<boolean | undefined> => {
  try {
    const response: GenericResponse<boolean> = await API.get(
      `/logistic-billing/aceptBilling/${idBilling}`
    );
    console.log("response getAceptBilling", response);
    if (response.data) {
      return response.data;
    } else return false;
  } catch (error) {
    console.log(`Error getAceptBilling: `, error);
    return error as any;
  }
};

export const getPreauthorizedInfo = async (
  idBilling: number
): Promise<PreAuthorizationRequestData[] | undefined> => {
  try {
    const response: GenericResponse<IPreauthorizedRequest> = await API.get(
      `/logistic-billing/modal-invoice/${idBilling}`
    );

    console.log("response getPreauthorizedInfo", response);
    if (response.data) {
      return response?.data?.authorizations;
    } else {
      console.log(`Error getPreauthorizedInfo: `);
    }
  } catch (error) {
    console.log(`Error getPreauthorizedInfo: `, error);
    return error as any;
  }
};
function createFormData(uploadForm: UploadInvoiceForm): FormData {
  const formData = new FormData();
  const body = uploadForm.pas.map((pa: PA) => {
    const invoice: Invoice = pa.invoice;
    const authorization: PreAutorizationInfo = pa.info;
    return {
      id: authorization.id,
      idInvoice: invoice.id.toString(),
      date: dayjs(invoice.date).format("YYYY-MM-DD"),
      amount: invoice.value,
      invoiceFile: invoice?.pdfFile?.file?.name,
      xmlFile: invoice?.xmlFile?.file?.name
    };
  });
  formData.append("request", JSON.stringify({ invoice: [...body] }));
  uploadForm.pas.forEach((pa) => {
    if (pa?.invoice?.pdfFile?.file) {
      formData.append(`${pa?.invoice?.pdfFile?.file?.name}`, pa?.invoice?.pdfFile?.file);
    }
    if (pa?.invoice?.xmlFile?.file) {
      formData.append(`${pa?.invoice?.xmlFile?.file?.name}`, pa?.invoice?.xmlFile?.file);
    }
  });
  return formData;
}

export const sendInvoices = async (
  dataForm: UploadInvoiceForm,
  idBilling: number
): Promise<boolean | undefined> => {
  try {
    const token = await getIdToken();
    const response: any = await axios.post(
      `${config.API_HOST}/logistic-billing/invoice/${idBilling}`,
      createFormData(dataForm),
      {
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        }
      }
    );

    console.log("response sendInvoices", response);
    if (response.success) {
      return true;
    }
  } catch (error) {
    console.log(`Error sendInvoices: `, error);
    return false;
  }
};
