import { lazy, Suspense } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  useInRouterContext,
} from "react-router-dom";
import { SeoHead } from "../components/common/SeoHead";
import { MarketingLayout } from "../layouts/MarketingLayout";
import { PortalLayout } from "../layouts/PortalLayout";
import HomePage from "../pages/HomePage";
import AdminPortalPage from "../pages/portal/AdminPortalPage";
import StudentPortalPage from "../pages/portal/StudentPortalPage";
import TeacherPortalPage from "../pages/portal/TeacherPortalPage";

const StaffFormsPage = lazy(() => import("../pages/portal/StaffFormsPage"));
const TeacherRecordFormPage = lazy(() => import("../pages/portal/TeacherRecordFormPage"));

function AppRoutes() {
  return (
    <>
      <SeoHead />
      <Routes>
        <Route element={<MarketingLayout />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route path="/portal/borang" element={
          <Suspense fallback={<p role="status">Memuatkan borang…</p>}>
            <StaffFormsPage />
          </Suspense>
        } />
        <Route path="/portal/borang/rekod-guru" element={
          <Suspense fallback={<p role="status">Memuatkan borang…</p>}>
            <TeacherRecordFormPage />
          </Suspense>
        } />
        <Route path="/portal" element={<PortalLayout />}>
          <Route path="student" element={<StudentPortalPage />} />
          <Route path="teacher" element={<TeacherPortalPage />} />
          <Route path="admin" element={<AdminPortalPage />} />
        </Route>
      </Routes>
    </>
  );
}

export function AppRouter() {
  const hasRouterContext = useInRouterContext();

  if (hasRouterContext) {
    return <AppRoutes />;
  }

  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
