import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Home = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    style={style}
    {...props}
  >
    <Path
      d="M0 0h24v24H0z"
      stroke="none"
    />
    <Path
      d="M5 12H3l9-9 9 9h-2"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-7"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Path
      d="M9 21v-6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v6"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

export default Home;

