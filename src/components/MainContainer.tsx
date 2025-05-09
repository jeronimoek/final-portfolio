import { Pages } from "../constants/enums";
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
  const { currentPage } = props;
  const { prev, next } = pages[currentPage];

  return (
    <>
      {/* <div className="p-6 pb-4 flex gap-3 border-gray-300/20 border-b-2 not-md:hidden">
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#F3000D] to-[#7C0000] w-5 h-5"></div>
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#F3DF00] to-[#5B5400] w-5 h-5"></div>
        <div className="rounded-full bg-radial-[at_50%_0%] from-[#0CF300] to-[#055B00] w-5 h-5"></div>
      </div> */}
      <div className="py-6 pb-4 flex gap-3 top-0 justify-center w-full">
        {/* TODO: add route*/}
        <div className="disabled-text font-extrabold tracking-widest text-xs mt-2">
          jeronimoek.com
        </div>
      </div>
      <div className="p-12 pt-6 flex flex-col justify-between grow">
        <div>{props.children}</div>
        <div className="flex justify-between mt-20 items-center relative not-md:flex-wrap not-md:gap-6">
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
          <div
            className="flex gap-6 text-4xl not-md:text-2xl not-md:order-2 not-md:w-full justify-center"
            style={{
              filter:
                currentPage === Pages.STACK
                  ? "drop-shadow( 3px 3px 0 rgba(0, 0, 0, 1))"
                  : "",
            }}
          >
            <a
              href="mailto:jeronimoek@gmail.com"
              target="_blank"
              className="expand-clickable"
            >
              <MailFilled />
            </a>
            <a
              href="https://github.com/jeronimoek/"
              target="_blank"
              className="expand-clickable"
            >
              <GithubFilled />
            </a>
            <a
              href="tel:+34610670414"
              target="_blank"
              className="expand-clickable"
            >
              <PhoneFilled />
            </a>
            <a
              href="https://wa.me/34610670414"
              target="_blank"
              className="expand-clickable"
            >
              <WhatsAppOutlined />
            </a>
            <a
              href="https://www.linkedin.com/in/jeronimoek/"
              target="_blank"
              className="expand-clickable"
            >
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
