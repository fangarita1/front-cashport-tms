import { Col, Divider, Flex, Row, Typography } from "antd"
import styles from "./SummaryData.module.scss"
import { ITransferOrder } from "@/types/logistics/schema";

interface SummaryDataProps {
    title: string;
    routeGeometry:any;
    distance: any;
    timetravel: any;
    transferOrder: ITransferOrder | undefined
    optionsFlexible: {  value: number; label: string;}[]
}
const { Text } = Typography;

export const SummaryData =({ title, routeGeometry, distance, timetravel, transferOrder, optionsFlexible }: SummaryDataProps)=>{
    
    return (
        <Flex vertical className={styles.container} style={{width: '100%'}}>
            <p className={styles.sectionTitle}>{title || "Resumen"}</p>
            {routeGeometry &&   
                <Row className={styles.divdistance} style={{marginBottom: "2rem"}} >
                    <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem"}}>
                        <p className={styles.subtitleReg}>Distancia Total</p>
                        <p className={styles.subtitleReg}>Tiempo Estimado</p>
                        <p className={styles.subtitleReg}>Volumen</p>
                        <p className={styles.subtitleReg}>Peso</p>
                    </Col>
                    <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                        <p className={styles.subtitle}>{distance}</p>
                        <p className={styles.subtitle}>{timetravel}</p> 
                        <p className={styles.subtitle}>00</p>    
                        <p className={styles.subtitle}>00</p>            
                    </Col>
                </Row>
            }
            <Row>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem"}}>
                    <p className={styles.subtitleReg}>Tipo de viaje</p>
                    <p className={styles.subtitleReg}>Vehiculos sugeridos</p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    <p className={styles.bodyStrong}>{transferOrder?.service_type_desc}</p>
                    <p className={styles.bodyStrong}>{ transferOrder?.transfer_order_vehicles?.map(v=> v.vehicle_type_desc).join(',')}</p>
                </Col>
            </Row>
            <Divider className={styles.divider}/>
            <Row>
                <Col span={12} >
                    <p className={styles.subtitleReg}>Punto Origen</p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    { transferOrder?.start_freight_equipment &&
                        <p className={styles.bodyStrong}>Requiere agendar izaje</p>                      
                    }
                    <p className={styles.bodyStrong}>{transferOrder?.start_location?.description}</p>
                </Col>
            </Row>
            <Divider className={styles.divider}/>
            <Row>
                <Col span={12} >     
                    <p className={styles.subtitleReg}>Punto Destino</p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    { transferOrder?.end_freight_equipment &&
                        <Text strong>Requiere agendar izaje</Text>                      
                    }
                    <Text strong>{transferOrder?.end_location?.description}</Text>
                </Col>
            </Row>
            <Divider className={styles.divider}/>
            <Row>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem"}}>
                    <p className={styles.subtitleReg}>Fecha y hora inicial</p>
                    <p className={styles.bodyStrong}>{
                        optionsFlexible.find(x=> x.value==transferOrder?.start_date_flexible)?.label
                    }</p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    <p className={styles.bodyStrong}>{transferOrder?.start_date?.split('T')[1].substring(0,5)}</p>
                    <p className={styles.bodyStrong}>{transferOrder?.start_date?.split('T')[0]}</p>
                </Col>
            </Row>
            <Divider className={styles.divider}/>
            <Row>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem"}}>
                    <p className={styles.subtitleReg}>Fecha y hora final</p>
                    <p className={styles.bodyStrong}>{
                        optionsFlexible.find(x=> x.value==transferOrder?.end_date_flexible)?.label
                    }</p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    <p className={styles.bodyStrong}> {transferOrder?.end_date?.split('T')[1].substring(0,5)} </p>
                    <p className={styles.bodyStrong}> {transferOrder?.end_date?.split('T')[0]} </p>
                </Col>
        </Row>                                  
    </Flex>
    )
}