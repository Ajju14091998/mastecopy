import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Cart = ({ style, color = "currentColor", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill={color}
    viewBox="0 0 24 24"
    style={style}
    {...props}
  >
    <Path fill="none" d="M0 0h24v24H0z" />
    <Path d="M6 2a1 1 0 0 1 .993.883L7 3v1.068l13.071.935A1 1 0 0 1 21 6.027l-.01.114-1 7a1 1 0 0 1-.877.853L19 14H7v2h10a3 3 0 1 1-2.995 3.176L14 19l.005-.176c.017-.288.074-.564.166-.824H8.829a3 3 0 1 1-5.824 1.176L3 19l.005-.176A3.002 3.002 0 0 1 5 16.17V4H4a1 1 0 0 1-.993-.883L3 3a1 1 0 0 1 .883-.993L4 2h2zm0 16a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm11 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" />
  </Svg>
);

export default Cart;
