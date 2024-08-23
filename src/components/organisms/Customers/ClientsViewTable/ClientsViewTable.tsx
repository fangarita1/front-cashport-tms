"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Spin, TableProps, Button, Col, Flex, Row, Table, Typography } from "antd";
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
import CardsClients from "../../../molecules/modals/CardsClients/CardsClients";
import { usePortfolios } from "@/hooks/usePortfolios";
import { IClientsPortfolio } from "@/types/clients/IViewClientsTable";
import { formatMoney } from "@/utils/utils";
import { useAppStore } from "@/lib/store/store";
import redirectModal from "@/components/molecules/modals/redirectModal/RedirectModal";
import useStore from "@/lib/hook/useStore";
import { STORAGE_TOKEN } from "@/utils/constants/globalConstants";
import "./ClientsViewTable.scss";
import { useDebounce } from "@/hooks/useDeabouce";
import UiSearchInput from "@/components/ui/search-input/search-input";
import {
  FilterPortfolio,
  SelectedFilters
} from "@/components/atoms/Filters/FilterPortfolio/FilterPortfolio";

const { Text } = Typography;

export const ClientsViewTable = () => {
  const [page, setPage] = useState(1);
  const [isComponentLoading, setIsComponentLoading] = useState(true);
  const [tableData, setTableData] = useState<IClientsPortfolio[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const loader = useRef(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const project = useStore(useAppStore, (projects) => projects.selectedProject);
  const ID = project?.ID;
  const [filters, setFilters] = useState<SelectedFilters>({
    holding: [],
    clientGroup: []
  });
  useEffect(() => {
    setIsComponentLoading(false);
  }, []);

  useEffect(() => {
    const token = localStorage.getItem(STORAGE_TOKEN);
    if (!isComponentLoading && !ID && !!token) {
      redirectModal();
    }
  }, [isComponentLoading, ID]);

  const [loadingOpenPortfolio, setLoadingOpenPortfolio] = useState({
    isLoading: false,
    loadingId: 0
  });

  const { data, loading, error } = usePortfolios({
    page: page,
    searchQuery: debouncedSearchQuery,
    holding: filters.holding,
    client_group:   filters.clientGroup
  });

  useEffect(() => {
    if (data?.data?.clientsPortfolio) {
      setTableData((prevData) => [...prevData, ...data.data.clientsPortfolio]);
      setHasMore(data.data.clientsPortfolio.length > 0);
    } else if (data?.status === 200 && data?.message === "no rows") {
      setHasMore(false);
    }
  }, [data]);

  useEffect(() => {
    setPage(1);
    setTableData([]);
    setHasMore(true);
  }, [debouncedSearchQuery, filters]);

  const loadMoreData = useCallback(() => {
    if (!loading && hasMore && !error) {
      setPage((prevPage) => prevPage + 1);
    }
  }, [loading, hasMore, error]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "20px",
      threshold: 1.0
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !loading) {
        loadMoreData();
      }
    }, options);

    const currentLoader = loader.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMoreData, loading]);

  const columns: TableProps<IClientsPortfolio>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "client_name",
      key: "client_name",
      render: (_, row: IClientsPortfolio) => (
        <Link href={`/clientes/detail/${row.client_id}/project/${row.project_id}`}>
          <Text className="text">{row.client_name}</Text>
        </Link>
      ),
      width: "20%",
      sorter: (a, b) => a.client_name.localeCompare(b.client_name)
    },
    {
      align: "right",
      title: "Cartera",
      dataIndex: "total_portfolio",
      key: "total_portfolio",
      render: (text) => <Text>{formatMoney(text)}</Text>,
      width: "10%",
      sorter: (a, b) => a.total_portfolio - b.total_portfolio
    },
    {
      align: "right",
      title: "Vencida",
      dataIndex: "past_due_ammount",
      key: "past_due_ammount",
      render: (text) => <Text>{formatMoney(text)}</Text>,
      width: "10%",
      sorter: (a, b) => a.past_due_ammount - b.past_due_ammount
    },
    {
      align: "right",
      title: "Presupuesto",
      key: "budget_ammount",
      dataIndex: "budget_ammount",
      render: (text) => <Text>{formatMoney(text)}</Text>,
      width: "10%",
      sorter: (a, b) => a.budget_ammount - b.budget_ammount
    },
    {
      align: "right",
      title: "R. Aplicado",
      key: "applied_payments_ammount",
      dataIndex: "applied_payments_ammount",
      render: (text) => <Text>{formatMoney(text)}</Text>
    },
    {
      align: "center",
      width: 103,
      title: "Ejecutado",
      key: "executed_percentage",
      dataIndex: "executed_percentage",
      render: (text) => <Text>{text} %</Text>
    },
    {
      align: "right",
      title: "PNA",
      key: "unapplied_payments_ammount",
      dataIndex: "unapplied_payments_ammount",
      render: (text) => <Text>{formatMoney(text)}</Text>
    },
    {
      align: "right",
      title: "Saldos",
      key: "total_balances",
      dataIndex: "total_balances",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.total_balances - b.total_balances
    },
    {
      title: "Holding",
      key: "holding_name",
      dataIndex: "holding_name",
      render: (text) => <Text className="text">{text}</Text>,
      sorter: (a, b) => a.holding_name?.localeCompare(b.holding_name)
    },
    {
      title: "",
      key: "buttonSee",
      width: 64,
      dataIndex: "",
      render: (_, row: IClientsPortfolio) => (
        <Link href={`/clientes/detail/${row.client_id}/project/${row.project_id}`}>
          <Button
            key={row.client_id}
            onClick={() => setLoadingOpenPortfolio({ isLoading: true, loadingId: row.client_id })}
            className="buttonSeeProject"
            icon={
              loadingOpenPortfolio.loadingId === row.client_id && loadingOpenPortfolio.isLoading ? (
                <Spin />
              ) : (
                <Eye size={"1.3rem"} />
              )
            }
          />
        </Link>
      )
    }
  ];
  const handelSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPage(1);
    setSearchQuery(e.target.value);
  };

  return (
    <main className="mainClientsTable">
      <div>
        <Flex justify="space-between" className="mainClientsTable_header">
          <Flex gap={"10px"}>
            <UiSearchInput placeholder="Buscar clientes" onChange={(e) => handelSearch(e)} />
            <FilterPortfolio setSelectedFilters={setFilters} />
            <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
          </Flex>
        </Flex>
        <Row gutter={8}>
          <Col span={21} className="cards">
            <Row gutter={8}>
              <Col span={4}>
                <CardsClients
                  title={"Total cartera"}
                  total={data?.data?.grandTotal?.total_wallet || 0}
                  icon={<Money />}
                  loading={loading}
                />
              </Col>
              <Col span={4}>
                <CardsClients
                  title={"C. vencida"}
                  total={data?.data?.grandTotal?.total_past_due || 0}
                  icon={<CalendarX />}
                  loading={loading}
                />
              </Col>
              <Col span={4}>
                <CardsClients
                  title={"Presupuesto"}
                  total={data?.data?.grandTotal?.total_budget || 0}
                  icon={<CalendarBlank />}
                  loading={loading}
                />
              </Col>
              <Col span={4}>
                <CardsClients
                  title={"R. aplicado"}
                  total={data?.data?.grandTotal?.applied_payments_ammount || 0}
                  icon={<Receipt />}
                  loading={loading}
                />
              </Col>
              <Col span={4}>
                <CardsClients
                  title={"Pagos no ap."}
                  total={data?.data?.grandTotal?.unapplied_payments_ammount || 0}
                  icon={<XCircle />}
                  loading={loading}
                />
              </Col>
              <Col span={4}>
                <CardsClients
                  title={"Pagos no id."}
                  total={data?.data?.grandTotal?.unidentified_payment_ammount || 0}
                  icon={<MagnifyingGlassMinus />}
                  loading={loading}
                />
              </Col>
            </Row>
          </Col>
          <Col span={3}>
            <CardsClients
              title={"DSO"}
              total={data?.data?.grandTotal?.dso || 0}
              icon={<Calendar />}
              notAMoneyValue
              loading={loading}
            />
          </Col>
        </Row>
      </div>
      <Table
        loading={loading && page === 1}
        scroll={{ x: 1350 }}
        columns={columns as TableProps<any>["columns"]}
        dataSource={tableData.map((data) => ({ ...data, key: data.client_id }))}
        pagination={false}
        sticky={
          {
            offsetHeader: -20,
            offsetScroll: 0
          } as any
        }
      />
      {hasMore && !loading && (
        <div ref={loader} style={{ textAlign: "center", padding: "20px" }}>
          {loading && page > 1 && <Spin />}
        </div>
      )}
      {!hasMore && !loading && tableData.length > 0 && (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Text>No hay más datos para cargar</Text>
        </div>
      )}
    </main>
  );
};
