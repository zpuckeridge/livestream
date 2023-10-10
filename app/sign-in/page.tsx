import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <main className="flex justify-center my-10">
      <SignIn />
    </main>
  );
}
