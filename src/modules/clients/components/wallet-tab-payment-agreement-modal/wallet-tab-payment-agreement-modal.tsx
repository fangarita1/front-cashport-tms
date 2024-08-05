import React, { useEffect, useState } from "react";
import { Button, Modal, Table, TableProps, InputNumber, DatePicker } from "antd";
import "./wallet-tab-payment-agreement-modal.scss";
import { CaretLeft } from "phosphor-react";
import EvidenceModal from "../wallet-tab-evidence-modal";
import { IInvoice } from "@/types/invoices/IInvoices";
import dayjs from "dayjs";
import { formatCurrencyMoney, formatDate } from "@/utils/utils";

import { createPaymentAgreement } from "@/services/accountingAdjustment/accountingAdjustment";
import { MessageInstance } from "antd/es/message/interface";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  clientId?: number;
  projectId?: number;
  messageShow: MessageInstance;
  invoiceSelected?: IInvoice[];
}

interface ITableData {
  id: number;
  emission: string;
  pending: number;
  agreedValue: string;
  newDate: string;
  [key: string]: any;
}
interface infoObject {
  file: File;
  fileList: File[];
}

const PaymentAgreementModal: React.FC<Props> = ({
  isOpen,
  onClose,
  invoiceSelected,
  clientId,
  projectId,
  messageShow
}) => {
  const [selectedEvidence, setSelectedEvidence] = useState<File[]>([]);
  const [commentary, setCommentary] = useState<string>("");
  const [isSecondView, setIsSecondView] = useState(false);
  const [tableData, setTableData] = useState<ITableData[]>([]);
  const [globalDate, setGlobalDate] = useState<string | null>(null);

  const handleOnChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentary(e.target.value);
  };

  const handleAttachEvidence = async () => {
    if (!clientId || !projectId) {
      return;
    }

    const adjustmentData = tableData.map((row) => ({
      invoice_id: row.id,
      date_agreement: (row.newDate && dayjs(row.newDate).format("DD-MM-YYYY")) || "",
      amount: parseFloat(row.agreedValue),
      comment: commentary
    }));

    try {
      await createPaymentAgreement(
        projectId,
        clientId.toString(),
        adjustmentData,
        selectedEvidence[0] || null
      );
      messageShow.success("Acuerdo de pago creado exitosamente");
      onClenModal();
    } catch (error) {
      messageShow.error("Error al crear el acuerdo de pago. Por favor, intente de nuevo.");
    }
  };

  const handleOnChangeDocument: any = (info: infoObject) => {
    const { file: rawFile } = info;
    if (rawFile) {
      const fileSizeInMB = rawFile.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        messageShow.error(
          "El archivo es demasiado grande. Por favor, sube un archivo de menos de 30 MB."
        );
        return;
      }
      setSelectedEvidence(selectedEvidence ? [...selectedEvidence, rawFile] : [rawFile]);
    }
  };

  const handleOnDeleteDocument = (fileName: string) => {
    const updatedFiles = selectedEvidence?.filter((file) => file.name !== fileName);
    setSelectedEvidence(updatedFiles);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fileSizeInMB = file.size / (1024 * 1024);
      if (fileSizeInMB > 30) {
        messageShow.error(
          "El archivo es demasiado grande. Por favor, sube un archivo dse menos de 30 MB."
        );
        return;
      }
      setSelectedEvidence(selectedEvidence ? [...selectedEvidence, file] : [file]);
    }
  };

  const onChangeDate = (date: string | null) => {
    setGlobalDate(date);
    console.log(date);

    if (date) {
      const dateString = date;
      setTableData((prevData) =>
        prevData.map((row) => ({
          ...row,
          newDate: dateString
        }))
      );
    } else {
      setTableData((prevData) =>
        prevData.map((row) => ({
          ...row,
          newDate: ""
        }))
      );
    }
  };

  const handleCellChange = (key: string, index: number, value: string) => {
    console.log(key, value);

    setTableData((prevData) => {
      const newData = [...prevData];
      newData[index][key] = value;
      return newData;
    });
  };

  const columns: TableProps<any>["columns"] = [
    { title: "ID Factura", dataIndex: "id", key: "id" },
    {
      title: "Emisión",
      dataIndex: "emission",
      key: "emission",
      render: (text) => {
        return <span>{formatDate(text)}</span>;
      }
    },
    {
      title: "Pendiente",
      dataIndex: "pending",
      key: "pending",
      render: (text) => {
        return <span>{formatCurrencyMoney(text)}</span>;
      }
    },
    {
      title: "Valor acordado",
      dataIndex: "agreedValue",
      key: "agreedValue",
      render: (text: string, record, index: number) => (
        <InputNumber
          max={record.pending}
          min={0}
          value={text ? parseFloat(text) : undefined}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => value?.replace(/\$\s?|(,*)/g, "") as unknown as number}
          onChange={(value) => handleCellChange("agreedValue", index, value?.toString() || "")}
          className="number__input"
        />
      ),
      align: "center"
    },
    {
      title: "Nueva fecha",
      dataIndex: "newDate",
      key: "newDate",
      render: (text: string, _, index: number) => (
        <DatePicker
          value={text ? text : null}
          onChange={(date) => handleCellChange("newDate", index, date)}
          className="date__piker_input "
        />
      ),
      align: "center"
    }
  ];

  useEffect(() => {
    if (invoiceSelected) {
      setTableData(
        invoiceSelected.map((invoice) => ({
          id: invoice.id,
          emission: invoice.financial_record_date,
          pending: invoice.current_value,
          agreedValue: "",
          newDate: ""
        }))
      );
    }
  }, [invoiceSelected]);

  const onClenModal = () => {
    setGlobalDate(null);
    setIsSecondView(false);
    setSelectedEvidence([]);
    onClose();
  };

  return (
    <Modal
      className="wrapper_payment"
      width={"50%"}
      open={isOpen}
      onCancel={onClenModal}
      footer={null}
    >
      {!isSecondView ? (
        <>
          <div className="content_payment">
            <Button onClick={onClenModal} className="content_payment__header">
              <CaretLeft size={"1.25rem"} />
              <h4>Acuerdo de pago</h4>
            </Button>

            <p className="content_payment__description">
              Selecciona la fecha y el valor para definir el acuerdo de pago
            </p>
            <div>
              <DatePicker
                value={globalDate}
                placeholder="Selecciona la fecha"
                onChange={onChangeDate}
                className="date-input"
              />
            </div>

            <Table
              className="selectedInvoicesTable"
              columns={columns}
              dataSource={tableData}
              pagination={false}
            />
          </div>
          <div className="footer">
            <Button className="cancelButton" onClick={onClenModal}>
              Cancelar
            </Button>
            <Button className="acceptButton" onClick={() => setIsSecondView(true)}>
              Guardar cambios
            </Button>
          </div>
        </>
      ) : (
        <EvidenceModal
          selectedEvidence={selectedEvidence}
          handleOnChangeDocument={handleOnChangeDocument}
          handleOnDeleteDocument={handleOnDeleteDocument}
          handleFileChange={handleFileChange}
          handleOnChangeTextArea={handleOnChangeTextArea}
          handleAttachEvidence={handleAttachEvidence}
          commentary={commentary}
          setIsSecondView={setIsSecondView}
        />
      )}
    </Modal>
  );
};

export default PaymentAgreementModal;
