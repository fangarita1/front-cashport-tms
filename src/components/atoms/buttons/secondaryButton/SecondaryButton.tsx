import { Button, ConfigProvider, theme } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import styles from "./secondaryButton.module.scss";

const { useToken } = theme;

// Define an extended interface for PrincipalButton props
interface PrincipalButtonProps extends BaseButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  customStyles?: React.CSSProperties;
}

export default function SecondaryButton({
  onClick,
  fullWidth,
  customStyles,
  children,
  ...rest
}: PrincipalButtonProps) {
  const { token } = useToken();
  const green = token.green;
  const white = token.colorTextSecondary;

  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: green,
            colorPrimaryHover: white,
            colorPrimaryActive: white,
            primaryShadow: "none",
            paddingContentHorizontal: 24,
            paddingContentVertical: 12
          }
        }
      }}
    >
      <Button
        type="default"
        size="large"
        {...rest}
        className={fullWidth ? styles.button__fullWidth : styles.button}
        style={{ ...customStyles }}
        onClick={onClick}
      >
        {children}
      </Button>
    </ConfigProvider>
  );
}
