"use client";
import { Flex, Typography } from "antd";

import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { ProjectTable } from "@/components/molecules/tables/ProjectsTable/ProjectsTable";

import "./projects.scss";
import Header from "../../header";
import config from "@/config";
import { useRouter } from "next/navigation";

const { Title } = Typography;

export const ProjectsView = () => {
  const router = useRouter();
  if (config.isLogistics) {
    router.push("/logistics/providers/all");
  }
  return (
    <main className="mainProject">
      <SideBar />
      <Flex vertical className="contentProject">
        <Header title="Proyectos" />
        <ProjectTable />
      </Flex>
    </main>
  );
};
