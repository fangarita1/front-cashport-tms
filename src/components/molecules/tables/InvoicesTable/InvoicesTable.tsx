import { useEffect, useState } from "react";
import { Table, TableProps, Typography } from "antd";

import { IInvoice } from "@/types/invoices/IInvoices";
import { CheckCircle, Eye, Handshake, WarningCircle } from "phosphor-react";
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

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
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
      render: (text) => <Text>{text}</Text>,
      defaultSortOrder: "descend"
      // sorter: (a, b) => a.age - b.age
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
      render: (text) => (
        <Text>
          {daysLeft(text)} días <WarningCircle size={16} />
        </Text>
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
      key: "shipto_count",
      dataIndex: "shipto_count",
      render: (text) => <Text>{text}</Text>
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
      render: () => (
        <div className="logos">
          <Handshake size={32} />
          <CheckCircle className="logo -check" size={32} />
          <Eye className="logo -eye" size={32} />
        </div>
      )
    }
  ];

  return (
    <>
      <Table
        className="invoicesTable"
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
        // showSorterTooltip={{
        //   target: "sorter-icon"
        // }}
      />
    </>
  );
};

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based in JavaScript
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function daysLeft(dateString: string): number {
  const today = new Date();
  const expirationDate = new Date(dateString);

  // Calculate the difference in milliseconds
  const diffInMs = expirationDate.getTime() - today.getTime();

  // Convert milliseconds to days
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  return diffInDays;
}
