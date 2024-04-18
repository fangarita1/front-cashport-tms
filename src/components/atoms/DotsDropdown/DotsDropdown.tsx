import { ReactNode } from "react";
import { Dropdown, Button } from "antd";
import { DotsThree } from "phosphor-react";
import "./dotsDropdown.scss";

export const DotsDropdown = ({ items }: any) => {
  const customDropdown = (menu: ReactNode) => <div className="dropdown">{menu}</div>;

  return (
    <Dropdown
      dropdownRender={customDropdown}
      menu={{ items }}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <Button size="large" icon={<DotsThree size={"1.5rem"} />} />
    </Dropdown>
  );
};
