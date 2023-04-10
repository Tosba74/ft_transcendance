interface ChatModeProps {
  handleClick: Function;
  setOpenedMenu: Function;
  modeChannel: boolean;
}

export default function ChatMode({
  handleClick,
  setOpenedMenu,
  modeChannel,
}: ChatModeProps) {
  return (
    <>
      <button
        className="w-full text-center"
        type="button"
        onClick={() => handleClick()}
      >
        {modeChannel && <div className="ml-6 px-4">Channel List</div>}
        {!modeChannel && <div className="ml-6 px-4">Chat Mode</div>}
      </button>
      <button className="w-10" type="button" onClick={() => setOpenedMenu("")}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </>
  );
}
