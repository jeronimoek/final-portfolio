import { Outlet } from "react-router-dom";

export default function RootLayout() {
  return (
    <div className="font-bold secondary-text">
      <Outlet />
    </div>
  );
}
