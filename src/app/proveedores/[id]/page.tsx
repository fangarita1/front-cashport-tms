import ProviderDetailView from "@/components/organisms/providers/view/ProviderDetailView/ProviderDetailView";

export default function Page({ params }: { params: { id: string } }) {
  return <ProviderDetailView params={params} />;
}
