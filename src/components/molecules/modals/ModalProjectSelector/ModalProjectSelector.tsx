import { Modal } from "antd";
import Image from "next/image";

import "./modalProjectSelector.scss";
import { useEffect, useState } from "react";
import { getUserPermissions } from "@/services/permissions/userPermissions";
import { useAppStore } from "@/lib/store/store";
import { ISelectedProject } from "@/lib/slices/createProjectSlice";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalProjectSelector = ({ isOpen, onClose }: Props) => {
  const setSelectProject = useAppStore((state) => state.setSelectedProject);
  const [projects, setProjects] = useState<ISelectedProject[]>([]);

  useEffect(() => {
    //useEffect to call userPermissions and get the projects
    const fetchProjects = async () => {
      const response = await getUserPermissions();
      setProjects(
        response?.data?.map((project) => ({
          ID: project.project_id,
          NAME: project.name,
          LOGO: project.logo
        }))
      );

      if (response?.data?.length === 1) {
        setSelectProject({
          ID: response?.data[0].project_id,
          NAME: response?.data[0].name,
          LOGO: response?.data[0].logo
        });
      }
    };
    fetchProjects();
  }, []);

  const handleSelectProject = (project: ISelectedProject) => {
    const projectInfo: ISelectedProject = {
      ID: project.ID,
      NAME: project.NAME,
      LOGO: project.LOGO
    };
    setSelectProject(projectInfo);
    onClose();
  };

  return (
    <Modal className="modalProjectSelector" open={isOpen} onCancel={onClose} footer={false}>
      <h2>Elegir proyecto</h2>
      <div className="modalProjectSelector__projects">
        {projects?.map((project) => (
          <div onClick={() => handleSelectProject(project)} className="project" key={project.ID}>
            <Image
              className="project__image"
              src={project.LOGO}
              width={100}
              height={100}
              alt="Project image"
            />
            <div className="project__name">
              <p>{project.NAME}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
