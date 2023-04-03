export default function UserStatus({ status }: { status: string }) {
  let color: string;
  let statusName: string;

  // switch (status) {
  //   case 193: {
  color = "bg-green-600";
  //     statusName = "Connected";
  //     break;
  //   }
  //   case 100: {
  //     color = "bg-yellow-400";
  //     statusName = "In game";
  //     break;
  //   }
  //   case 200: {
  //     color = "bg-red-600";
  //     statusName = "Do not disturb";
  //     break;
  //   }
  //   default: {
  //     color = "bg-slate-400";
  //     statusName = "Disconnected";
  //     break;
  //   }
  // }

  return (
    <>
      <span
        title={status}
        className={`mr-1 inline-block h-3 w-3 rounded-full ${color}`}
      ></span>
    </>
  );
}
