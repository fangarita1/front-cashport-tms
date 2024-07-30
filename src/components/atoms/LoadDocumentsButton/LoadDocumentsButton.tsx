import { Button, Typography } from "antd"
import { Plus } from "phosphor-react";
const { Text } = Typography;

interface LoadDocumentsButtonProps {
    disabled?: boolean;
    text?: string;
    onClick: () => void;
    className?: string;
}

const LoadDocumentsButton: React.FC<LoadDocumentsButtonProps> = ({
    disabled = false,
    className,
    text = "Cargar documentos",
    onClick,
}) => {
    return (
        <Button 
            type="text" 
            onClick={onClick} 
            disabled={disabled}
            className={className}>
                <Plus />
                &nbsp;<Text>{text}</Text>
        </Button>
    );
};

export default LoadDocumentsButton;