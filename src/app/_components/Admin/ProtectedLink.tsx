"use client";

import CustomLink from "../Shared/Link";
import { useSession } from "next-auth/react";

export default function ProtectedLink({
  href,
  title,
  cls,
  onClick,
}: {
  href: string;
  title: string;
  cls?: string;
  onClick?: () => void;
}) {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <CustomLink href={href} className={cls} onClick={onClick}>
      {title}
    </CustomLink>
  );
}
