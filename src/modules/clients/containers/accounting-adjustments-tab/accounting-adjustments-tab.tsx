import { useState } from "react";
import { useParams } from "next/navigation";
import { Button, Flex, Spin } from "antd";
import { CaretDoubleRight } from "phosphor-react";
import LabelCollapse from "@/components/ui/label-collapse";
import UiSearchInput from "@/components/ui/search-input";
import AccountingAdjustmentsTable from "@/modules/clients/components/accounting-adjustments-table";
import Collapse from "@/components/ui/collapse";
import { useFinancialDiscounts } from "@/hooks/useFinancialDiscounts";
import { extractSingleParam } from "@/utils/utils";
import {
  FinancialDiscount,
  StatusFinancialDiscounts
} from "@/types/financialDiscounts/IFinancialDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import UiFilterDropdown from "@/components/ui/ui-filter-dropdown";
import "./accounting-adjustments-tab.scss";
import { useModalDetail } from "@/context/ModalContext";

const AccountingAdjustmentsTab = () => {
  const [selectedRows, setSelectedRows] = useState<FinancialDiscount[] | undefined>(
    undefined
  );
  const [search, setSearch] = useState("");

  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);
  const clientId = clientIdParam ? parseInt(clientIdParam) : 0;
  const projectId = projectIdParam ? parseInt(projectIdParam) : 0;

  const { data, isLoading } = useFinancialDiscounts(clientId, projectId);
  const { openModal } = useModalDetail();

  const handleOpenAdjustmentDetail = (adjustment: FinancialDiscount) => {
    openModal("adjustment", {
      selectAdjusment: adjustment,
      clientId,
      projectId
    });
  };

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "3rem" }}>
          <Spin />
        </Flex>
      ) : (
        <div className="accountingAdjustmentsTab">
          <Flex justify="space-between" className="accountingAdjustmentsTab__header">
            <Flex gap={"0.5rem"}>
              <UiSearchInput
                className="search"
                placeholder="Buscar"
                onChange={(event) => {
                  setTimeout(() => {
                    setSearch(event.target.value);
                  }, 1000);
                }}
              />
              <UiFilterDropdown />
              <DotsDropdown />
            </Flex>

            <Button
              type="primary"
              className="availableAdjustments"
              onClick={() => console.log("click ajustes disponibles")}
            >
              Ajustes disponibles
              <CaretDoubleRight size={16} style={{ marginLeft: "0.5rem" }} />
            </Button>
          </Flex>

          <Collapse
            items={data?.map((financialState: StatusFinancialDiscounts) => ({
              key: financialState.status_id,
              label: (
                <LabelCollapse status={financialState.status_name} color={financialState.color} />
              ),
              children: (
                <>
                  <AccountingAdjustmentsTable
                    dataAdjustmentsByStatus={financialState.financial_discounts_legalized}
                    setSelectedRows={setSelectedRows}
                    openAdjustmentDetail={handleOpenAdjustmentDetail}
                    financialStatusId={financialState.status_id}
                  />
                  {/* {financialState.financial_discounts_not_legalized.length > 0 && (
                    <AccountingAdjustmentsTable
                      dataAdjustmentsByStatus={financialState.financial_discounts_not_legalized}
                      setSelectedRows={setSelectedRows}
                      openAdjustmentDetail={handleOpenAdjustmentDetail}
                      financialStatusId={financialState.status_id}
                    />
                  )} */}
                </>
              )
            }))}
          />
        </div>
      )}
    </>
  );
};

export default AccountingAdjustmentsTab;
