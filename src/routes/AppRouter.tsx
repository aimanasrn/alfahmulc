import { Route, Routes } from "react-router-dom";
import { MarketingLayout } from "../layouts/MarketingLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import HomePage from "../pages/HomePage";
import AdminPortalPage from "../pages/portal/AdminPortalPage";
import StudentPortalPage from "../pages/portal/StudentPortalPage";
import TeacherPortalPage from "../pages/portal/TeacherPortalPage";

export function AppRouter() {
  return (
    <Routes>
      <Route element={<MarketingLayout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
      <Route path="/portal" element={<PortalLayout />}>
        <Route path="student" element={<StudentPortalPage />} />
        <Route path="teacher" element={<TeacherPortalPage />} />
        <Route path="admin" element={<AdminPortalPage />} />
      </Route>
    </Routes>
  );
}
