import { DiscountBasics } from "@/types/discount/DiscountBasics";
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
