"use client";

import { useSession } from "next-auth/react";
import LoadingIndicator from "../Shared/LoadingIndicator";
import { redirect } from "next/navigation";

export default function ProtectedRoutes({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = useSession();

  if (session.status === "loading") return <LoadingIndicator />;

  if (session.status !== "authenticated") return redirect("/api/auth/signin");

  return <>{children}</>;
}
