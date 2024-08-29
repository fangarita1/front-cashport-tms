import dayjs from "dayjs";

import { Preauthorization, PreauthorizeTripForm } from "./preauthorizetrip.types";

function createPreauthorizationsFormData(form: PreauthorizeTripForm): FormData {
  const formData = new FormData();
  const body = form.preauthorizations.map((pa: Preauthorization) => {
    return {
      idPreAuthorization: pa.idPA,
      date: dayjs(pa.date).format("YYYY-MM-DD"),
      amount: pa.value,
      file: pa.evidence?.file?.name
    };
  });
  formData.append("request", JSON.stringify({ preauthorizations: [...body] }));
  form.preauthorizations.forEach((pa) => {
    if (pa.evidence?.file) {
      formData.append(`${pa.evidence?.file?.name}`, pa.evidence?.file);
    }
  });
  return formData;
}

export default createPreauthorizationsFormData;
