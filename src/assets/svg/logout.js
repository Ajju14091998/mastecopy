import * as React from "react";
import Svg, { Path } from "react-native-svg";

const Logout = ({ style, color = "#fff", ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" style={style} {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M12.839 14.807a.68.68 0 0 0-.679.693c0 .378.3.693.679.693h5.288v4.302c0 2.205-1.754 4.005-3.922 4.005H9.913C7.753 24.5 6 22.709 6 20.504v-9.999C6 8.291 7.763 6.5 9.922 6.5h4.3c2.151 0 3.905 1.791 3.905 3.996v4.311h-5.288Zm8.432-2.42 2.53 2.618c.13.135.199.306.199.495 0 .18-.07.36-.2.486l-2.529 2.62a.66.66 0 0 1-.467.206.664.664 0 0 1-.477-.207.715.715 0 0 1 0-.98l1.386-1.432h-3.586v-1.386h3.586l-1.386-1.43a.715.715 0 0 1 0-.982.644.644 0 0 1 .944-.009Z"
      clipRule="evenodd"
    />
  </Svg>
);

export default Logout;
