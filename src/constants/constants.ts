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
  },
};

export const STACK_CATEGORIES = [
  {
    name: "front",
    technologies: [
      {
        name: "React",
        description: "The best tool for website development",
        image: "",
      },
      { name: "Nest", image: "" },
      { name: "Next", image: "" },
      { name: "Redux", image: "" },
      { name: "GraphQL", image: "" },
      { name: "Tailwind", image: "" },
      {
        name: "Electron",
        description: "The best tool for website development",
        image: "",
      },
      { name: "Jquery", image: "" },
      { name: "Styled components", image: "" },
      { name: "Sass/Scss/Less", image: "" },
      {
        name: "D3",
        description: "The best tool for compiling websites",
        image: "",
      },
      { name: "Three", image: "" },
      { name: "Bootstrap", image: "" },
      { name: "MaterialUI", image: "" },
      { name: "AntDesign", image: "" },
      { name: "Webpack", image: "" },
      {
        name: "Vite",
        description: "The best tool for compiling websites",
        image: "",
      },
    ],
  },
  {
    name: "back",
    technologies: [
      {
        name: "Node",
        image: "",
      },
      { name: "Nest", image: "" },
      { name: "Next", image: "" },
      { name: "Express", image: "" },
      { name: "GraphQL", image: "" },
      {
        name: "Prisma",
        image: "",
      },
      { name: "Apollo", image: "" },
      { name: "Knex", image: "" },
      { name: "Nodemailer", image: "" },
      { name: "Puppeteer", image: "" },
    ],
  },
  {
    name: "bbdd",
    technologies: [
      {
        name: "PostgreSQL",
        image: "",
      },
      {
        name: "MongoDB",
        image: "",
      },
      {
        name: "Directus",
        image: "",
      },
      {
        name: "MySQL",
        image: "",
      },
    ],
  },
  {
    name: "testing",
    technologies: [
      {
        name: "Jest",
        image: "",
      },
      {
        name: "Cypress",
        image: "",
      },
      {
        name: "Sentry",
        image: "",
      },
    ],
  },
  {
    name: "deploy",
    technologies: [
      {
        name: "Docker",
        image: "",
      },
      {
        name: "Pipelines ci/cd",
        image: "",
      },
      // TODO: specify services
      {
        name: "Firebase",
        image: "",
      },
      // TODO: specify services
      {
        name: "Aws",
        image: "",
      },
      {
        name: "Redis",
        image: "",
      },
    ],
  },
  {
    name: "other",
    technologies: [
      {
        name: "Scrum",
        image: "",
      },
      {
        name: "Gitlab",
        image: "",
      },
      {
        name: "Github",
        image: "",
      },
      {
        name: "Redmine",
        image: "",
      },
      {
        name: "Clickup",
        image: "",
      },
    ],
  },
];
