import { NextAuthProvider } from "../_components/Admin/SessionProvider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <NextAuthProvider>{children}</NextAuthProvider>;
}
