import { JSX, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { MainContainer } from "../components/MainContainer";
import { NavBar } from "../components/NavBar";
import { Pages } from "../constants/enums";
import { StackCanvas } from "../components/canvas/StackCanvas";
import { STACK_CATEGORIES } from "../constants/constants";
import "../styles/Stack.css";

interface StackContainerProps {
  children: JSX.Element;
}

function StackContainer({ children }: StackContainerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="w-screen fixed h-screen z-0">
        <StackCanvas
          onLoad={() => {
            setLoaded(true);
          }}
        />
      </div>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#444] to-[#000] flex overflow-auto items-center justify-center">
        <div
          className="z-10 w-full md:w-[80%] min-h-screen relative flex flex-col backdrop-blur-sm"
          style={{ boxShadow: "black 0 0 10px 5px" }}
        >
          <div
            className={`${
              loaded ? "" : "opacity-0"
            } transition-opacity duration-1000 `}
          >
            {children}
          </div>
          {!loaded && (
            <div className="absolute w-full mt-12 flex justify-center items-center text-4xl">
              <LoadingOutlined />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Stack() {
  return (
    <StackContainer>
      <div
        className="font-[Silkscreen] min-h-screen flex flex-col"
        style={{
          textShadow: "3px 3px 1px black",
        }}
      >
        <MainContainer currentPage={Pages.STACK}>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col-reverse xl:flex-row justify-between">
              <div className="flex gap-8 flex-col md:flex-row">
                <div className="w-24 h-24 not-md:mx-auto">
                  <img
                    className="w-24 h-24 object-contain"
                    src="./assets/images/Twemoji_1f47e.svg"
                    alt="alien 8bit"
                    style={{
                      filter: "drop-shadow( 3px 3px 0 rgba(0, 0, 0, 1))",
                    }}
                  />
                </div>
                <div className="flex flex-col gap-6 not-md:gap-4 not-md:text-center">
                  <div className="text-5xl font-normal main-text ">
                    My stack
                  </div>
                  <div className="secondary-text text-xl">
                    The technologies I use everyday
                  </div>
                </div>
              </div>
              <NavBar currPage={Pages.STACK} wideFont />
            </div>
            <div
              className="secondary-text font-normal grid w-full gap-y-12"
              id="categories"
            >
              {STACK_CATEGORIES.map((category) => (
                <div
                  key={category.name}
                  className="text-center"
                  style={{ gridArea: category.name }}
                >
                  <div className="text-4xl mb-6">
                    {category.name.toLocaleUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    {category.technologies.map((tech) => (
                      <div key={tech.name}>{tech.name}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </MainContainer>
      </div>
    </StackContainer>
  );
}
