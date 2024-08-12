import { Avatar, Modal } from "antd";
import { Clipboard } from "phosphor-react";

import "./modalProjectSelector.scss";
import { useEffect } from "react";
import { getUserPermissions } from "@/services/permissions/userPermissions";
import { useAppStore } from "@/lib/store/store";
import { ISelectedProject } from "@/lib/slices/createProjectSlice";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalProjectSelector = ({ isOpen, onClose }: Props) => {
  const path = usePathname();
  const router = useRouter();
  const selectedProject = useAppStore((state) => state.selectedProject);
  const setSelectedProject = useAppStore((state) => state.setSelectedProject);
  const projects = useAppStore((state) => state.projectsBasicInfo);
  const setProjectsBasicInfo = useAppStore((state) => state.setProjectsBasicInfo);

  useEffect(() => {
    //useEffect to call userPermissions and get the projects
    const fetchProjects = async () => {
      const response = await getUserPermissions();
      setProjectsBasicInfo(
        response?.data?.map((project) => ({
          ID: project.project_id,
          NAME: project.name,
          LOGO: project.logo ? project.logo : ""
        }))
      );

      if (response?.data?.length === 1) {
        setSelectedProject({
          ID: response?.data[0].project_id,
          NAME: response?.data[0].name,
          LOGO: response?.data[0].logo ? response?.data[0].logo : ""
        });
      }
    };

    if (projects.length === 0) {
      fetchProjects();
    }
  }, []);

  const handleSelectProject = (project: ISelectedProject) => {
    const projectInfo: ISelectedProject = {
      ID: project.ID,
      NAME: project.NAME,
      LOGO: project.LOGO
    };
    setSelectedProject(projectInfo);
    if (path.startsWith("/proyectos/review")) {
      router.push(`/proyectos/review/${project.ID}`);
    }

    onClose();
  };

  if (projects.length > 1) {
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
                // eslint-disable-next-line @next/next/no-img-element
                <img className="project__image" src={project.LOGO} alt="Project image" />
              ) : (
                <Avatar
                  shape="square"
                  className="imageWithoutImage"
                  size={65}
                  icon={<Clipboard />}
                />
              )}

              <div className={`project__name ${project.ID === selectedProject.ID && "-selected"}`}>
                <p>{project.NAME}</p>
              </div>
            </div>
          ))}
        </div>
      </Modal>
    );
  }
  return null;
};
