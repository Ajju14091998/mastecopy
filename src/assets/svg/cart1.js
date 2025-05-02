import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Cart1 = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    style={style}
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M14.541 3.143c.488 0 .808.171 1.127.547.32.375.376.914.304 1.403l-.76 5.356a2.054 2.054 0 0 1-2.022 1.788H4.47c-1.064 0-1.943-.833-2.031-1.91l-.736-8.9-1.207-.212A.614.614 0 0 1 .704.007L2.611.3c.271.05.471.277.495.555l.152 1.829a.492.492 0 0 0 .488.458H14.54ZM9.697 7.387h2.214c.336 0 .6-.277.6-.612a.6.6 0 0 0-.6-.612H9.697a.6.6 0 0 0-.6.612c0 .335.264.612.6.612Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Cart1;
