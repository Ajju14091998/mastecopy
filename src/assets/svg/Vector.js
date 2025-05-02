import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Cart = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill={color}
    style={style}  // Apply the style prop to the Svg element
    {...props}
  >
    <Path
      fill={color}
      fillRule="evenodd"
      d="M11.72 3.576h.173c2.267 0 4.107 1.8 4.107 4.008V12c0 2.208-1.84 4-4.107 4H4.107C1.84 16 0 14.208 0 12V7.584c0-2.208 1.84-4.008 4.107-4.008h.172a3.563 3.563 0 0 1 1.1-2.528C6.087.368 6.99.024 8.01 0c2.036 0 3.687 1.6 3.712 3.576ZM6.243 1.904a2.402 2.402 0 0 0-.73 1.672h4.977C10.464 2.264 9.363 1.2 8.009 1.2c-.633 0-1.29.248-1.767.704Zm4.88 4.752a.607.607 0 0 0 .615-.6v-.928c0-.328-.27-.6-.616-.6a.613.613 0 0 0-.616.6v.928c0 .328.28.6.616.6Zm-5.701-.6c0 .328-.271.6-.616.6a.613.613 0 0 1-.616-.6v-.928c0-.328.28-.6.616-.6.345 0 .616.272.616.6v.928Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Cart;
