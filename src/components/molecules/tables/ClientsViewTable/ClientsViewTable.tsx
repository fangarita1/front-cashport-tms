import { useState } from "react";
import { Button, Flex, Table, Typography } from "antd";
import type { TableProps } from "antd";
import {
  CalendarBlank,
  CalendarX,
  DotsThree,
  Eye,
  Money,
  Calendar,
  Receipt,
  XCircle,
  MagnifyingGlassMinus
} from "phosphor-react";

import { useProjects } from "@/hooks/useProjects";
import { IProject } from "@/types/projects/IProjects";

import "./ClientsViewTable.scss";
import CardsClients from "../../modals/CardsClients/CardsClients";
import { useClients } from "@/hooks/useClients";
import { useUserByToken } from "@/hooks/useUserByToken";

const { Text } = Typography;

export const ClientsViewTable = () => {
  const { data: userData } = useUserByToken();
  const { data: clients } = useClients({ id: userData?.projectId });

  const [selectFilters] = useState({
    country: [] as string[],
    currency: [] as string[]
  });
  const [page, setPage] = useState(1);
  const { loading, data } = useProjects({
    page: selectFilters.country.length !== 0 || selectFilters.currency.length !== 0 ? 1 : page,
    currencyId: selectFilters.currency,
    countryId: selectFilters.country
  });

  const onChangePage = (pagePagination: number) => {
    setPage(pagePagination);
  };

  return (
    <main className="mainClientsTable">
      <Flex justify="space-between" className="mainClientsTable_header">
        <Flex gap={"10px"}>
          <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
        </Flex>
      </Flex>
      <Flex className="cards">
        <CardsClients
          title={"Total cartera"}
          total={clients?.grandTotal.total_wallet || 0}
          icon={<Money />}
        />
        <CardsClients
          title={"C. vencida"}
          total={clients?.grandTotal.total_past_due || 0}
          icon={<CalendarX />}
        />
        <CardsClients
          title={"Presupuesto"}
          total={clients?.grandTotal.total_budget || 0}
          icon={<CalendarBlank />}
        />
        <CardsClients
          title={"R. aplicado"}
          total={clients?.grandTotal.applied_payments_ammount || 0}
          icon={<Receipt />}
        />
        <CardsClients
          title={"Pagos no ap."}
          total={clients?.grandTotal.unapplied_payments_ammount || 0}
          icon={<XCircle />}
        />
        <CardsClients
          title={"Pagos no id."}
          total={clients?.grandTotal.unidentified_payment_ammount || 0}
          icon={<MagnifyingGlassMinus />}
        />
        <CardsClients title={"DSO"} total={clients?.grandTotal.dso || 0} icon={<Calendar />} />
      </Flex>
      <Table
        loading={loading}
        scroll={{ y: "61dvh", x: undefined }}
        columns={columns as TableProps<any>["columns"]}
        pagination={{
          pageSize: 25,
          total: data.pagination.totalRows,
          onChange: onChangePage
        }}
        dataSource={clients?.clientsPortfolio}
      />
    </main>
  );
};

const columns: TableProps<IProject>["columns"] = [
  {
    title: "Nombre",
    dataIndex: "client_name",
    key: "client_name",
    render: (text) => <Text className="text">{text}</Text>
  },
  {
    title: "Cartera",
    dataIndex: "total_portfolio",
    key: "total_portfolio",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Vencida",
    dataIndex: "past_due_ammount",
    key: "past_due_ammount"
  },
  {
    title: "Presupuesto",
    key: "budget_ammount",
    dataIndex: "budget_ammount",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "R. Aplicado",
    key: "applied_payments_ammount",
    dataIndex: "applied_payments_ammount",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Ejecutado",
    key: "executed_percentage",
    dataIndex: "executed_percentage",
    render: (text) => <Text>{text} %</Text>
  },
  {
    title: "PNA",
    key: "unapplied_payments_ammount",
    dataIndex: "unapplied_payments_ammount",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Saldos",
    key: "executed_percentage",
    dataIndex: "executed_percentage",
    render: (text) => <Text>{text}</Text>
  },
  {
    title: "Holding",
    key: "holding_name",
    dataIndex: "holding_name",
    render: (text) => <Text className="text">{text}</Text>
  },
  {
    title: "",
    key: "buttonSee",
    width: "60px",
    dataIndex: "",
    render: () => <Button icon={<Eye size={"1.3rem"} />} />
  }
];
