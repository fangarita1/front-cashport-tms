import { FileObject } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { DiscountSchema } from "@/components/organisms/discounts/create/resolvers/generalResolver";
import { DiscountBasics, DiscountGetOne } from "@/types/discount/DiscountBasics";
import { DiscountContractRange } from "@/types/discount/DiscountContractRange";
import { GenericResponse, GenericResponsePage } from "@/types/global/IGlobal";
import { API } from "@/utils/api/api";

const defaultRes = {
  data: [],
  pagination: {
    totalPages: 1,
    actualPage: 1,
    rowsperpage: 0,
    totalRows: 0
  }
};

export const getAllDiscounts = async ({
  projectId,
  params
}: {
  projectId: number;
  params?: Record<string, string | number>;
}): Promise<GenericResponsePage<DiscountBasics[]>> => {
  const response: GenericResponsePage<DiscountBasics[]> = await API.get(
    `/discount/project/${projectId}`,
    {
      params
    }
  );
  return response.success ? response : { ...defaultRes, ...response };
};

export const deleteDiscount = async (ids: number[]) => {
  const res = ids.map((id) => API.delete(`/discount/${id}`));
  return Promise.all(res);
};

export const deactivateDiscount = async (id: number, status: boolean) => {
  const res = (await API.put(`/discount/change-status/${id}`, {
    status: status ? 1 : 0
  })) as GenericResponse;
  return res;
};

export const getContractsRanges = async (projectId: number) => {
  const response: GenericResponse<DiscountContractRange[]> = await API.get(
    `/discount/contract-ranges/project/${projectId}`
  );
  return response;
};

export const createDiscount = async (
  discount: DiscountSchema & { project_id: number },
  invoice?: FileObject[]
) => {
  const body: any = { ...discount };
  const invoiceFile: any = invoice?.[0]?.file;
  invoiceFile.mimetype = "application/pdf";
  invoiceFile.originalname = invoiceFile?.name;
  console.log(invoiceFile, invoice);

  body.discount_type_id = discount.discount_type;
  delete body.discount_type;
  body.end_date = body.end_date ? body.end_date : undefined;
  body.products_category = body.products_category?.map((x: number) => ({ idProduct: x }));
  body.client_nit = discount.client;
  body.file = invoiceFile;

  const response: GenericResponse<DiscountBasics> = await API.post("/discount", body);
  if (!response.success) throw new Error(response.message);
  return response;
};

export const getDiscount = async (id: number) => {
  const response: GenericResponse<DiscountGetOne> = await API.get(`/discount/${id}`);
  if (!response.success) throw new Error(response.message);
  return response;
};
