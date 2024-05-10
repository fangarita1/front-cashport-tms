import { useInvoices } from "@/hooks/useInvoices";
import { extractSingleParam } from "@/utils/utils";
import { useParams } from "next/navigation";

export const WalletTab = () => {
  const params = useParams();
  const clientIdParam = extractSingleParam(params.clientID);
  const projectIdParam = extractSingleParam(params.projectID);

  const clientId = clientIdParam ? parseInt(clientIdParam) : undefined;
  const projectId = projectIdParam ? parseInt(projectIdParam) : undefined;

  const { data, isLoading } = useInvoices({
    clientId: clientId || 0,
    projectId: projectId || 0
  });

  console.log("DATA INVOICES: ", data);

  return <> {isLoading ? "loading" : <p>TABLA INVOICES</p>}</>;
};
