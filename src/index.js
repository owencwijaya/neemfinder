import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { MahasiswaProvider } from "./components/MahasiswaProvider";
import { ThemeProvider } from "./components/ThemeProvider";
import { Workbox } from 'workbox-window';

ReactDOM.render(
  <React.StrictMode>
    <MahasiswaProvider>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </MahasiswaProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

if ('serviceWorker' in navigator) {
  const sw = new Workbox(`${process.env.PUBLIC_URL}/service-worker.js`);
  sw.register();
}