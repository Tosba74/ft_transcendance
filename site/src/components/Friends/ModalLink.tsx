import { MouseEventHandler } from "react";

export default function ModalLink({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLLIElement>;
  children: React.ReactNode;
}) {
  return (
    <span
      className="cursor-pointer py-1 px-3 ring-blue-500 hover:bg-slate-200 hover:ring-2 dark:hover:bg-gray-800"
      onClick={onClick}
    >
      {children}
    </span>
  );
}
