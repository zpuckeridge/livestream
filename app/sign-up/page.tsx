import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="max-w-7xl flex justify-center items-center min-h-screen min-w-screen mx-auto">
      <SignUp />
    </div>
  );
}
