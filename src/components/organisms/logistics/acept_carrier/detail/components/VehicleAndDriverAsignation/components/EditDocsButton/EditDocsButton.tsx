import React from "react";
import { Plus } from "@phosphor-icons/react";
import styles from "./EditDocsButton.module.scss";

interface EditDocsButtonProps {
  onClick: () => void;
  text: string;
  disabled?: boolean;
}

const EditDocsButton: React.FC<EditDocsButtonProps> = ({
  onClick,
  text = "Editar documentos",
  disabled = false
}) => {
  return (
    <button
      className={`${styles.buttonTransparent} ${styles.editDocs}`}
      onClick={onClick}
      disabled={disabled}
    >
      <Plus size={20} />
      <p>{text}</p>
    </button>
  );
};

export default EditDocsButton;
