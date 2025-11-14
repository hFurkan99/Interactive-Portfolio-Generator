import { Routes, Route, Navigate } from "react-router";
import Layout from "@/components/layout/Layout";
import ScrollToTop from "@/components/common/ScrollToTop";

// Pages
import HomePage from "@/pages/HomePage";
import TemplateSelectionPage from "@/pages/TemplateSelectionPage";
import EditorPage from "@/pages/EditorPage";
import PreviewPage from "@/pages/PreviewPage";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="templates" element={<TemplateSelectionPage />} />
          <Route path="editor/:documentId" element={<EditorPage />} />
          <Route path="preview/:documentId" element={<PreviewPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </>
  );
}
