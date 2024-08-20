import React from "react";
import { Modal } from "antd";
import "./fileDownloadModal.scss";

interface InvoiceDownloadModalProps {
  isModalOpen: boolean;
  url: string;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
}

export const FileDownloadModal: React.FC<InvoiceDownloadModalProps> = ({
  isModalOpen,
  url,
  onCloseModal,
  title
}) => {
  return (
    <Modal
      title={title ? title : "Documento adjunto"}
      className="wrapper"
      open={isModalOpen}
      footer={null}
      onCancel={() => onCloseModal(false)}
    >
      <div className="img">
        <div className="bodyImg">
          <img src={url} alt="Invoice" />
        </div>
      </div>
      <div className="footer">
        <a className="buttonDownload" download={url} href={url} target="_blank">
          Descargar
        </a>
        <button
          type="button"
          className="buttonCheck"
          onClick={() => {
            onCloseModal(false);
          }}
        >
          Entendido
        </button>
      </div>
    </Modal>
  );
};
