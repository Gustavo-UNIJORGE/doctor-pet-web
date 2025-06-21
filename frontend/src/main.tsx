import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageLayout from "@Layouts/PageLayout";
import NotFound from "@Shared/NotFound";
import IndexTask from "@Tasks/Index";
import CreateTask from "@Tasks/Create";
import Home from "@Shared/Home";
import DetailsTask from "./Components/Tasks/Details";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="task">
          <Route index element={<IndexTask />} />
          <Route path="create" element={<CreateTask />} />
          <Route path=":id/details" element={<DetailsTask />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
