import { Pages } from "./enums";

type Page = {
  name: string;
  route: string;
  prev?: Pages;
  next?: Pages;
};

export const pages: Record<Pages, Page> = {
  [Pages.ME]: {
    name: "me",
    route: "./",
    next: Pages.STACK,
  },
  [Pages.STACK]: {
    name: "stack",
    route: "./stack",
    prev: Pages.ME,
    next: Pages.PROJECTS,
  },
  [Pages.PROJECTS]: {
    name: "projects",
    route: "./projects",
    prev: Pages.STACK,
    next: Pages.CONTACT,
  },
  [Pages.CONTACT]: {
    name: "contact",
    route: "./contact",
    prev: Pages.PROJECTS,
  },
};
