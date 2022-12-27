import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session }: { data: any } = useSession();
  if (session) {
    return (
      <>
        <button
          className="p-2 rounded-lg flex items-center justify-center bg-white dark:bg-white/5 border border-zinc-800/50 hover:ring-2 ring-gray-300 transition-all"
          onClick={() => signOut()}
        >
          Sign out {session.user.email}
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
        Sign in
      </button>
    </>
  );
}
