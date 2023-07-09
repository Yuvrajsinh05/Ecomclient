import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app";

console.log("app triggers");

createRoot(document.getElementById('root')).render(<App />);
