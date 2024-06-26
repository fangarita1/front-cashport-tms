import { useState } from "react";
import { useParams } from "next/navigation";
import { Button, Collapse, Flex, Spin } from "antd";
import { CaretDoubleRight } from "phosphor-react";
import LabelCollapse from "@/components/ui/label-collapse";
import UiSearchInput from "@/components/ui/search-input";
import AccountingAdjustmentsTable from "@/modules/clients/components/accounting-adjustments-table";
import { useFinancialDiscounts } from "@/hooks/useFinancialDiscounts";
import { extractSingleParam } from "@/utils/utils";
import { IFinancialDiscount } from "@/types/financialDiscounts/IFinancialDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";

const AccountingAdjustmentsTab = () => {
  const [selectedRows, setSelectedRows] = useState<IFinancialDiscount[] | undefined>(undefined);
  const [showAdjustmentDetailModal, setShowAdjustmentDetailModal] = useState<{
    isOpen: boolean;
    adjustmentId: number;
  }>({} as { isOpen: boolean; adjustmentId: number });
  const [search, setSearch] = useState("");

  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);
  const clientId = clientIdParam ? parseInt(clientIdParam) : 0;
  const projectId = projectIdParam ? parseInt(projectIdParam) : 0;

  const { data, isLoading } = useFinancialDiscounts(clientId, projectId);

  return (
    <>
      {isLoading ? (
        <Flex justify="center" align="center" style={{ height: "3rem" }}>
          <Spin />
        </Flex>
      ) : (
        <>
          <Flex justify="space-between" className="walletTab_header">
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
              <DotsDropdown />
            </Flex>

            <Button
              type="primary"
              className="button__adjustments"
              size="large"
              onClick={() => console.log("click ajustes contables")}
            >
              Ajustes disponibles
              <CaretDoubleRight size={16} style={{ marginLeft: "0.5rem" }} />
            </Button>
          </Flex>

          <Collapse
            className="collapseByStatus"
            ghost
            accordion
            items={data?.map((financialState) => ({
              key: financialState.status_id,
              label: (
                <LabelCollapse status={financialState.financial_discounts[0].document_type_name} />
              ),
              children: (
                <AccountingAdjustmentsTable
                  dataAdjustmentStatus={financialState}
                  setSelectedRows={setSelectedRows}
                  setShowAdjustmentDetailModal={setShowAdjustmentDetailModal}
                />
              )
            }))}
          />
        </>
      )}
    </>
  );
};

export default AccountingAdjustmentsTab;
