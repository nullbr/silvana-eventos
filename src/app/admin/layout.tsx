import ProtectedRoutes from "../_components/Admin/ProtectedRoutes";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ProtectedRoutes>{children}</ProtectedRoutes>;
}
