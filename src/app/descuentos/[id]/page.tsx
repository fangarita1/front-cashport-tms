import { CreateDiscountView } from "@/components/organisms/discounts/create/CreateDiscountView";

export default function Create({ params }: { params: { id: string } }) {
    console.log(params);
  return <CreateDiscountView params={params} />;
}
