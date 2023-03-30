import { MouseEventHandler } from "react";

export default function ModalLink({
  onClick,
  children,
}: {
  onClick: MouseEventHandler<HTMLLIElement>;
  children: React.ReactNode;
}) {
  return (
    <li className="cursor-pointer" onClick={onClick}>
      {children}
    </li>
  );
}
