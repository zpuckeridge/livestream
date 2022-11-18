import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginButton() {
  const { data: session }: { data: any } = useSession();
  if (session) {
    return (
      <>
        <button
          className="p-2 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300  transition-all"
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
        className="p-2 rounded-lg flex items-center justify-center bg-gray-200 dark:bg-[#1d1f22] hover:ring-2 ring-gray-300  transition-all"
        onClick={() => signIn()}
      >
        Sign in
      </button>
    </>
  );
}
