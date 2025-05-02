import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Home = ({ style, color = "#181C2E", ...props }) => (
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
      d="M5.308 15.018v-2.445c0-.625.51-1.132 1.139-1.132h2.3c.301 0 .59.12.804.332.214.212.334.5.334.8v2.445c-.002.26.1.51.285.694a.988.988 0 0 0 .697.288h1.568a2.768 2.768 0 0 0 1.955-.8c.52-.513.81-1.21.81-1.938V6.293c0-.588-.262-1.144-.716-1.521L9.147.54a2.48 2.48 0 0 0-3.159.056L.774 4.772A1.98 1.98 0 0 0 0 6.293v6.962A2.755 2.755 0 0 0 2.765 16h1.533a.985.985 0 0 0 .989-.974l.021-.008Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Home;

