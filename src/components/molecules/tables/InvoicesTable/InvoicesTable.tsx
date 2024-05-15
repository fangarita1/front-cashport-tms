import { useEffect, useState } from "react";
import { Button, Table, TableProps, Tooltip, Typography } from "antd";

import { IInvoice } from "@/types/invoices/IInvoices";
import { CheckCircle, Eye, Handshake, Warning, WarningCircle } from "phosphor-react";
import "./invoicestable.scss";

const { Text } = Typography;

interface PropsInvoicesTable {
  dataSingleInvoice: IInvoice[];
}
export const InvoicesTable = ({ dataSingleInvoice: data }: PropsInvoicesTable) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState<any>([]);

  useEffect(() => {
    console.log(selectedRows);
  }, [selectedRows]);

  const openInvoiceDetail = () => {
    console.log("openInvoiceDetail");
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };
  const columns: TableProps<IInvoice>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (text) => (
        <Text onClick={openInvoiceDetail} className="invoicesTable__id">
          {text}
        </Text>
      ),
      defaultSortOrder: "descend"
    },
    {
      title: "Emisión",
      dataIndex: "create_at",
      key: "create_at",
      render: (text) => <Text>{formatDate(text)}</Text>
    },
    {
      title: "Pronto pago",
      key: "earlypay_date",
      dataIndex: "earlypay_date",
      render: (text) => <Text>{formatDate(text)}</Text>
    },
    {
      title: "Vence",
      key: "expiration_date",
      dataIndex: "expiration_date",
      render: (text, record) => (
        <Tooltip
          title={
            <div className="toolTip -expirationDate">
              <p>Fecha de vencimiento</p>
              <strong>{formatDate(text)}</strong>
              <p>
                Condición de pago <strong>X días</strong>
              </p>
            </div>
          }
          color={"#f7f7f7"}
          key={record.id}
        >
          <Text className="expirationText">
            {daysLeft(text)} días <WarningCircle size={16} />
          </Text>
        </Tooltip>
      )
    },
    {
      title: "Monto inicial",
      key: "initial_value",
      dataIndex: "initial_value",
      render: (text) => <Text className="cell">${text}</Text>
    },
    {
      title: "Ajustes",
      key: "ajust_value",
      dataIndex: "ajust_value",
      render: (text) =>
        text === 0 ? null : text > 0 ? (
          <Text>${text}</Text>
        ) : (
          <Text className="negativeAdjustment">${text}</Text>
        )
    },
    {
      title: "Pendiente",
      key: "current_value",
      dataIndex: "current_value",
      render: (text) => <Text>${text}</Text>
    },
    {
      title: "",
      key: "",
      dataIndex: "",
      render: (_, record) => (
        <div className="logos">
          <Tooltip
            title={
              <div className="toolTip -paymentAgreement">
                <p>Acuerdo de pago</p>
                <p>
                  Fecha <strong>xx/xx/xxxx</strong>
                </p>
                <p>
                  Monto <strong>$XXXXX</strong>
                </p>
              </div>
            }
            color={"#f7f7f7"}
            key={`A${record.id}`}
          >
            <Button onClick={openInvoiceDetail} icon={<Handshake size={"1.4rem"} />} />
          </Tooltip>

          <Tooltip
            title={
              <div className="toolTip -priceDifference">
                <p>Diferencia en precios</p>
                <p>
                  Monto <strong>$XXXXXX</strong>
                </p>
                <p>Producto faltante</p>
                <p>
                  Descuento <strong>$XXXXXX</strong>
                </p>
              </div>
            }
            color={"#f7f7f7"}
            key={`B${record.id}`}
          >
            <Button onClick={openInvoiceDetail} icon={<Warning size={"1.4rem"} />} />
          </Tooltip>

          <Tooltip
            title={
              <div className="toolTip -clientAccept">
                <p>Aceptación cliente</p>
                <p>Email</p>
                <strong>DD-MM-YYYY</strong>
              </div>
            }
            color={"#f7f7f7"}
            key={`C${record.id}`}
          >
            <Button onClick={openInvoiceDetail} icon={<CheckCircle size={"1.4rem"} />} />
          </Tooltip>

          <Button onClick={openInvoiceDetail} icon={<Eye size={"1.4rem"} />} />
        </div>
      )
    }
  ];

  return (
    <>
      <Table
        className="invoicesTable"
        columns={columns}
        dataSource={data.map((data) => ({ ...data, key: data.id }))}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
      />
    </>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function daysLeft(dateString: string): number {
  const today = new Date();
  const expirationDate = new Date(dateString);

  const diffInMs = expirationDate.getTime() - today.getTime();

  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
