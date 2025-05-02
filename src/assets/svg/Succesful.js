import * as React from "react";
import Svg, { Rect, Path, Circle } from "react-native-svg";

const Succesful = ({ style, color = "#64BA67", ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" style={style} {...props}>
    {/* Background Rect */}
    <Rect width={30} height={30} fill="#fff" rx={25} />
    {/* Circle for Successful Icon */}
    <Circle cx={15} cy={15} r={10} fill={color} />
    {/* Checkmark Path */}
    <Path
      stroke="#fff"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M10 15l2.5 2.5L20 10"
    />
  </Svg>
);

export default Succesful;
