import AuthRoute from "@/components/AuthRoute/AuthRoute";
import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import Link from "next/link";

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthRoute>
      <div className="profile-page container">
        <div className="row">
          <div className="profile-page__sidebar col-xs-4">
            <Sidebar />
          </div>
          <div className="col-xs-8">
            <div className="profile-page__content">{children}</div>
          </div>
        </div>
        {/* <p>{user?.id}</p>
      <p>{user?.email}</p>
      <p>{user?.accessToken}</p>
      <p>Role: {user?.role}</p> */}
      </div>
    </AuthRoute>
  );
}
