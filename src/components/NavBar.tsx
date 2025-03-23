import { pages } from "../constants/constants";
import type { Pages } from "../constants/enums";

type NavBarParams = {
  currPage: Pages;
  wideFont?: boolean;
};

export function NavBar({ currPage, wideFont }: NavBarParams) {
  const currentPage = currPage !== undefined ? pages[currPage] : undefined;

  return (
    <div
      className={`flex gap-6 ${
        wideFont ? "" : "tracking-widest font-extrabold"
      } justify-center mb-20 xl:mb-0 h-max`}
    >
      {Object.values(pages).map((page) => {
        const disabled = page.route === currentPage?.route;
        return (
          <a
            key={page.name}
            className={`${
              disabled ? "disabled-text cursor-default" : "expand-clickable"
            }`}
            href={page.route}
          >
            {page.name.toLocaleUpperCase()}
          </a>
        );
      })}
    </div>
  );
}
