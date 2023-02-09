import { useSession, getSession } from "next-auth/react";
import Link from "next/link";
import { Upload, UploadCloud, User } from "react-feather";

export default function Admin() {
  const { data: session, status }: { data: any; status: any } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <div className="xl:max-w-6xl mx-auto justify-between flex min-h-screen">
          <div className="justify-center text-center flex mx-auto my-auto">
            <div>
              <Link href="/dashboard/upload" passHref>
                <button className="px-6 py-1 text-white rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all">
                  Upload <UploadCloud className="ml-2" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <div className="justify-center text-center xl:max-w-6xl mx-auto mt-10 mb-20">
        <h1 className="font-bold text-2xl text-white">
          Sorry! You are not authorised to view this page!
        </h1>
      </div>
    );
  }
}
