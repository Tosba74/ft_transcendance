import MessageConv from "./MessageConv";
import MessageInput from "./MessageInput";

export default function MessagePanel() {
  return (
    <>
      {/* <div className="flex-grow"> */}
      <div className="bg scrollbar-thumb-blue  scrollbar-thumb-rounded  scrollbar-track-blue-lighter  scrollbar-w-2 scrolling-touch mb-2 mt-2 h-0 flex-grow  overflow-y-auto rounded bg-gray-200 shadow-lg dark:bg-gray-700 dark:text-white">
        <MessageConv />
      </div>
      {/* </div> */}
      {/* <div className="bottom-0"> */}
      <MessageInput />
      {/* </div> */}
    </>
  );
}
