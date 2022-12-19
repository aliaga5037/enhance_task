import React from "react";
import Uploader from "./components/uploader";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Uploader accept={"image/png, image/jgp,image/jpeg"} />
    </div>
  );
}

export default App;
