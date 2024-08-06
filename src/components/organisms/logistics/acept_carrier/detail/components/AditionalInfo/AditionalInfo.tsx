"use client";
import { Col, Flex, Row } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import styles from "./aditionalInfo.module.scss";
import { ICarrierRequestDetail } from "@/types/logistics/schema";
import { Dispatch, SetStateAction, useEffect } from "react";

interface AditionalInfoProps {
  aditionalInfo: ICarrierRequestDetail | undefined;
  setIsNextStepActive: Dispatch<SetStateAction<boolean>>;
}

export default function AditionalInfo({ aditionalInfo, setIsNextStepActive }: AditionalInfoProps) {

  useEffect(() => {
    aditionalInfo?.carrier_request_documents?.length !== undefined && setIsNextStepActive(true)
  }, []);
  
  return (
    <Flex style={{ marginTop: "1rem" }} className={styles.wrapper}>
      <h3>Información adicional</h3>
      <p>&nbsp;</p>
      <Row style={{ width: "100%" }}>
        <Col span={24}>
          <Flex vertical style={{ width: "99%", marginTop: "2rem" }}>
            <h4>Documentos</h4>
            <Row>
              {aditionalInfo?.carrier_request_documents?.map((file) => (
                <>
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
                {aditionalInfo?.carrier_request_contacts
                  ?.filter((x: any) => x.contact_type == 1)
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
                <h4>Contacto final</h4>
                {aditionalInfo?.carrier_request_contacts
                  ?.filter((x: any) => x.contact_type == 2)
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
                    <h4>Cliente final</h4>
                  </Col>
                  <Col span={8} style={{ textAlign: "right" }}>
                    
                  </Col>
                </Row>
                <p>&nbsp;</p>
                <h4>Requerimientos adicionales</h4>
                <Row style={{ paddingTop: "1rem" }}>
                  <Col span={24}>
                    {/*{aditionalInfo?.transfer_request_other_requeriments?.map((req: any) => (
                      <div className={styles.selected} key={req.quantity}>
                        {req.type} <small>{req.quantity}</small>
                      </div>
                    ))}*/}
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <h3>Instrucciones especiales</h3>
                <p>&nbsp;</p>
                <p>{/*aditionalInfo?.observation*/}</p>
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
