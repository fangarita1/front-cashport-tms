"use client";
import styles from "./Discounts.module.scss";
import { Flex, Table } from "antd";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import { Triangle } from "phosphor-react";

export default function Discounts() {
  return (
    <Flex className={styles.FlexContainer} vertical>
      <Flex className={styles.header} gap={"10px"}>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event) => {
            setTimeout(() => {
              console.log(event.target.value);
            }, 1000);
          }}
        />
        <FilterDiscounts />
        <DotsDropdown />
      </Flex>
      <Table
        scroll={{ y: "61dvh", x: undefined }}
        columns={[
          { title: "asdasd", dataIndex: "asdasd", key: "asdasd" },
          { title: "asdasd", dataIndex: "asdasd", key: "asdasd" },
          { title: "asdasd", dataIndex: "asdasd", key: "asdasd" },
          { title: "asdasd", dataIndex: "asdasd", key: "asdasd" },
          { title: "asdasd", dataIndex: "asdasd", key: "asdasd" }
        ]}
        pagination={{
          pageSize: 25,
          showSizeChanger: false,
          total: 90,
          onChange: () => {},
          itemRender: (page, type, originalElement) => {
            if (type === "prev") {
              return (
                <Triangle size={".75rem"} weight="fill" style={{ transform: "rotate(-90deg)" }} />
              );
            }
            if (type === "next") {
              return (
                <Triangle size={".75rem"} weight="fill" style={{ transform: "rotate(90deg)" }} />
              );
            }
            if (type === "page") {
              return <Flex justify="center">{page}</Flex>;
            }

            if (type === "jump-prev") {
              return (
                <Triangle size={".75rem"} weight="fill" style={{ transform: "rotate(-180deg)" }} />
              );
            }
            return originalElement;
          }
        }}
        dataSource={[]}
      />
    </Flex>
  );
}
