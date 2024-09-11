import { FinalizeTripForm } from "./finalizetrip.types";

export function createFormData(form: FinalizeTripForm): FormData {
  const formData = new FormData();
  const documentsMTs: { tripId: number; file: string }[] = [];
  const observations: { carrierId: number; Observation: string }[] = [];

  form.carriers.forEach((carrier) => {
    if (carrier.adittionalComment) {
      observations.push({
        carrierId: carrier.idCarrier,
        Observation: carrier.adittionalComment
      });
    }
    carrier.vehicles.forEach((vehicle, indexCarrier) => {
      vehicle.documents.forEach((document, indexVehicle) => {
        if (document.file) {
          documentsMTs.push({
            tripId: vehicle.tripId,
            file: `INVOICE-${indexCarrier}-${indexVehicle}`
          });
          formData.append(`INVOICE-${indexCarrier}-${indexVehicle}`, document.file);
        }
      });
    });
  });

  formData.append("request", JSON.stringify({ documentsMTs, observations }));
  return formData;
}
