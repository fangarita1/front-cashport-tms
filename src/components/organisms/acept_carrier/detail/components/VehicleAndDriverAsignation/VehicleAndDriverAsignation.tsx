"use client";
import React, { useState } from "react";
import { Button, Dropdown, Menu, Typography, Space, Flex } from "antd";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";
import { CaretDown, Check, Circle, Plus, PlusCircle } from "@phosphor-icons/react";
import styles from "./vehicleAndDriverAsignation.module.scss";

const { Text, Title } = Typography;

interface List {
  title: string;
  name: string;
  number: string;
  value: number;
  type?: "vehicle" | "driver";
}

const vehicles: List[] = [
  { title: "Camion 350", name: "Nisan Blanco", number: "HFG-374", value: 0, type: "vehicle" },
  { title: "Camion 350", name: "Nisan Blanco", number: "HFG-374", value: 1, type: "vehicle" },
  { title: "Camion 350", name: "Nisan Blanco", number: "HFG-374", value: 2, type: "vehicle" },
  { title: "Camion 350", name: "Nisan Blanco", number: "HFG-374", value: 3, type: "vehicle" }
];

const drivers: List[] = [
  {
    title: "Camilos Barragan",
    name: "Carlos Barragan",
    number: "317 465 9239",
    value: 0,
    type: "driver"
  },
  {
    title: "Camilos Barragan",
    name: "Carlos Barragan",
    number: "317 465 9239",
    value: 1,
    type: "driver"
  },
  {
    title: "Camilos Barragan",
    name: "Carlos Barragan",
    number: "317 465 9239",
    value: 2,
    type: "driver"
  },
  {
    title: "Camilos Barragan",
    name: "Carlos Barragan",
    number: "317 465 9239",
    value: 3,
    type: "driver"
  }
];

export default function VehicleAndDriverAsignation() {
  const [vehicleSections, setVehicleSections] = useState([0]);
  const [driverSections, setDriverSections] = useState([0]);

  const addVehicleSection = () => {
    setVehicleSections([...vehicleSections, vehicleSections.length]);
  };

  const addDriverSections = () => {
    setDriverSections([...driverSections, driverSections.length]);
  };

  const createMenu = (items: List[], addAction: () => void) => (
    <Menu
      style={{
        height: "100%",
        padding: "2px 2px",
        backgroundColor: "#ffffff",
        border: "1px solid #DDDFE8",
        borderRadius: "4px"
      }}
    >
      <Button
        style={{
          backgroundColor: "#DDDDDD",
          width: "99%",
          marginLeft: "2px",
          display: "flex",
          justifyContent: "flex-start"
        }}
        onClick={addAction}
      >
        <PlusCircle size={20} color="black" />
        Agregar {items === vehicles ? "Vehículo" : "Conductor"}
      </Button>
      {items.map((item, index) => (
        <>
          {index !== 0 && <hr style={{ borderTop: "1px solid #DDDDDD" }} />}
          <Menu.Item key={index} className={styles.dropdownSelect}>
            <Flex align="center" justify="space-between" style={{ padding: "8px 4px" }}>
              <Flex align="center" gap={8}>
                <Circle size={26} />
                {item.type === "driver" ? (
                  <>
                    <Text>{item.name}</Text>
                    <p color="black">•</p>
                    <Text>{item.number}</Text>
                  </>
                ) : (
                  <div style={{marginLeft: "6px"}}>
                    <Title level={5}>{item.title}</Title>
                    <Flex gap={8}>
                      <Text>{item.name}</Text>
                      <p color="black">•</p>
                      <Text>{item.number}</Text>
                    </Flex>
                  </div>
                )}
              </Flex>
                <Flex
                  style={{
                    backgroundColor: "#CBE71E",
                    width: "24px",
                    height: "24px",
                    borderRadius: "2px"
                  }}
                  align="center"
                  justify="center"
                >
                  <Check size={20} color="white" />
                </Flex>
              </Flex>
          </Menu.Item>
        </>
      ))}
    </Menu>
  );

  return (
    <div className={styles.wrapper}>
      {vehicleSections.map((section, index) => (
        <div key={index}>
          <div className={styles.title}>
            <p>
              <b>Vehiculo {index !== 0 && index + 1}</b>
            </p>
          </div>
          <div className={styles.container} style={{ gap: "6px" }}>
            <div className={styles.subtitle}>
              <p>
                <b>Seleccione el vehículo</b>
              </p>
            </div>
            <Dropdown
              overlay={createMenu(vehicles, addVehicleSection)}
              trigger={["click"]}
              className={styles.dropdown}
            >
              <a className={styles.dropdownSelect} onClick={(e) => e.preventDefault()}>
                <Flex justify="space-between" align="center">
                  <Flex gap={12}>
                    <Flex align="center" gap={4}>
                      <Text>Camion 350</Text>
                      <p>&nbsp;</p>
                      <p style={{ color: "black" }}>•</p>
                      <p>&nbsp;</p>
                      <Text>Nisan Blanco</Text>
                    </Flex>
                  </Flex>
                  <Flex gap={24}>
                    <Text>HFG-374</Text>
                    <CaretDown size={20} color="black" />
                  </Flex>
                </Flex>
              </a>
            </Dropdown>
            <div className={styles.documentsTop}>
              <p>
                <b>Documentos</b>
              </p>
              <button disabled className={styles.button}>
                <Plus size={16} /> Editar documentos
              </button>
            </div>
            <div style={{ padding: "15px" }}>
              <UploadDocumentButton
                key={index}
                title={"Documento 1"}
                isMandatory
                aditionalData={index}
                setFiles={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      ))}
      {driverSections.map((section, index) => (
        <div key={index}>
          <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
          <div className={styles.title}>
            <p>
              <b>Conductor {index !== 0 && index + 1}</b>
            </p>
          </div>
          <div className={styles.container}>
            <div className={styles.subtitle}>
              <p>
                <b>Seleccione el conductor</b>
              </p>
            </div>
            <div className={styles.selector}>
              <Dropdown
                overlay={createMenu(drivers, addDriverSections)}
                trigger={["click"]}
                className={styles.dropdown}
              >
                <a className={styles.dropdownSelect} onClick={(e) => e.preventDefault()}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center"
                    }}
                  >
                    <div style={{ display: "flex", gap: "12px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
                        <Text>Camilo Barragan</Text>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: "24px" }}>
                      <Text>317 465 9239</Text>
                      <CaretDown size={20} color="black" />
                    </div>
                  </div>
                </a>
              </Dropdown>
              <button disabled className={styles.driverButton}>
                <PlusCircle size={16} />
                <p>
                  <b>Agregar otro conductor</b>
                </p>
              </button>
            </div>
            <div className={styles.documentsTop}>
              <p>
                <b>Documentos</b>
              </p>
              <button disabled className={styles.button}>
                <Plus size={16} /> Editar documentos
              </button>
            </div>
            <div style={{ padding: "15px" }}>
              <UploadDocumentButton
                key={index}
                title={"Documento 1"}
                isMandatory
                aditionalData={index}
                setFiles={() => {}}
                disabled
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
