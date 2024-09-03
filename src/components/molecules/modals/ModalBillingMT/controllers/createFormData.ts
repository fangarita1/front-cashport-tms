import { EvidenceByVehicleForm } from "./formbillingmt.types";

export function createFormDataFinalizeTrip(form: EvidenceByVehicleForm): FormData {
  const formData = new FormData();
  const documentsMTs: { file: string }[] = [];

  form.documents.forEach((document) => {
    if (document.file) {
      documentsMTs.push({
        file: document.file.name
      });
      formData.append(`${document.file.name}`, document.file);
    }
  });
  formData.append("request", JSON.stringify({ documentsMTs }));
  return formData;
}
