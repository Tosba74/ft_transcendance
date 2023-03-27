export default function ModalUser(isOpen: boolean) {
  return (
    <>
      <ul className="modal absolute hidden">
        <li>View</li>
        <li>MP</li>
        <li>Play</li>
        <li>Remove</li>
        <li>Block</li>
      </ul>
    </>
  );
}
