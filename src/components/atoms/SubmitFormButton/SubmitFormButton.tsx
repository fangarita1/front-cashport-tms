import { Button } from "antd"
import styles from "./SubmitFormButton.module.scss"

interface SubmitFormButtonProps {
    disabled: boolean;
    text?: string;
    onClick: () => void;
}

const SubmitFormButton: React.FC<SubmitFormButtonProps> = ({
    disabled,
    text = "Enviar",
    onClick,
}) => {
    return (
        <Button
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