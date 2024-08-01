"use client";
import React from "react";
import { Cascader, Flex } from "antd";
import styles from "./vehicleAndDriverAsignation.module.scss";
import { Plus, PlusCircle } from "phosphor-react";
import { UploadDocumentButton } from "@/components/atoms/UploadDocumentButton/UploadDocumentButton";

export default function VehicleAndDriverAsignation() {
  return (
    <Flex className={styles.wrapper}>
      <Flex className={styles.title}>
        <p>
          <b>Vehiculo</b>
        </p>
      </Flex>
      <Flex className={styles.container} gap={6}>
        <Flex className={styles.subtitle}>
          <p>
            <b>Seleccione el vehículo</b>
          </p>
        </Flex>
        <Flex className={styles.selector}>
          <Cascader
            style={{
              width: "35%",
              height: "100%",
              padding: "10px 16px",
              border: "1px solid #DDDFE8",
              borderRadius: "4px"
            }}
            size="large"
            multiple={false}
            removeIcon
            maxTagCount="responsive"
            placeholder="Camion 350 - Nisan Blanco HFG-374"
            placement="bottomRight"
            options={[
              { label: "Camilo Barragan       317 465 9239", value: 3 },
              { label: "Camilo Barragan       317 465 9239", value: 2 },
              { label: "Camilo Barragan       317 465 9239", value: 1 },
              { label: "Camilo Barragan      317 465 9239", value: 0 }
            ]}
            dropdownStyle={{border: "none"}}
            onChange={() => true}
          />
        </Flex>
        <Flex className={styles.documentsTop}>
          <p>
            <b>Documentos</b>
          </p>
          <button disabled className={styles.button}>
            <Plus size={16} /> Editar documentos
          </button>
        </Flex>
        <Flex style={{ padding: "15px" }}>
          <UploadDocumentButton
            key={1}
            title={"Nombre del documento"}
            isMandatory
            aditionalData={1}
            setFiles={() => {}}
            disabled
          />
        </Flex>
      </Flex>
      <hr style={{ borderTop: "1px solid #dddddd" }}></hr>
      <Flex className={styles.title}>
        <p>
          <b>Conductor</b>
        </p>
      </Flex>
      <Flex className={styles.container}>
        <Flex className={styles.subtitle}>
          <p>
            <b>Seleccione el conductor</b>
          </p>
        </Flex>
        <Flex className={styles.selector}>
          <Cascader
            className={styles.selectorButton}
            size="large"
            multiple={false}
            removeIcon
            maxTagCount="responsive"
            placeholder="Camion 350 - Nisan Blanco HFG-374"
            placement="bottomRight"
            options={[
              { label: "Camion 350 - Nisan Blanco HFG-374", value: 3 },
              { label: "Camion 350 - Nisan Blanco HFG-374", value: 2 },
              { label: "Camion 350 - Nisan Blanco HFG-374", value: 1 },
              { label: "Camion 350 - Nisan Blanco HFG-374", value: 0 }
            ]}
            onChange={() => true}
          />
          <button disabled className={styles.driverButton}>
              <PlusCircle size={16} />
              <p><b>Agregar otro conductor</b></p>
          </button>
        </Flex>
        <Flex className={styles.documentsTop}>
          <p>
            <b>Documentos</b>
          </p>
          <button disabled className={styles.button}>
            <Plus size={16} /> Editar documentos
          </button>
        </Flex>
        <Flex style={{ padding: "15px" }}>
          <UploadDocumentButton
            key={1}
            title={"Nombre del documento"}
            isMandatory
            aditionalData={1}
            setFiles={() => {}}
            disabled
          />
        </Flex>
      </Flex>
    </Flex>
  );
}
