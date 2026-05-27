import { Outlet } from "react-router-dom";

export function PortalLayout() {
  return (
    <div className="min-h-screen bg-slate-950 px-6 py-16 text-white">
      <div className="mx-auto max-w-5xl rounded-[32px] border border-white/10 bg-white/5 p-8 backdrop-blur">
        <Outlet />
      </div>
    </div>
  );
}
