import AuthBg from "Layouts/AuthBg";
import AuthFormLayout from "./AuthFormLayout";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthBg>
      <AuthFormLayout>{children}</AuthFormLayout>
    </AuthBg>
  );
}
