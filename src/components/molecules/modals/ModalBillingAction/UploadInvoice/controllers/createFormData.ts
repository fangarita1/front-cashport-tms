import dayjs from "dayjs";
import { Invoice, PA, PreAutorizationInfo, UploadInvoiceForm } from "./uploadinvoice.types";

function createFormData(uploadForm: UploadInvoiceForm): FormData {
  const formData = new FormData();
  const body = uploadForm.pas.map((pa: PA) => {
    const invoice: Invoice = pa.invoice;
    const authorization: PreAutorizationInfo = pa.info;
    return {
      id: authorization.id,
      idInvoice: invoice.id?.toString(),
      date: dayjs(invoice.date).format("YYYY-MM-DD"),
      amount: invoice.value,
      invoiceFile: invoice?.pdfFile?.file?.name,
      xmlFile: invoice?.xmlFile?.file?.name
    };
  });
  formData.append("request", JSON.stringify({ invoice: [...body] }));
  uploadForm.pas.forEach((pa) => {
    if (pa?.invoice?.pdfFile?.file) {
      formData.append(`${pa?.invoice?.pdfFile?.file?.name}`, pa?.invoice?.pdfFile?.file);
    }
    if (pa?.invoice?.xmlFile?.file) {
      formData.append(`${pa?.invoice?.xmlFile?.file?.name}`, pa?.invoice?.xmlFile?.file);
    }
  });
  return formData;
}

export default createFormData;
