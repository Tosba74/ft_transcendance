import User from "./User";

export default function BannedList() {
  return (
    <>
      <h2 className="text-2xl">Banned list</h2>
      <ul className="mb-4 pl-1">
        <li>
          <User id={0} />
        </li>
        <li>
          <User id={0} />
        </li>
        <li>
          <User id={0} />
        </li>
      </ul>
    </>
  );
}
