// AddRemoveButton.tsx
import React from "react";
import { PlusCircle, Trash } from "@phosphor-icons/react";
import styles from "./AddRemoveButton.module.scss";

interface AddRemoveButtonProps {
  type: "add" | "remove";
  onClick: () => void;
  disabled?: boolean;
  text?: string;
}

const AddRemoveButton: React.FC<AddRemoveButtonProps> = ({
  type,
  onClick,
  disabled = false,
  text = "Agregar un conductor"
}) => {
  return (
    <button
      className={`${styles.buttonTransparent} ${styles.addOrRemove}`}
      onClick={onClick}
      disabled={disabled}
    >
      {type === "add" ? <PlusCircle size={24} /> : <Trash size={24} />}
      {type === "add" ? <p>{text}</p> : <></>}
    </button>
  );
};

export default AddRemoveButton;
