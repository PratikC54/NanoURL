import { BrowserRouter } from "react-router-dom";
import { getApps } from "./utils/helper.js";
import "./App.css";


function App() {
  const CurrentApp = getApps();
  return (
    <BrowserRouter>
      <CurrentApp />
    </BrowserRouter>
  );
}

export default App;
