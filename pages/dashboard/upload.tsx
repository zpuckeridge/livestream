import { useSession, getSession } from "next-auth/react";
import { FormEvent } from "react";
import Link from "next/link";

export default function Upload() {
  const { data: session, status }: { data: any; status: any } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session && session.user.email === `contact@sdelta.xyz`) {
    return (
      <>
        <div className="min-h-screen flex justify-between">
          <h1 className="text-white font-bold mx-auto my-auto">WIP</h1>
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
