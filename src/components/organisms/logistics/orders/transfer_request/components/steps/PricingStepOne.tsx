import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import UploadDocumentChild from "@/components/atoms/UploadDocumentChild/UploadDocumentChild";
import { IMaterial, ITransferOrderRequest, ITransferOrdersRequest } from "@/types/logistics/schema";
import { Button, Col, Collapse, Flex, Row, Table, TableProps, Tabs, Typography } from "antd";
import TabTransferOrder from "../tabMap/TabTransferOrder";
import { Radioactive } from "@phosphor-icons/react";
import { Warning } from "phosphor-react";
import TabPane from "antd/es/tabs/TabPane";

const { Title, Text } = Typography;

type PricingStepOneProps = {
  ordersId: number[];
  orders: ITransferOrdersRequest | undefined;
};
export default function PricingStepOne({ ordersId, orders }: PricingStepOneProps) {

  const columnsCarga: TableProps<IMaterial>["columns"] = [
    {
      title: "Cantidad",
      dataIndex: "quantity",
      key: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.quantity - b.quantity,
      showSorterTooltip: false
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "age",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.id - b.id,
      showSorterTooltip: false
    },
    {
      title: "Nombre",
      dataIndex: "description",
      key: "address",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.description.localeCompare(b.description),
      showSorterTooltip: false
    },
    {
      title: "Volumen",
      dataIndex: "m3_volume",
      key: "address",
      render: (amount) => <Text>{amount}</Text>,
      sorter: (a, b) => a.m3_volume - b.m3_volume,
      showSorterTooltip: false
    },
    {
      title: "Alto",
      dataIndex: "mt_height",
      key: "address",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.mt_height - b.mt_height,
      showSorterTooltip: false
    },
    {
      title: "Ancho",
      key: "address",
      dataIndex: "mt_length",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.mt_length - b.mt_length,
      showSorterTooltip: false
    },
    {
      title: "Largo",
      key: "address",
      dataIndex: "mt_width",
      render: (amount) => <Text>{amount} m</Text>,
      sorter: (a, b) => a.mt_width - b.mt_width,
      showSorterTooltip: false
    },
    {
      title: "Peso",
      key: "address",
      dataIndex: "kg_weight",
      render: (amount) => <Text>{amount} kg</Text>,
      sorter: (a, b) => a.kg_weight - b.kg_weight,
      showSorterTooltip: false
    },
    {
      title: "Alertas",
      dataIndex: "address",
      key: "address",
      // eslint-disable-next-line no-unused-vars
      render: (text, record) => (
        <Flex style={{ gap: "6px", justifyContent: "flex-end" }}>
          <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Radioactive size={"1.3rem"} />} />
          <Button style={{ backgroundColor: "#F7F7F7" }} icon={<Warning size={"1.3rem"} />} />
        </Flex>
      )
    }
  ];

  const columnsCargaPersonas: TableProps<any>["columns"] = [
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.name.localeCompare(b.name),
      showSorterTooltip: false
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.contact_number - b.contact_number,
      showSorterTooltip: false
    },
    {
      title: "PSL",
      dataIndex: "psl",
      key: "psl",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.id_psl - b.id_psl,
      showSorterTooltip: false
    },
    {
      title: "CC",
      dataIndex: "typeid",
      key: "typeid",
      render: (text) => <Text>{text}</Text>,
      sorter: (a, b) => a.id_contact - b.id_contact,
      showSorterTooltip: false
    }
  ];
  const actionsOptions = (orderRequest: ITransferOrderRequest | undefined) => [
    {
      key: 0,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: (
        <div className="collapseByAction__label">
          <Title className="collapseByAction__label__text" level={4}>
            Datos del viaje
          </Title>
        </div>
      ),
      children: <TabTransferOrder orderRequest={orderRequest} />
    },
    {
      key: 1,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: (
        <div className="collapseByAction__label">
          <Title className="collapseByAction__label__text" level={4}>
            Responsables
          </Title>
        </div>
      ),
      children: (
        <Flex>
          <Row style={{ width: "100%", marginBottom: "18px" }}>
            <Col span={24}>
              <Flex vertical className="productsContainer" style={{ width: "100%" }}>
                <Row>
                  <Col span={12}>
                    <p style={{ paddingTop: "1rem" }}>
                      <label>
                        <b>PSL:</b> Product service line 1
                      </label>
                    </p>
                    <p style={{ paddingTop: "0.5rem" }}>
                      <label>
                        &nbsp;&nbsp;&nbsp;<b>CC:</b> Centro de costos 1
                      </label>
                    </p>
                  </Col>
                  <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                    <p style={{ paddingTop: "1rem" }}>
                      <label>
                        <b>100%</b>
                      </label>
                    </p>
                    <p style={{ paddingTop: "0.5rem" }}>
                      <label>
                        <b>100%</b>
                      </label>
                    </p>
                  </Col>
                  <Col span={24} style={{ paddingTop: "1rem" }}>
                    <hr style={{ borderTop: "1px solid #f7f7f7" }}></hr>
                  </Col>
                  <Col span={12}>
                    <p style={{ paddingTop: "1rem" }}>
                      <label>
                        <b>PSL:</b> Product service line 1
                      </label>
                    </p>
                    <p style={{ paddingTop: "0.5rem" }}>
                      <label>
                        &nbsp;&nbsp;&nbsp;<b>CC:</b> Centro de costos 1
                      </label>
                    </p>
                  </Col>
                  <Col span={12} style={{ paddingTop: "0.5rem", textAlign: "right" }}>
                    <p style={{ paddingTop: "1rem" }}>
                      <label>
                        <b>100%</b>
                      </label>
                    </p>
                    <p style={{ paddingTop: "0.5rem" }}>
                      <label>
                        <b>100%</b>
                      </label>
                    </p>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>
        </Flex>
      )
    },
    {
      key: 2,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: (
        <div className="collapseByAction__label">
          <Title className="collapseByAction__label__text" level={4}>
            Información adicional
          </Title>
        </div>
      ),
      children: (
        <Flex style={{ marginBottom: "24px" }}>
          <Row style={{ width: "100%" }}>
            <Col span={24}>
              <Flex vertical style={{ width: "100%", marginTop: "24px" }}>
                <h4 style={{ fontSize: "20px", lineHeight: "32px", fontWeight: "400" }}>
                  Documentos
                </h4>
                <Row className="mainUploadDocuments">
                  {orderRequest?.transfer_order_documents?.map((file) => (
                    <Col span={12} style={{ padding: "15px" }} key={`file-${file.id}`}>
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
                    <h3>Datos de contacto</h3>
                    <p>&nbsp;</p>
                    <h4>Contacto inicial</h4>
                    {orderRequest?.transfer_order_contacts
                      ?.filter((x) => x.contact_type == 1)
                      .map((contact) => (
                        <Row style={{ paddingTop: "0.5rem" }} key={contact.id}>
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
                    {orderRequest?.transfer_order_contacts
                      ?.filter((x) => x.contact_type == 2)
                      .map((contact) => (
                        <Row style={{ paddingTop: "0.5rem" }} key={contact.id}>
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
                        {orderRequest?.client_desc}
                      </Col>
                    </Row>
                    <p>&nbsp;</p>
                    <h4>Requerimientos adicionales</h4>
                    <Row style={{ paddingTop: "1rem" }}>
                      <Col span={24}>
                        {orderRequest?.transfer_order_other_requeriments?.map((req) => (
                          <div className="selected" key={req.id}>
                            {req.other_requirement_desc} <small>{req.quantity}</small>
                          </div>
                        ))}
                      </Col>
                    </Row>
                  </Col>
                  <Col span={12}>
                    <h3>Instrucciones especiales</h3>
                    <p>&nbsp;</p>
                    <p style={{ minHeight: "250px" }}>{orderRequest?.observation}</p>
                  </Col>
                </Row>
              </Flex>
            </Col>
          </Row>
        </Flex>
      )
    },
    {
      key: 3,
      style: { border: "1px solid #dddddd", borderRadius: "4px" },
      label: (
        <div className="collapseByAction__label">
          <Title className="collapseByAction__label__text" level={4}>
            {(orderRequest?.id_service_type == 1 || orderRequest?.id_service_type == 2) &&
              `Materiales`}
            {orderRequest?.id_service_type == 3 && `Personas`}
          </Title>
        </div>
      ),
      children: (
        <div>
          <div>
            <label className="locationLabels" style={{ display: "flex" }}>
              <text>Vehículo Sugerido</text>
            </label>
            {orderRequest?.transfer_order_vehicles ? (
              orderRequest?.transfer_order_vehicles.map((a) => (
                <div className="vehicles_sugested" key={a.id}>
                  {a.vehicle_type_desc}
                </div>
              ))
            ) : (
              <p></p>
            )}
          </div>
          {(orderRequest?.id_service_type == 1 || orderRequest?.id_service_type == 2) && (
            <>
              <Table
                columns={columnsCarga}
                dataSource={orderRequest?.transfer_order_material?.map((tm) => ({
                  ...tm.material[0],
                  quantity: tm.quantity
                }))}
                pagination={false}
              />
            </>
          )}
          {orderRequest?.id_service_type == 3 && (
            <>
              <Table
                columns={columnsCargaPersonas}
                dataSource={
                  orderRequest.transfer_order_persons ? orderRequest.transfer_order_persons : []
                }
              />
            </>
          )}
        </div>
      )
    }
  ];


  return (
    <Flex style={{ width: "100%", flexDirection: "column" }}>
      <Flex style={{ flexDirection: "column" }}>
        <Tabs defaultActiveKey={String(ordersId[0])}>
          {ordersId.map((a) => (
            <TabPane key={a} tab={<h4>{a}</h4>} style={{ padding: "24px 0" }}>
              <Flex style={{ width: "100%", flexDirection: "column" }} className="contentRow">
                <Flex style={{ padding: "24px 0", flexDirection: "column" }}>
                  <Flex>
                    <h5
                      style={{
                        fontWeight: "600",
                        fontSize: "24px",
                        lineHeight: "32px"
                      }}
                    >
                      {a}
                    </h5>
                  </Flex>
                </Flex>

                <Flex style={{ flexDirection: "column" }}>
                  <Collapse
                    defaultActiveKey={"0"}
                    className="collapseByAction"
                    style={{ width: "100%" }}
                    expandIconPosition="end"
                    accordion={false}
                    bordered={false}
                    ghost
                    items={actionsOptions(orders?.orders.find((ord) => ord.id === a))}
                  />
                </Flex>
              </Flex>
            </TabPane>
          ))}
        </Tabs>
      </Flex>
    </Flex>
  );
}
