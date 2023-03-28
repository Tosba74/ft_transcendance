export default function UserStatus({ status }: { status: string }) {
  let color: string;

  switch (status) {
    case "connected": {
      color = "bg-green-600";
      break;
    }
    case "ig": {
      color = "bg-yellow-400";
      break;
    }
    case "idle": {
      color = "bg-red-600";
      break;
    }
    default: {
      color = "bg-slate-400";
      break;
    }
  }

  return (
    <>
      <span
        title={status}
        className={`mr-1 inline-block h-3 w-3 rounded-full ${color}`}
      ></span>
    </>
  );
}
