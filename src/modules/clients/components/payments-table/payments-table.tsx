import { Dispatch, SetStateAction, useState } from "react";
import { Button, Table, TableProps, Typography } from "antd";
import { Eye } from "phosphor-react";
import { formatDate, formatMoney } from "@/utils/utils";
import { IPayment } from "@/types/payments/IPayments";

import "./payments-table.scss";

const { Text } = Typography;

interface PropsInvoicesTable {
  paymentsByStatus: IPayment[];
  setSelectedRows: Dispatch<SetStateAction<IPayment[] | undefined>>;
  setShowPaymentDetail: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      paymentId: number;
    }>
  >;
  paymentStatusId: number;
}

const PaymentsTable = ({
  paymentsByStatus: data,
  setSelectedRows,
  setShowPaymentDetail,
  paymentStatusId
}: PropsInvoicesTable) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const openPaymentDetail = (paymentId: number) => {
    setShowPaymentDetail({ isOpen: true, paymentId });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRows: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    if (newSelectedRowKeys.length >= 1) {
      // set the selected Rows but adding to the previous selected rows
      setSelectedRows((prevSelectedRows) => {
        if (prevSelectedRows) {
          //check if the new selected rows are already in the selected rows
          const filteredSelectedRows = newSelectedRows.filter(
            (newSelectedRow: IPayment) =>
              !prevSelectedRows.some((prevSelectedRow) => prevSelectedRow.id === newSelectedRow.id)
          );

          //filters the unselected rows but only the ones that have the status_id equal to paymentStatusId
          const unCheckedRows = prevSelectedRows?.filter(
            (prevSelectedRow) =>
              !newSelectedRowKeys.includes(prevSelectedRow.id) &&
              prevSelectedRow.payment_status_id === paymentStatusId
          );
          if (unCheckedRows.length > 0) {
            // remove form the prevState the ones present in the unCheckedRows
            const filteredPrevSelectedRows = prevSelectedRows.filter(
              (prevSelectedRow) => !unCheckedRows.includes(prevSelectedRow)
            );
            return filteredPrevSelectedRows;
          }

          return [...prevSelectedRows, ...filteredSelectedRows];
        } else {
          return newSelectedRows;
        }
      });
    }
    //traverse the alreadySelectedRows and remove the ones that have the status_id of the paymentStatusId
    if (newSelectedRowKeys.length === 0) {
      setSelectedRows((prevSelectedRows) => {
        if (prevSelectedRows) {
          return prevSelectedRows.filter(
            (prevSelectedRow) => prevSelectedRow.payment_status_id !== paymentStatusId
          );
        }
      });
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<IPayment>["columns"] = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      render: (paymentId) => (
        <p onClick={() => openPaymentDetail(paymentId)} className="paymentsTable__id">
          {paymentId}
        </p>
      ),
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false,
      width: 130
    },
    {
      title: "Ingreso",
      dataIndex: "entered",
      key: "entered",
      render: (text) => <Text className="cell">{formatDate(text)}</Text>,
      sorter: (a, b) => Date.parse(a.entered) - Date.parse(b.entered),
      showSorterTooltip: false
    },
    {
      title: "Identificación",
      key: "identified",
      dataIndex: "identified",
      render: (text) => <Text className="cell">{formatDate(text)}</Text>,
      sorter: (a, b) => Date.parse(a.identified) - Date.parse(b.identified),
      showSorterTooltip: false
    },
    {
      title: "Referencia",
      key: "reference",
      dataIndex: "reference",
      render: (text) => <Text className="cell">{text}</Text>,
      sorter: (a, b) => a.reference - b.reference,
      showSorterTooltip: false
    },
    {
      title: "Monto",
      key: "amount",
      dataIndex: "amount",
      render: (amount) => <Text className="cell">{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.amount - b.amount,
      showSorterTooltip: false
    },
    {
      title: "Disponible",
      key: "available",
      dataIndex: "available",
      render: (available) => <Text className="cell">{formatMoney(available)}</Text>,
      sorter: (a, b) => a.available - b.available,
      showSorterTooltip: false
    },
    {
      title: "",
      render: (_, record) => (
        <Button onClick={() => openPaymentDetail(record.id)} icon={<Eye size={"1.2rem"} />} />
      ),
      width: 60,
      onCell: () => ({
        style: {
          flex: 2
        }
      })
    }
  ];

  return (
    <>
      <Table
        className="paymentsTable"
        columns={columns}
        dataSource={data?.map((data) => ({ ...data, key: data.id }))}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
        pagination={false}
      />
    </>
  );
};

export default PaymentsTable;
