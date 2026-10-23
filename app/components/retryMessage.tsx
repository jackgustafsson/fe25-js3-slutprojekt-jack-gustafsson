"use client";
import { useRouter } from "next/navigation";

export default function RetryMessage({message}: {message: string}) {
  const router = useRouter();

  return (
    <section role="alert" className="rounded-xl border border-red-200 bg-red-50 p-5">
      <p className="mb-4 text-red-800">{message}</p>
      <button onClick={() => router.refresh()} className="rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700">Försök igen</button>
    </section>
  );
}
