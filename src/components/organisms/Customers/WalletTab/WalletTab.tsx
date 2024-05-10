import { useInvoices } from "@/hooks/useInvoices";
import { extractSingleParam } from "@/utils/utils";
import { Collapse } from "antd";
import { useParams } from "next/navigation";
import "./wallettab.scss";
import { LabelCollapseInvoice } from "@/components/atoms/LabelCollapseInvoice/LabelCollapseInvoice";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found:a welcome guest in many households across the world.
`;

export const WalletTab = () => {
  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientId);
  const projectIdParam = extractSingleParam(params.projectId);

  const clientId = clientIdParam ? parseInt(clientIdParam) : undefined;
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;

  const { data, isLoading } = useInvoices({
    clientId: clientId || 0,
    projectId: projectId || 0
  });

  console.log("DATA INVOICES: ", data);

  return (
    <>
      {" "}
      {isLoading ? (
        "loading"
      ) : (
        <>
          {data?.map((invoice) => {
            return (
              <Collapse
                className="collapseByStatus"
                defaultActiveKey={[invoice.status_id]}
                key={invoice.status_id}
                ghost
                items={[
                  {
                    key: invoice.status_id,
                    label: <LabelCollapseInvoice />,
                    children: <p>{text}</p>
                  }
                ]}
              />
            );
          })}
        </>
      )}
    </>
  );
};
