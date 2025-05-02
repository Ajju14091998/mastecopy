import * as React from "react";
import Svg, { G, Path } from "react-native-svg";

const Shopping = ({ style, color = "#fff", ...props }) => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" style={style} {...props}>
    <G
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path
        d="M11.943 17H4.995c-2.552 0-4.51-.922-3.954-4.632l.647-5.028c.343-1.852 1.524-2.56 2.56-2.56h8.472c1.052 0 2.164.762 2.56 2.56l.648 5.028C16.4 15.659 14.495 17 11.943 17Z"
        clipRule="evenodd"
      />
      <Path d="M12.058 4.596A3.596 3.596 0 0 0 8.462 1 3.596 3.596 0 0 0 4.85 4.596M10.93 8.345h-.038M6.077 8.345h-.038" />
    </G>
  </Svg>
);

export default Shopping;
