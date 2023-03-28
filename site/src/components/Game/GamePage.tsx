import React, { useState } from "react";

export default function GamePage() {
  const [isOpen, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!isOpen);
  };

  return (
    <div className="flex h-full w-full flex-col gap-4 p-6 lg:flex-row">
      <div className="h-4/6 w-full bg-black lg:w-2/3">Game!!</div>
      <div className="h-1/6 w-full bg-gray-500 lg:h-4/6 lg:w-1/3">
        Game History
      </div>
    </div>
  );
}
