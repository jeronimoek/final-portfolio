import { Outlet } from "react-router-dom";
import { R3fCanvas } from "../components/R3fCanvas";

export default function RootLayout() {
  return (
    <html
      // lang={locale}
      className="w-screen overflow-x-hidden"
    >
      <body className="font-bold secondary-text">
        <div className="w-screen fixed h-screen z-0">
          <R3fCanvas />
        </div>
        <div className="w-screen min-h-screen bg-gradient-to-br from-[#444] to-[#000] flex overflow-auto items-center justify-center">
          <div className="z-10 w-[80%] min-h-screen rounded-[55px] relative flex flex-col">
            <Outlet />
          </div>
        </div>
      </body>
    </html>
  );
}
