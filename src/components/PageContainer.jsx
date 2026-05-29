import { Outlet } from "react-router-dom";

export default function PageContainer() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
      <Outlet />
    </div>
  );
}
