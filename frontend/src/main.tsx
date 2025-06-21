import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./App.tsx";
import NotFound from "./Shared/NotFound.tsx";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route index path='/' element={<Home />} />
      <Route path="*" element={<NotFound/>} />
    </Routes>
  </BrowserRouter>
);
