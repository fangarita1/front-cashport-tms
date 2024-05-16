import { FC, useState } from "react";
import { Checkbox } from "antd";
import { CaretLeft } from "phosphor-react";
import UiTabs from "@/components/ui/ui-tabs";
import { GenerateDebitNoteStep } from "@/modules/clients/constants/invoice-actions.constants";
import { useGenerateDebitNote } from "@/modules/clients/hooks/invoice-actions/generate-debit-note.hook";

interface GenerateDebitNoteProps {}

const GenerateDebitNote: FC<GenerateDebitNoteProps> = () => {
  const { currentStep } = useGenerateDebitNote();

  return (
    <div className="wrapper">
      <div className="header">
        <CaretLeft /> Aplicar nota débito
      </div>
      {currentStep === GenerateDebitNoteStep.SelectNotes && (
        <div className="content">
          <div className="title">Selecciona la(s) nota(s) crédito a aplicar</div>
          <div className="notesList">
            <div className="noteItem">
              <Checkbox />
              <div className="texts">
                <div className="name">Nota débito 12345</div>
                <div className="description">Volumen</div>
              </div>
              <div className="values">
                <div className="value">$12.000.000</div>
                <div className="subValue">$15.000.000</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {currentStep === GenerateDebitNoteStep.DefineAmount && (
        <div className="content">
          <div className="title">Define el monto a aplicar a cada factura</div>
          <UiTabs
            className="tabs"
            tabs={["12345", "23456", "34556"]}
            onTabClick={(tab) => console.log(tab)}
          />
        </div>
      )}
    </div>
  );
};

export default GenerateDebitNote;
