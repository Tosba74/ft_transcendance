interface MessageBulleSendProps {
  text: string;
}

export default function MessageBulleSend({ text }: MessageBulleSendProps) {
  return (
    <div className="mx-3 mb-1">
      <div className="chat-message">
        <div className="flex items-end justify-end">
          <div className="order-1 mx-2 flex max-w-xs flex-col items-end space-y-2 text-xs">
            <div>
              <span className="inline-block rounded-lg bg-cyan-500 px-4 py-2 text-white ">
                {text}
              </span>
            </div>
          </div>
          <img
            src="https://images.unsplash.com/photo-1590031905470-a1a1feacbb0b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=3&amp;w=144&amp;h=144"
            alt="My profile"
            className="order-2 h-6 w-6 rounded-full"
          />
        </div>
      </div>
    </div>
  );
}
