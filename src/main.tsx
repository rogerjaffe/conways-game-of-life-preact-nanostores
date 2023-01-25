import { render } from "preact";
import App from "./views/App";
import { configureGoogleAnalytics } from "./utilities/preact-google-analytics";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

// Set up Google Analytics.  See tutorial at
// https://support.google.com/analytics/answer/9304153
const MEASUREMENT_ID = "G-2ELSMC0Z7Z";
configureGoogleAnalytics(MEASUREMENT_ID);

render(
  <div className="container">
    <App />
  </div>,
  document.getElementById("root") as HTMLElement
);
