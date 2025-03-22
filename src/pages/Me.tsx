import { JSX, useState } from "react";
import { LoadingOutlined } from "@ant-design/icons";
import { DateSince } from "../components/DateSince";
import { MainContainer } from "../components/MainContainer";
import { NavBar } from "../components/NavBar";
import { pages } from "../constants/constants";
import { Pages } from "../constants/enums";
import { MeCanvas } from "../components/canvas/MeCanvas";

interface MeContainerProps {
  children: JSX.Element;
}

function MeContainer({ children }: MeContainerProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <div className="w-screen fixed h-screen z-0">
        <MeCanvas
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

export default function Me() {
  return (
    <MeContainer>
      <MainContainer currentPage={Pages.ME}>
        <div className="flex flex-col gap-20">
          <div className="flex flex-col-reverse xl:flex-row justify-between">
            <div className="flex gap-8 flex-col md:flex-row">
              <div className="w-50 h-50  rounded-full overflow-hidden bg-[#d9d9d9]/20 not-md:mx-auto">
                <img
                  className="w-50 h-50 object-contain -scale-x-90 scale-y-90 mt-3"
                  src="./assets/images/selfie.png"
                  alt=""
                />
              </div>
              <div className="flex flex-col justify-between not-md:gap-4 not-md:text-center">
                <div className="text-5xl font-bold main-text">
                  Jerónimo Ekerdt
                </div>
                <div className="secondary-text text-xl">
                  Web Developer FullStack Javascript
                </div>
                <div className="secondary-text">
                  Dec 2021 - Now{" "}
                  <div className="font-normal">
                    (
                    <DateSince since={new Date("2021-12-01")} />)
                  </div>
                </div>
                <div className="secondary-text">
                  Connected from Madrid, Spain
                </div>
              </div>
            </div>
            <NavBar currPage={Pages.ME} />
          </div>
          <div className="secondary-text font-normal">
            <p>
              ¡Hola! Soy Jerónimo Ekerdt, un desarrollador web fullstack
              apasionado por la tecnología, la creatividad y la aventura.
            </p>
            <p className="mt-6">
              Con 22 años, nací y crecí en Argentina, y desde que tengo memoria,
              la informática ha sido una parte fundamental de mi vida. La
              curiosidad y el deseo de aprender me han llevado a ser
              autodidacta, lo que me ha permitido desarrollar una sólida base en
              el desarrollo web a lo largo de los últimos 3 años y medio.
            </p>
            <p className="mt-6">
              <span className="font-bold">
                Mi especialidad es el desarrollo fullstack utilizando
                TypeScript.
              </span>{" "}
              He trabajado con una amplia variedad de tecnologías en el lado del
              cliente y del servidor, lo que me ha permitido adquirir una
              comprensión integral de cómo construir aplicaciones web eficientes
              y escalables. Algunas de las tecnologías con las que tengo
              experiencia incluyen React, Node.js, Express, GraphQL, bases de
              datos SQL y NoSQL, servicios cloud, ORMs como Prisma, gestores
              como Directus. {/* TODO: implementar color highlight */}
              <a className="font-bold" href={pages[Pages.STACK].route}>
                (Ver stack)
              </a>
            </p>
            <p className="mt-6">
              Lo que realmente me diferencia es mi enfoque{" "}
              <span className="font-bold">
                en la calidad, la escalabilidad y la experiencia del usuario.
              </span>{" "}
              Me encanta crear interfaces interactivas que no solo sean
              funcionales, sino que también ofrezcan una experiencia fluida y
              atractiva. En este sentido, las animaciones 3D y las
              representaciones de datos son una de mis grandes pasiones. Estoy
              fascinado por cómo la visualización de información puede mejorar
              la comprensión y la interacción en una página web, y
              constantemente busco integrar estas técnicas en mis proyectos.
            </p>
          </div>
        </div>
      </MainContainer>
    </MeContainer>
  );
}
