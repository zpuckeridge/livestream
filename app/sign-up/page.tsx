import { SignUp } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <main className="flex justify-center my-10">
      <SignUp />
    </main>
  );
}
