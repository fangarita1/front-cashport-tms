import { FC } from "react";
import styles from "./search-input.module.scss";
import { MagnifyingGlass } from "phosphor-react";

interface UiSearchInputProps {
  id?: string;
  name?: string;
  placeholder?: string;
  className?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const UiSearchInput: FC<UiSearchInputProps> = ({
  id = "ui-search-input",
  name,
  placeholder,
  className,
  onChange
}) => {
  return (
    <label htmlFor={id} className={`${styles.inputBox} ${className}`}>
      <MagnifyingGlass className={styles.icon} />
      <input type="text" id={id} name={name} placeholder={placeholder} onChange={onChange} />
    </label>
  );
};

export default UiSearchInput;
