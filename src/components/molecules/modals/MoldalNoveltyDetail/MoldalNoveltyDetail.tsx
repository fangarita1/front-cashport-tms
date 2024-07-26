import { FC } from "react";
import { CaretDoubleRight, Check, X } from "phosphor-react";
import "./moldalnoveltydetail.scss";
import { Button, Typography } from "antd";
import { InfoSection } from "./components/InfoSection";

const { Title } = Typography;

interface MoldalNoveltyDetailProps {
  isOpen: boolean;
  onClose: () => void;
  noveltyId?: number;
}

const MoldalNoveltyDetail: FC<MoldalNoveltyDetailProps> = ({ isOpen = true, onClose }) => {
  const onReject = () => {
    console.log("Rechazar");
  };
  const onResolve = () => {
    console.log("Resolver");
  };
  return (
    <aside className={`wrapper__new ${isOpen ? "wrapper__new_show" : "wrapper__new_hide"}`}>
      <div>
        <div className="modalTopSide">
          <button type="button" className="back" onClick={onClose}>
            <CaretDoubleRight />
          </button>
        </div>
        <div className="header">
          <Title level={4}>Error en facturación </Title>
          <div className="header-buttons">
            <Button onClick={onReject}>
              <X />
              Rechazar
            </Button>
            <Button type="primary" onClick={onResolve}>
              <Check />
              Resolver
            </Button>
          </div>
        </div>
      </div>
      <InfoSection 
        responsable="Maria Camila Osorio"
        fecha="19/03/2024"
        cliente="Farmatodo"
        aprobadores={[
          { nombre: "Santiago Pachón", estado: "pendiente" },
          { nombre: "Felipe Angarita", estado: "aprobado" },
          { nombre: "Miguel Martinez", estado: "aprobado" }
        ]}
      />
    </aside>
  );
};

export default MoldalNoveltyDetail;
