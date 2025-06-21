import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@assets/index.css";
import PageLayout from "@Layouts/PageLayout";
import NotFound from "@Shared/NotFound";
import IndexTask from "@Tasks/Index";
import CreateTask from "@Tasks/Create";
import Home from "@Shared/Home";

const root = document.getElementById("root");

ReactDOM.createRoot(root!).render(
  <BrowserRouter>
    <Routes>
      <Route path="" element={<PageLayout />}>
        <Route index element={<Home />} />
        <Route path="task">
          <Route index element={<IndexTask />} />
          <Route path="create" element={<CreateTask />} />
          <Route path=":taskId/details" element={<CreateTask />} />
          <Route path=":taskId/edit" element={<CreateTask />} />
          <Route path=":taskId/delete" element={<CreateTask />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </BrowserRouter>
);
