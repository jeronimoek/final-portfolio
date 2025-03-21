import { pages } from "../constants/constants";
import type { Pages } from "../constants/enums";

type NavBarParams = {
  currPage: Pages;
};

export function NavBar({ currPage }: NavBarParams) {
  const currentPage = currPage !== undefined ? pages[currPage] : undefined;

  return (
    <div className="flex gap-6 tracking-widest justify-center mb-20 xl:mb-0 h-max">
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
