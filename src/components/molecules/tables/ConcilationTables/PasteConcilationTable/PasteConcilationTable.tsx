"use client";
import UiSearchInput from "@/components/ui/search-input/search-input";
import type { ColumnsType } from "antd/es/table";
import { Button, Flex, Input, message, Table } from "antd";
import React, { useState, useRef, useCallback, useMemo, use, useEffect } from "react";
import "./pasteConcilationTable.scss";
import { useDebounce } from "@/hooks/useSearch";
import { ModalNextConcilation } from "@/components/molecules/modals/ModalNextConcilation/ModalNextConcilation";
import { MicrosoftExcelLogo } from "phosphor-react";

interface DataType {
  key: string;
  factura: number | string;
  monto: number;
  observacion: string;
}

export const PasteConcilationTable = () => {
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");
  const [messageApi, contextHolder] = message.useMessage();

  const debouncedSearchValue = useDebounce(searchValue, 300);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const filteredData = useMemo(() => {
    return dataSource.filter((item) => item.factura.toString().includes(debouncedSearchValue));
  }, [dataSource, debouncedSearchValue]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handlePaste = useCallback(
    (event: React.ClipboardEvent<HTMLTextAreaElement>) => {
      const pasteData = event.clipboardData.getData("Text");
      const rows = pasteData.split("\n").filter((row) => row.trim() !== "");
      const validRows: { key: string; factura: string; monto: number; observacion: string }[] = [];
      let hasError = false;
      console.log(rows);

      rows.forEach((row, index) => {
        const columns = row.split("\t");
        if (columns.length < 2) {
          hasError = true;
          return;
        }
        if (!isNaN(parseFloat(columns[1]))) {
          validRows.push({
            key: (dataSource.length + validRows.length + 1).toString(),
            factura: columns[0].trim(),
            monto: parseFloat(columns[1]),
            observacion: columns[2]?.trim() || ""
          });
        } else {
          hasError = true;
          messageApi.error(`valor invalido en  ${index}: ${row}`);
          return;
        }
      });
      if (!hasError && validRows.length > 0) {
        setDataSource((prevData) => [...prevData, ...validRows]);
      } else {
        messageApi.error("El formato de la tabla no es correcto. Por favor, verifique los datos.");
        return;
      }
      messageApi.success(
        `Se han agregado ${validRows.length} filas a la tabla. Total de filas: ${dataSource.length + validRows.length}`
      );
    },

    [dataSource.length, messageApi]
  );

  const handleSave = useCallback((row: DataType) => {
    setDataSource((prevData) =>
      prevData.map((item) => (item.key === row.key ? { ...item, ...row } : item))
    );
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const columns: ColumnsType<DataType> = useMemo(
    () => [
      {
        title: "Factura",
        dataIndex: "factura",
        key: "factura",
        width: "20%",
        render: (text: string) => text
      },
      {
        title: "Monto",
        dataIndex: "monto",
        key: "monto",
        width: "20%",
        render: (text) => `$${text}`.replace(/\B(?=(\d{3})+(?!\d))/g, ","),
        sorter: (a, b) => a.monto - b.monto
      },
      {
        title: "Observacion",
        dataIndex: "observacion",
        key: "observacion",
        render: (_: any, record: DataType) => (
          <Input
            className="input__table"
            value={record.observacion}
            onChange={(e) => {
              const value = e.target.value;
              const sanitizedValue = value.replace(/;/g, ",");
              handleSave({ ...record, observacion: sanitizedValue });
            }}
          />
        )
      }
    ],
    [handleSave]
  );
  const convertToCSV = (data: DataType[]) => {
    const header = "factura;monto;observacion\n";
    const rows = data.map((row) => `${row.factura};${row.monto};${row.observacion}`).join("\n");
    return header + rows;
  };

  const submitCSV = () => {
    const csvData = convertToCSV(dataSource);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    console.log("dataSource", dataSource);
  }, [dataSource]);

  return (
    <div className="concilation__view">
      {contextHolder}
      <Flex vertical gap={"1rem"}>
        <Flex className="searchBar__container">
          <UiSearchInput
            placeholder="Buscar por factura"
            onChange={(event) => handleSearch(event.target.value)}
          />
          {/* <FiltersConcilation /> */} {/* en el diseno esta, por peticion lo comentamos */}
          <Button className="button__format" onClick={showModal}>
            Conciliar
          </Button>
          <Button className="button__format" onClick={submitCSV}>
            Descargar
          </Button>
        </Flex>
        <Table dataSource={filteredData} columns={columns} pagination={false} />
        <textarea
          ref={textareaRef}
          onPaste={handlePaste}
          style={{ position: "absolute", left: "-9999px" }}
        />
        <Button
          onClick={() => {
            textareaRef.current?.focus();
          }}
        >
          haz click y pegue las facturas <MicrosoftExcelLogo size={22} />
        </Button>
      </Flex>
      <ModalNextConcilation visible={isModalVisible} onClose={closeModal} />
    </div>
  );
};
