import { MouseEventHandler } from "react";

export default function ModalLink({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLLIElement>;
  children: React.ReactNode;
}) {
  return (
    <li className="cursor-pointer hover:bg-slate-200 py-1 px-3 " onClick={onClick}>
      {children}
    </li>
  );
}
