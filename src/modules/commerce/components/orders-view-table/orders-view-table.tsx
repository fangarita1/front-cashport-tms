import { Dispatch, SetStateAction, useState } from "react";
import { Button, Table, TableProps, Typography } from "antd";

import { Eye } from "phosphor-react";
import { formatDateDMY, formatMoney } from "@/utils/utils";

import "./orders-view-table.scss";
import { IOrderData } from "@/types/commerce/ICommerce";

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

  const columns: TableProps<IOrderData>["columns"] = [
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
      dataIndex: "client_name",
      key: "client_name",
      render: (text) => <Text className="cell">{text}</Text>,
      sorter: (a, b) => a.client_name.localeCompare(b.client_name),
      showSorterTooltip: false
    },
    {
      title: "Fecha de creación",
      key: "order_date",
      dataIndex: "order_date",
      render: (text) => <Text className="cell">{formatDateDMY(text)}</Text>,
      sorter: (a, b) => new Date(a.order_date).getTime() - new Date(b.order_date).getTime(),
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
      key: "contacto",
      dataIndex: "contacto",
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
      key: "total_pronto_pago",
      dataIndex: "total_pronto_pago",
      render: (amount) => <Text className="cell">{formatMoney(amount)}</Text>,
      sorter: (a, b) => a.total_pronto_pago - b.total_pronto_pago,
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
