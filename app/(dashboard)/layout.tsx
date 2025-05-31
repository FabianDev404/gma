import SideNav from "./components/SideNav";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 text-gray-900">
      <aside className="text-black top-0 h-screen">
        <SideNav />
      </aside>

      <div className="flex-1 flex flex-col">
        {/* <header className="h-16 flex justify-end items-center  px-6">
          <SignedOut>
            <SignInButton />
            <SignUpButton />
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </header> */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
