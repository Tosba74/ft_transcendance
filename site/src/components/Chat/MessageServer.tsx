interface MessageServerProps {
  text: string;
}

export default function MessageServer({ text }: MessageServerProps) {
  return (
    <div className="my-1 flex w-full items-end justify-center">
      <div className="mx-2 p-2 px-4 text-xs text-gray-400">{text}</div>
    </div>
  );
}
