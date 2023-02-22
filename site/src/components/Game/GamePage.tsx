import React from "react";

export default function GamePage() {
    return (
        <div className="page">
            {/* <h2>ICI !!! on game !!</h2> */}
            <div className="bg-gray-800 w-full z-50">
                <div className="flex flex-row">
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">01</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">02</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">03</div>
                    <div className="rounded bg-gray-400 border border-gray-300 w-40 text-center items-center md:basis-1/2 ld:basis-1/4 bg-gray-300">04</div>
                </div>
            </div>
        </div>
    );
}