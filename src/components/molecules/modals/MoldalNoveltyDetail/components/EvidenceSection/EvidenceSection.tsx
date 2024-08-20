import React from "react";
import { IconLabel } from "@/components/atoms/IconLabel/IconLabel";
import { FileText, PaperclipHorizontal } from "phosphor-react";
import { Typography, Tag } from "antd";
import "./evidencesection.scss";

const { Paragraph, Text } = Typography;

interface EvidenceFile {
  name: string;
  url: string;
  created_at: string;
}

interface EvidenceSectionProps {
  evidenceComments: string;
  evidenceFiles: EvidenceFile[];
}

export const EvidenceSection: React.FC<EvidenceSectionProps> = ({
  evidenceComments,
  evidenceFiles
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="evidence-section">
      <IconLabel icon={<FileText size={20} />} text="Evidencia" />
      <div className="evidence-content">
        <Paragraph>{evidenceComments}</Paragraph>
        <div className="attachments">
          {evidenceFiles.map((file, index) => (
            <Tag key={index} icon={<PaperclipHorizontal size={16} />} className="attachment-tag">
              <div className="content-file">
                <Text strong>{file.name}</Text>
                <Text type="secondary" className="text-file">
                  {formatDate(file.created_at)}
                </Text>
              </div>
            </Tag>
          ))}
        </div>
      </div>
    </div>
  );
};
