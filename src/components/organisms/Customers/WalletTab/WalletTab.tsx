import { useInvoices } from "@/hooks/useInvoices";
import { extractSingleParam } from "@/utils/utils";
import { Button, Collapse, Flex, Spin } from "antd";
import { useParams } from "next/navigation";
import { DotsThree } from "phosphor-react";
import { LabelCollapseInvoice } from "@/components/atoms/LabelCollapseInvoice/LabelCollapseInvoice";
import "./wallettab.scss";
import { InvoicesTable } from "@/components/molecules/tables/InvoicesTable/InvoicesTable";
import { ModalGenerateAction } from "@/components/molecules/modals/ModalGenerateAction/ModalGenerateAction";
import { useState } from "react";
import UiSearchInput from "@/components/ui/search-input";

export const WalletTab = () => {
  const [isGenerateActionOpen, setisGenerateActionOpen] = useState(false);
  const [search, setSearch] = useState("");
  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);

  const clientId = clientIdParam ? parseInt(clientIdParam) : undefined;
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;

  const { data, isLoading } = useInvoices({
    clientId: clientId || 0,
    projectId: projectId || 0
  });

  const handleisGenerateActionOpen = () => {
    setisGenerateActionOpen(!isGenerateActionOpen);
  };

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
                    console.log("search", search);
                  }, 1000);
                }}
              />
              <Button
                className="button__actions"
                size="large"
                icon={<DotsThree size={"1.5rem"} />}
                onClick={handleisGenerateActionOpen}
              >
                Generar acción
              </Button>
            </Flex>

            <Button
              type="primary"
              className="button__adjustments"
              size="large"
              onClick={() => console.log("click ajustes contables")}
            >
              Ajustes contables
            </Button>
          </Flex>

          {data?.map((invoice, index) => {
            if (invoice.count > 0) {
              return (
                <>
                  <Collapse
                    className="collapseByStatus"
                    defaultActiveKey={[invoice.status_id]}
                    key={invoice.status_id}
                    ghost
                    items={[
                      {
                        key: invoice.status_id,
                        label: (
                          <LabelCollapseInvoice
                            status={invoice.status}
                            total={invoice.total}
                            quantity={invoice.count}
                          />
                        ),
                        children: <InvoicesTable dataSingleInvoice={invoice.invoices} />
                      }
                    ]}
                  />
                  {index < data.length - 1 && <hr className="collapse-separator" />}
                </>
              );
            }
          })}
        </>
      )}
      <ModalGenerateAction isOpen={isGenerateActionOpen} onClose={handleisGenerateActionOpen} />
    </>
  );
};
