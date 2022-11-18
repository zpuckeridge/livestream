import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { Upload } from "react-feather";

export default function Admin() {
  const { data: session, status }: { data: any; status: any } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
          <Link href="/dashboard/upload">
            <button className="inline-flex mb-10 px-4 py-1 text-sm font-semibold rounded-full border bg-gray-200 dark:bg-[#111111] border-gray-200 dark:border-gray-700 hover:ring-2 ring-gray-300 transition-all hover:dark:bg-[#1d1f22] hover:border-transparent focus:outline-none focus:ring-1 focus:ring-gray-300 focus:ring-offset-2">
              Upload Video <Upload className="ml-2" />
            </button>
          </Link>
        </div>
      </>
    );
  } else {
    return (
      <div className="justify-center text-center xl:max-w-6xl mx-auto mt-10 mb-20">
        <h1 className="font-bold text-2xl">
          Sorry! You are not authorised to view this page!
        </h1>
      </div>
    );
  }
}
