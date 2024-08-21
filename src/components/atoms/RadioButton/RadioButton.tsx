import * as React from "react"
const RadioButtonIcon = (props:any) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={21}
    fill="none"
    {...props}
  >
    <rect width={20} height={20} y={0.5} fill="#CBE71E" rx={10} />
    <rect
      width={17}
      height={17}
      x={1.5}
      y={2}
      fill="#141414"
      stroke="#000"
      rx={8.5}
    />
    <rect width={14} height={14} x={3} y={3.5} fill="#CBE71E" rx={7} />
    <rect
      width={6.667}
      height={6.667}
      x={6.666}
      y={7.164}
      fill="#141414"
      rx={3.333}
    />
  </svg>
)
export default RadioButtonIcon
