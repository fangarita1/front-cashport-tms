import dayjs from "dayjs";

import { Preauthorization, PreauthorizeTripForm } from "./preauthorizetrip.types";

function createPreauthorizationsFormData(form: PreauthorizeTripForm): FormData {
  const formData = new FormData();
  const body = form.preauthorizations.map((pa: Preauthorization, index: number) => {
    return {
      idPreAuthorization: pa.idPA,
      date: dayjs(pa.date).format("YYYY-MM-DD"),
      amount: pa.value,
      file: `AUTH-${index}`
    };
  });
  formData.append("request", JSON.stringify({ preauthorizations: [...body] }));
  form.preauthorizations.forEach((pa, index) => {
    if (pa.evidence?.file) {
      formData.append(`AUTH-${index}`, pa.evidence?.file);
    }
  });
  return formData;
}

export default createPreauthorizationsFormData;
