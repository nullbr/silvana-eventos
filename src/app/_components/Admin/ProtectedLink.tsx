"use client";

import CustomLink from "../Shared/Link";
import { useSession } from "next-auth/react";

export default function ProtectedLink({
  href,
  title,
  cls,
}: {
  href: string;
  title: string;
  cls?: string;
}) {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <CustomLink href={href} className={cls}>
      {title}
    </CustomLink>
  );
}
