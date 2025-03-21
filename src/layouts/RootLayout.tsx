import { Outlet } from "react-router-dom";
import { R3fCanvas } from "../components/R3fCanvas";
import { useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";

export default function RootLayout() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="font-bold secondary-text">
      <div className="w-screen fixed h-screen z-0">
        <R3fCanvas
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#444] to-[#000] flex overflow-auto items-center justify-center">
        <div className="z-10 w-[80%] min-h-screen rounded-[55px] relative flex flex-col">
          <div
            className={`${
              loaded ? "" : "opacity-0"
            } transition-all duration-1000`}
          >
            <Outlet />
          </div>
          {!loaded && (
            <div className="absolute w-full mt-12 flex justify-center items-center text-4xl">
              <LoadingOutlined />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
