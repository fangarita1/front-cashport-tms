import { Button, Flex, MenuProps } from "antd";
import UiSearchInput from "@/components/ui/search-input";
import FilterDiscounts from "@/components/atoms/Filters/FilterDiscounts/FilterDiscounts";
import { DotsDropdown } from "@/components/atoms/DotsDropdown/DotsDropdown";
import PrincipalButton from "@/components/atoms/buttons/principalButton/PrincipalButton";
import { Bank, CaretLeft } from "phosphor-react";

import styles from "./banks-rules.module.scss";

interface PropsBanksRules {
  onClickBack: () => void;
}

export const BanksRules = ({ onClickBack }: PropsBanksRules) => {
  const handleDeleteRules = () => {
    console.info("Delete rules");
  };

  const items: MenuProps["items"] = [
    {
      key: "discount-option-1",
      label: (
        <Button className="buttonOutlined" onClick={handleDeleteRules}>
          Eliminar
        </Button>
      )
    }
  ];

  return (
    <div className={styles.banksRules}>
      <Flex justify="space-between" style={{ height: "3rem" }}>
        <Button
          type="text"
          size="large"
          style={{ paddingLeft: 0, fontWeight: 600 }}
          onClick={onClickBack}
          icon={<CaretLeft size={"1.45rem"} />}
        >
          Reglas de bancos
        </Button>

        <PrincipalButton customStyles={{ marginLeft: "auto", height: "3rem" }}>
          Crear nueva regla <Bank size={16} />
        </PrincipalButton>
      </Flex>

      <div className={styles.header}>
        <UiSearchInput
          placeholder="Buscar"
          onChange={(event) => {
            setTimeout(() => {
              console.info(event.target.value);
            }, 1000);
          }}
        />
        <FilterDiscounts />
        <DotsDropdown items={items} />
      </div>
    </div>
  );
};

export default BanksRules;
