"use client";
import { Col, Flex, Row } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import styles from "./aditionalInfo.module.scss";
import { Dispatch, SetStateAction, useEffect } from "react";

interface AditionalInfoProps {
  title: string;
  documents:any;
  contacts: any;
  finalClient?: string;
  otherRequirements?: any;
  specialInstructions?: string;
  setIsNextStepActive?: Dispatch<SetStateAction<boolean>>;
}

const CONTACT_TYPES = {
  ORIGIN: 1,
  DESTINATION: 2,
};

export default function AditionalInfo({ title, documents, contacts, specialInstructions, finalClient, otherRequirements, setIsNextStepActive }: Readonly<AditionalInfoProps>) {

  useEffect(() => {
    if(setIsNextStepActive){
      documents?.length !== undefined && setIsNextStepActive(true)
    }
  }, []);
  
  return (
    <Flex className={styles.wrapper}>
      <p className={styles.sectionTitle}>{title || "Información adicional"}</p>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex vertical style={{ width: "99%"}}>
            <p className={styles.title}>Documentos</p>
            <Row>
              {documents?.map((file:any) => (
                  <Col
                    span={12}
                    style={{ padding: "15px", borderRight: "1px solid #f7f7f7" }}
                    key={`file-${file.id}`}
                  >
                    <UploadDocumentButton
                      key={file.id}
                      title={file.document_type_desc}
                      isMandatory={!file.active}
                      aditionalData={file.id}
                      setFiles={() => {}}
                      disabled
                    >
                      {file?.url_document ? (
                        <UploadDocumentChild
                          linkFile={file.url_document}
                          nameFile={file.url_document.split("-").pop() || ""}
                          onDelete={() => {}}
                          showTrash={false}
                        />
                      ) : undefined}
                    </UploadDocumentButton>
                  </Col>
              ))}
              <Col span={24} style={{ paddingTop: "1rem" }}>
                <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col span={12}>
                <p className={styles.subtitle}>Datos de contacto</p>
                <p>&nbsp;</p>
                <p className={styles.bodyStrong}>Contacto inicial</p>
                {contacts
                  ?.filter((x: any) => x.contact_type == CONTACT_TYPES.ORIGIN)
                  .map((contact: any) => (
                    <Row style={{ paddingTop: "0.5rem" }} key={contact.number}>
                      <Col span={12} style={{ paddingLeft: "25px" }}>
                        {contact.name}
                      </Col>  
                      <Col span={8} style={{ textAlign: "right" }}>
                        {contact.contact_number}
                      </Col>
                    </Row>
                  ))}
                <p>&nbsp;</p>
                <p className={styles.bodyStrong}>Contacto final</p>
                {contacts
                  ?.filter((x: any) => x.contact_type == CONTACT_TYPES.DESTINATION)
                  .map((contact: any) => (
                    <Row style={{ paddingTop: "0.5rem" }} key={contact.number}>
                      <Col span={12} style={{ paddingLeft: "25px" }}>
                        {contact.name}
                      </Col>
                      <Col span={8} style={{ textAlign: "right" }}>
                        {contact.contact_number}
                      </Col>
                    </Row>
                  ))}
                <p>&nbsp;</p>
                <Row style={{ paddingTop: "1rem" }}>
                  <Col span={12}>
                    <p className={styles.subtitle}>Cliente final</p>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                      {finalClient?? <p>{finalClient}</p>}
                  </Col>
                </Row>
                <p>&nbsp;</p>
                  <p className={styles.subtitle}>Requerimientos adicionales</p>
                <Row style={{ paddingTop: "1rem" }}>
                  <Col span={24}>
                    {otherRequirements?.map((req: any) => (
                      <div className={styles.selected} key={req.quantity}>
                        {req.type} <small>{req.quantity}</small>
                      </div>
                    ))}
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <p className={styles.subtitle} style={{marginBottom: "0.25rem"}}>Instrucciones especiales</p>
                {specialInstructions ?? 
                <p>{specialInstructions}</p>}
                <Flex style={{ marginTop: "24px" }}>
                  <UploadDocumentButton
                    key={1}
                    title={"Nombre del documento"}
                    isMandatory
                    aditionalData={1}
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
