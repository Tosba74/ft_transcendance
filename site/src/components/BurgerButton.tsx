
interface BurgerButtonProps {
    logged: boolean,
}

export default function BurgerButton({ logged }: BurgerButtonProps) {
	return (
        <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="mobile-menu">
            <ul className="flex flex-col p-4 mt-4 border border-cyan-500 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-cyan-500">
                <li>
                    <a href="/home" className="block py-2 pl-3 pr-4 text-white bg-cyan-500 rounded md:bg-transparent md:text-cyan-500 md:p-0 dark:text-white" aria-current="page">Home</a>
                </li>
                <li>
                    <a href="/game" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Game</a>
                </li>
                <li>
                    <a href="/players" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Players</a>
                </li>
                <li>
                    <a href="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</a>
                </li>
                <li>
                    <a href="/api/login/apisignin" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login api</a>
                </li>
                { logged &&
                    <li>
                        <a href="/login" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Mon profil</a>
                    </li>
                }
            </ul>
		</div>
	);
}
// export default function BurgerButton() {
	// return (
  // <nav className="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-900">
    {/* <div className="items-center justify-between w-full md:flex md:w-auto md:order-1" id="mobile-menu"> */}
            {/* <ul className="hidden absolute top-2 right-2 p-4 mt-4 border rounded-lg bg-gray-500 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-cyan-500"> */}
                {/* <li> */}
                    {/* <a href="/home" className="block py-2 pl-4 pr-4 text-white rounded bg-cyan-500 rounded md:bg-transparent md:text-cyan-500 md:p-0 dark:text-white" aria-current="page">Home</a> */}
                {/* </li> */}
                {/* <li> */}
                    {/* <a href="/game" className="block py-2 pl-4 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Game</a> */}
                {/* </li> */}
                {/* <li> */}
                    {/* <a href="/players" className="block py-2 pl-4 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Players</a> */}
                {/* </li> */}
                {/* <li> */}
                    {/* <a href="/login" className="block py-2 pl-4 pr-4 text-gray-700 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Login</a> */}
                {/* </li> */}
            {/* </ul> */}
		{/* </div> */}
		{/* </nav> */}
	// );
// }