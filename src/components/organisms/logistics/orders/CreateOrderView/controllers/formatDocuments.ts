interface IformatDocs {
  locationOrigin: any;
  locationDestination: any;
  materials: any[];
}
function formatDocuments({
  locationDestination,
  locationOrigin,
  materials
}: IformatDocs): FormData {
  const formData = new FormData();
  const locationsIds = [];
  locationsIds.push(locationDestination.id);
  locationsIds.push(locationOrigin.id);
  const materialsIds = materials.map((m) => m.id);

  formData.append("request", JSON.stringify({ locations: locationsIds, materials: materialsIds }));
  return formData;
}

export default formatDocuments;
