"use client";
import { ProjectTable } from "@/components/molecules/tables/ProjectsTable/ProjectsTable";
import config from "@/config";
import { redirect } from "next/navigation";
import ViewWrapper from "../../ViewWrapper/ViewWrapper";

export const ProjectsView = () => {
  if (config.isLogistics) {
    redirect("/logistics/providers/all");
  }
  return (
    <ViewWrapper headerTitle="Proyectos">
      <ProjectTable />
    </ViewWrapper>
  );
};
