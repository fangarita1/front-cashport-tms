"use client";

import { DetailsProjectView } from "@/components/organisms/projects/DetailProjectView/DetailProjectView";

function ReviewProjectPage({ params }: { params: { id: string } }) {
  return <DetailsProjectView idProjectParam={params.id} />;
}

export default ReviewProjectPage;
