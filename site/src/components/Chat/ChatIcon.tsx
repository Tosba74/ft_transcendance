import { UseChatDto } from "./dto/useChat.dto";
// import Icon from '../../assets/svg/balloon-heart.svg'

interface ChatIconProps {
  openedMenu: string;
  setOpenedMenu: Function;
  chats: UseChatDto;
}

export default function ChatIcon({
  openedMenu,
  setOpenedMenu,
  chats,
}: ChatIconProps) {
  const handleClick = () => {
    chats.setChatOpen(!chats.chatOpen);
    setOpenedMenu("");
  };

  return (
    <>
      {openedMenu !== "chat" && (
        <div className="absolute right-2 bottom-10 z-50 ">
          <div className="justify-content-end right-2 flex justify-end rounded-full lg:pr-2">
            <div>
              <button
                type="button"
                onClick={handleClick}
                className="flex h-12 w-12 items-center justify-end rounded-full bg-cyan-500 text-white shadow-lg transition duration-500 ease-in-out hover:bg-blue-400 focus:outline-none"
              >
                <div className="flex">
                  <div className="mr-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-balloon-heart"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="m8 2.42-.717-.737c-1.13-1.161-3.243-.777-4.01.72-.35.685-.451 1.707.236 3.062C4.16 6.753 5.52 8.32 8 10.042c2.479-1.723 3.839-3.29 4.491-4.577.687-1.355.587-2.377.236-3.061-.767-1.498-2.88-1.882-4.01-.721L8 2.42Zm-.49 8.5c-10.78-7.44-3-13.155.359-10.063.045.041.089.084.132.129.043-.045.087-.088.132-.129 3.36-3.092 11.137 2.624.357 10.063l.235.468a.25.25 0 1 1-.448.224l-.008-.017c.008.11.02.202.037.29.054.27.161.488.419 1.003.288.578.235 1.15.076 1.629-.157.469-.422.867-.588 1.115l-.004.007a.25.25 0 1 1-.416-.278c.168-.252.4-.6.533-1.003.133-.396.163-.824-.049-1.246l-.013-.028c-.24-.48-.38-.758-.448-1.102a3.177 3.177 0 0 1-.052-.45l-.04.08a.25.25 0 1 1-.447-.224l.235-.468ZM6.013 2.06c-.649-.18-1.483.083-1.85.798-.131.258-.245.689-.08 1.335.063.244.414.198.487-.043.21-.697.627-1.447 1.359-1.692.217-.073.304-.337.084-.398Z"
                      />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
