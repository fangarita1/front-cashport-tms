import { Col,  Divider,  Flex, Row } from "antd"
import styles from "./Responsibles.module.scss"

interface ResponsiblesProps {
    title: string;
}

export const Responsibles =({ title }: ResponsiblesProps)=>{
    return (
        <Flex vertical className={styles.container}>
            <p className={styles.sectionTitle}>{title || "Responsables"}</p>
            <Row>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem"}}>
                    <p className={styles.subtitleReg}>
                        <strong>PSL:</strong> Product service line 1
                    </p>
                    <p className={styles.subtitleReg} style={{marginLeft: "1rem"}}> 
                        <strong>CC:</strong> Centro de costos 1
                    </p>
                </Col>
                <Col span={12} style={{display: "flex", flexDirection:"column", gap:"0.5rem", alignItems:"flex-end"}}>
                    <p className={styles.subtitle}>100%</p>
                    <p className={styles.bodyReg}>100%</p>
                </Col>
            </Row> 
        </Flex>
    )
}


