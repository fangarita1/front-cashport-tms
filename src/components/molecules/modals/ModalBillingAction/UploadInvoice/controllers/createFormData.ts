import dayjs from "dayjs";
import { Invoice, PA, PreAutorizationInfo, UploadInvoiceForm } from "./uploadinvoice.types";

function createFormData(uploadForm: UploadInvoiceForm): FormData {
  const formData = new FormData();
  const body = uploadForm.pas.map((pa: PA, paIndex: number) => {
    const invoice: Invoice = pa.invoice;
    const authorization: PreAutorizationInfo = pa.info;
    const pdfFile = invoice.pdfFile?.file;
    const xmlFile = invoice.xmlFile?.file;
    return {
      id: authorization.id,
      idInvoice: invoice.id?.toString(),
      date: dayjs(invoice.date).format("YYYY-MM-DD"),
      amount: invoice.value,
      invoiceFile: pdfFile ? `INVOICE-${paIndex}-PDF` : undefined,
      xmlFile: xmlFile ? `INVOICE-${paIndex}-XML` : undefined
    };
  });
  formData.append("request", JSON.stringify({ invoice: [...body] }));
  uploadForm.pas.forEach((pa, paindex) => {
    if (pa?.invoice?.pdfFile?.file) {
      formData.append(`INVOICE-${paindex}-PDF`, pa?.invoice?.pdfFile?.file);
    }
    if (pa?.invoice?.xmlFile?.file) {
      formData.append(`INVOICE-${paindex}-XML`, pa?.invoice?.xmlFile?.file);
    }
  });
  return formData;
}

export default createFormData;
