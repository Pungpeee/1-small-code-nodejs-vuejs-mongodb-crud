import { PropsWithChildren } from "react";

type Props = {
  mark?: boolean;
};

export default function Label({ mark, children }: PropsWithChildren<Props>) {
  return (
    <div className="flex flex-col items-start min-h-[33px] pb-1">
      <p
        className={`text-lg after:text-red-500 font-normal ${mark && "after:ms-1 after:content-['*']"}`}
      >
        {children}
      </p>
    </div>
  );
}
