import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GameRoot } from "../src/game/GameRoot";
import "../src/styles.css";

createRoot(document.getElementById("app")!).render(
  <StrictMode>
    <GameRoot />
  </StrictMode>,
);
