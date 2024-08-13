interface draftInfo {
  id: number | undefined;
  client_name: string | undefined;
}
export interface ICommerceSlice {
  draftInfo: draftInfo;
  // eslint-disable-next-line no-unused-vars
  setDraftInfo: (draftInfo: draftInfo) => void;
}

export const createCommerceSlice = (set: any): ICommerceSlice => ({
  draftInfo: { id: 0, client_name: undefined },
  setDraftInfo: (draftInfo: draftInfo) => set({ draftInfo })
});
