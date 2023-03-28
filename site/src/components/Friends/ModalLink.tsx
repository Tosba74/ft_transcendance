export default function ModalLink({
  onClick,
  children,
}: {
  onClick: any;
  children: any;
}) {
  return (
    <li className="cursor-pointer" onClick={onClick}>
      {children}
    </li>
  );
}
