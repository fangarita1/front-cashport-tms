import { Dispatch, SetStateAction, useState } from "react";
import { Button, Table, TableProps, Typography } from "antd";

import { Eye } from "phosphor-react";
import { formatMoney } from "@/utils/utils";

import "./orders-view-table.scss";

const { Text } = Typography;

interface PropsOrdersViewTable {
  dataSingleOrder: any[];
  setSelectedRows: Dispatch<SetStateAction<any[] | undefined>>;
}

const OrdersViewTable = ({ dataSingleOrder: data, setSelectedRows }: PropsOrdersViewTable) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<any>["columns"] = [
    {
      title: "TR",
      dataIndex: "id",
      key: "id",
      render: (invoiceId) => <Text className="ordersViewTable__id">{invoiceId}</Text>,
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false
    },
    {
      title: "Cliente",
      dataIndex: "client",
      key: "client",
      render: (text) => <Text className="cell">{text}</Text>,
      sorter: (a, b) => a.client.localeCompare(b.client),
      showSorterTooltip: false
    },
    {
      title: "Fecha de creación",
      key: "created_at",
      dataIndex: "created_at",
      render: (text) => <Text className="cell">{text}</Text>,
      showSorterTooltip: false
    },
    {
      title: "Ciudad",
      key: "city",
      dataIndex: "city",
      render: (text) => <Text className="cell">{text}</Text>,
      sorter: (a, b) => a.city.localeCompare(b.city),
      showSorterTooltip: false
    },
    {
      title: "Contacto",
      key: "contact",
      dataIndex: "contact",
      render: (text) => <Text className="cell">{text}</Text>
    },
    {
      title: "Total",
      key: "total",
      dataIndex: "total",
      render: (amount) => <Text className="cell">{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.total - b.total,
      showSorterTooltip: false
    },
    {
      title: "Total pronto pago",
      key: "early_pay_total",
      dataIndex: "early_pay_total",
      render: (amount) => <Text className="cell">{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.early_pay_total - b.early_pay_total,
      showSorterTooltip: false,
      align: "right"
    },
    {
      title: "",
      key: "buttonSee",
      width: 64,
      dataIndex: "",
      render: () => <Button className="buttonSeeProject" icon={<Eye size={"1.3rem"} />} />
    }
  ];

  return (
    <>
      <Table
        className="ordersViewTable"
        columns={columns}
        dataSource={data.map((data) => ({ ...data, key: data.id }))}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
        pagination={false}
      />
    </>
  );
};

export default OrdersViewTable;
