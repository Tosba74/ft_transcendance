export default function UserStatus({
  status,
  classes,
}: {
  status: string;
  classes: string;
}) {
  let color: string;
  let statusName: string;

  switch (status) {
    case "connected": {
      color = "bg-green-600";
      statusName = "Connected";
      break;
    }
    case "ingame": {
      color = "bg-yellow-400";
      statusName = "In Game";
      break;
    }
    case "donotdisturb": {
      color = "bg-red-600";
      statusName = "Do not disturb";
      break;
    }
    default: {
      color = "bg-slate-400";
      statusName = "Disconnected";
      break;
    }
  }

  return (
    <>
      <span title={statusName} className={`${classes} ${color}`}></span>
    </>
  );
}
