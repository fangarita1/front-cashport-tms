import { Dispatch, Key, SetStateAction } from "react";
import { Button, Table, TableProps } from "antd";
import { PencilLine } from "phosphor-react";

import "./banks-rules-table.scss";

export type bankRule = {
  id: number;
  description: string;
  client_name: string;
  coincidence: string;
};

interface PropsBanksRulesTable {
  selectedRowKeys: Key[];
  setSelectedRowKeys: Dispatch<SetStateAction<Key[]>>;
  rules: bankRule[];
  setShowBankRuleModal: Dispatch<
    SetStateAction<{
      isOpen: boolean;
      ruleId: number;
    }>
  >;
}

export const BanksRulesTable = ({
  selectedRowKeys,
  setSelectedRowKeys,
  rules,
  setShowBankRuleModal
}: PropsBanksRulesTable) => {
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange
  };

  const handleOpenEditRule = (ruleId: number) => {
    setShowBankRuleModal({
      isOpen: true,
      ruleId
    });
  };

  const columns: TableProps<bankRule>["columns"] = [
    {
      title: "Descripción",
      dataIndex: "description",
      className: "tableColumn",
      render: (text) => <p className="tableInfo">{text}</p>
    },
    {
      align: "center",
      className: "tableColumn -equalSign",
      render: () => <p>=</p>
    },
    {
      title: "Nombre de cliente",
      dataIndex: "client_name",
      className: "tableColumn",
      render: (text) => <p className="tableInfo">{text}</p>
    },
    {
      title: "Coincidencia",
      dataIndex: "coincidence",
      className: "tableColumn",
      render: (text) => <p className="tableInfo">{text}</p>
    },
    {
      width: "1rem",
      className: "tableColumn",
      render: (_, row) => (
        <Button onClick={() => handleOpenEditRule(row.id)} className="editButton">
          <PencilLine size={24} />
        </Button>
      )
    }
  ];

  return (
    <Table
      className="banksRulesTable"
      columns={columns}
      rowClassName={"banksRules__tableRow"}
      dataSource={rules.map((data) => ({ ...data, key: data.id }))}
      rowSelection={rowSelection}
      pagination={false}
    />
  );
};

export default BanksRulesTable;
