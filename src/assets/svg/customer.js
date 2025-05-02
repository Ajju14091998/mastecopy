import * as React from "react";
import Svg, { Path, Rect, ClipPath, Defs } from "react-native-svg";

const Customer = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 53 50"
    fill="none"
    style={style} // Apply style dynamically
    {...props}
  >
    <Rect width="53" height="50" fill="#E5E5E5" />
    <ClipPath id="clip0">
      <Path d="M0 0h53v50H0z" fill="#fff" />
    </ClipPath>
    <G clipPath="url(#clip0)">
      <Path fill="#fff" d="M-26-270h375v812H-26z" />
      <Rect
        x={-10}
        y={-15}
        width={343}
        height={80}
        fill="#fff"
        rx={13}
        style={{ elevation: 10 }}
      />
      <Rect width={52.462} height={50} fill="#EEE" rx={10} />
      <Path
        fill={color}
        d="M26.23 15a4.75 4.75 0 1 0 0 9.5 4.75 4.75 0 0 0 0-9.5ZM23.23 26a4.75 4.75 0 0 0 0 9.5h6a4.75 4.75 0 1 0 0-9.5h-6Z"
      />
    </G>
  </Svg>
);

export default Customer;

