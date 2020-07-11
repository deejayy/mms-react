import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { MmScreen } from "./mm-screen";

class MmApp extends React.Component {
  render() {
    return (
      <MmScreen />
    );
  }
}

ReactDOM.render(<MmApp />, document.getElementById("root"));
