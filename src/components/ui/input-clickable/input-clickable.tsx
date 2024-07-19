import { Input } from "antd";
import { CaretRight } from "phosphor-react";
import { FieldError } from "react-hook-form";
import "./input-clickable.scss";
import { useEffect, useState } from "react";

interface PropsInputClickable {
  title?: string;
  error?: FieldError | undefined | boolean;
  disabled?: boolean;
  callBackFunction: () => void;
}

const InputClickable = ({ title, error, disabled, callBackFunction }: PropsInputClickable) => {
  const [className, setClassName] = useState("clickableInput");

  useEffect(() => {
    if (error) {
      setClassName((prev) => `${prev} -error`);
    } else {
      setClassName(className.replace(" -error", ""));
    }

    if (disabled) {
      setClassName((prev) => `${prev} -disabled`);
    } else {
      setClassName(className.replace(" -disabled", ""));
    }
  }, [error, disabled]);

  const handleOnClick = () => {
    if (!disabled) callBackFunction();
  };

  return (
    <div className="inputClickableContainer">
      <p className="title">{title}</p>
      <Input
        readOnly
        addonAfter={<CaretRight size={"16px"} />}
        variant="borderless"
        className={className}
        placeholder="Seleccionar frecuencia"
        onClick={handleOnClick}
        data-tool-tip="TEST"
      />
    </div>
  );
};

export default InputClickable;
