"use client";
import { Flex, Typography } from "antd";

import { SideBar } from "@/components/molecules/SideBar/SideBar";
import { NavRightSection } from "@/components/atoms/NavRightSection/NavRightSection";
import { ProjectTable } from "@/components/molecules/tables/ProjectsTable/ProjectsTable";

import "./projects.scss";
import Header from "../../header";

const { Title } = Typography;

export const ProjectsView = () => {
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
