import React, { useState } from "react";

export default function GamePage() {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };


    return (
        <div className="w-full h-screen flex flex-wrap p-8 ">
            <div className="h-4/6 w-full lg:w-2/3 bg-black">
                Game!!
            </div>
            <div className="w-full lg:w-1/3 lg:h-4/6 h-1/6 bg-gray-500">
                Game History
            </div>
        </div>
    );
}