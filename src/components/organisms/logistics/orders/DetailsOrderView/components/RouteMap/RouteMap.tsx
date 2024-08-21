import { Flex } from "antd"
import styles from "./RouteMap.module.scss"

interface RouteMapProps {
    title?: string;
    mapContainerRef: React.MutableRefObject<null>
}

export const RouteMap =({ title, mapContainerRef }: RouteMapProps)=>{
    return (
        <Flex vertical className={styles.container} style={{width: '100%'}}>
            {title && <p className={styles.sectionTitle}>{title || "Ruta"}</p>}
            <div
                ref={mapContainerRef}
                style={{
                    width: "100%",
                    height: "100%",
                    border: "1px #F7F7F7 solid",
                    borderRadius: "4px"
                }}
            />
        </Flex>
    )
}