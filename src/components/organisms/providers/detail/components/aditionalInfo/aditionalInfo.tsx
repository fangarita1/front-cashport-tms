"use client";
import { Col, Flex, Row } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { ProviderDetailAditionalInfo } from "@/types/providers/providers";
import styles from "./aditionalInfo.module.scss";

interface AditionalInfoProps {
  aditionalInfo: ProviderDetailAditionalInfo;
}

export default function AditionalInfo({ aditionalInfo }: AditionalInfoProps) {
  return (
    <Flex style={{ marginTop: "1rem" }} className={styles.wrapper}>
      <h3>Información adicional</h3>
      <p>&nbsp;</p>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex
            vertical
            className={styles.documentsWrapper}
            style={{ width: "99%", marginTop: "2rem" }}
          >
            <h4>Documentos</h4>
            <Row className={styles.documents}>
              {aditionalInfo?.documents?.map((file) => (
                <>
                  <Col span={12} style={{ padding: "15px", borderRight: "1px solid #f7f7f7" }} key={`file-${file.id}`}>
                    <UploadDocumentButton
                      key={file.id}
                      title={file.title}
                      isMandatory={!file.isMandatory}
                      aditionalData={file.id}
                      setFiles={() => {}}
                      disabled
                    >
                      {file?.urlDocument ? (
                        <UploadDocumentChild
                          linkFile={file.urlDocument}
                          nameFile={file.urlDocument.split("-").pop() || ""}
                          onDelete={() => {}}
                          showTrash={false}
                        />
                      ) : undefined}
                    </UploadDocumentButton>
                  </Col>
                </>
              ))}
              <Col span={24} style={{ paddingTop: "1rem" }}>
                <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col span={12}>
                <h3>Datos de contacto</h3>
                <p>&nbsp;</p>
                <h4>Contacto inicial</h4>
                {aditionalInfo?.contactData.initialContacts.map((contact) => (
                  <Row style={{ paddingTop: "0.5rem" }} key={contact.number}>
                    <Col span={12} style={{ paddingLeft: "25px" }}>
                      {contact.name}
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      {contact.number}
                    </Col>
                  </Row>
                ))}
                <p>&nbsp;</p>
                <h4>Contacto final</h4>
                {aditionalInfo?.contactData.finalContacts.map((contact) => (
                  <Row style={{ paddingTop: "0.5rem" }} key={contact.number}>
                    <Col span={12} style={{ paddingLeft: "25px" }}>
                      {contact.name}
                    </Col>
                    <Col span={8} style={{ textAlign: "right" }}>
                      {contact.number}
                    </Col>
                  </Row>
                ))}
                <p>&nbsp;</p>
                <Row style={{ paddingTop: "1rem" }}>
                  <Col span={12}>
                    <h4>Cliente final</h4>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    {aditionalInfo.finalClient}
                  </Col>
                </Row>
                <p>&nbsp;</p>
                <h4>Requerimientos adicionales</h4>
                <Row style={{ paddingTop: "1rem" }}>
                  <Col span={24}>
                    {aditionalInfo?.aditionalRequirements?.map((req) => (
                      <div className="selected" key={req.quantity}>
                        {req.type} <small>{req.quantity}</small>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
              <Col span={12} className={styles.bottomText}>
                <h3>Instrucciones especiales</h3>
                <p>&nbsp;</p>
                <p>{aditionalInfo?.especialIntruction.observation}</p>
                <Flex style={{ marginTop: "24px" }}>
                  <UploadDocumentButton
                    key={aditionalInfo.especialIntruction.documentInfo.id}
                    title={aditionalInfo.especialIntruction.documentInfo.title}
                    isMandatory
                    aditionalData={aditionalInfo.especialIntruction.documentInfo.id}
                    setFiles={() => {}}
                    disabled
                  />
                </Flex>
              </Col>
            </Row>
          </Flex>
        </Col>
      </Row>
    </Flex>
  );
}
