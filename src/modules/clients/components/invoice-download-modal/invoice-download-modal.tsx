import React, { Dispatch, SetStateAction, useState } from "react";
import { Modal } from "antd";
import styles from "./invoice-download-modal.module.scss";

interface InvoiceDownloadModalProps {
  isModalOpen: boolean;
  handleCloseModal: Dispatch<SetStateAction<boolean>>;
}

const InvoiceDownloadModal: React.FC<InvoiceDownloadModalProps> = ({
  isModalOpen,
  handleCloseModal
}) => {
  return (
    <>
      <Modal
        title="Factura"
        className={styles.wrapper}
        open={isModalOpen}
        footer={null}
        onCancel={() => handleCloseModal(false)}
      >
        <div className={styles.header}>
          <div className={styles.content}>
            <div className={styles.description}>Ship To</div>
            <div className={styles.value}>050</div>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>Canal</div>
            <div className={styles.value}>Institucional</div>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>Linea</div>
            <div className={styles.value}>Homecare</div>
          </div>
          <div className={styles.content}>
            <div className={styles.description}>Sublinea</div>
            <div className={styles.value}>Remeo</div>
          </div>
        </div>
        <div className={styles.img}>
          <div className={styles.bodyImg}>
            <img
              src="https://static.wixstatic.com/media/f74a3f_08dd7ce06f544922928adb1227fdf2db~mv2.png"
              alt=""
            />
          </div>
        </div>
        <div className={styles.footer}>
          <div className={styles.buttonDownload}>Descargar</div>
          <div
            className={styles.buttonCheck}
            onClick={() => {
              handleCloseModal(false);
            }}
          >
            Entendido
          </div>
        </div>
      </Modal>
    </>
  );
};

export default InvoiceDownloadModal;
