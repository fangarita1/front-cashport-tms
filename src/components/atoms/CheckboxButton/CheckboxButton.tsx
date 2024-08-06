import { Checkbox, CheckboxProps, ConfigProvider } from "antd";
import { ButtonProps } from "antd/es/button/button";
import styles from "./checkboxButton.module.scss";

// Define an extended interface for PrincipalButton props
interface PrincipalButtonProps extends CheckboxProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  customStyles?: React.CSSProperties;
}

export default function CheckboxButton({
  onClick,
  fullWidth,
  customStyles,
  children,
  ...rest
}: ButtonProps & PrincipalButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Checkbox: {
            colorPrimary: "rgb(255,230,2)",
            colorPrimaryBorder: "rgb(255,230,2)",
            colorPrimaryHover: "rgb(255,230,2)"
          }
        }
      }}
    >
      <Checkbox
        {...rest}
        className={fullWidth ? styles.button__fullWidth : styles.button}
        style={{ ...customStyles }}
        onClick={onClick}
      >
        {children}
      </Checkbox>
    </ConfigProvider>
  );
}
