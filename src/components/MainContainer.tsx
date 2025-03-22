import type { Pages } from "../constants/enums";
import { pages } from "../constants/constants";
import {
  GithubFilled,
  LinkedinFilled,
  MailFilled,
  PhoneFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";

export function MainContainer(props: {
  children: React.ReactNode;
  currentPage: Pages;
}) {
  const { prev, next } = pages[props.currentPage];

  return (
    <>
      <div className="p-6 pb-4 flex gap-3 border-gray-300/20 border-b-2">
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#F3000D] to-[#7C0000] w-5 h-5"></div>
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#F3DF00] to-[#5B5400] w-5 h-5"></div>
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#0CF300] to-[#055B00] w-5 h-5"></div>
      </div>
      <div className="py-6 pb-4 flex gap-3 absolute top-0 justify-center w-full not-md:hidden">
        {/* TODO: */}
        <div className="disabled-text font-extrabold tracking-widest text-xs">
          jeronimoek.com/me
        </div>
      </div>
      <div className="p-12 flex flex-col justify-between grow">
        <div>{props.children}</div>
        <div className="flex justify-between mt-20 items-center relative">
          {prev !== undefined ? (
            <a
              href={pages[prev].route}
              className="tracking-widest expand-clickable"
            >
              {"< "}
              PREV
            </a>
          ) : (
            <div className="tracking-widest disabled-text cursor-default">
              {"< "}
              PREV
            </div>
          )}
          <div className="flex gap-6 text-4xl">
            <a href="https://www.google.com" className="expand-clickable">
              <MailFilled />
            </a>
            <a href="https://www.google.com" className="expand-clickable">
              <GithubFilled />
            </a>
            <a href="https://www.google.com" className="expand-clickable">
              <PhoneFilled />
            </a>
            <a href="https://www.google.com" className="expand-clickable">
              <WhatsAppOutlined />
            </a>
            <a href="https://www.google.com" className="expand-clickable">
              <LinkedinFilled />
            </a>
          </div>
          {next !== undefined ? (
            <a
              href={pages[next].route}
              className="tracking-widest expand-clickable"
            >
              NEXT
              {" >"}
            </a>
          ) : (
            <div className="tracking-widest disabled-text cursor-default">
              NEXT
              {" >"}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
