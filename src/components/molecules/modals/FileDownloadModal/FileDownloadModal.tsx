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
      title={
        title ? (
          <div className="title_modal_file_download">{title}</div>
        ) : (
          <div className="title_modal_file_download">Documento adjunto</div>
        )
      }
      className="file-download-modal"
      open={isModalOpen}
      footer={
        <div className="footer">
          <a
            className="button-download"
            download
            href={url}
            target="_blank"
            rel="noopener noreferrer"
          >
            Descargar
          </a>
          <button type="button" className="button-check" onClick={() => onCloseModal(false)}>
            Entendido
          </button>
        </div>
      }
      onCancel={() => onCloseModal(false)}
    >
      <div className="modal-content">
        <div className="img-container">
          <img src={url} alt="Document" />
        </div>
      </div>
    </Modal>
  );
};
