import ProviderDetail from "@/components/organisms/providers/detail/ProviderDetail";

export default function Create({ params }: { params: { id: string } }) {
  return <ProviderDetail params={params} />;
}
