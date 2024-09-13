import React from "react";
import { Modal } from "antd";
import "./fileDownloadModal.scss";
import Image from "next/image";

interface InvoiceDownloadModalProps {
  isModalOpen: boolean;
  url: string;
  onCloseModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const FileDownloadModal: React.FC<InvoiceDownloadModalProps> = ({
  isModalOpen,
  url,
  onCloseModal
}) => {
  return (
    <Modal
      title="Documento adjunto"
      className="wrapper"
      open={isModalOpen}
      footer={null}
      onCancel={() => onCloseModal(false)}
      centered
    >
      <div className="img">
        <div className="imgContainer">
          <Image
            src={url}
            alt="Invoice"
            width={800} // required
            height={800} // required
            layout="intrinsic" // Se ajusta a las dimensiones
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
      </div>
      <div className="footer">
        <a className="buttonDownload" download={url} href={url} target="_blank">
          Descargar
        </a>
        <button type="button" className="buttonCheck" onClick={() => onCloseModal(false)}>
          Entendido
        </button>
      </div>
    </Modal>
  );
};
