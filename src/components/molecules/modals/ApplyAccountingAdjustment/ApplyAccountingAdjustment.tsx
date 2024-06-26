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
interface IcurrentInvoices {
  id: number;
  current_value: number;
  newBalance: number;
}

export const ApplyAccountingAdjustment = ({
  type,
  selectedRows,
  setCurrentView,
  invoiceSelected = []
}: Props) => {
  const [selectTab, setSelectTab] = useState(0);
  const [currentInvoices, setCurrentInvoices] = useState<IcurrentInvoices[]>([]);
  const [currentAdjustment, setCurrentAdjustment] = useState(
    selectedRows.map((row) => row.current_value)
  );
  const [applyValues, setApplyValues] = useState<{
    [key: string]: {
      balanceToApply: number;
      idAdjustment: number;
    }[];
  }>({});

  useEffect(() => {
    setCurrentInvoices(
      invoiceSelected.map((invoice) => ({
        id: invoice.id,
        current_value: invoice.current_value,
        newBalance: invoice.current_value
      }))
    );
  }, [invoiceSelected]);

  const handleValueChange = (valueApplied: number, index: number, recordId: number) => {
    setCurrentAdjustment((prev) => {
      const previousValue =
        applyValues[recordId]?.find((apply) => apply.idAdjustment === selectedRows[index].id)
          ?.balanceToApply ?? 0;

      const newValue = prev[index] + previousValue - valueApplied;
      return prev.map((value, i) => (i === index ? Math.max(0, newValue) : value));
    });
  };

  const handleApplyValueChange = (value: number | null, record: IcurrentInvoices) => {
    const previousValue =
      applyValues[record.id]?.find((apply) => apply.idAdjustment === selectedRows[selectTab].id)
        ?.balanceToApply ?? 0;
    // Validación para asegurarse de que el valor a aplicar no exceda el newBalance actual
    const maxApplicableValue = Math.min(value ?? 0, record.newBalance + previousValue);

    setApplyValues((prev) => ({
      ...prev, // Toma el estado anterior
      [record.id]: [
        // Mantiene todas las aplicaciones anteriores para el mismo registro, excepto la actualmente seleccionada
        ...(prev[record.id] ?? []).filter(
          (apply) => apply.idAdjustment !== selectedRows[selectTab].id
        ),
        // Agrega o actualiza la nueva aplicación con el valor ajustado que no excede el balance disponible
        { balanceToApply: maxApplicableValue, idAdjustment: selectedRows[selectTab].id }
      ]
    }));

    setCurrentInvoices((prev) => {
      return prev.map((invoice) => {
        if (invoice.id === record.id) {
          const difference = maxApplicableValue - previousValue; // Calcula la diferencia entre el valor nuevo y el anterior
          return {
            ...invoice,
            newBalance: invoice.newBalance - difference
          };
        }
        return invoice; // Devuelve las facturas no modificadas
      });
    });
    handleValueChange(value ?? 0, selectTab, record.id);
  };

  useEffect(() => {
    console.log(applyValues, "current", currentInvoices, currentAdjustment);
  }, [applyValues]);

  const columns: ColumnsType<IcurrentInvoices> = [
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
      render: (text) => `$${text}`
    },
    {
      title: "Valor a aplicar",
      key: "applyValue",
      render: (_, record) => (
        <InputNumber
          min={0}
          defaultValue={0}
          value={
            applyValues[record.id]?.find(
              (apply) => apply.idAdjustment === selectedRows[selectTab].id
            )?.balanceToApply
          }
          
          onBlur={(event) => {
            const parsedValue = parseFloat(event.target.value);
            if (
              (currentAdjustment[selectTab] > 0 &&
                parsedValue <= selectedRows[selectTab].current_value) ||
              applyValues[record.id]?.find(
                (apply) => apply.idAdjustment === selectedRows[selectTab].id
              )?.balanceToApply
            ) {
              handleApplyValueChange(isNaN(parsedValue) ? 0 : parsedValue, record);
            }
          }}
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
        availableValue={currentAdjustment[selectTab]}
      />
      <Table dataSource={currentInvoices} columns={columns} pagination={false} />
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
