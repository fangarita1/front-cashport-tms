import { EvidenceByVehicleForm } from "./formbillingmt.types";

export function createFormDataFinalizeTrip(form: EvidenceByVehicleForm): FormData {
  const formData = new FormData();
  const documentsMTs: { file: string }[] = [];

  form.documents.forEach((document, index) => {
    if (document.file) {
      documentsMTs.push({
        file: `MT-${index}`
      });
      formData.append(`MT-${index}`, document.file);
    }
  });
  formData.append("request", JSON.stringify({ documentsMTs }));
  return formData;
}
