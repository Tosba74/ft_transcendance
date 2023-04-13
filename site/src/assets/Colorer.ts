export default function Colorer(login: string | undefined): string {
  //
  if (login === undefined) {
    return "bg-cyan-500 dark:bg-gray-700";
  }
  // Choose you own colors for normal theme and dark theme and add your switch case, dont touch anything else
  // https://tailwindcss.com/docs/customizing-colors
  // https://tailwindcss.com/docs/background-color
  //
  switch (login) {
    case "jjaqueme":
      return "bg-orange-400 dark:bg-orange-900";
    case "amuhleth":
      return "bg-emerald-600 dark:bg-emerald-900";
    case "ktrosset":
      return "bg-red-700 dark:bg-red-900";
    case "kdi-noce":
      return "bg-[#14b8a6] dark:bg-[#7dd3fc]";
    // Inspired by PornHub color palette
    case "hsabir":
      return "bg-[#292929] dark:bg-[#ffa31a]";
    default:
      return "bg-cyan-500 dark:bg-gray-700";
  }
}
