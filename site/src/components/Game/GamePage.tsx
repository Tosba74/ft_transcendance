import React, { useState } from "react";

export default function GamePage() {
    const [isOpen, setOpen] = React.useState(false);

    const handleClick = () => {
        setOpen(!isOpen);
    };


    return (
        <div className="bg-yellow-400 w-full h-full">
            {/* <h2>ICI !!! on game !!</h2> */}
            <div className="bg-gray-800 w-full z-50 top-10 px-40">
                <div className="flex flex-row space-x-4 rounded bg-gray-400 border border-gray-300 w-40 text-center items-center basis-1 md:basis-1/2 ld:basis-1/4 bg-gray-300">
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">01</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">02</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">03</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">04</div>
                </div>
            </div>
            <div>
                <button type="button" onClick={handleClick}>
                    Click Me
                </button>

                {isOpen && <div>Content</div>}
            </div>
        </div>
    );
}