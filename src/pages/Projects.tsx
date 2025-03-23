import { JSX, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { MainContainer } from "../components/MainContainer";
import { NavBar } from "../components/NavBar";
import { Pages } from "../constants/enums";
import { ProjectsCanvas } from "../components/canvas/ProjectsCanvas";

interface ProjectsContainerProps {
  children: JSX.Element;
}

function ProjectsContainer({ children }: ProjectsContainerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="w-screen h-screen fixed flex overflow-auto items-center justify-center">
        <div className="w-screen md:w-[80%] h-screen z-0">
          <ProjectsCanvas
            onLoad={() => {
              setLoaded(true);
            }}
          />
        </div>
      </div>
      <div className="w-screen min-h-screen bg-gradient-to-br from-[#444] to-[#000] flex overflow-auto items-center justify-center">
        <div
          className="z-10 w-full md:w-[80%] min-h-screen relative flex flex-col"
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

const PROJECTS = [
  {
    name: "Color Picker Universal",
    image: "cpu.jpg",
    url: "https://github.com/jeronimoek/color-picker-universal",
  },
  {
    name: "Color Translator",
    image: "color-translate.png",
    url: "https://github.com/jeronimoek/color-translate",
  },
  {
    name: "Color Translator Web",
    image: "color-translate-web.png",
    url: "https://jeronimoek.github.io/color-translate-web/",
  },
];

export default function Projects() {
  return (
    <ProjectsContainer>
      <div className="min-h-screen flex flex-col">
        <MainContainer currentPage={Pages.PROJECTS}>
          <div className="flex flex-col gap-20">
            <div className="flex flex-col-reverse xl:flex-row justify-between">
              <div className="flex gap-8 flex-row not-xl:justify-center">
                <div className="flex flex-col gap-6 not-md:gap-4 not-xl:text-center">
                  <div className="text-5xl font-normal main-text ">
                    {"</Projects"}
                    <span className="animate-pulse">_</span>
                    {">"}
                  </div>
                  <div className="secondary-text text-xl">
                    Public projects I have made so far
                  </div>
                </div>
              </div>
              <NavBar currPage={Pages.PROJECTS} />
            </div>
            <div className="secondary-text font-normal flex justify-around flex-wrap gap-24 cursor-pointer">
              {PROJECTS.map((project) => (
                <div
                  key={project.name}
                  className="grow-0 shrink-0 basis-sm text-center flex flex-col bg-black/80 rounded-2xl py-8 px-6"
                  onClick={() => {
                    window.open(project.url, "_blank");
                  }}
                >
                  <div className="text-xl mb-6 font-extrabold tracking-widest">
                    {project.name}
                  </div>
                  <div>
                    <img src={`./assets/images/${project.image}`} alt="" />
                  </div>
                  {/* TODO: */}
                  {/* <div className="flex flex-col">
                    {category.technologies.map((tech) => (
                      <div key={tech.name}>{tech.name}</div>
                    ))}
                  </div> */}
                </div>
              ))}
            </div>
          </div>
        </MainContainer>
      </div>
    </ProjectsContainer>
  );
}
