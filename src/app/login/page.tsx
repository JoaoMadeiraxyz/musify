import Link from "next/link";

export default function Login() {
  return (
    <main className="min-h-screen bg-black flex flex-col items-center justify-center">
      <p>login</p>
      <Link href={"/"}>Go to home</Link>
    </main>
  );
}
