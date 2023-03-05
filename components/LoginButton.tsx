import React from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { FaDiscord } from "react-icons/fa";
import Image from "next/image";

export default function LoginButton() {
  const { data: session }: { data: any } = useSession();
  if (session) {
    return (
      <>
        <button
          title="Logout"
          className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
          onClick={() => signOut()}>
          <Image
            src={session.user.image}
            alt="Discord Profile Picture"
            height={100}
            width={100}
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
        title="Login"
        className="py-1 px-6 rounded-lg flex items-center justify-center bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
        onClick={() => signIn()}>
        <FaDiscord className="h-6 w-6" />
        <p className="hidden sm:flex ml-2">Login</p>
      </button>
    </>
  );
}
