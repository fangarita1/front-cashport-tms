import { Button } from "antd"
import styles from "./SubmitFormButton.module.scss"

interface SubmitFormButtonProps {
    loading?: boolean;
    disabled: boolean;
    text?: string;
    onClick: () => void;
}

const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({
    loading =false,
    disabled,
    text = "Enviar",
    onClick,
}) => {
    return (
        <Button
            loading={loading}
            disabled={disabled}
            className={styles.submitButton}
            htmlType="submit"
            onClick={onClick}
        >
            {text}
        </Button>
    );
};

export default SubmitFormButton;