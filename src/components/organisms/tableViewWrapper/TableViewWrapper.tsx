import React, { FC } from "react";
import { Flex } from "antd";
import styles from "./TableViewWrapper.module.scss";
import UiSearchInput from "@/components/ui/search-input";
import { FilterProjects } from "@/components/atoms/Filters/FilterProjects/FilterProjects";

interface TableViewWrapperProps {
  setSelectFilters: (filters: any) => void;
  loading: boolean;
  children: React.ReactNode;
}

const TableViewWrapper: FC<TableViewWrapperProps> = ({ setSelectFilters, loading, children }) => {
  return (
    <div className={styles.wrapper}>
      <Flex className={styles.filters} style={{ marginBottom: "0.5rem" }} gap={8}>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event: any) => {
            setTimeout(() => {
              console.info(event.target.value);
            }, 1000);
          }}
        />
        <FilterProjects setSelecetedProjects={setSelectFilters} height="48" />
      </Flex>
      <Flex vertical>{children}</Flex>
    </div>
  );
};

export default TableViewWrapper;
