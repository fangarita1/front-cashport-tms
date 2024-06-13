import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./TripTypes.module.css";

export type TripTypesType = {
  className?: string;
  truck?: string;
  carga?: string;

  /** Style props */
  propWidth?: CSSProperties["width"];
  propTextDecoration?: CSSProperties["textDecoration"];
  propMinWidth?: CSSProperties["minWidth"];
};

const TripTypes: FunctionComponent<TripTypesType> = ({
  className = "",
  truck,
  carga,
  propWidth,
  propTextDecoration,
  propMinWidth,
}) => {
  const truckIconStyle: CSSProperties = useMemo(() => {
    return {
      width: propWidth,
    };
  }, [propWidth]);

  const cargaStyle: CSSProperties = useMemo(() => {
    return {
      textDecoration: propTextDecoration,
      minWidth: propMinWidth,
    };
  }, [propTextDecoration, propMinWidth]);

  return (
    <div className={[styles.tripTypes, className].join(" ")}>
      <div className={styles.tripTypeIcons}>
        <img
          className={styles.truckIcon}
          loading="lazy"
          alt=""
          src={truck}
          style={truckIconStyle}
        />
        <a className={styles.carga} style={cargaStyle}>
          {carga}
        </a>
      </div>
    </div>
  );
};

export default TripTypes;
