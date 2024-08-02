import { FC } from "react";
import Link from "next/link";
import { Button, Flex, Table, TableProps, Typography } from "antd";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Bank, Eye } from "phosphor-react";

import styles from "./banks-view.module.scss";
import { ISingleBank } from "@/types/banks/IBanks";
import { formatMoney } from "@/utils/utils";

const { Text } = Typography;

export const BanksView: FC = () => {
  return (
    <div className={styles.banksView}>
      <h2 className={styles.title}>Bancos</h2>
      <Flex className={styles.FlexContainer} vertical>
        <Flex className={styles.header}>
          <UiSearchInput
            placeholder="Buscar"
            onChange={(event) => {
              setTimeout(() => {
                console.info(event.target.value);
              }, 1000);
            }}
          />
          <FilterDiscounts />
          <DotsDropdown />
          <Link href="/comercio/pedido" className={styles.ctaButton}>
            <PrincipalButton>
              Reglas de bancos
              <Bank size={16} style={{ marginLeft: "0.5rem" }} />
            </PrincipalButton>
          </Link>
        </Flex>
        <Table
          loading={false}
          columns={columns}
          dataSource={mockTableData.map((data) => ({
            ...data,
            key: data.id
          }))}
        />
      </Flex>
    </div>
  );
};

export default BanksView;

const columns: TableProps<ISingleBank>["columns"] = [
  {
    title: "ID",
    dataIndex: "id",
    key: "id",
    render: (text) => <Text className="text">{text}</Text>
  },
  {
    title: "Cliente",
    dataIndex: "client_name",
    key: "client_name",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Fecha",
    dataIndex: "date",
    key: "date",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Monto",
    key: "amount",
    dataIndex: "amount",
    render: (text) => <Text>{formatMoney(text)}</Text>
  },
  {
    title: "Descripción",
    key: "description",
    dataIndex: "description",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Cuenta",
    key: "account_number",
    dataIndex: "account_number",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Estado",
    key: "state_name",
    dataIndex: "state_name",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "",
    key: "seeProject",
    width: "40px",
    dataIndex: "",
    render: () => <Button className="buttonSeeProject" icon={<Eye size={"1.3rem"} />} />
  }
];

const mockTableData: ISingleBank[] = [
  {
    id: 1,
    client_name: "Cliente 1",
    date: "30/09/2021",
    amount: 150000,
    description: "Descripcion",
    account_number: 123456,
    account_bank: "Bancolombia",
    state_name: "identificado",
    state_color: "#0085FF"
  },
  {
    id: 2,
    client_name: "Cliente 2",
    date: "30/09/2021",
    amount: 150000,
    description: "Descripcion2",
    account_number: 123456,
    account_bank: "Bancolombia",
    state_name: "Auditoria",
    state_color: "#FE7A01"
  },
  {
    id: 3,
    client_name: "Cliente 3",
    date: "30/09/2021",
    amount: 150000,
    description: "Descripcion",
    account_number: 123456,
    account_bank: "Bancolombia",
    state_name: "No identificado",
    state_color: "#E53261"
  }
];
