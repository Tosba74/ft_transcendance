
interface MessageServerProps {
  text: string;
}

export default function MessageServer({
  text,
}: MessageServerProps) {
  return (
    <div className="my-1 w-full flex items-end justify-center">
      <div className="mx-2 text-xs px-4 p-2 text-gray-400">
        {text}
      </div>
    </div>
  );
}
