import { FC } from "react";
import styles from "./ui-filter-dropdown.module.scss";
import { CaretDown } from "phosphor-react";

interface UiFilterDropdownProps {}

const UiFilterDropdown: FC<UiFilterDropdownProps> = () => {
  return (
    <div className={styles.filterButton}>
      Filtrar
      <CaretDown className={styles.icon} />
    </div>
  );
};

export default UiFilterDropdown;
