import Media from "react-media";
import responsiveBreakPoints from "./responsiveBreakPoints";

export default function MediaProvider({ children }) {
    return <Media queries={responsiveBreakPoints}>{children}</Media>;
  }
  