import { useInvoices } from "@/hooks/useInvoices";

interface PropsWallet {
  clientId: number;
  projectId: number;
}
export const WalletTab = (props: PropsWallet) => {
  const { data, isLoading } = useInvoices({ clientId: props.clientId, projectId: props.projectId });

  console.log("DATA INVOICES: ", data);

  return <> {isLoading ? "loading" : <p>TABLA INVOICES</p>}</>;
};
