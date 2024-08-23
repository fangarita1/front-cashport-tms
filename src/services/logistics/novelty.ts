import { GenericResponse } from "@/types/global/IGlobal";
import { INovelty, INoveltyBody, INoveltyType } from "@/types/novelty/INovelty";
import { API } from "@/utils/api/api";

export const getNoveltyDetail = async (id: number): Promise<INovelty | {}> => {
  try {
    const { success, data }: GenericResponse<INovelty> = await API.get(`/novelty/detail/${id}`);
    if (success) return data;
    return {};
  } catch (error) {
    console.error("Error get request/details/:id/: ", error);
    throw error as any;
  }
}

export const aprobeOrRejectDetail = async (id: number, isAprobe: boolean): Promise<boolean> => {
  try {
    const { success }: GenericResponse<boolean> = await API.post('/novelty/aprobe-or-reject', {
      id,
      isAprobe
    })
    if (success) return true;
    return false;
  } catch (error) {
    console.error("Error get novelty/aprobe-or-reject/: ", error);
    throw error as any;
  }
}

export const getNoveltyTypes = async (): Promise<INoveltyType[]> => {
  try {
    const { success, data }: GenericResponse<INoveltyType[]> = await API.get('/novelty-type/all')
    if (success) return data;
    return [];
  } catch (error) {
    console.error("Error get novelty-type/all/: ", error);
    throw error as any;
  }
}

export const createNovelty = async (body: INoveltyBody): Promise<boolean> => {
  try {
    const { success }: GenericResponse<boolean> = await API.post('/novelty/create', body);
    if (success) return true;
    return false;
  } catch (error) {
    console.error("Error get novelty/aprobe-or-reject/: ", error);
    throw error as any;
  }
}