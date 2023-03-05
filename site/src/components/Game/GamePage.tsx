import React, { useState } from "react";

export default function GamePage() {
    const [isOpen, setOpen] = useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };


    return (
        <div className="w-full h-full">
            Game!!
        </div>
    );
}