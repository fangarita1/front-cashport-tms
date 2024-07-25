import { Avatar, Modal } from "antd";
import Image from "next/image";
import { Clipboard } from "phosphor-react";

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
  const [selectedProjectId, setSelectedProjectId] = useState<number>();

  useEffect(() => {
    //useEffect to call userPermissions and get the projects
    const fetchProjects = async () => {
      const response = await getUserPermissions();
      setProjects(
        response?.data?.map((project) => ({
          ID: project.project_id,
          NAME: project.name,
          LOGO: project.logo ? project.logo : ""
        }))
      );

      if (response?.data?.length === 1) {
        setSelectProject({
          ID: response?.data[0].project_id,
          NAME: response?.data[0].name,
          LOGO: response?.data[0].logo ? response?.data[0].logo : ""
        });
        setSelectedProjectId(response?.data[0].project_id);
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
    setSelectedProjectId(project.ID);

    onClose();
  };

  return (
    <Modal
      className="modalProjectSelector"
      open={isOpen}
      onCancel={onClose}
      footer={false}
      width={"60%"}
    >
      <h2 className="modalProjectSelector__title">Elegir proyecto</h2>
      <div className="modalProjectSelector__projects">
        {projects?.map((project) => (
          <div onClick={() => handleSelectProject(project)} className="project" key={project.ID}>
            {project.LOGO ? (
              <Image
                className="project__image"
                src={project.LOGO}
                width={100}
                height={100}
                alt="Project image"
              />
            ) : (
              <Avatar shape="square" className="imageWithoutImage" size={65} icon={<Clipboard />} />
            )}

            <div className={`project__name ${project.ID === selectedProjectId && "-selected"}`}>
              <p>{project.NAME}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};
