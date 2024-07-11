import { Dispatch, SetStateAction, useState } from "react";
import { Button, Table, TableProps, Typography } from "antd";

import { Eye } from "phosphor-react";
import "./contacts-table.scss";
import { IContact } from "@/types/contacts/IContacts";

const { Text } = Typography;

interface PropsInvoicesTable {
  dataAllContacts: IContact[];
  setSelectedRows: Dispatch<SetStateAction<IContact[] | undefined>>;
  setShowContactModal: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      contactId: number;
    }>
  >;
}

const ContactsTable = ({
  dataAllContacts: data,
  setSelectedRows,
  setShowContactModal
}: PropsInvoicesTable) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const openContactDetail = (contactId: number) => {
    setShowContactModal({ isOpen: true, contactId });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[], newSelectedRow: any) => {
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(newSelectedRow);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const columns: TableProps<IContact>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "contact_name",
      key: "contact_name",
      render: (contact_name, row) => (
        <p onClick={() => openContactDetail(row.id)} className="adjustmentsTable__id">
          {contact_name}
        </p>
      ),
      // sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false
    },
    {
      title: "Apellido",
      dataIndex: "contact_lastname",
      key: "contact_lastname",
      render: (text) => <Text className="cell">{text}</Text>,
      // sorter: (a, b) => Date.parse(a.create_at) - Date.parse(b.create_at),
      // align: "center",
      // width: 80,
      showSorterTooltip: false
    },
    {
      title: "Cargo",
      key: "name_position",
      dataIndex: "name_position",
      render: (text) => <Text className="cell">{text}</Text>,
      // align: "right",
      // sorter: (a, b) => a.contact_position - b.initial_value,
      showSorterTooltip: false
    },
    {
      title: "Rol",
      key: "contact_position",
      dataIndex: "contact_position",
      render: (text) => <Text className="cell">{text}</Text>,
      // align: "right",
      // sorter: (a, b) => a.initial_value - b.initial_value,
      showSorterTooltip: false
    },
    {
      title: "Teléfono",
      key: "contact_phone",
      dataIndex: "contact_phone",
      render: (amount) => <Text className="cell -alignRight">{amount}</Text>,
      // align: "right",
      // sorter: (a, b) => b.contact_phone - a.contact_phone,
      showSorterTooltip: false
    },
    {
      title: "Email",
      key: "contact_email",
      dataIndex: "contact_email",
      render: (amount) => <Text className="cell -alignRight">{amount}</Text>,
      // align: "right",
      // sorter: (a, b) => b.contact_email - a.contact_email,
      showSorterTooltip: false
    },
    {
      title: "",
      render: (_, record) => (
        <Button onClick={() => openContactDetail(record.id)} icon={<Eye size={"1.2rem"} />} />
      ),
      width: 60
      // onCell: () => ({
      //   style: {
      //     flex: 2
      //   }
      // })
    }
  ];

  return (
    <>
      <Table
        className="contactsTable"
        columns={columns}
        dataSource={data.map((data) => ({ ...data, key: data.id }))}
        rowSelection={rowSelection}
        rowClassName={(record) => (selectedRowKeys.includes(record.id) ? "selectedRow" : "")}
        pagination={false}
      />
    </>
  );
};

export default ContactsTable;
