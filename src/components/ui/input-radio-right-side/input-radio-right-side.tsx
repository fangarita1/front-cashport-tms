import { Radio } from "antd";
import "./input-radio-right-side.scss";

interface PropsInputRadioRightSide extends React.ComponentProps<typeof Radio> {
  children?: React.ReactNode;
  customStyles?: React.CSSProperties;
}

const InputRadioRightSide = ({
  children,
  customStyles,
  ...restProps
}: PropsInputRadioRightSide) => {
  return (
    <Radio className="customRadio" style={customStyles} {...restProps}>
      {children}
    </Radio>
  );
};

export default InputRadioRightSide;
