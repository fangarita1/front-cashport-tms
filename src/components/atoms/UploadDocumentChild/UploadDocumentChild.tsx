import { Button, Flex, Typography } from "antd";
import { FileArrowDown, Trash } from "phosphor-react";

const { Text } = Typography;

type Props = {
  showTrash: boolean;
  onDelete: () => void;
  linkFile: string;
  nameFile: string;
};

export default function UploadDocumentChild(props: Props) {
  const { showTrash, onDelete, linkFile, nameFile } = props;
  return (
    <Flex gap={20} align="center">
      <Button type="text" href={linkFile} target="_blank" style={{ padding: 0 }}>
        <FileArrowDown size={"25px"} />
        <Text className="nameFile">{nameFile}</Text>
      </Button>
      {showTrash && (
        <Button
          className="deleteDocButton"
          type="text"
          onClick={onDelete}
          icon={<Trash size={"20px"} />}
        />
      )}
    </Flex>
  );
}
