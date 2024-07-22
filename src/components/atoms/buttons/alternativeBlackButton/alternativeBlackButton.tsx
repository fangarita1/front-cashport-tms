import { Button, ConfigProvider } from "antd";
import { BaseButtonProps } from "antd/es/button/button";
import styles from "./alternativeBlackButton.module.scss";

interface AlternativeBlackButtonProps extends BaseButtonProps {
  // eslint-disable-next-line no-unused-vars
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  fullWidth?: boolean;
  customStyles?: React.CSSProperties;
}

export default function AlternativeBlackButton({
  onClick,
  fullWidth,
  customStyles,
  children,
  ...rest
}: AlternativeBlackButtonProps) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            primaryShadow: "none",
            paddingContentHorizontal: 24,
            paddingContentVertical: 12
          }
        }
      }}
    >
      <Button
        type="primary"
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
