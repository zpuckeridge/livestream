import Link from "next/link";

export default function Notification() {
  return (
    <div className="bg-[#e5e7eb] dark:bg-black flex justify-between border-b border-black">
      <div className="font-semibold m-3 ml-4 flex">
        You are currently viewing a{" "}
        <p className="ml-1 mr-1 font-bold">work in progress</p>page
      </div>
      <Link
        className="font-semibold m-3 mr-4 flex hover:text-gray-800 dark:hover:text-gray-200"
        href={"https://github.com/zpuckeridge/livestream"}
      >
        See <p className="ml-1 font-bold">GitHub →</p>
      </Link>
    </div>
  );
}
