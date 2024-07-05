import { Button } from "antd";

import "./ButtonHeader.scss";
import { forwardRef } from "react";

export default forwardRef(function ButtonHeader(
  { children, ...rest }: { children: React.ReactNode },
  ref: any
) {
  return (
    <div className="ButtonContainer">
      <Button type="primary" size="large" {...rest} className="ButtonHeader" ref={ref}>
        {children}
      </Button>
    </div>
  );
});
