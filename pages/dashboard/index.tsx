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
        <div className="xl:max-w-6xl mx-auto mt-10 mb-20">
          <div className="justify-items-center text-center grid grid-cols-2 gap-4">
            <div>
              <Link href="/dashboard/profile">
                <button className="p-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300  transition-all">
                  Profile <User className="ml-2" />
                </button>
              </Link>
            </div>
            <div>
              <Link href="/dashboard/upload">
                <button className="p-10 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300  transition-all">
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
        <h1 className="font-bold text-2xl">
          Sorry! You are not authorised to view this page!
        </h1>
      </div>
    );
  }
}
