import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Profile = ({ style, color = "#181C2E", ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 16 16"
    fill="none"
    style={style}
    {...props}
  >
    <Path
      fill={color}
      d="M8.398 10.54c-3.45 0-6.398.544-6.398 2.72S4.929 16 8.398 16c3.45 0 6.397-.544 6.397-2.72 0-2.177-2.928-2.74-6.397-2.74Z"
    />
    <Path
      fill={color}
      d="M8.398 8.467a4.219 4.219 0 0 0 4.233-4.233A4.219 4.219 0 0 0 8.398 0a4.22 4.22 0 0 0-4.234 4.234 4.22 4.22 0 0 0 4.234 4.233Z"
      opacity={0.4}
    />
  </Svg>
);

export default Profile;
