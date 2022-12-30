import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";

export default function LoginButton() {
  const { data: session }: { data: any } = useSession();
  if (session) {
    return (
      <>
        <button
          className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
          onClick={() => signOut()}
        >
          <img
            src={session.user.image}
            alt="user image"
            className="rounded-full h-6 w-6 mr-2"
          />
          {session.user.name}
        </button>
      </>
    );
  }
  return (
    <>
      <button
        className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
        onClick={() => signIn()}
      >
        <FaDiscord className="mr-2 h-6 w-6" />
        Login
      </button>
    </>
  );
}
