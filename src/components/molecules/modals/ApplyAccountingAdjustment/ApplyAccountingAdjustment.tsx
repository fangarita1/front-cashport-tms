import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import "./applyAccountingAdjustment.scss";
import { ISelectedAccountingAdjustment } from "../ModalActionDiscountCredit/ModalActionDiscountCredit";
import { IInvoice } from "@/types/invoices/IInvoices";
import UiTabs from "@/components/ui/ui-tabs";
import ItemApplyModal from "@/components/atoms/ItemsApplyModal/ItemsApplyModal";
import Table, { ColumnsType } from "antd/es/table";
import { Flex, InputNumber } from "antd";

interface Props {
  type: number;
  selectedRows: ISelectedAccountingAdjustment[];
  setSelectedRows: Dispatch<SetStateAction<ISelectedAccountingAdjustment[]>>;
  setCurrentView: Dispatch<SetStateAction<string>>;
  invoiceSelected?: IInvoice[];
}

export const ApplyAccountingAdjustment = ({
  type,
  selectedRows,
  setCurrentView,
  setSelectedRows,
  invoiceSelected
}: Props) => {
  const [selectTab, setSelectTab] = useState(0);
  const [applyValues, setApplyValues] = useState<{ [key: number]: number }>({});

  const handleApplyValueChange = (value: number | string | null, record: IInvoice) => {
    const numericValue = typeof value === "string" ? parseFloat(value) : value;
    setApplyValues((prev) => ({ ...prev, [record.id]: numericValue || 0 }));
  };

  useEffect(() => {
    console.log(applyValues);
  }, [applyValues]);

  const columns: ColumnsType<IInvoice> = [
    {
      title: "ID Factura",
      dataIndex: "id",
      key: "id",
      render: (text) => <a target="_blank">{text}</a>
    },
    {
      title: "Pendiente",
      dataIndex: "current_value",
      key: "current_value",
      render: (text) => `$${text}`
    },
    {
      title: "Saldo nuevo",
      dataIndex: "newBalance",
      key: "newBalance",
      render: (_, record) => {
        const applyValue = applyValues[record.id] || 0;
        const newBalance = record.current_value - applyValue;
        return `$${newBalance.toLocaleString()}`;
      }
    },
    {
      title: "Valor a aplicar",
      key: "applyValue",
      render: (_, record) => (
        <InputNumber
          min={0}
          max={record.current_value}
          defaultValue={0}
          formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          parser={(value) => parseFloat(value!.replace(/\$\s?|(,*)/g, ""))}
          onChange={(value) => handleApplyValueChange(value, record)}
          style={{ width: "100%" }}
        />
      )
    }
  ];
  return (
    <div className="modalContentApply">
      <p className="subTitleModalApply">Define el monto a aplicar a cada factura</p>
      {selectedRows.length > 1 && (
        <UiTabs
          tabs={selectedRows.map((row) => row.id.toString())}
          onTabClick={(index) => setSelectTab(index)}
          initialTabIndex={selectTab}
          className="scrollableTabs"
        />
      )}
      <ItemApplyModal
        type={type}
        item={selectedRows.length > 1 ? selectedRows[selectTab] : selectedRows[0]}
      />
      <Table dataSource={invoiceSelected} columns={columns} pagination={false} />
      <Flex gap="8px">
        <button
          type="button"
          className="button__action__text button__action__text__white"
          onClick={() => setCurrentView("select")}
        >
          Cancelar
        </button>
        <button
          type="button"
          className={`button__action__text ${selectedRows.length > 0 ? "button__action__text__green" : ""}`}
          onClick={() => {
            selectedRows.length > 0 && setCurrentView("apply");
          }}
        >
          Continuar
        </button>
      </Flex>
    </div>
  );
};
