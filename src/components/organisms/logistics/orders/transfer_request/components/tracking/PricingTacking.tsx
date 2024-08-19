import FormWizard from "react-form-wizard-component";

import { Col, DatePicker, Flex, Input, InputNumber, Modal, Row, Select, TimePicker, Typography } from "antd";
import { useRef, useState } from "react";
import { PlusCircle } from "phosphor-react";
import TextArea from "antd/es/input/TextArea";
import { FileObject, UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { Dayjs } from "dayjs";

const { Title, Text } = Typography;

export default function PricingTacking() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [typeactive, setTypeActive] = useState("1");
    const [horaInicial, setHoraInicial] = useState<Dayjs | null>(null);
    const [fechaInicial, setFechaInicial] = useState<Dayjs | null>(null);
    const [routeGeometry, setRouteGeometry] = useState<any>(null);
    const [routeInfo, setRouteInfo] = useState([]);
    const [distance, setDistance] = useState<any>(null);
    const [timetravel, setTimeTravel] = useState<any>(null);
    const [files, setFiles] = useState<FileObject[] | any[]>([]);
    const [mockFiles, setMockFiles] = useState<FileObject[] | any[]>([]);
    const mapContainerRef = useRef(null);

    const handleTypeClick = (event: any) => {}
    const handleComplete = () => {}
    const tabChanged = ({ prevIndex, nextIndex }: { prevIndex: number; nextIndex: number }) => {};
  return <Modal
  width={"60%"}
  footer=""
  open={isModalOpen}
  onOk={() => {
    setIsModalOpen(false);
  }}
  onCancel={() => {
    setIsModalOpen(false);
  }}
>
  <FormWizard
    shape="circle"
    color="#e74c3c"
    stepSize="xs"
    onComplete={handleComplete}
    onTabChange={tabChanged}
    nextButtonText="Siguiente"
    backButtonText="Anterior"
    finishButtonText="Finalizar"
  >
    <FormWizard.TabContent title="Tipo de Viaje" icon="ti-user">
      <Title className="collapseByAction__label__text" level={4}>
        Tipo de Viaje
      </Title>
      <Flex gap="middle">
        <button
          type="button"
          id={"1"}
          className={["tripTypes", typeactive === "1" ? "active" : undefined].join(
            " "
          )}
          onClick={handleTypeClick}
        >
          <div className="tripTypeIcons">
            <img
              className="icon"
              loading="lazy"
              alt=""
              src="/images/logistics/truck.svg"
            />
            <div className="text">Carga</div>
          </div>
        </button>
        <button
          type="button"
          id={"2"}
          className={["tripTypes", typeactive === "2" ? "active" : undefined].join(
            " "
          )}
          onClick={handleTypeClick}
        >
          <div className="tripTypeIcons">
            <img
              className="icon"
              loading="lazy"
              alt=""
              src="/images/logistics/izaje.svg"
            />
            <div className="text">Izaje</div>
          </div>
        </button>
        <button
          type="button"
          id={"3"}
          className={["tripTypes", typeactive === "3" ? "active" : undefined].join(
            " "
          )}
          onClick={handleTypeClick}
        >
          <div className="tripTypeIcons">
            <img
              className="icon"
              loading="lazy"
              alt=""
              src="/images/logistics/users.svg"
            />
            <div className="text">Personal</div>
          </div>
        </button>
      </Flex>
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Agendamiento" icon="ti-settings">
      <>
        <Title className="collapseByAction__label__text" level={4}>
          Agendamiento
        </Title>
        <Row>
          <Col span={24} style={{ padding: "25px" }}>
            <Row>
              <label className="locationLabels">Punto Origen</label>
              <br></br>

              <Select
                showSearch
                placeholder="Buscar dirección inicial"
                className="puntoOrigen"
                style={{ width: "100%" }}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option!
                    .children!.toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              ></Select>
            </Row>
            {typeactive != "2" && (
              <Row style={{ marginTop: "1rem" }}>
                <label className="locationLabels">Punto Destino</label>
                <Select
                  showSearch
                  placeholder="Buscar dirección final"
                  className="puntoOrigen"
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option!
                      .children!.toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                ></Select>
              </Row>
            )}
            <Row style={{ marginTop: "1.5rem" }}>
              <Col span={24}>
                <label className="locationLabels">Fecha y hora inicial</label>
              </Col>
              <Col span={8}>
                <DatePicker
                  placeholder="Seleccione fecha"
                  onChange={(value, dateString) => {
                    //console.log('Selected Time: ', value);
                    //console.log('Formatted Selected Time: ', dateString);
                    setFechaInicial(value);
                  }}
                />
              </Col>
              <Col span={8}>
                <TimePicker
                  placeholder="Seleccione hora"
                  format={"HH:mm"}
                  minuteStep={15}
                  hourStep={1}
                  type={"time"}
                  onChange={(value) => {
                    console.log(value);
                    setHoraInicial(value);
                  }}
                />
              </Col>
              <Col span={8}>
                <Select
                  placeholder="Seleccione"
                  className="puntoOrigen"
                  style={{ width: "100%" }}
                  options={[{ value: "2", label: "Exacto" }]}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: "1.5rem" }}>
              <Col span={24}>
                <label className="locationLabels">Fecha y hora final</label>
              </Col>
              <Col span={8}>
                <DatePicker
                  placeholder="Seleccione fecha"
                  onChange={(value, dateString) => {
                    console.log("Selected Time: ", value);
                    console.log("Formatted Selected Time: ", dateString);
                  }}
                />
              </Col>
              <Col span={8}>
                <TimePicker
                  placeholder="Seleccione hora"
                  format={"HH:mm"}
                  minuteStep={15}
                  hourStep={1}
                  type={"time"}
                  onChange={(value) => console.log(value)}
                />
              </Col>
              <Col span={8}>
                <Select
                  placeholder="Seleccione"
                  className="puntoOrigen"
                  style={{ width: "100%" }}
                  options={[{ value: "2", label: "Exacto" }]}
                />
              </Col>
            </Row>
            {routeGeometry && (
              <Row className="divdistance">
                <Col span={12}>
                  <p>
                    <label>Distancia Total</label>
                  </p>
                  <p>
                    <label>Tiempo Estimado</label>
                  </p>
                </Col>
                <Col span={12} className="text-right">
                  <p>
                    <label>{distance}</label>
                  </p>
                  <p>
                    <label>{timetravel}</label>
                  </p>
                </Col>
              </Row>
            )}
          </Col>
          <Col span={24}>
            <div
              ref={mapContainerRef}
              style={{
                width: "100%",
                height: "30vh",
                border: "1px #F7F7F7 solid"
              }}
            />
          </Col>
        </Row>
      </>
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Responsables" icon="ti-check">
      <>
        <Title className="collapseByAction__label__text" level={4}>
          Responsables
        </Title>
        <label
          className="locationLabels"
          style={{ display: "flex", marginTop: "2rem" }}
        >
          <text>Company Code</text>
        </label>
        <Select
          style={{ width: "350px" }}
          options={[
            { value: "1", label: "Halliburton" },
            { value: "2", label: "Halliburton zona franca" }
          ]}
        />
        <div className="divdistance">
          <Row>
            <Col span={10}>
              <label
                className="locationLabels"
                style={{ display: "flex", marginTop: "2rem" }}
              >
                <text>Product Service Line (PSL)</text>
              </label>
              <Select
                style={{ width: "100%" }}
                options={[{ value: "1", label: "PSL 1" }]}
              />
            </Col>
            <Col span={8} style={{ paddingLeft: "30px" }}>
              <label
                className="locationLabels"
                style={{ display: "flex", marginTop: "2rem" }}
              >
                <text>Porcentaje PSL</text>
              </label>
              <InputNumber<number>
                style={{ width: "100%" }}
                defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "") as unknown as number}
              />
            </Col>
          </Row>
          <Row>
            <Col span={10} style={{ paddingLeft: "30px" }}>
              <label
                className="locationLabels"
                style={{ display: "flex", marginTop: "2rem" }}
              >
                <text>Centro de costos</text>
              </label>
              <Select
                style={{ width: "100%" }}
                options={[{ value: "1", label: "Centro de costos 1" }]}
              />
            </Col>
            <Col span={8} style={{ paddingLeft: "30px" }}>
              <label
                className="locationLabels"
                style={{ display: "flex", marginTop: "2rem" }}
              >
                <text>Porcentaje CC</text>
              </label>
              <InputNumber<number>
                style={{ width: "100%" }}
                defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "") as unknown as number}
              />
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              <PlusCircle></PlusCircle>
              <text>Agregar centro de costos</text>
            </Col>
          </Row>
        </div>
        <Row>
          <Col span={24} className="text-right">
            <PlusCircle></PlusCircle>
            <text>Agregar PSL</text>
          </Col>
        </Row>
      </>
    </FormWizard.TabContent>
    <FormWizard.TabContent title="Informacion Adicional" icon="ti-check">
      <>
        <Title className="collapseByAction__label__text" level={4}>
          Informacion Adicional
        </Title>
        <label
          className="locationLabels"
          style={{ display: "flex", marginTop: "2rem" }}
        >
          <text>Documentos</text>
        </label>
        <Row className="mainUploadDocuments">
          {mockFiles.map((file) => (
            // eslint-disable-next-line react/jsx-key
            <Col span={24} style={{ padding: "15px" }} key={file.id}>
              <UploadDocumentButton
                key={file.id}
                title={file.title}
                isMandatory={file.isMandatory}
                setFiles={setFiles}
              />
            </Col>
          ))}
        </Row>
        <Row>
          <Col span={24} className="text-right">
            <PlusCircle></PlusCircle>
            <text>Agregar otro documento</text>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label
              className="locationLabels"
              style={{ display: "flex", marginTop: "2rem" }}
            >
              <text>Instrucciones especiales</text>
            </label>
            <TextArea rows={4} />
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <label
              className="locationLabels"
              style={{ display: "flex", marginTop: "2rem" }}
            >
              <text>Datos de Contacto</text>
            </label>
            <Row style={{ paddingLeft: "30px" }}>
              <Col span={24}>
                <label
                  className="locationLabels"
                  style={{ display: "flex", marginTop: "2rem" }}
                >
                  <text>Contacto punto origen</text>
                </label>
                <Row>
                  <Col span={12} style={{ paddingRight: "15px" }}>
                    <Input placeholder="Nombre del contacto" />
                  </Col>
                  <Col span={12} style={{ paddingLeft: "15px" }}>
                    <Input placeholder="Teléfono: 000 000 0000 " />
                  </Col>
                </Row>
              </Col>
              <Col span={24}>
                <label
                  className="locationLabels"
                  style={{ display: "flex", marginTop: "2rem" }}
                >
                  <text>Contacto punto origen</text>
                </label>
                <Row>
                  <Col span={12} style={{ paddingRight: "15px" }}>
                    <Input placeholder="Nombre del contacto" />
                  </Col>
                  <Col span={12} style={{ paddingLeft: "15px" }}>
                    <Input placeholder="Teléfono: 000 000 0000 " />
                  </Col>
                </Row>
              </Col>
            </Row>
            <Row style={{ marginTop: "2rem" }}>
              <Col span={24} className="text-right">
                <PlusCircle></PlusCircle>
                <text>Agregar otro contacto</text>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    </FormWizard.TabContent>
  </FormWizard>
  {/* add style */}
  <style>{`
            @import url("https://cdn.jsdelivr.net/gh/lykmapipo/themify-icons@0.1.2/css/themify-icons.css");
        `}</style>
</Modal>    ;
}