import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import TrackingDetails from "./components/trackingDetails";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import HttpApi from "i18next-http-backend";

//importing css files
import "bootstrap/dist/css/bootstrap.min.css";
import "rsuite/dist/styles/rsuite-default.css";
import "normalize.css";
import "./css/main.css";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)

    supportedLngs: ["en", "ar"],
    fallbackLng: "en",
    detection: {
      order: [ "path","cookie", "htmlTag", "localStorage", "subdomain"],
      caches: ["cookie"],
    },
    backend: {
      loadPath: "/assests/locales/{{lng}}/translation.json",
    },
  
  });

const loadingMarkup = (
  <div className="py-4 text-center">
    <h2>Loading...</h2>
  </div>
);

ReactDOM.render(
  <Suspense fallback={loadingMarkup}>
    <React.StrictMode>
      <TrackingDetails />
    </React.StrictMode>
  </Suspense>,
  document.getElementById("root")
);

reportWebVitals();
