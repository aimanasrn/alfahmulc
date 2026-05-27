import { Outlet } from "react-router-dom";

export function PortalLayout() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.12),transparent_26%)]" />
      <div className="relative mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur sm:p-10">
        <Outlet />
      </div>
    </div>
  );
}
