import React, { useState } from "react";
import { Button, Modal } from "antd";
import styles from "./invoice-download-modal.module.scss";

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        title="Factura"
        className={styles.wrapper}
        open={isModalOpen}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
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
        <div className={styles.img}></div>
        <div className={styles.footer}>
          <div className={styles.buttonDownload}>Descargar</div>
          <div className={styles.buttonCheck}>Entendido</div>
        </div>
      </Modal>
    </>
  );
};

export default App;
