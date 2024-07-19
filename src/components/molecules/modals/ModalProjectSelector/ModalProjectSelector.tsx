import { Modal } from "antd";
import Image from "next/image";

import "./modalProjectSelector.scss";
import { useEffect, useState } from "react";
import { getUserPermissions } from "@/services/permissions/userPermissions";

type IProject = {
  id: number;
  name: string;
  logo: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
}
export const ModalProjectSelector = ({ isOpen, onClose }: Props) => {
  //useEffect to call userPermissions and get the projects
  const [projects, setProjects] = useState<IProject[]>([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const response = await getUserPermissions();
      console.log("RESPONSE:", response);
      setProjects(
        response.data.map((project) => ({
          id: project.project_id,
          name: project.name,
          logo: project.logo
        }))
      );
    };
    fetchProjects();
  }, []);

  return (
    <Modal className="modalProjectSelector" open={isOpen} onCancel={onClose} footer={false}>
      <h2>Elegir proyecto</h2>
      <div className="modalProjectSelector__projects">
        {projects.map((project) => (
          <div className="project" key={project.id}>
            <Image
              className="project__image"
              src={project.logo}
              width={100}
              height={100}
              alt="Project image"
            />
            <div className="project__name">
              <p>{project.name}</p>
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
};

const mockPojects = [
  {
    id: "1",
    name: "Proyecto 1",
    logo: "https://via.placeholder.com/150x250"
  },
  {
    id: "2",
    name: "Proyecto 2",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "3",
    name: "Proyecto 3",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "4",
    name: "Proyecto 4",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "5",
    name: "Proyecto 5",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "6",
    name: "Proyecto 6",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "7",
    name: "Proyecto 7",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "8",
    name: "Proyecto 8",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "9",
    name: "Proyecto 9",
    logo: "https://via.placeholder.com/150"
  },
  {
    id: "10",
    name: "Proyecto 10",
    logo: "https://via.placeholder.com/150"
  }
];
