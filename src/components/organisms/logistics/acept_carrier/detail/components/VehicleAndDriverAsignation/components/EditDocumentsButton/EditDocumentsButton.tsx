import { Plus, Trash } from "phosphor-react";
import styles from "./EditDocumentsButton.module.scss";

export interface BasicButtonProps {
  icon?: React.ElementType;
  iconSize?: number;
  disabled?: boolean;
  title?: string;
  className?: string;
  onClick: () => void;
}

export const BasicButton = ({
  icon: Icon = Plus, // Use Plus as default icon
  disabled = false,
  iconSize = 20,
  title = "Botón",
  className = "",
  onClick
}: BasicButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick();
    }
  };
  console.log("BasicButton", className);
  const combinedClassNames = `${styles.buttonTransparent} ${className ?? ""}`;
  console.log("BasicButton", combinedClassNames);

  return (
    <button disabled={disabled} className={combinedClassNames} onClick={handleClick}>
      <Icon size={iconSize} />
      <p>{title}</p>
    </button>
  );
};

export const EditDocumentsButton = ({ onClick, disabled }: Omit<BasicButtonProps, "icon">) => {
  console.log("styles.editDocs", styles.editDocs);
  return (
    <BasicButton
      title="Editar documentos"
      className={styles.editDocs}
      onClick={onClick}
      disabled={disabled}
    />
  );
};

interface AddRemoveButtonProps extends BasicButtonProps {
  type?: "add" | "remove";
}

export const AddRemoveButton = ({
  onClick,
  disabled,
  type = "add" // Default to "add" if type is not provided
}: AddRemoveButtonProps) => {
  console.log("styles.AddRemoveButton", styles.addOrRemove);
  const Icon = type === "add" ? Plus : Trash;
  const title = type === "add" ? "Agregar conductor" : "Eliminar conductor";

  return (
    <BasicButton
      title={title}
      className={styles.addOrRemove}
      onClick={onClick}
      disabled={disabled}
      icon={Icon}
      iconSize={24}
    />
  );
};
