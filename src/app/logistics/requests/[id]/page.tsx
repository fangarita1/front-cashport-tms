import AceptCarrierDetailView from "@/components/organisms/acept_carrier/view/AceptCarrierDetailView/AceptCarrierDetailView";

export default function Page({ params }: { params: { id: string } }) {
  return <AceptCarrierDetailView params={params} />;
}
